import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { authApi } from '../services/api';
import { clearSession, decodePayload, readSession, saveSession } from './session';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [sesion, setSesion] = useState(() => readSession());
  const [verificando, setVerificando] = useState(() => readSession() !== null);

  useEffect(() => {
    let activo = true;
    if (!readSession()) {
      setVerificando(false);
      return undefined;
    }
    authApi.me()
      .then((datos) => {
        const actual = readSession();
        if (!activo || !actual) return;
        const renovada = { ...actual, username: datos.username, role: datos.rol };
        saveSession(renovada);
        setSesion(renovada);
      })
      .catch((error) => {
        if (activo && error.status === 401) {
          clearSession();
          setSesion(null);
        }
      })
      .finally(() => {
        if (activo) setVerificando(false);
      });
    return () => { activo = false; };
  }, []);

  useEffect(() => {
    if (!sesion) return undefined;
    const payload = decodePayload(sesion.token);
    const ms = payload?.exp ? payload.exp * 1000 - Date.now() : 0;
    const temporizador = setTimeout(() => {
      clearSession();
      setSesion(null);
    }, Math.max(ms, 0));
    return () => clearTimeout(temporizador);
  }, [sesion]);

  const login = useCallback(async (username, password) => {
    const datos = await authApi.login(username, password);
    const nueva = { token: datos.token, username, role: datos.rol };
    if (!saveSession(nueva)) throw new Error('No se pudo iniciar la sesión.');
    setSesion(nueva);
    return nueva;
  }, []);

  const logout = useCallback(() => {
    clearSession();
    setSesion(null);
  }, []);

  const valor = {
    sesion,
    username: sesion?.username ?? null,
    role: sesion?.role ?? null,
    autenticado: sesion !== null,
    verificando,
    login,
    logout,
  };

  return <AuthContext.Provider value={valor}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const contexto = useContext(AuthContext);
  if (!contexto) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return contexto;
}
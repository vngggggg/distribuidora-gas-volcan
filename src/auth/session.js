const SESSION_KEY = 'gasvolcan.session';

export function decodePayload(token) {
  try {
    const parte = token.split('.')[1];
    const b64 = parte.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(b64.padEnd(Math.ceil(b64.length / 4) * 4, '=')));
  } catch {
    return null;
  }
}

export function isExpired(token, ahoraMs = Date.now()) {
  const payload = decodePayload(token);
  return !payload || !Number.isFinite(payload.exp) || payload.exp * 1000 <= ahoraMs;
}

export function saveSession({ token, username, role }) {
  if (!token || isExpired(token)) return false;
  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify({ token, username, role }));
    return true;
  } catch {
    return false;
  }
}

export function readSession() {
  try {
    const texto = sessionStorage.getItem(SESSION_KEY);
    if (!texto) return null;
    const sesion = JSON.parse(texto);
    if (!sesion?.token || isExpired(sesion.token)) {
      sessionStorage.removeItem(SESSION_KEY);
      return null;
    }
    return sesion;
  } catch {
    return null;
  }
}

export function clearSession() {
  try {
    sessionStorage.removeItem(SESSION_KEY);
  } catch {
   
  }
}
// Envoltorio seguro de localStorage: nunca lanza excepciones
// (modo privado, almacenamiento bloqueado, cuota llena).
const PREFIX = 'aa:';

const memory = new Map();

export function read(key, fallback) {
  try {
    const raw = localStorage.getItem(PREFIX + key);
    return raw === null ? fallback : JSON.parse(raw);
  } catch {
    return memory.has(key) ? memory.get(key) : fallback;
  }
}

export function write(key, value) {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value));
    return true;
  } catch {
    memory.set(key, value);
    return false;
  }
}

export function remove(key) {
  try {
    localStorage.removeItem(PREFIX + key);
  } catch {
    memory.delete(key);
  }
}

export function storageAvailable() {
  try {
    const k = PREFIX + '__test';
    localStorage.setItem(k, '1');
    localStorage.removeItem(k);
    return true;
  } catch {
    return false;
  }
}

// Inicio de sesión local: perfiles con nombre + PIN guardados en este
// dispositivo. El PIN se guarda como hash con sal; separa perfiles de quienes
// comparten un dispositivo, pero no es seguridad fuerte (no hay servidor).
import { read, write, remove } from './storage.js';

const USERS = 'users';
const SESSION = 'session';

export function normalizeName(name) {
  return String(name).trim().replace(/\s+/g, ' ');
}

function keyOf(name) {
  return normalizeName(name).toLocaleLowerCase('es');
}

function randomSalt() {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
}

async function hashPin(pin, salt) {
  const data = new TextEncoder().encode(`${salt}:${pin}`);
  if (crypto.subtle) {
    const digest = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, '0')).join('');
  }
  // Respaldo para contextos no seguros (http sin localhost): FNV-1a.
  let h = 0x811c9dc5;
  for (const b of data) {
    h ^= b;
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return 'fnv' + h.toString(16);
}

export function listUsers() {
  return Object.values(read(USERS, {})).sort((a, b) => (b.lastLogin || 0) - (a.lastLogin || 0));
}

export function validate(name, pin) {
  const n = normalizeName(name);
  if (n.length < 2) return 'El nombre debe tener al menos 2 caracteres.';
  if (n.length > 32) return 'El nombre puede tener como máximo 32 caracteres.';
  if (!/^\d{4,8}$/.test(pin)) return 'El PIN debe tener entre 4 y 8 dígitos.';
  return null;
}

export async function register(name, pin) {
  const error = validate(name, pin);
  if (error) throw new Error(error);
  const users = read(USERS, {});
  const k = keyOf(name);
  if (users[k]) throw new Error('Ya existe un perfil con ese nombre en este dispositivo.');
  const salt = randomSalt();
  users[k] = {
    key: k,
    name: normalizeName(name),
    salt,
    hash: await hashPin(pin, salt),
    createdAt: Date.now(),
    lastLogin: Date.now(),
  };
  write(USERS, users);
  write(SESSION, k);
  return users[k];
}

export async function login(name, pin) {
  const users = read(USERS, {});
  const user = users[keyOf(name)];
  if (!user) throw new Error('No existe un perfil con ese nombre en este dispositivo.');
  if ((await hashPin(pin, user.salt)) !== user.hash) throw new Error('PIN incorrecto.');
  user.lastLogin = Date.now();
  write(USERS, users);
  write(SESSION, user.key);
  return user;
}

export function logout() {
  remove(SESSION);
}

export function currentUser() {
  const k = read(SESSION, null);
  if (!k) return null;
  return read(USERS, {})[k] || null;
}

export async function deleteUser(key, pin) {
  const users = read(USERS, {});
  const user = users[key];
  if (!user) return;
  if ((await hashPin(pin, user.salt)) !== user.hash) throw new Error('PIN incorrecto.');
  delete users[key];
  write(USERS, users);
  remove(`progress:${key}`);
  if (read(SESSION, null) === key) remove(SESSION);
}

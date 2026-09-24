// Progreso por perfil: intentos por pregunta, historial de sesiones y la
// sesión de práctica en curso (para retomarla).
import { read, write } from './storage.js';

const VERSION = 1;
const HISTORY_LIMIT = 60;

function empty() {
  return { v: VERSION, answers: {}, history: [], active: null };
}

export function loadProgress(userKey) {
  const p = read(`progress:${userKey}`, null);
  if (!p || p.v !== VERSION) return empty();
  return { ...empty(), ...p };
}

export function saveProgress(userKey, progress) {
  write(`progress:${userKey}`, progress);
}

export function recordAnswer(progress, qid, correct) {
  const prev = progress.answers[qid] || { a: 0, c: 0, last: 0, at: 0 };
  progress.answers[qid] = {
    a: prev.a + 1,
    c: prev.c + (correct ? 1 : 0),
    last: correct ? 1 : 0,
    at: Date.now(),
  };
}

export function statusOf(progress, qid) {
  const r = progress.answers[qid];
  if (!r) return 'nueva';
  return r.last ? 'dominada' : 'pendiente';
}

export function statsFor(progress, questions) {
  let dominated = 0;
  let pending = 0;
  let seen = 0;
  for (const q of questions) {
    const s = statusOf(progress, q.id);
    if (s !== 'nueva') seen++;
    if (s === 'dominada') dominated++;
    if (s === 'pendiente') pending++;
  }
  const total = questions.length;
  return {
    total,
    seen,
    dominated,
    pending,
    fresh: total - seen,
    pct: total ? Math.round((100 * dominated) / total) : 0,
  };
}

export function addHistory(progress, entry) {
  progress.history = [{ ...entry, at: Date.now() }, ...progress.history].slice(0, HISTORY_LIMIT);
}

// ---- Exportar / importar -------------------------------------------------

function toBase64(str) {
  const bytes = new TextEncoder().encode(str);
  let bin = '';
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin);
}

function fromBase64(b64) {
  const bin = atob(b64.replace(/\s+/g, ''));
  const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

export function exportCode(user, progress) {
  const payload = {
    app: 'algebra-abstracta',
    v: VERSION,
    name: user.name,
    exportedAt: Date.now(),
    answers: progress.answers,
    history: progress.history,
  };
  return toBase64(JSON.stringify(payload));
}

export function parseCode(code) {
  let payload;
  try {
    payload = JSON.parse(fromBase64(code.trim()));
  } catch {
    throw new Error('El código no es válido.');
  }
  if (!payload || payload.app !== 'algebra-abstracta' || typeof payload.answers !== 'object') {
    throw new Error('El código no corresponde a esta plataforma.');
  }
  return payload;
}

// Combina un progreso importado con el actual: por pregunta se conserva el
// registro más reciente y se suman intentos solo si el importado es más nuevo.
export function mergeProgress(progress, payload) {
  let changed = 0;
  for (const [qid, rec] of Object.entries(payload.answers)) {
    const mine = progress.answers[qid];
    if (!mine || (rec.at || 0) > (mine.at || 0)) {
      progress.answers[qid] = {
        a: Math.max(rec.a || 0, mine ? mine.a : 0),
        c: Math.max(rec.c || 0, mine ? mine.c : 0),
        last: rec.last ? 1 : 0,
        at: rec.at || Date.now(),
      };
      changed++;
    }
  }
  const seen = new Set(progress.history.map((h) => h.at));
  for (const h of payload.history || []) if (!seen.has(h.at)) progress.history.push(h);
  progress.history.sort((a, b) => b.at - a.at);
  progress.history = progress.history.slice(0, HISTORY_LIMIT);
  return changed;
}

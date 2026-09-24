// Estado global de la aplicación y operaciones sobre sesiones de práctica.
import { currentUser } from './auth.js';
import { loadProgress, saveProgress, statusOf, addHistory } from './progress.js';
import { COURSES, findCourse, allQuestions } from '../../content/index.js';
import { shuffle } from './dom.js';

export const state = {
  user: null,
  progress: null,
};

export function refreshUser() {
  state.user = currentUser();
  state.progress = state.user ? loadProgress(state.user.key) : null;
  return state.user;
}

export function persist() {
  if (state.user && state.progress) saveProgress(state.user.key, state.progress);
}

export function defaultCourse() {
  return COURSES[0];
}

const MIXED_SIZE = 10;
const REVIEW_SIZE = 15;
const PRIORITY = { pendiente: 0, nueva: 1, dominada: 2 };

// Construye la lista de preguntas de una sesión según el modo.
export function buildQueue(course, { mode, unitId }) {
  const p = state.progress;
  if (mode === 'unit' || mode === 'unit-pending') {
    const unit = course.units.find((u) => u.id === unitId);
    const qs = unit.questions;
    return mode === 'unit' ? qs.map((q) => q.id) : qs.filter((q) => statusOf(p, q.id) !== 'dominada').map((q) => q.id);
  }
  const all = allQuestions(course);
  if (mode === 'review') {
    return shuffle(all.filter((q) => statusOf(p, q.id) === 'pendiente')).slice(0, REVIEW_SIZE).map((q) => q.id);
  }
  // Mixta: prioriza pendientes, luego nuevas, luego dominadas; al azar dentro de cada grupo.
  return shuffle(all)
    .sort((a, b) => PRIORITY[statusOf(p, a.id)] - PRIORITY[statusOf(p, b.id)])
    .slice(0, MIXED_SIZE)
    .map((q) => q.id);
}

export function sessionTitle(course, mode, unitId) {
  if (mode === 'review') return 'Repaso de pendientes';
  if (mode === 'mixed') return 'Práctica mixta';
  const unit = course.units.find((u) => u.id === unitId);
  return unit ? unit.title : course.title;
}

export function startSession(courseId, mode, unitId = null, startAt = null) {
  const course = findCourse(courseId);
  let queue = buildQueue(course, { mode, unitId });
  if (startAt && queue.includes(startAt)) queue = queue.slice(queue.indexOf(startAt));
  if (!queue.length) return false;
  state.progress.active = {
    courseId,
    unitId,
    mode,
    title: sessionTitle(course, mode, unitId),
    queue,
    index: 0,
    results: {},
    seed: String(Date.now()),
    startedAt: Date.now(),
  };
  persist();
  return true;
}

export function startCustomSession(courseId, title, queue, unitId = null) {
  if (!queue.length) return false;
  state.progress.active = {
    courseId,
    unitId,
    mode: 'custom',
    title,
    queue: queue.slice(),
    index: 0,
    results: {},
    seed: String(Date.now()),
    startedAt: Date.now(),
  };
  persist();
  return true;
}

export function finishSession() {
  const s = state.progress.active;
  if (!s) return;
  const answered = s.queue.filter((id) => id in s.results);
  const correct = answered.filter((id) => s.results[id]).length;
  const summary = {
    courseId: s.courseId,
    unitId: s.unitId,
    mode: s.mode,
    title: s.title,
    total: answered.length,
    correct,
    results: s.results,
    queue: s.queue,
  };
  if (answered.length) {
    const { courseId, unitId, mode, title, total } = summary;
    addHistory(state.progress, { courseId, unitId, mode, title, total, correct });
  }
  state.progress.lastSummary = summary;
  state.progress.active = null;
  persist();
}

export function abandonSession() {
  state.progress.active = null;
  persist();
}

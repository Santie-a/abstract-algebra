import { renderChoice } from './choice.js';
import { renderNumeric } from './numeric.js';
import { renderFill } from './fill.js';
import { renderOrder } from './order.js';

export const TYPE_LABELS = {
  mcq: 'Selección única',
  multi: 'Selección múltiple',
  numeric: 'Respuesta numérica',
  fill: 'Completar la demostración',
  match: 'Emparejar',
  order: 'Ordenar la demostración',
};

const RENDERERS = {
  mcq: renderChoice,
  multi: renderChoice,
  numeric: renderNumeric,
  fill: renderFill,
  match: renderFill,
  order: renderOrder,
};

export function renderQuestion(q, ctx) {
  const r = RENDERERS[q.type];
  if (!r) throw new Error(`Tipo de pregunta desconocido: ${q.type}`);
  return r(q, ctx);
}

export function typeLabel(q) {
  return q.kind || TYPE_LABELS[q.type];
}

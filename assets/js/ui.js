// Componentes de interfaz compartidos entre vistas.
import { h, icon } from './dom.js';
import { fmtInline } from './format.js';
import { state } from './state.js';

export function initials(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toLocaleUpperCase('es'))
    .join('');
}

export function appBar({ title, back, showProfile = true }) {
  return h(
    'header',
    { class: 'appbar' },
    h(
      'div',
      { class: 'appbar-inner' },
      back
        ? h('a', { class: 'icon-btn', href: back, 'aria-label': 'Volver' }, icon('back'))
        : h('a', { class: 'brand', href: '#/', 'aria-label': 'Inicio' }, h('span', { class: 'brand-mark', html: fmtInline('$G/N$') })),
      h('h1', { class: 'appbar-title', html: fmtInline(title) }),
      showProfile && state.user
        ? h('a', { class: 'avatar', href: '#/perfil', 'aria-label': `Perfil de ${state.user.name}` }, initials(state.user.name))
        : h('span', { class: 'appbar-spacer' }),
    ),
  );
}

export function progressBar(pct, label) {
  return h(
    'div',
    {
      class: 'progress',
      role: 'progressbar',
      'aria-valuemin': '0',
      'aria-valuemax': '100',
      'aria-valuenow': String(pct),
      'aria-label': label || 'Progreso',
    },
    h('div', { class: 'progress-fill', style: `width:${pct}%` }),
  );
}

export function statPills(stats) {
  return h(
    'div',
    { class: 'pills' },
    h('span', { class: 'pill pill-ok' }, h('span', { class: 'dot dot-dominada' }), `${stats.dominated} dominadas`),
    h('span', { class: 'pill pill-bad' }, h('span', { class: 'dot dot-pendiente' }), `${stats.pending} pendientes`),
    h('span', { class: 'pill' }, h('span', { class: 'dot dot-nueva' }), `${stats.fresh} nuevas`),
  );
}

export const STATUS_LABEL = {
  dominada: 'Dominada',
  pendiente: 'Pendiente',
  nueva: 'Nueva',
};

export function page(...children) {
  return h('main', { id: 'main', class: 'shell', tabindex: '-1' }, ...children);
}

export function toast(text) {
  const el = h('div', { class: 'toast', role: 'status' }, text);
  document.body.append(el);
  requestAnimationFrame(() => el.classList.add('is-visible'));
  setTimeout(() => {
    el.classList.remove('is-visible');
    setTimeout(() => el.remove(), 300);
  }, 2600);
}

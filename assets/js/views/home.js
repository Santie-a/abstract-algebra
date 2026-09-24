import { h, icon } from '../dom.js';
import { COURSES, allQuestions } from '../../../content/index.js';
import { statsFor } from '../progress.js';
import { state } from '../state.js';
import { appBar, page, progressBar } from '../ui.js';

export function resumeCard(navigate) {
  const s = state.progress.active;
  if (!s) return null;
  const done = Object.keys(s.results).length;
  return h(
    'button',
    { type: 'button', class: 'card resume-card', onclick: () => navigate('#/practica') },
    h('span', { class: 'resume-icon', 'aria-hidden': 'true' }, icon('play')),
    h(
      'span',
      { class: 'resume-body' },
      h('span', { class: 'eyebrow' }, 'Continuar donde quedó'),
      h('span', { class: 'resume-title' }, s.title),
      h('span', { class: 'muted' }, `Pregunta ${Math.min(done + 1, s.queue.length)} de ${s.queue.length}`),
    ),
    h('span', { class: 'chevron', 'aria-hidden': 'true' }, icon('chevron')),
  );
}

export function homeView(navigate) {
  const first = state.user.name.split(' ')[0];
  return h(
    'div',
    {},
    appBar({ title: 'Inicio' }),
    page(
      h('section', { class: 'hello' }, h('h2', { class: 'hello-title' }, `Hola, ${first}`), h('p', { class: 'muted' }, 'Elija un curso para practicar.')),
      resumeCard(navigate),
      h('h2', { class: 'section-title' }, 'Cursos'),
      h(
        'div',
        { class: 'stack' },
        COURSES.map((course) => {
          const stats = statsFor(state.progress, allQuestions(course));
          return h(
            'a',
            { class: 'card course-card', href: `#/curso/${course.id}` },
            h(
              'div',
              { class: 'course-card-head' },
              h('div', {}, h('h3', { class: 'card-title' }, course.title), h('p', { class: 'muted' }, course.subtitle)),
              h('span', { class: 'chevron', 'aria-hidden': 'true' }, icon('chevron')),
            ),
            progressBar(stats.pct, `Progreso en ${course.title}`),
            h(
              'p',
              { class: 'course-meta' },
              `${stats.dominated} de ${stats.total} preguntas dominadas · ${course.units.length} temas`,
            ),
          );
        }),
      ),
    ),
  );
}

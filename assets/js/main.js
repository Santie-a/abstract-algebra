// Arranque de la aplicación y enrutador basado en el hash (compatible con
// GitHub Pages, que sólo sirve archivos estáticos).
import { h } from './dom.js';
import { COURSES, findCourse, findUnit } from '../../content/index.js';
import { state, refreshUser } from './state.js';
import { loginView } from './views/login.js';
import { homeView } from './views/home.js';
import { courseView } from './views/course.js';
import { unitView } from './views/unit.js';
import { practiceView } from './views/practice.js';
import { summaryView } from './views/summary.js';
import { profileView } from './views/profile.js';

const app = document.getElementById('app');
let rendering = false;
let redirect = null;
let lastHash = null;

// Las vistas pueden pedir una redirección mientras se construyen; en ese caso
// se aplica al terminar, sin anidar renderizados.
function navigate(hash, { replace = false } = {}) {
  if (rendering) {
    redirect = hash;
    return;
  }
  if (location.hash === hash) render();
  else if (replace) {
    history.replaceState(null, '', hash);
    render();
  } else location.hash = hash;
}

function notFound() {
  return h(
    'main',
    { id: 'main', class: 'shell empty', tabindex: '-1' },
    h('h1', {}, 'Página no encontrada'),
    h('a', { class: 'btn btn-primary', href: '#/' }, 'Ir al inicio'),
  );
}

function resolve(hash) {
  const path = hash.replace(/^#/, '') || '/';
  if (path === '/entrar') {
    if (state.user) navigate('#/');
    return loginView(navigate);
  }
  if (!state.user) {
    navigate('#/entrar');
    return null;
  }
  let m;
  if (path === '/') return COURSES.length === 1 ? courseView(navigate, COURSES[0]) : homeView(navigate);
  if ((m = path.match(/^\/curso\/([\w-]+)$/))) {
    const course = findCourse(m[1]);
    return course ? courseView(navigate, course) : notFound();
  }
  if ((m = path.match(/^\/curso\/([\w-]+)\/tema\/([\w-]+)$/))) {
    const course = findCourse(m[1]);
    const unit = course && findUnit(course, m[2]);
    return unit ? unitView(navigate, course, unit) : notFound();
  }
  if (path === '/practica') return practiceView(navigate, render);
  if (path === '/resumen') return summaryView(navigate);
  if (path === '/perfil') return profileView(navigate, render);
  return notFound();
}

function render() {
  let view = null;
  for (let guard = 0; guard < 5; guard++) {
    refreshUser();
    rendering = true;
    redirect = null;
    try {
      view = resolve(location.hash);
    } finally {
      rendering = false;
    }
    if (!redirect) break;
    history.replaceState(null, '', redirect);
  }
  app.replaceChildren(view || notFound());
  window.scrollTo(0, 0);
  if (lastHash !== null && lastHash !== location.hash) {
    const main = document.getElementById('main');
    if (main) main.focus({ preventScroll: true });
  }
  lastHash = location.hash;
}

window.addEventListener('hashchange', render);
// Si otra pestaña cambia el perfil o el progreso, refrescamos la vista.
window.addEventListener('storage', (e) => {
  if (e.key && e.key.startsWith('aa:') && location.hash !== '#/practica') render();
});

render();

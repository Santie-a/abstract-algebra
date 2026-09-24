// Registro de cursos. Para agregar un curso nuevo, cree una carpeta en
// content/ con un index.js que exporte { id, title, subtitle, source, units }
// y agréguelo a esta lista.
import algebraAbstracta from './algebra-abstracta/index.js';

export const COURSES = [algebraAbstracta];

export function findCourse(id) {
  return COURSES.find((c) => c.id === id) || null;
}

export function findUnit(course, unitId) {
  return course.units.find((u) => u.id === unitId) || null;
}

export function allQuestions(course) {
  return course.units.flatMap((u) => u.questions.map((q) => ({ ...q, unitId: u.id })));
}

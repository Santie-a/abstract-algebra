import repaso from './00-repaso.js';
import clasesLaterales from './51-clases-laterales.js';
import fibras from './52-fibras.js';
import cocientes from './53-cocientes.js';
import lagrange from './54-lagrange.js';
import isomorfismos from './55-isomorfismos.js';
import acciones from './61-acciones.js';
import alternanteCayley from './63-alternante-cayley.js';
import ecuacionClases from './65-ecuacion-clases.js';
import sylow from './67-sylow.js';

export default {
  id: 'algebra-abstracta',
  title: 'Álgebra Abstracta',
  subtitle: 'Grupos cocientes, teoremas de isomorfismo, acciones y Sylow',
  source: 'Notas de clase de J. C. Arias (Universidad del Rosario), secciones 1 a 6.',
  units: [
    repaso,
    clasesLaterales,
    fibras,
    cocientes,
    lagrange,
    isomorfismos,
    acciones,
    alternanteCayley,
    ecuacionClases,
    sylow,
  ],
};

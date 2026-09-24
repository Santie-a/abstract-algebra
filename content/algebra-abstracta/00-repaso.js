const r = String.raw;

export default {
  id: 'repaso',
  title: 'Repaso: grupos, subgrupos y grupos cíclicos',
  section: 'Secciones 1–4',
  keyIdeas: [
    r`El **orden** de $g$, denotado $|g|$, es el menor $n\in\Z_{>0}$ tal que $g^n = 1$.`,
    r`Si $|x| = n < \infty$, entonces $|x^k| = \dfrac{n}{(n,k)}$ (Lema 3.25).`,
    r`Si $G = \langle x\rangle$ tiene orden $n$, entonces $G = \langle x^k\rangle$ si y sólo si $(n,k) = 1$ (Proposición 3.32), y hay exactamente un subgrupo por cada divisor positivo de $n$ (Teorema 3.39).`,
    r`$D_{2n} = \langle r, s \mid r^n = s^2 = 1,\ rs = sr^{-1}\rangle$; en general $r^i s = s r^{-i}$.`,
    r`En $S_n$ el producto $\sigma\tau = \sigma\circ\tau$ se calcula **de derecha a izquierda**: primero $\tau$, luego $\sigma$.`,
  ],
  questions: [
    {
      id: 'rep-01',
      type: 'mcq',
      prompt: r`En $\Z/12\Z$, ¿cuál es el orden de $\overline{8}$?`,
      options: [
        { text: r`$3$`, correct: true },
        { text: r`$4$`, why: r`$4 = (12,8)$ es el máximo común divisor, no el orden.` },
        { text: r`$8$` },
        { text: r`$12$`, why: r`Sólo los generadores $\overline{k}$ con $(12,k) = 1$ tienen orden $12$.` },
      ],
      explanation: r`Por el Lema 3.25 (en notación aditiva), $|\overline{8}| = \dfrac{12}{(12,8)} = \dfrac{12}{4} = 3$. Comprobación: $\overline{8}\neq\overline 0$, $2\cdot\overline 8 = \overline{16} = \overline 4\neq\overline 0$ y $3\cdot\overline 8 = \overline{24} = \overline 0$.`,
      intuition: r`Piense en un reloj de 12 horas avanzando de 8 en 8: $0\to 8\to 4\to 0$. Tres pasos para volver al inicio.`,
      ref: 'Lema 3.25',
    },
    {
      id: 'rep-02',
      type: 'multi',
      prompt: r`¿Cuáles de los siguientes elementos generan $\Z/12\Z$?`,
      options: [
        { text: r`$\overline{1}$`, correct: true },
        { text: r`$\overline{4}$`, why: r`$(12,4) = 4$, así que $\langle\overline 4\rangle = \{\overline0,\overline4,\overline8\}$ tiene orden $3$.` },
        { text: r`$\overline{5}$`, correct: true },
        { text: r`$\overline{6}$`, why: r`$(12,6) = 6$: $\langle\overline6\rangle = \{\overline 0,\overline 6\}$.` },
        { text: r`$\overline{7}$`, correct: true },
        { text: r`$\overline{9}$`, why: r`$(12,9) = 3$: $\langle\overline 9\rangle = \{\overline0,\overline9,\overline6,\overline3\}$ tiene orden $4$.` },
        { text: r`$\overline{11}$`, correct: true },
      ],
      explanation: r`Por la Proposición 3.32, $\langle\overline k\rangle = \Z/12\Z$ si y sólo si $(12,k) = 1$. Los $k\in\{0,\dots,11\}$ primos relativos con $12$ son $1, 5, 7, 11$.`,
      ref: 'Proposición 3.32',
    },
    {
      id: 'rep-03',
      type: 'numeric',
      prompt: r`¿Cuántos subgrupos tiene $\Z/36\Z$?`,
      answer: 9,
      hint: r`Los subgrupos de un grupo cíclico finito de orden $n$ están en biyección con los divisores positivos de $n$.`,
      explanation: r`Por el Corolario 3.40 hay un subgrupo por cada divisor positivo de $36$: $1, 2, 3, 4, 6, 9, 12, 18, 36$. Son $9$ subgrupos (ver el retículo del Ejemplo 4.3).`,
      ref: 'Corolario 3.40',
    },
    {
      id: 'rep-04',
      type: 'mcq',
      prompt: r`En el grupo dihedral $D_{2n}$, ¿a qué es igual $r^i s$?`,
      options: [
        { text: r`$sr^{-i}$`, correct: true },
        { text: r`$sr^{i}$`, why: r`Eso sólo pasaría si $r$ y $s$ conmutaran; pero $rs = sr^{-1}\neq sr$ cuando $n\ge 3$.` },
        { text: r`$r^{-i}s$`, why: r`Aplicando la misma regla, $r^{-i}s = sr^{i}$, que no es $r^i s$ en general.` },
        { text: r`$r^{i}$` },
      ],
      explanation: r`Es el Ejercicio 1.70. Por inducción usando $rs = sr^{-1}$:
      $$r^i s = r^{i-1}(rs) = r^{i-1}s\,r^{-1} = \cdots = s\,r^{-i}.$$`,
      intuition: r`Rotar y luego reflejar equivale a reflejar y luego rotar en el sentido contrario: la reflexión invierte la orientación.`,
      ref: 'Ejercicio 1.70',
    },
    {
      id: 'rep-05',
      type: 'mcq',
      prompt: r`¿Cuál es el centro $Z(D_8)$?`,
      options: [
        { text: r`$\{1, r^2\}$`, correct: true },
        { text: r`$\{1\}$`, why: r`Eso ocurre en $D_{2n}$ cuando $n$ es impar. Aquí $n = 4$ es par.` },
        { text: r`$\{1, r, r^2, r^3\}$`, why: r`$r$ no conmuta con $s$: $rs = sr^{-1} = sr^3\neq sr$.` },
        { text: r`$D_8$`, why: r`$D_8$ no es abeliano.` },
      ],
      explanation: r`Por el Ejemplo 2.63, si $n = 2k$ es par entonces $Z(D_{2n}) = \{1, r^k\}$. Con $n = 4$, $k = 2$: $Z(D_8) = \{1, r^2\}$. En efecto, $r^2 s = sr^{-2} = sr^2$, así que $r^2$ conmuta con los generadores $r$ y $s$.`,
      ref: 'Ejemplo 2.63',
    },
    {
      id: 'rep-06',
      type: 'mcq',
      prompt: r`En $S_3$, calcule el producto $(1\,2)(1\,3)$.`,
      options: [
        { text: r`$(1\,3\,2)$`, correct: true },
        { text: r`$(1\,2\,3)$`, why: r`Este es el resultado si se lee de izquierda a derecha; es $(1\,3)(1\,2)$.` },
        { text: r`$(2\,3)$` },
        { text: r`$1$` },
      ],
      explanation: r`Se lee de derecha a izquierda (primero $(1\,3)$, luego $(1\,2)$):
      - $1\mapsto 3\mapsto 3$,
      - $3\mapsto 1\mapsto 2$,
      - $2\mapsto 2\mapsto 1$.

      Así $(1\,2)(1\,3) = (1\,3\,2)$. Como $(1\,3)(1\,2) = (1\,2\,3)$, esto muestra que $S_3$ no es abeliano.`,
      ref: 'Sección 1.3',
    },
  ],
};

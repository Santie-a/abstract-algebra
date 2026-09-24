const r = String.raw;

export default {
  id: 'alternante-cayley',
  title: 'El grupo alternante y el teorema de Cayley',
  section: 'Secciones 6.3–6.4',
  keyIdeas: [
    r`Todo $m$-ciclo es producto de $m-1$ transposiciones: $(a_1\,a_2\,\dots\,a_m) = (a_1\,a_2)(a_2\,a_3)\cdots(a_{m-1}\,a_m)$.`,
    r`$\sgn: S_n\to\{\pm1\}$ es un homomorfismo; si $\sigma$ es producto de $r$ transposiciones, $\sgn(\sigma) = (-1)^r$.`,
    r`$\sigma$ es impar si y sólo si tiene un número impar de ciclos de longitud par (Proposición 6.48).`,
    r`$A_n = \ker\sgn$, así que $S_n/A_n\cong Z_2$ y $|A_n| = n!/2$ para $n\ge 2$.`,
    r`**Cayley** (Corolario 6.65): todo grupo $G$ es isomorfo a un subgrupo de $S_G$; si $|G| = n$, a un subgrupo de $S_n$.`,
    r`Si $p$ es el menor primo que divide a $|G|$, todo subgrupo de índice $p$ es normal (Corolario 6.67).`,
  ],
  questions: [
    {
      id: 'ay-01',
      type: 'multi',
      prompt: r`¿Cuáles de las siguientes permutaciones son **pares**?`,
      options: [
        { text: r`$(1\,2)(3\,6\,9)(5\,7)$`, correct: true, why: r`Tiene dos ciclos de longitud par.` },
        { text: r`$(1\,2\,3\,4\,5)$`, correct: true, why: r`Un $5$-ciclo es producto de $4$ transposiciones.` },
        { text: r`$(1\,2)(3\,4)$`, correct: true },
        { text: r`$(1\,2\,6\,3)$`, why: r`Un $4$-ciclo es producto de $3$ transposiciones: es impar.` },
        { text: r`$(1\,3)(2\,5\,4)$`, why: r`$\sgn = (-1)(+1) = -1$.` },
        { text: r`$(1\,3\,4)(2\,4\,6)(9\,8\,7\,6)$`, why: r`Los ciclos no son disjuntos, pero $\sgn$ es un homomorfismo: $(+1)(+1)(-1) = -1$.` },
      ],
      explanation: r`Un $m$-ciclo es par si y sólo si $m$ es impar. Como $\sgn$ es un homomorfismo, el signo de un producto (de ciclos disjuntos o no) es el producto de los signos. Equivalentemente, para ciclos disjuntos, $\sigma$ es impar si y sólo si tiene un número impar de ciclos de longitud par.`,
      ref: 'Proposición 6.48',
    },
    {
      id: 'ay-02',
      type: 'numeric',
      prompt: r`¿Cuál es el orden de $A_6$?`,
      answer: 360,
      explanation: r`$\sgn: S_6\to\{\pm1\}$ es un epimorfismo con kernel $A_6$. Por el Primer Teorema del Isomorfismo $S_6/A_6\cong Z_2$, así que $|A_6| = 6!/2 = 720/2 = 360$.`,
      ref: 'Sección 6.3',
    },
    {
      id: 'ay-03',
      type: 'mcq',
      prompt: r`¿Cuál de las siguientes es una descomposición correcta de $(1\,4\,2\,5)$ como producto de transposiciones? (Recuerde: el producto se lee de derecha a izquierda.)`,
      options: [
        { text: r`$(1\,4)(4\,2)(2\,5)$`, correct: true },
        { text: r`$(2\,5)(4\,2)(1\,4)$`, why: r`Este producto es $(1\,5\,2\,4)$: el orden de los factores importa.` },
        { text: r`$(1\,4)(2\,5)$`, why: r`Es un producto de dos transposiciones disjuntas: una permutación de orden $2$, no un $4$-ciclo.` },
        { text: r`$(1\,4)(1\,2)(1\,5)$`, why: r`Este producto es $(1\,5\,2\,4) = (1\,4\,2\,5)^{-1}$.` },
      ],
      explanation: r`Es la fórmula $(a_1\,a_2\,\dots\,a_m) = (a_1\,a_2)(a_2\,a_3)\cdots(a_{m-1}\,a_m)$. Verificación de derecha a izquierda: $1\mapsto 1\mapsto 1\mapsto 4$, $\ 4\mapsto 4\mapsto 2\mapsto 2$, $\ 2\mapsto 5\mapsto 5\mapsto 5$, $\ 5\mapsto 2\mapsto 4\mapsto 1$.

      La descomposición no es única: $(1\,5)(1\,2)(1\,4)$ también funciona. Pero la **paridad** del número de factores sí lo es; aquí son $3$, así que $\sgn(1\,4\,2\,5) = -1$.`,
      ref: 'Sección 6.3',
    },
    {
      id: 'ay-04',
      type: 'match',
      prompt: r`Sea $N = \{1, (1\,2)(3\,4), (1\,3)(2\,4), (1\,4)(2\,3)\}$, que es normal en $S_4$ y en $A_4$. Empareje cada cociente con el grupo al que es isomorfo.`,
      rows: [
        { left: r`$S_4/N$`, answer: r`$S_3$` },
        { left: r`$A_4/N$`, answer: r`$Z_3$` },
        { left: r`$S_5/A_5$`, answer: r`$Z_2$` },
      ],
      distractors: [r`$V_4$`, r`$Z_6$`],
      explanation: r`- $|A_4/N| = 12/4 = 3$ es primo, así que $A_4/N\cong Z_3$ (Corolario 5.80).
      - $|S_4/N| = 6$. El subgrupo $S_3 = \{\sigma\in S_4\mid\sigma(4) = 4\}$ corta a $N$ sólo en $1$, así que $S_3\to S_4/N$, $\sigma\mapsto\sigma N$, es inyectivo entre grupos de orden $6$: $S_4/N\cong S_3$.
      - $S_5/A_5\cong Z_2$ por el Primer Teorema del Isomorfismo aplicado a $\sgn$.`,
      ref: 'Ejercicio 6.59',
    },
    {
      id: 'ay-05',
      type: 'match',
      prompt: r`Sea $V_4 = \{1, a, b, c\}$ con $a^2 = b^2 = c^2 = 1$ y $ab = ba = c$, $bc = cb = a$, $ca = ac = b$. Numere sus elementos $1, a, b, c$ como $1, 2, 3, 4$. En la acción regular izquierda, $\rho_a = (1\,2)(3\,4)$. Empareje cada $\rho_g$ con su permutación en $S_4$.`,
      rows: [
        { left: r`$\rho_b$`, answer: r`$(1\,3)(2\,4)$` },
        { left: r`$\rho_c$`, answer: r`$(1\,4)(2\,3)$` },
        { left: r`$\rho_1$`, answer: r`$1$` },
      ],
      distractors: [r`$(1\,2\,3\,4)$`, r`$(1\,3)$`, r`$(1\,2)(3\,4)$`],
      explanation: r`$\rho_b(\ell) = b\ell$: $\ 1\mapsto b$, $a\mapsto c$, $b\mapsto 1$, $c\mapsto a$, es decir $1\mapsto3$, $2\mapsto 4$, $3\mapsto 1$, $4\mapsto 2$: $\rho_b = (1\,3)(2\,4)$.

      $\rho_c$: $1\mapsto c$, $a\mapsto b$, $b\mapsto a$, $c\mapsto 1$, es decir $\rho_c = (1\,4)(2\,3)$. Y $\rho_1$ es la identidad.

      Así $V_4\cong\{1, (1\,2)(3\,4), (1\,3)(2\,4), (1\,4)(2\,3)\}\le S_4$, como predice el Teorema de Cayley.`,
      ref: 'Ejercicio 6.62',
    },
    {
      id: 'ay-06',
      type: 'mcq',
      prompt: r`Sea $G$ un grupo de orden $15$ y $H\le G$ con $|G : H| = 3$. ¿Es $H$ normal en $G$?`,
      options: [
        { text: r`Sí, porque $3$ es el menor primo que divide a $15$`, correct: true },
        { text: r`No necesariamente` },
        { text: r`Sí, porque todo subgrupo de índice $3$ es normal`, why: r`Falso: $\langle(1\,2)\rangle$ tiene índice $3$ en $S_3$ y no es normal.` },
        { text: r`Sólo si $G$ es abeliano` },
      ],
      explanation: r`Por el Corolario 6.67, si $p$ es el menor primo que divide a $|G|$, todo subgrupo de índice $p$ es normal. Aquí $|G| = 15 = 3\cdot 5$ y $p = 3$.

      Idea de la prueba: $G$ actúa sobre las $3$ clases laterales de $H$, lo que da $\pi_H: G\to S_3$ con kernel $K\le H$. Entonces $|G:K|$ divide a $3! = 6$ y a $15$, así que $|G:K|$ divide a $3$; como $K\le H$, $|G:K|\ge 3$, luego $K = H$ y $H$ es un kernel.`,
      ref: 'Corolario 6.67',
    },
    {
      id: 'ay-07',
      type: 'numeric',
      prompt: r`Sea $G$ un grupo de orden $12$ y $x\in G$ con $|x| = 4$. En la representación regular izquierda $\pi: G\to S_{12}$, la permutación $\pi(x)$ es un producto de ciclos disjuntos de longitud $4$. ¿Cuántos?`,
      answer: 3,
      explanation: r`Las órbitas de $\langle x\rangle$ actuando sobre $G$ por multiplicación izquierda son las clases $\langle x\rangle g$, cada una con $|x| = 4$ elementos. Hay $12/4 = 3$ órbitas, y en cada una $\pi(x)$ actúa como un $4$-ciclo.

      Consecuencia (Ejercicio 6.74): $\pi(x)$ tiene $3$ ciclos de longitud par, así que es impar. Entonces $\pi(G)\not\le A_{12}$ y $G$ tiene un subgrupo de índice $2$.`,
      ref: 'Ejercicio 6.74',
    },
    {
      id: 'ay-08',
      type: 'mcq',
      prompt: r`¿Qué afirma el Teorema de Cayley?`,
      options: [
        { text: r`Todo grupo es isomorfo a un subgrupo de algún grupo simétrico; si $|G| = n$, a un subgrupo de $S_n$.`, correct: true },
        { text: r`Todo grupo de orden $n$ es isomorfo a $S_n$.`, why: r`$|S_n| = n!$, que es distinto de $n$ para $n\ge 3$.` },
        { text: r`Todo grupo de orden $n$ es isomorfo a un subgrupo de $A_n$.`, why: r`Falso: $Z_2$ no cabe en $A_2 = 1$.` },
        { text: r`Todo subgrupo de $S_n$ es cíclico.`, why: r`$S_3\le S_n$ para $n\ge 3$ y no es cíclico.` },
      ],
      explanation: r`La acción regular izquierda $g\cdot x = gx$ es fiel: si $gx = x$ para todo $x$, entonces $g = 1$. Luego $\pi: G\to S_G$ es un monomorfismo y $G\cong\pi(G)\le S_G\cong S_n$ (Corolario 6.65).`,
      ref: 'Corolario 6.65',
    },
  ],
};

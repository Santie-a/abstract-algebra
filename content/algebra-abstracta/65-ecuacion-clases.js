const r = String.raw;

export default {
  id: 'ecuacion-clases',
  title: 'Ecuación de clases y conjugación en el grupo simétrico',
  section: 'Secciones 6.5–6.6',
  keyIdeas: [
    r`La clase de conjugados de $x$ es $\Orb_x = \{gxg^{-1}\mid g\in G\}$, y $|\Orb_x| = |G : C_G(x)|$.`,
    r`$\Orb_x = \{x\}$ si y sólo si $x\in Z(G)$.`,
    r`**Ecuación de clases** (Teorema 6.86): $|G| = |Z(G)| + \sum_{i=1}^{r}|G : C_G(g_i)|$, donde $g_1,\dots,g_r$ representan las clases con más de un elemento.`,
    r`Todo $p$-grupo tiene centro no trivial (Teorema 6.90), y todo grupo de orden $p^2$ es abeliano: $Z_{p^2}$ o $Z_p\times Z_p$ (Corolario 6.91).`,
    r`En $S_n$: $\tau(a_1\,a_2\,\dots\,a_k)\tau^{-1} = (\tau(a_1)\,\tau(a_2)\,\dots\,\tau(a_k))$. Dos permutaciones son conjugadas si y sólo si tienen el mismo tipo de ciclo, y hay tantas clases como particiones de $n$ (Proposición 6.103).`,
  ],
  questions: [
    {
      id: 'ec-01',
      type: 'fill',
      prompt: r`Complete la demostración de que todo $p$-grupo tiene centro no trivial (Teorema 6.90).`,
      template: r`Sea $|P| = p^a$ con $a\ge 1$, y sean $g_1,\dots,g_r$ representantes de las clases de conjugados con más de un elemento. La ecuación de clases dice
      $$|P| = |Z(P)| + \sum_{i=1}^{r}|P : C_P(g_i)|.$$
      Para cada $i$, $g_i\notin Z(P)$, así que $C_P(g_i)\neq P$; como $|P : C_P(g_i)|$ es una potencia de $p$ distinta de $1$, $p$ divide a [[0]].

      Como $p$ también divide a $|P|$, la ecuación de clases muestra que $p$ divide a [[1]]. Por lo tanto $Z(P)$ [[2]].`,
      blanks: [r`$|P : C_P(g_i)|$`, r`$|Z(P)|$`, 'no es trivial'],
      distractors: [r`$r$`, r`$|P : Z(P)|$`, 'es trivial', r`$a$`],
      explanation: r`Despejando, $|Z(P)| = |P| - \sum_i|P:C_P(g_i)|$ es una diferencia de múltiplos de $p$, luego es múltiplo de $p$. Como $1\in Z(P)$, $|Z(P)|\ge 1$, y siendo múltiplo de $p$ se tiene $|Z(P)|\ge p > 1$.`,
      intuition: r`Las clases no centrales tienen tamaños divisibles por $p$; si el centro fuera sólo $\{1\}$, sobraría un $1$ que no cuadra con que el total $p^a$ sea múltiplo de $p$.`,
      ref: 'Teorema 6.90',
    },
    {
      id: 'ec-02',
      type: 'numeric',
      prompt: r`¿Cuántas clases de conjugados tiene $S_5$?`,
      answer: 7,
      hint: r`Las clases de conjugados de $S_n$ corresponden a las particiones de $n$.`,
      explanation: r`Por la Proposición 6.103, hay una clase por cada tipo de ciclo, es decir, por cada partición de $5$: $1{+}1{+}1{+}1{+}1$, $1{+}1{+}1{+}2$, $1{+}1{+}3$, $1{+}4$, $2{+}3$, $1{+}2{+}2$ y $5$. Son $7$ (Ejemplo 6.105).`,
      ref: 'Proposición 6.103',
    },
    {
      id: 'ec-03',
      type: 'mcq',
      prompt: r`Sean $\sigma = (1\,2\,3)(4\,5)$ y $\tau = (1\,4)(2\,5\,3)$ en $S_5$. Calcule $\tau\sigma\tau^{-1}$.`,
      options: [
        { text: r`$(1\,3)(2\,4\,5)$`, correct: true },
        { text: r`$(1\,3)(2\,5\,4)$`, why: r`Revise el orden dentro del $3$-ciclo: debe ser $(\tau(1)\,\tau(2)\,\tau(3)) = (4\,5\,2)$.` },
        { text: r`$(1\,2\,3)(4\,5)$`, why: r`Eso sería cierto si $\tau$ conmutara con $\sigma$.` },
        { text: r`$(1\,4)(2\,5\,3)$`, why: r`Ese es $\tau$.` },
      ],
      explanation: r`No hace falta multiplicar: basta aplicar $\tau$ a cada entrada de los ciclos de $\sigma$. Como $\tau(1) = 4$, $\tau(2) = 5$, $\tau(3) = 2$, $\tau(4) = 1$, $\tau(5) = 3$:
      $$\tau\sigma\tau^{-1} = (\tau(1)\,\tau(2)\,\tau(3))(\tau(4)\,\tau(5)) = (4\,5\,2)(1\,3) = (1\,3)(2\,4\,5).$$
      El tipo de ciclo ($2, 3$) se conserva, como debe ser.`,
      intuition: r`Conjugar por $\tau$ es "renombrar" los números según $\tau$: la estructura de la permutación no cambia, sólo las etiquetas.`,
      ref: 'Sección 6.6',
    },
    {
      id: 'ec-04',
      type: 'numeric',
      prompt: r`¿Cuántas clases de conjugados tiene $D_8$?`,
      answer: 5,
      explanation: r`$Z(D_8) = \{1, r^2\}$ aporta dos clases de un elemento. Si $x\notin Z(D_8)$, entonces $\langle x\rangle\le C_{D_8}(x)\neq D_8$, lo que fuerza $|C_{D_8}(x)| = 4$ y $|\Orb_x| = 2$. Por la ecuación de clases $8 = 2 + 2 + 2 + 2$, y las clases no centrales son $\{r, r^3\}$, $\{s, sr^2\}$ y $\{sr, sr^3\}$. En total $2 + 3 = 5$ clases.`,
      ref: 'Ejemplo 6.89',
    },
    {
      id: 'ec-05',
      type: 'numeric',
      prompt: r`¿Cuántos elementos de $S_5$ son conjugados a $(1\,2\,3)$?`,
      answer: 20,
      explanation: r`Los conjugados de $(1\,2\,3)$ son exactamente los $3$-ciclos (mismo tipo de ciclo). Su número es $\dfrac{5\cdot4\cdot3}{3} = 20$ (Ejercicio 1.60).

      Alternativamente, $|C_{S_5}(\sigma)| = m(n-m)! = 3\cdot 2! = 6$ (Ejemplo 6.107), así que $|\Orb_\sigma| = 120/6 = 20$.`,
      ref: 'Ejemplo 6.107',
    },
    {
      id: 'ec-06',
      type: 'mcq',
      prompt: r`Sea $G$ un grupo de orden $49$. ¿Qué se puede afirmar?`,
      options: [
        { text: r`$G$ es abeliano, isomorfo a $Z_{49}$ o a $Z_7\times Z_7$`, correct: true },
        { text: r`$G$ es necesariamente cíclico`, why: r`$Z_7\times Z_7$ tiene orden $49$ y no es cíclico: todos sus elementos no triviales tienen orden $7$.` },
        { text: r`$G$ puede no ser abeliano`, why: r`Por el Corolario 6.91 todo grupo de orden $p^2$ es abeliano.` },
        { text: r`$Z(G) = 1$`, why: r`Todo $p$-grupo tiene centro no trivial (Teorema 6.90).` },
      ],
      explanation: r`$49 = 7^2$. Por el Teorema 6.90, $|Z(G)|\in\{7, 49\}$, así que $G/Z(G)$ tiene orden $1$ o $7$ y es cíclico. Por el Ejercicio 5.66, $G$ es abeliano. Si tiene un elemento de orden $49$, $G\cong Z_{49}$; si no, $G\cong Z_7\times Z_7$ (Corolario 6.91).`,
      ref: 'Corolario 6.91',
    },
    {
      id: 'ec-07',
      type: 'multi',
      prompt: r`¿Cuáles de las siguientes permutaciones son conjugadas a $(1\,2)(3\,4\,5)$ en $S_5$?`,
      options: [
        { text: r`$(1\,5)(2\,3\,4)$`, correct: true },
        { text: r`$(2\,4)(1\,3\,5)$`, correct: true },
        { text: r`$(1\,2\,3)(4\,5)$`, correct: true, why: r`Mismo tipo de ciclo ($2, 3$); el orden en que se escriben los ciclos disjuntos no importa.` },
        { text: r`$(1\,2)(3\,4)$`, why: r`Tipo $1, 2, 2$: distinto.` },
        { text: r`$(1\,2\,3\,4\,5)$`, why: r`Tipo $5$: distinto.` },
        { text: r`$(1\,2\,3)$`, why: r`Tipo $1, 1, 3$: distinto.` },
      ],
      explanation: r`Por la Proposición 6.103, dos permutaciones de $S_n$ son conjugadas si y sólo si tienen el mismo tipo de ciclo. El tipo de $(1\,2)(3\,4\,5)$ es $2\le 3$.`,
      ref: 'Proposición 6.103',
    },
    {
      id: 'ec-08',
      type: 'mcq',
      prompt: r`¿Cuál es la clase de conjugados de $j$ en $Q_8$?`,
      options: [
        { text: r`$\{j, -j\}$`, correct: true },
        { text: r`$\{j\}$`, why: r`Eso significaría $j\in Z(Q_8) = \{\pm1\}$, que es falso.` },
        { text: r`$\{\pm i, \pm j, \pm k\}$`, why: r`Una clase tiene $|Q_8 : C_{Q_8}(j)|$ elementos, que divide a $8$; $6$ no divide a $8$.` },
        { text: r`$\{j, k\}$` },
      ],
      explanation: r`$C_{Q_8}(j) = \{\pm1, \pm j\}$ (Ejemplo 2.58), así que $|\Orb_j| = 8/4 = 2$. Además $iji^{-1} = ij(-i) = -(ij)i = -ki = -j$. Luego $\Orb_j = \{j, -j\}$.`,
      ref: 'Ejemplo 6.88',
    },
  ],
};

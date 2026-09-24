const r = String.raw;

export default {
  id: 'lagrange',
  title: 'Teorema de Lagrange y consecuencias',
  section: 'Sección 5.4',
  keyIdeas: [
    r`El **índice** $|G:H|$ es el número de clases laterales izquierdas (o derechas) de $H$ en $G$.`,
    r`**Lagrange** (Teorema 5.77): si $G$ es finito y $H\le G$, entonces $|H|$ divide a $|G|$ y $|G:H| = |G|/|H|$.`,
    r`Consecuencias: $|g|$ divide a $|G|$ y $g^{|G|} = 1$ (Corolario 5.79); si $|G| = p$ es primo, $G\cong Z_p$ (Corolario 5.80); si $N\nor G$, $|G/N| = |G|/|N|$.`,
    r`$|HK| = \dfrac{|H||K|}{|H\cap K|}$ (Proposición 5.88), y $HK\le G$ si y sólo si $HK = KH$ (Proposición 5.91).`,
    r`El recíproco de Lagrange es **falso**: un divisor de $|G|$ no siempre es el orden de un subgrupo.`,
  ],
  questions: [
    {
      id: 'la-01',
      type: 'fill',
      prompt: r`Complete la demostración del Teorema de Lagrange.`,
      template: r`Sea $k = |G:H|$ y sean $g_1,\dots,g_k$ representantes de las clases laterales izquierdas. Como estas clases forman una [[0]] de $G$, tenemos $|G| = \sum_{i=1}^{k}|g_iH|$.

      Por la Proposición 5.6, $|g_iH| =$ [[1]] para cada $i$, así que $|G| =$ [[2]]. Por lo tanto $|H|$ divide a $|G|$ y $|G:H| =$ [[3]].`,
      blanks: ['partición', r`$|H|$`, r`$k|H|$`, r`$|G|/|H|$`],
      distractors: ['cadena', r`$|g_i|$`, r`$|H|^k$`, r`$|H|/|G|$`],
      explanation: r`Las clases laterales son disjuntas dos a dos y cubren $G$ (Corolario 5.10), así que el orden de $G$ es la suma de sus tamaños. Cada clase tiene exactamente $|H|$ elementos (la función $gh\mapsto h$ es biyectiva), de modo que $|G| = k|H|$.`,
      intuition: r`$G$ se "corta" en $k$ bloques del mismo tamaño $|H|$, como una barra de chocolate: el tamaño de un bloque divide al total.`,
      ref: 'Teorema 5.77',
    },
    {
      id: 'la-02',
      type: 'multi',
      prompt: r`Sea $G$ un grupo de orden $6435 = 3^2\cdot 5\cdot 11\cdot 13$. ¿Cuáles de los siguientes números **no** pueden ser el orden de un subgrupo de $G$?`,
      options: [
        { text: r`$2$`, correct: true },
        { text: r`$4$`, correct: true },
        { text: r`$15$`, why: r`$15 = 3\cdot 5$ divide a $6435$; Lagrange no lo descarta.` },
        { text: r`$33$`, why: r`$33 = 3\cdot 11$ divide a $6435$.` },
        { text: r`$70$`, correct: true },
        { text: r`$143$`, why: r`$143 = 11\cdot 13$ divide a $6435$.` },
        { text: r`$200$`, correct: true },
        { text: r`$429$`, why: r`$429 = 3\cdot 11\cdot 13$ divide a $6435$.` },
      ],
      explanation: r`Por Lagrange, el orden de un subgrupo divide a $|G| = 6435$, que es impar. Así se descartan $2$, $4$, $70 = 2\cdot5\cdot7$ y $200 = 2^3\cdot 5^2$.

      Cuidado: Lagrange sólo **descarta**. Que $15$, $33$, $143$ o $429$ dividan a $6435$ no garantiza que existan subgrupos de esos órdenes.`,
      ref: 'Ejercicio 5.93',
    },
    {
      id: 'la-03',
      type: 'numeric',
      prompt: r`Sea $G$ un grupo de orden $6435$ y $H\le G$ un subgrupo de orden $143$. ¿Cuál es el índice $|G:H|$?`,
      answer: 45,
      explanation: r`Por el Teorema de Lagrange, $|G:H| = |G|/|H| = 6435/143 = 45$.`,
      ref: 'Teorema 5.77',
    },
    {
      id: 'la-04',
      type: 'numeric',
      prompt: r`En $S_3$, sean $H = \langle(1\,2)\rangle$ y $K = \langle(1\,3)\rangle$. ¿Cuántos elementos tiene el conjunto $HK = \{hk\mid h\in H, k\in K\}$?`,
      answer: 4,
      explanation: r`Por la Proposición 5.88, $|HK| = \dfrac{|H||K|}{|H\cap K|} = \dfrac{2\cdot 2}{1} = 4$. Explícitamente, $HK = \{1, (1\,3), (1\,2), (1\,2)(1\,3) = (1\,3\,2)\}$.

      Como $4$ no divide a $6$, Lagrange muestra que $HK$ **no** es un subgrupo de $S_3$. Esto es consistente con la Proposición 5.91: $KH$ contiene a $(1\,3)(1\,2) = (1\,2\,3)\notin HK$, así que $HK\neq KH$.`,
      ref: 'Proposición 5.88',
    },
    {
      id: 'la-05',
      type: 'mcq',
      prompt: r`En $S_3$, calcule $(1\,2)(1\,3)(1\,2)$.`,
      options: [
        { text: r`$(2\,3)$`, correct: true },
        { text: r`$(1\,3)$`, why: r`Sería el resultado si $(1\,2)$ normalizara a $\langle(1\,3)\rangle$.` },
        { text: r`$(1\,2)$` },
        { text: r`$(1\,2\,3)$`, why: r`Un conjugado de una transposición es una transposición.` },
      ],
      explanation: r`De derecha a izquierda: $1\mapsto 2\mapsto 2\mapsto 1$, $\ 2\mapsto 1\mapsto 3\mapsto 3$, $\ 3\mapsto 3\mapsto 1\mapsto 2$. Así el producto es $(2\,3)$.

      Como $(2\,3)\notin H = \langle(1\,3)\rangle$, $(1\,2)\notin N_{S_3}(H)$ y $H$ no es normal en $S_3$. Con Lagrange, $H\le N_{S_3}(H)\le S_3$ fuerza $N_{S_3}(H) = H$.`,
      ref: 'Ejemplo 5.85',
    },
    {
      id: 'la-06',
      type: 'mcq',
      prompt: r`Sea $G$ un grupo de orden $13$. ¿Qué se puede concluir?`,
      options: [
        { text: r`$G\cong Z_{13}$, y todo $g\neq 1$ genera a $G$`, correct: true },
        { text: r`$G$ podría no ser abeliano`, why: r`Todo grupo cíclico es abeliano.` },
        { text: r`$G$ tiene exactamente $13$ subgrupos`, why: r`Sus únicos subgrupos son $1$ y $G$: sus órdenes deben dividir a $13$.` },
        { text: r`$G$ tiene un elemento de orden $13$, pero no necesariamente es cíclico`, why: r`Si tiene un elemento de orden $13 = |G|$, ese elemento genera a $G$.` },
      ],
      explanation: r`Por el Corolario 5.80: si $g\neq 1$, entonces $|g|$ divide a $13$ y $|g|\neq 1$, así que $|g| = 13$. Luego $\langle g\rangle$ es un subgrupo de orden $13$, es decir, $\langle g\rangle = G\cong Z_{13}$.`,
      ref: 'Corolario 5.80',
    },
    {
      id: 'la-07',
      type: 'numeric',
      prompt: r`Calcule el residuo de dividir $37^{100}$ entre $29$.`,
      answer: 23,
      hint: r`$29$ es primo, así que $(\Z/29\Z)^*$ tiene orden $28$. Por el Corolario 5.79, $\overline a^{28} = \overline 1$ para todo $\overline a\neq\overline0$.`,
      explanation: r`En $\Z/29\Z$: $\overline{37} = \overline 8$ y $100 = 3\cdot 28 + 16$, así que $\overline 8^{100} = (\overline 8^{28})^3\,\overline 8^{16} = \overline 8^{16}$. Elevando al cuadrado sucesivamente:
      - $8^2 = 64\equiv 6$,
      - $8^4\equiv 36\equiv 7$,
      - $8^8\equiv 49\equiv 20$,
      - $8^{16}\equiv 400\equiv 23 \md{29}$.

      El residuo es $23$. Este es el Ejercicio 1.23, resuelto con el Teorema de Fermat (Ejercicio 5.67), que es una consecuencia de Lagrange.`,
      ref: 'Corolario 5.79',
    },
    {
      id: 'la-08',
      type: 'mcq',
      prompt: r`Sea $G$ un grupo finito y $d$ un divisor positivo de $|G|$. ¿Debe existir un subgrupo de $G$ de orden $d$?`,
      options: [
        { text: r`No: $A_4$ tiene orden $12$ y no tiene subgrupos de orden $6$.`, correct: true },
        { text: r`Sí, siempre: es el recíproco del Teorema de Lagrange.`, why: r`El recíproco de Lagrange es falso en general.` },
        { text: r`Sí, porque siempre existe un elemento de orden $d$.`, why: r`$V_4$ tiene orden $4$ y ningún elemento de orden $4$.` },
        { text: r`No: nunca existe un subgrupo de orden $d$ si $d$ no es primo.`, why: r`$Z_4$ tiene un subgrupo de orden $4$ (él mismo), y $4$ no es primo.` },
      ],
      explanation: r`Si $H\le A_4$ tuviera orden $6$, tendría índice $2$ y sería normal, con $A_4/H\cong Z_2$. Entonces $g^2H = (gH)^2 = H$, es decir, $g^2\in H$ para todo $g\in A_4$. Cada $3$-ciclo $\sigma$ cumple $\sigma = \sigma^4 = (\sigma^2)^2$, así que los ocho $3$-ciclos de $A_4$ estarían en $H$: imposible, pues $|H| = 6$.

      Los recíprocos parciales son el Teorema de Cauchy (para $d$ primo) y el Primer Teorema de Sylow (para potencias de primos), en la Sección 6.7.`,
      ref: 'Sección 5.4',
    },
  ],
};

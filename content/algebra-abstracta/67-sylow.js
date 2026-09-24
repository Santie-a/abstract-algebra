const r = String.raw;

export default {
  id: 'sylow',
  title: 'Los teoremas de Sylow',
  section: 'Sección 6.7',
  keyIdeas: [
    r`Si $|G| = p^am$ con $(p,m) = 1$, un **$p$-subgrupo de Sylow** es un subgrupo de orden $p^a$. $\Syl_p(G)$ es el conjunto de ellos y $n_p = |\Syl_p(G)|$.`,
    r`**Cauchy** (Teorema 6.122): si $p$ divide a $|G|$, entonces $G$ tiene un elemento de orden $p$.`,
    r`**Sylow I**: existen $p$-subgrupos de Sylow. **Sylow II**: todo $p$-subgrupo está contenido en un conjugado de un $p$-subgrupo de Sylow; en particular, dos $p$-subgrupos de Sylow son conjugados.`,
    r`**Sylow III**: $n_p\equiv 1\md p$ y $n_p = |G : N_G(P)|$, así que $n_p$ divide a $m$.`,
    r`$n_p = 1\iff P\nor G\iff P$ es característico en $G$ (Corolario 6.132).`,
  ],
  questions: [
    {
      id: 'sy-01',
      type: 'multi',
      prompt: r`Sea $G$ un grupo de orden $12 = 2^2\cdot 3$. Según el Tercer Teorema de Sylow, ¿qué valores son posibles para $n_3$?`,
      options: [
        { text: r`$1$`, correct: true },
        { text: r`$2$`, why: r`$2\not\equiv 1\md 3$.` },
        { text: r`$3$`, why: r`$3$ no divide a $4$.` },
        { text: r`$4$`, correct: true },
        { text: r`$6$`, why: r`$6$ no divide a $4$.` },
      ],
      explanation: r`$n_3$ divide a $m = 4$ y $n_3\equiv1\md 3$. Los divisores de $4$ son $1, 2, 4$; de ellos, $1$ y $4$ son $\equiv 1\md 3$. Ambos valores ocurren: $n_3(Z_{12}) = 1$ y $n_3(A_4) = 4$.`,
      ref: 'Teorema 6.131',
    },
    {
      id: 'sy-02',
      type: 'numeric',
      prompt: r`Sea $G$ un grupo de orden $45 = 3^2\cdot 5$. ¿Cuánto vale $n_5$?`,
      answer: 1,
      explanation: r`$n_5$ divide a $9$ y $n_5\equiv 1\md 5$. Los divisores de $9$ son $1, 3, 9$, y sólo $1\equiv1\md 5$. Así $n_5 = 1$ y el $5$-subgrupo de Sylow es normal. (Análogamente $n_3$ divide a $5$ y es $\equiv 1\md 3$, así que $n_3 = 1$.)`,
      ref: 'Teorema 6.131',
    },
    {
      id: 'sy-03',
      type: 'numeric',
      prompt: r`¿Cuántos $3$-subgrupos de Sylow tiene $A_4$?`,
      answer: 4,
      explanation: r`$|A_4| = 12$, así que $n_3\in\{1, 4\}$. Cada $3$-subgrupo de Sylow es cíclico de orden $3$ y contiene dos $3$-ciclos. $A_4$ tiene ocho $3$-ciclos, luego hay $8/2 = 4$ subgrupos: $\langle(1\,2\,3)\rangle$, $\langle(1\,2\,4)\rangle$, $\langle(1\,3\,4)\rangle$, $\langle(2\,3\,4)\rangle$.`,
      ref: 'Ejemplo 6.137',
    },
    {
      id: 'sy-04',
      type: 'numeric',
      prompt: r`¿Cuántos $2$-subgrupos de Sylow tiene $D_{12}$?`,
      answer: 3,
      explanation: r`$|D_{12}| = 12$, así que $n_2\in\{1, 3\}$ y cada $2$-subgrupo de Sylow tiene orden $4$. $D_{12}$ tiene $7$ elementos de orden $2$ (seis reflexiones y $r^3$), que no caben en un único subgrupo de orden $4$; luego $n_2 = 3$. Son $\{1, s, r^3, sr^3\}$, $\{1, sr^4, r^3, sr\}$ y $\{1, sr^2, r^3, sr^5\}$.`,
      ref: 'Ejemplo 6.138',
    },
    {
      id: 'sy-05',
      type: 'fill',
      prompt: r`Complete la demostración de que todo grupo de orden $35$ es cíclico.`,
      template: r`Sea $|G| = 35 = 5\cdot 7$. Por el Tercer Teorema de Sylow, $n_5\equiv 1\md 5$ y $n_5$ divide a [[0]], así que $n_5 =$ [[1]]. Análogamente $n_7\equiv 1\md 7$ y $n_7$ divide a $5$, así que $n_7 = 1$. Sean $P = \langle x\rangle$ y $Q = \langle y\rangle$ los subgrupos de Sylow, con $|x| = 5$ y $|y| = 7$.

      Como $Q\nor G$, $G$ actúa sobre $Q$ por conjugación y $G/C_G(Q)$ es isomorfo a un subgrupo de $\Aut(Q)\cong(\Z/7\Z)^*$, que tiene orden [[2]]. Como $|G/C_G(Q)|$ divide a $35$ y a ese número, $C_G(Q) = G$.

      Entonces $x$ y $y$ conmutan, $|xy| =$ [[3]] y $G = \langle xy\rangle$ es cíclico.`,
      blanks: [r`$7$`, r`$1$`, r`$6$`, r`$35$`],
      distractors: [r`$5$`, r`$8$`, r`$12$`, r`$2$`],
      explanation: r`$n_5\in\{1, 7\}$ y $7\not\equiv1\md 5$, así que $n_5 = 1$. $|(\Z/7\Z)^*| = 6$ (Proposición 6.119 y Lema 6.114), y $\gcd(35, 6) = 1$. Como $x$ y $y$ conmutan y tienen órdenes primos relativos, $|xy| = 5\cdot 7 = 35$.`,
      ref: 'Ejemplo 6.143',
    },
    {
      id: 'sy-06',
      type: 'mcq',
      prompt: r`¿Por qué un grupo de orden $200 = 2^3\cdot 5^2$ no puede ser simple?`,
      options: [
        { text: r`Porque $n_5 = 1$, así que el $5$-subgrupo de Sylow es normal`, correct: true },
        { text: r`Porque $n_2 = 1$`, why: r`$n_2$ divide a $25$ y es impar: puede ser $1$, $5$ o $25$. No está forzado.` },
        { text: r`Porque $200$ no es primo`, why: r`Hay grupos simples de orden no primo, como $A_5$ (orden $60$).` },
        { text: r`Porque todo grupo de orden par tiene un subgrupo normal de índice $2$`, why: r`Falso: $A_5$ tiene orden par y es simple.` },
      ],
      explanation: r`$n_5$ divide a $8$ y $n_5\equiv1\md 5$. Los divisores de $8$ son $1, 2, 4, 8$, y ninguno salvo $1$ es $\equiv 1\md 5$. Luego $n_5 = 1$ y el $5$-subgrupo de Sylow (de orden $25$) es normal, propio y no trivial (Ejercicio 6.147).`,
      ref: 'Corolario 6.132',
    },
    {
      id: 'sy-07',
      type: 'multi',
      prompt: r`Sea $P\in\Syl_p(G)$. ¿Cuáles afirmaciones son equivalentes a $n_p = 1$?`,
      options: [
        { text: r`$P\nor G$`, correct: true },
        { text: r`$P$ es característico en $G$`, correct: true },
        { text: r`$gPg^{-1} = P$ para toda $g\in G$`, correct: true, why: r`Es otra forma de decir $P\nor G$.` },
        { text: r`$P$ es abeliano`, why: r`En $S_3$ los $2$-subgrupos de Sylow $\langle(1\,2)\rangle$ son abelianos, pero $n_2(S_3) = 3$.` },
        { text: r`$P$ es cíclico`, why: r`El mismo ejemplo: $\langle(1\,2)\rangle$ es cíclico y $n_2(S_3) = 3$.` },
      ],
      explanation: r`Por Sylow II todos los $p$-subgrupos de Sylow son conjugados, así que hay uno solo si y sólo si $P$ coincide con todos sus conjugados, es decir, $P\nor G$. Y si $P$ es el único subgrupo de su orden, todo automorfismo lo fija (Corolario 6.132).`,
      ref: 'Corolario 6.132',
    },
    {
      id: 'sy-08',
      type: 'numeric',
      prompt: r`¿Cuántos $2$-subgrupos de Sylow tiene $S_4$?`,
      answer: 3,
      hint: r`$|S_4| = 24 = 2^3\cdot 3$. Un $2$-subgrupo de Sylow es isomorfo a $D_8$, y $P = \langle(1\,2\,3\,4), (1\,2)(3\,4)\rangle$ no es normal.`,
      explanation: r`$n_2$ divide a $3$ y es impar, así que $n_2\in\{1, 3\}$. $P = \langle(1\,2\,3\,4), (1\,2)(3\,4)\rangle\cong D_8$ es un $2$-subgrupo de Sylow que no es normal: $(2\,3)(1\,2\,3\,4)(2\,3) = (1\,3\,2\,4)\notin P$. Luego $n_2 \neq 1$ y $n_2 = 3$.`,
      ref: 'Ejemplo 6.140',
    },
    {
      id: 'sy-09',
      type: 'mcq',
      prompt: r`Sean $P, Q\in\Syl_p(G)$. ¿Qué garantiza el Segundo Teorema de Sylow?`,
      options: [
        { text: r`Existe $g\in G$ tal que $Q = gPg^{-1}$`, correct: true },
        { text: r`$P = Q$`, why: r`Sólo si $n_p = 1$. En $S_3$ hay tres $2$-subgrupos de Sylow distintos.` },
        { text: r`$P\cap Q = 1$`, why: r`No en general: en $S_4$ dos $2$-subgrupos de Sylow distintos (isomorfos a $D_8$) comparten el subgrupo $\{1, (1\,2)(3\,4), (1\,3)(2\,4), (1\,4)(2\,3)\}$.` },
        { text: r`$PQ$ es un subgrupo de $G$`, why: r`En $S_3$, $\langle(1\,2)\rangle\langle(1\,3)\rangle$ tiene $4$ elementos y no es subgrupo.` },
      ],
      explanation: r`Teorema 6.130: si $P$ es un $p$-subgrupo de Sylow y $Q$ es cualquier $p$-subgrupo, existe $g$ con $Q\le gPg^{-1}$. Si además $Q$ es de Sylow, los órdenes coinciden y $Q = gPg^{-1}$.`,
      intuition: r`Los $p$-subgrupos de Sylow son "el mismo subgrupo visto desde distintos puntos de vista": todos se obtienen de uno por conjugación.`,
      ref: 'Teorema 6.130',
    },
  ],
};

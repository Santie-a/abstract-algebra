const r = String.raw;

export default {
  id: 'isomorfismos',
  title: 'Los teoremas de isomorfismo',
  section: 'Sección 5.5',
  keyIdeas: [
    r`**Factorización** (Teorema 5.99): si $N\nor G$ y $N\le\ker\varphi$, existe un único homomorfismo $\overline\varphi: G/N\to H$ con $\varphi = \overline\varphi\circ\pi$, dado por $\overline\varphi(gN) = \varphi(g)$.`,
    r`**Primer teorema** (Corolario 5.101): $G/\ker\varphi\cong\varphi(G)$.`,
    r`**Segundo teorema** (Corolario 5.102): si $H\le N_G(K)$, entonces $HK\le G$, $K\nor HK$, $H\cap K\nor H$ y $HK/K\cong H/H\cap K$.`,
    r`**Tercer teorema** (Corolario 5.103): si $H\le K$ son normales en $G$, entonces $K/H\nor G/H$ y $(G/H)/(K/H)\cong G/K$.`,
    r`**Cuarto teorema** (Teorema 5.106, Corolario 5.107): los subgrupos de $G/N$ son exactamente los $K/N$ con $N\le K\le G$, y $K\nor G\iff K/N\nor G/N$.`,
  ],
  questions: [
    {
      id: 'is-01',
      type: 'mcq',
      prompt: r`Considere $\det: GL_n(\R)\to\R^*$, un epimorfismo cuyo kernel es $SL_n(\R)$. ¿Qué afirma el Primer Teorema del Isomorfismo?`,
      options: [
        { text: r`$GL_n(\R)/SL_n(\R)\cong\R^*$`, correct: true },
        { text: r`$SL_n(\R)/GL_n(\R)\cong\R^*$`, why: r`Se divide el dominio por el kernel, no al revés; $GL_n(\R)$ no es subgrupo de $SL_n(\R)$.` },
        { text: r`$GL_n(\R)/SL_n(\R)\cong\R$`, why: r`La imagen es el grupo multiplicativo $\R^* = \R\setminus\{0\}$, no $(\R, +)$.` },
        { text: r`$SL_n(\R)\cong\R^*$`, why: r`$SL_n(\R)$ es el kernel. Para $n\ge 2$ ni siquiera es abeliano.` },
      ],
      explanation: r`$\det(AB) = \det(A)\det(B)$, así que $\det$ es un homomorfismo; es sobreyectivo porque $\det\operatorname{diag}(a,1,\dots,1) = a$; y su kernel es $SL_n(\R)$. El Primer Teorema da $GL_n(\R)/SL_n(\R)\cong\R^*$.`,
      intuition: r`Pasar al cociente por $SL_n(\R)$ olvida toda la información de una matriz excepto su determinante.`,
      ref: 'Corolario 5.101',
    },
    {
      id: 'is-02',
      type: 'fill',
      prompt: r`Complete la demostración del Primer Teorema del Isomorfismo: si $\varphi: G\to H$ es un homomorfismo, entonces $G/\ker\varphi\cong\varphi(G)$.`,
      template: r`Sea $K = \ker\varphi$ y defina $\overline\varphi: G/K\to\varphi(G)$ por $\overline\varphi(gK) =$ [[0]].

      **Bien definida:** si $gK = g'K$, entonces $g^{-1}g'\in K$, luego $\varphi(g^{-1}g') =$ [[1]] y así $\varphi(g) = \varphi(g')$.

      **Homomorfismo:** $\overline\varphi\big((gK)(g'K)\big) = \overline\varphi\big($[[2]]$\big) = \varphi(g)\varphi(g')$.

      **Inyectiva:** si $\overline\varphi(gK) = 1$, entonces $g\in K$, es decir, $gK =$ [[3]]; así $\ker\overline\varphi$ es trivial.

      **Sobreyectiva:** todo elemento de $\varphi(G)$ es de la forma $\varphi(g) = \overline\varphi(gK)$.`,
      blanks: [r`$\varphi(g)$`, r`$1$`, r`$gg'K$`, r`$K$`],
      distractors: [r`$\varphi(g)^{-1}$`, r`$\varphi(g')$`, r`$g'gK$`, r`$G$`],
      explanation: r`La clave está en la buena definición: $\overline\varphi$ sólo puede depender de la clase $gK$ si $\varphi$ es constante en cada clase, y eso ocurre precisamente porque $K = \ker\varphi$. Un homomorfismo inyectivo y sobreyectivo es un isomorfismo.`,
      ref: 'Corolario 5.101',
    },
    {
      id: 'is-03',
      type: 'mcq',
      prompt: r`Sean $H, K\le G$ con $H\le N_G(K)$. ¿Qué afirma el Segundo Teorema del Isomorfismo?`,
      options: [
        { text: r`$HK/K\cong H/H\cap K$`, correct: true },
        { text: r`$HK/K\cong H/K$`, why: r`$K$ no tiene por qué estar contenido en $H$, así que $H/K$ en general no tiene sentido.` },
        { text: r`$HK/(H\cap K)\cong H/K$` },
        { text: r`$HK/K\cong K/H\cap K$`, why: r`El cociente $HK/K$ "recuerda" lo que aporta $H$, no $K$.` },
      ],
      explanation: r`El homomorfismo $\varphi: H\to HK/K$, $h\mapsto hK$, es sobreyectivo (pues $hkK = hK$) y su kernel es $\{h\in H\mid h\in K\} = H\cap K$. El Primer Teorema da $H/H\cap K\cong HK/K$.`,
      intuition: r`Diagrama del "diamante": los lados opuestos $HK$ sobre $K$ y $H$ sobre $H\cap K$ tienen el mismo cociente.`,
      ref: 'Corolario 5.102',
    },
    {
      id: 'is-04',
      type: 'fill',
      prompt: r`Aplique el Segundo Teorema del Isomorfismo en $\Z$ (notación aditiva) con $H = 4\Z$ y $K = 6\Z$.`,
      template: r`Como $\Z$ es abeliano, $H + K$ es un subgrupo; por la Proposición 3.20 está generado por su menor elemento positivo, y resulta $4\Z + 6\Z =$ [[0]]. Además, $4\Z\cap 6\Z =$ [[1]].

      El teorema da $(4\Z + 6\Z)/6\Z\cong 4\Z/(4\Z\cap 6\Z)$, y ambos grupos tienen orden [[2]].`,
      blanks: [r`$2\Z$`, r`$12\Z$`, r`$3$`],
      distractors: [r`$10\Z$`, r`$24\Z$`, r`$2$`, r`$6$`],
      explanation: r`$4\Z + 6\Z$ contiene a $6 - 4 = 2$ y todos sus elementos son pares, así que es $2\Z$ (el generador es $(4,6) = 2$). La intersección son los múltiplos comunes: $12\Z$ ($12$ es el mínimo común múltiplo). Entonces $2\Z/6\Z\cong 4\Z/12\Z$, ambos de orden $3$.`,
      ref: 'Corolario 5.102',
    },
    {
      id: 'is-05',
      type: 'mcq',
      prompt: r`¿A qué grupo es isomorfo $(\Z/24\Z)/(6\Z/24\Z)$?`,
      options: [
        { text: r`$\Z/6\Z$`, correct: true },
        { text: r`$\Z/4\Z$`, why: r`$6\Z/24\Z$ tiene orden $4$: es el subgrupo, no el cociente.` },
        { text: r`$\Z/18\Z$`, why: r`Los órdenes se dividen, no se restan: $24/4 = 6$.` },
        { text: r`$\Z/144\Z$` },
      ],
      explanation: r`$24\Z\le 6\Z$ son normales en $\Z$, así que por el Tercer Teorema del Isomorfismo $(\Z/24\Z)/(6\Z/24\Z)\cong\Z/6\Z$. Comprobación de órdenes: $24/4 = 6$.`,
      intuition: r`"Simplificar la fracción": dividir primero por $24\Z$ y luego por $6\Z/24\Z$ es lo mismo que dividir directamente por $6\Z$.`,
      ref: 'Corolario 5.103',
    },
    {
      id: 'is-06',
      type: 'numeric',
      prompt: r`¿Cuántos subgrupos tiene el cociente $D_8/\langle r^2\rangle$?`,
      answer: 5,
      hint: r`Por el Cuarto Teorema del Isomorfismo, cuente los subgrupos de $D_8$ que contienen a $\langle r^2\rangle$.`,
      explanation: r`Los subgrupos de $D_8$ que contienen a $\langle r^2\rangle = \{1, r^2\}$ son: $\langle r^2\rangle$, $\langle r\rangle$, $\langle s, r^2\rangle = \{1, r^2, s, sr^2\}$, $\langle sr, r^2\rangle = \{1, r^2, sr, sr^3\}$ y $D_8$. Son $5$.

      Otra forma: el cociente tiene orden $4$ y todos sus elementos satisfacen $x^2 = 1$ (pues $r^2$, $s^2$ y $(sr)^2$ están en $\langle r^2\rangle$), así que es $V_4$, que tiene $5$ subgrupos.`,
      ref: 'Ejercicio 5.111',
    },
    {
      id: 'is-07',
      type: 'mcq',
      prompt: r`Sea $\varphi: G\to H$ un homomorfismo y $N\nor G$. ¿Cuándo existe $\overline\varphi: G/N\to H$ con $\varphi = \overline\varphi\circ\pi$?`,
      options: [
        { text: r`Cuando $N\le\ker\varphi$`, correct: true },
        { text: r`Cuando $\ker\varphi\le N$`, why: r`Si $\varphi = 1_G$, entonces $\ker\varphi = 1\le N$, pero $\overline\varphi(gN) = g$ no está bien definida si $N\neq 1$.` },
        { text: r`Cuando $\varphi$ es sobreyectivo`, why: r`La sobreyectividad no interviene en la existencia de $\overline\varphi$.` },
        { text: r`Cuando $N = \varphi(G)$`, why: r`$N\subseteq G$ y $\varphi(G)\subseteq H$ viven en grupos distintos.` },
      ],
      explanation: r`La única opción posible es $\overline\varphi(gN) = \varphi(g)$, y está bien definida exactamente cuando $gN = g'N\Rightarrow\varphi(g) = \varphi(g')$, es decir, cuando $\varphi(n) = 1$ para todo $n\in N$: $N\le\ker\varphi$. La unicidad se sigue de que $\pi$ es sobreyectiva.`,
      ref: 'Teorema 5.99',
    },
    {
      id: 'is-08',
      type: 'order',
      prompt: r`Ordene la demostración del Tercer Teorema del Isomorfismo: si $H\le K$ son subgrupos normales de $G$, entonces $(G/H)/(K/H)\cong G/K$.`,
      steps: [
        r`Defina $\varphi: G\to G/K$ por $\varphi(g) = gK$; es un epimorfismo con $\ker\varphi = K$.`,
        r`Como $H\le K = \ker\varphi$, por el Teorema 5.99 $\varphi$ factoriza por un epimorfismo $\overline\varphi: G/H\to G/K$, $\overline\varphi(gH) = gK$.`,
        r`Su kernel es $\ker\overline\varphi = \{gH\mid gK = K\} = \{gH\mid g\in K\} = K/H$.`,
        r`En particular $K/H\nor G/H$, por ser el kernel de un homomorfismo.`,
        r`Por el Primer Teorema del Isomorfismo, $(G/H)/(K/H)\cong G/K$.`,
      ],
      distractors: [r`Como $K/H\le G/H$, se cumple $|G/H : K/H| = |K : H|$.`],
      explanation: r`La estrategia es la de siempre: construir un epimorfismo desde $G/H$ hacia $G/K$ y calcular su kernel. El paso sobrante es falso: por el Corolario 5.108, $|G/H : K/H| = |G:K|$, no $|K:H|$.`,
      ref: 'Corolario 5.103',
    },
  ],
};

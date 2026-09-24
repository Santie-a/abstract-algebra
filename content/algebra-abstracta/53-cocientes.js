const r = String.raw;

export default {
  id: 'cocientes',
  title: 'Subgrupos normales y grupos cocientes',
  section: 'Sección 5.3',
  keyIdeas: [
    r`$N\le G$ es **normal**, $N\nor G$, si $gN = Ng$ para toda $g\in G$. Equivalentemente: $gNg^{-1}\subseteq N$ para toda $g$, o $N_G(N) = G$ (Teorema 5.35).`,
    r`La operación $(uN)(vN) = (uv)N$ está bien definida **si y sólo si** $N\nor G$ (Teorema 5.46). Así se obtiene el grupo cociente $G/N$.`,
    r`En $G/N$: la identidad es $1N = N$, $(gN)^{-1} = g^{-1}N$ y $(gN)^k = g^kN$.`,
    r`$N\nor G$ si y sólo si $N$ es el kernel de algún homomorfismo; por ejemplo, de la proyección canónica $\pi: G\to G/N$, $\pi(g) = gN$ (Proposición 5.56).`,
    r`Todo subgrupo de un grupo abeliano es normal, y todo subgrupo contenido en $Z(G)$ es normal. Todo cociente de un grupo cíclico es cíclico (Ejemplo 5.61).`,
  ],
  questions: [
    {
      id: 'co-01',
      type: 'multi',
      prompt: r`Sea $N\le G$. ¿Cuáles de las siguientes afirmaciones son equivalentes a que $N\nor G$?`,
      options: [
        { text: r`$gN = Ng$ para toda $g\in G$`, correct: true },
        { text: r`$gNg^{-1}\subseteq N$ para toda $g\in G$`, correct: true },
        { text: r`$N_G(N) = G$`, correct: true },
        { text: r`$N$ es el kernel de algún homomorfismo con dominio $G$`, correct: true, why: r`Proposición 5.56.` },
        {
          text: r`$gn = ng$ para todos $g\in G$, $n\in N$`,
          why: r`Eso dice que $N\le Z(G)$, que es más fuerte. Por ejemplo $\langle(1\,2\,3)\rangle\nor S_3$, pero $(1\,2)(1\,2\,3) = (2\,3)$ y $(1\,2\,3)(1\,2) = (1\,3)$.`,
        },
        { text: r`$N$ es abeliano`, why: r`$\langle(1\,2)\rangle$ es abeliano y no es normal en $S_3$.` },
      ],
      explanation: r`Las tres primeras son condiciones del Teorema 5.35 y la cuarta es la Proposición 5.56. Ojo: $gN = Ng$ es una igualdad de **conjuntos**; no pide que $g$ conmute con cada elemento de $N$.`,
      ref: 'Teorema 5.35',
    },
    {
      id: 'co-02',
      type: 'mcq',
      prompt: r`En $D_6$, calcule $rsr^{-1}$.`,
      options: [
        { text: r`$sr$`, correct: true },
        { text: r`$s$`, why: r`Sería cierto si $r$ y $s$ conmutaran.` },
        { text: r`$sr^2$` },
        { text: r`$r^2$`, why: r`Un conjugado de una reflexión es una reflexión (tiene orden $2$), no una rotación de orden $3$.` },
      ],
      explanation: r`Usando $rs = sr^{-1}$ y $r^3 = 1$:
      $$rsr^{-1} = (rs)r^{-1} = sr^{-1}r^{-1} = sr^{-2} = sr.$$
      En consecuencia $r\{1,s\}r^{-1} = \{1, sr\}\not\subseteq\{1, s\}$, así que $\langle s\rangle$ **no** es normal en $D_6$ (Teorema 5.35, d).`,
      ref: 'Teorema 5.35',
    },
    {
      id: 'co-03',
      type: 'fill',
      prompt: r`Complete la demostración de que si $N\nor G$, la operación $(uN)(vN) = (uv)N$ no depende de los representantes (Teorema 5.46).`,
      template: r`Sean $u_1, v_1$ otros representantes: $u_1N = uN$ y $v_1N = vN$. Entonces $u_1^{-1}u = n_1$ y $v_1^{-1}v = n_2$ con $n_1, n_2\in N$. Queremos ver que $(u_1v_1)^{-1}uv\in N$:

      $(u_1v_1)^{-1}uv =$ [[0]] $= v_1^{-1}n_1v$.

      Como $vN = Nv$, existe $n_3\in N$ con $n_1v =$ [[1]]. Luego $v_1^{-1}n_1v = v_1^{-1}vn_3 =$ [[2]] $\in N$, y por tanto $(uv)N =$ [[3]].`,
      blanks: [r`$v_1^{-1}u_1^{-1}uv$`, r`$vn_3$`, r`$n_2n_3$`, r`$(u_1v_1)N$`],
      distractors: [r`$u_1^{-1}v_1^{-1}uv$`, r`$n_3v$`, r`$n_3n_2$`, r`$(v_1u_1)N$`],
      explanation: r`Por la Proposición 1.7, $(u_1v_1)^{-1} = v_1^{-1}u_1^{-1}$. La normalidad ($vN = Nv$) es justo lo que permite "pasar" $n_1$ al otro lado de $v$, cambiándolo por otro elemento $n_3$ de $N$. Como $v_1^{-1}v = n_2$, queda $n_2n_3\in N$.`,
      intuition: r`Si $N$ no fuera normal, al mover $n_1$ a través de $v$ podríamos salirnos de $N$, y el producto de clases dependería de los representantes elegidos.`,
      ref: 'Teorema 5.46',
    },
    {
      id: 'co-04',
      type: 'mcq',
      prompt: r`¿A qué grupo es isomorfo $D_{12}/\langle r^3\rangle$?`,
      options: [
        { text: r`$D_6\cong S_3$`, correct: true },
        { text: r`$Z_6$`, why: r`El cociente no es abeliano: $\overline r\,\overline s = \overline{s}\,\overline{r}^{-1} = \overline s\,\overline r^{2}\neq\overline s\,\overline r$, pues $r\notin\langle r^3\rangle$.` },
        { text: r`$V_4$`, why: r`El cociente tiene orden $12/2 = 6$, no $4$.` },
        { text: r`$D_{12}$` },
      ],
      explanation: r`$\langle r^3\rangle = Z(D_{12})$, así que es normal y $|D_{12}/\langle r^3\rangle| = 12/2 = 6$. Sus elementos son $\overline 1, \overline r, \overline{r}^2, \overline s, \overline{s}\,\overline r, \overline s\,\overline r^2$ y no es abeliano. El único grupo no abeliano de orden $6$ es $D_6\cong S_3$ (Ejercicio 1.41).`,
      ref: 'Ejemplo 5.62',
    },
    {
      id: 'co-05',
      type: 'numeric',
      prompt: r`En el cociente $D_{16}/\langle r^4\rangle$, ¿cuál es el orden de $\overline{r} = r\langle r^4\rangle$?`,
      answer: 4,
      hint: r`$(rN)^k = r^kN$, y $r^kN = N$ si y sólo si $r^k\in N$.`,
      explanation: r`En $D_{16}$ se tiene $|r| = 8$ y $N = \langle r^4\rangle = \{1, r^4\}$. Como $(rN)^k = r^kN$ (Ejercicio 5.60), $(rN)^k = N\iff r^k\in N$. El menor $k>0$ con $r^k\in\{1, r^4\}$ es $k = 4$.`,
      ref: 'Ejercicio 5.63',
    },
    {
      id: 'co-06',
      type: 'multi',
      prompt: r`¿Cuáles de las siguientes afirmaciones son verdaderas para todo grupo $G$?`,
      options: [
        { text: r`Todo subgrupo de índice $2$ es normal.`, correct: true, why: r`Ejercicio 5.82: si $g\notin H$, entonces $gH = G\setminus H = Hg$.` },
        {
          text: r`Si $H\nor K$ y $K\nor G$, entonces $H\nor G$.`,
          why: r`Falso (Ejercicio 5.40). En $D_8$: $\langle s\rangle\nor\langle s, r^2\rangle\nor D_8$ (índice $2$ cada vez), pero $rsr^{-1} = sr^2\notin\langle s\rangle$.`,
        },
        { text: r`Si $G/Z(G)$ es cíclico, entonces $G$ es abeliano.`, correct: true, why: r`Ejercicio 5.66.` },
        {
          text: r`Si $N\nor G$ y tanto $N$ como $G/N$ son abelianos, entonces $G$ es abeliano.`,
          why: r`Falso: en $S_3$ con $N = \langle(1\,2\,3)\rangle$, $N\cong Z_3$ y $S_3/N\cong Z_2$ son abelianos, pero $S_3$ no.`,
        },
        { text: r`Todo subgrupo de un grupo abeliano es normal.`, correct: true, why: r`Ejemplo 5.38: $gNg^{-1} = N$ cuando todo conmuta.` },
      ],
      explanation: r`La normalidad **no** es transitiva, y conocer un subgrupo normal y su cociente no basta para reconstruir el grupo. En cambio, índice $2$ fuerza normalidad, y un cociente cíclico por el centro fuerza abelianidad.`,
      ref: 'Sección 5.3',
    },
    {
      id: 'co-07',
      type: 'order',
      prompt: r`Ordene la demostración de: si $N\nor G$, entonces $N$ es el kernel de algún homomorfismo con dominio $G$.`,
      steps: [
        r`Defina $\pi: G\to G/N$ por $\pi(g) = gN$; tiene sentido porque $N\nor G$ y así $G/N$ es un grupo.`,
        r`Para $g_1, g_2\in G$: $\pi(g_1g_2) = g_1g_2N = (g_1N)(g_2N) = \pi(g_1)\pi(g_2)$, así que $\pi$ es un homomorfismo.`,
        r`La identidad de $G/N$ es $1N = N$, luego $\ker\pi = \{g\in G\mid gN = N\}$.`,
        r`Por el Corolario 5.11, $gN = 1N$ si y sólo si $1^{-1}g = g\in N$.`,
        r`Por lo tanto $\ker\pi = N$.`,
      ],
      distractors: [r`Como $\pi$ es sobreyectiva, $\ker\pi = \{1\}$.`],
      explanation: r`Es la Proposición 5.56. Primero se construye el homomorfismo (la proyección canónica), luego se identifica su kernel. El paso sobrante es falso: ser sobreyectiva no dice nada sobre el kernel; $\ker\pi = \{1\}$ significaría inyectividad.`,
      ref: 'Proposición 5.56',
    },
    {
      id: 'co-08',
      type: 'mcq',
      prompt: r`¿A qué grupo es isomorfo $(\Z/12\Z)/\langle\overline 4\rangle$?`,
      options: [
        { text: r`$Z_4$`, correct: true },
        { text: r`$Z_3$`, why: r`$\langle\overline4\rangle\cong Z_3$ es el subgrupo por el que se divide, no el cociente.` },
        { text: r`$V_4$`, why: r`Todo cociente de un grupo cíclico es cíclico, y $V_4$ no lo es.` },
        { text: r`$Z_8$` },
      ],
      explanation: r`$|\langle\overline 4\rangle| = 12/(12,4) = 3$, así que el cociente tiene orden $12/3 = 4$. Por el Ejemplo 5.61, el cociente de un grupo cíclico es cíclico: está generado por $\overline1 + \langle\overline 4\rangle$, que tiene orden $4$. Luego es isomorfo a $Z_4$.`,
      ref: 'Ejemplo 5.61',
    },
  ],
};

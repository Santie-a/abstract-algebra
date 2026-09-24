const r = String.raw;

export default {
  id: 'clases-laterales',
  title: 'Clases laterales',
  section: 'Sección 5.1',
  keyIdeas: [
    r`Sea $H\le G$. Congruencia por la izquierda: $g_1\equiv_l g_2 \md H$ si $g_1^{-1}g_2\in H$. Por la derecha: $g_1\equiv_r g_2 \md H$ si $g_1g_2^{-1}\in H$ (Definición 5.1). Ambas son relaciones de equivalencia (Teorema 5.5).`,
    r`Sus clases de equivalencia son las **clases laterales** $gH = \{gh \mid h\in H\}$ (izquierda) y $Hg = \{hg\mid h\in H\}$ (derecha).`,
    r`$|gH| = |H| = |Hg|$ (Proposición 5.6) y las clases laterales izquierdas forman una partición de $G$ (Corolario 5.10).`,
    r`$g_1H = g_2H \iff g_1^{-1}g_2\in H$ y $Hg_1 = Hg_2\iff g_1g_2^{-1}\in H$ (Corolario 5.11).`,
    r`Hay tantas clases izquierdas como derechas, gracias a la biyección $gH\mapsto Hg^{-1}$ (Corolario 5.12).`,
  ],
  questions: [
    {
      id: 'cl-01',
      type: 'multi',
      prompt: r`Sea $H\le G$ y sean $g_1, g_2\in G$. ¿Cuáles condiciones son equivalentes a $g_1H = g_2H$?`,
      options: [
        { text: r`$g_1^{-1}g_2\in H$`, correct: true },
        { text: r`$g_2^{-1}g_1\in H$`, correct: true, why: r`Es el inverso de $g_1^{-1}g_2$, y $H$ es cerrado bajo inversos.` },
        { text: r`$g_2\in g_1H$`, correct: true, why: r`$g_2 = g_1h$ para algún $h\in H$ equivale a $g_1^{-1}g_2 = h\in H$.` },
        {
          text: r`$g_1g_2^{-1}\in H$`,
          why: r`Esa es la condición para $Hg_1 = Hg_2$ (clases **derechas**). En $D_6$ con $H = \{1,s\}$: $r^2H = srH$, pero $r^2(sr)^{-1} = rs = sr^2\notin H$.`,
        },
        {
          text: r`$g_1g_2\in H$`,
          why: r`En $\Z$ con $H = 4\Z$ y $g_1 = g_2 = 1$: claramente $1+4\Z = 1+4\Z$, pero $1+1 = 2\notin 4\Z$.`,
        },
      ],
      explanation: r`Por el Corolario 5.11, $g_1H = g_2H\iff g_1^{-1}g_2\in H$. Como $H$ es un subgrupo, esto equivale a $(g_1^{-1}g_2)^{-1} = g_2^{-1}g_1\in H$, y también a $g_2\in g_1H$.`,
      intuition: r`$g_1$ y $g_2$ están en la misma clase izquierda cuando "difieren por un elemento de $H$ a la derecha": $g_2 = g_1h$.`,
      ref: 'Corolario 5.11',
    },
    {
      id: 'cl-02',
      type: 'mcq',
      prompt: r`En $D_6$, sea $H = \{1, s\}$. ¿Cuál es la clase lateral izquierda $rH$?`,
      options: [
        { text: r`$\{r,\ sr^2\}$`, correct: true },
        { text: r`$\{r,\ sr\}$`, why: r`Ese conjunto es $Hr = \{r, sr\}$, la clase lateral **derecha**.` },
        { text: r`$\{r,\ s\}$`, why: r`$s$ no es de la forma $rh$ con $h\in H$.` },
        { text: r`$\{1,\ r\}$` },
      ],
      explanation: r`$rH = \{r\cdot 1,\ r s\}$ y $rs = sr^{-1} = sr^2$ (pues $r^3 = 1$). Así $rH = \{r, sr^2\}$.

      Note que $Hr = \{r, sr\}\neq rH$: las clases izquierda y derecha de $r$ son distintas. Esto anticipa que $H$ **no** es normal en $D_6$ (Sección 5.3).`,
      ref: 'Ejemplo 5.14',
    },
    {
      id: 'cl-03',
      type: 'match',
      prompt: r`En $D_6$ con $H = \{1, s\}$, las clases laterales izquierdas son $H$, $rH = \{r, sr^2\}$ y $r^2H = \{r^2, sr\}$. Empareje cada clase con la clase igual a ella.`,
      rows: [
        { left: r`$sH$`, answer: r`$H$` },
        { left: r`$srH$`, answer: r`$r^2H$` },
        { left: r`$sr^2H$`, answer: r`$rH$` },
      ],
      distractors: [r`$Hr$`],
      explanation: r`Basta ver en qué clase está el representante, pues $gH = g'H\iff g\in g'H$:
      - $s\in H$, luego $sH = H$.
      - $sr\in r^2H = \{r^2, sr\}$, luego $srH = r^2H$.
      - $sr^2\in rH = \{r, sr^2\}$, luego $sr^2H = rH$.

      $Hr = \{r, sr\}$ es una clase derecha y no coincide con ninguna clase izquierda.`,
      ref: 'Ejemplo 5.14',
    },
    {
      id: 'cl-04',
      type: 'fill',
      prompt: r`Complete la demostración de que dos clases laterales izquierdas son iguales o disjuntas (Corolario 5.10).`,
      template: r`Supongamos que $g_1H\cap g_2H\neq\emptyset$. Entonces existen $h_1,h_2\in H$ tales que $g_1h_1 =$ [[0]].

      Despejando, $g_2 = g_1h_3$ donde $h_3 =$ [[1]] $\in H$.

      Así, para $h\in H$ arbitrario, $g_2h =$ [[2]] $\in g_1H$, es decir, $g_2H\subseteq$ [[3]]. Por simetría $g_1H\subseteq g_2H$, luego $g_1H = g_2H$.`,
      blanks: [r`$g_2h_2$`, r`$h_1h_2^{-1}$`, r`$g_1h_3h$`, r`$g_1H$`],
      distractors: [r`$h_2^{-1}h_1$`, r`$hg_1h_3$`, r`$Hg_1$`, r`$h_2g_2$`],
      explanation: r`De $g_1h_1 = g_2h_2$, multiplicando a la derecha por $h_2^{-1}$ se obtiene $g_2 = g_1h_1h_2^{-1}$. El orden importa: $h_2^{-1}h_1$ sería incorrecto en un grupo no abeliano. Finalmente $h_3h\in H$ por ser $H$ cerrado bajo productos, así que $g_2h = g_1(h_3h)\in g_1H$.`,
      ref: 'Corolario 5.10',
    },
    {
      id: 'cl-05',
      type: 'mcq',
      prompt: r`¿Cuál función permite demostrar que el número de clases laterales izquierdas de $H$ en $G$ es igual al número de clases laterales derechas?`,
      options: [
        { text: r`$gH\mapsto Hg^{-1}$`, correct: true },
        {
          text: r`$gH\mapsto Hg$`,
          why: r`No está bien definida en general. En $D_6$ con $H = \{1,s\}$: $rH = sr^2H$, pero $Hr = \{r, sr\}\neq\{sr^2, r^2\} = Hsr^2$.`,
        },
        { text: r`$gH\mapsto gHg^{-1}$`, why: r`$gHg^{-1}$ es un subgrupo conjugado de $H$, no una clase lateral derecha.` },
        { text: r`$gH\mapsto H$`, why: r`Es constante, no es inyectiva.` },
      ],
      explanation: r`Está bien definida y es inyectiva porque
      $$g_1H = g_2H\iff g_1^{-1}g_2\in H\iff g_1^{-1}\big(g_2^{-1}\big)^{-1}\in H\iff Hg_1^{-1} = Hg_2^{-1},$$
      usando el Corolario 5.11 para clases izquierdas y derechas. Es sobreyectiva: $Hg$ es la imagen de $g^{-1}H$.`,
      intuition: r`Tomar inversos convierte "multiplicar por la derecha" en "multiplicar por la izquierda": $(gH)^{-1} = \{h^{-1}g^{-1}\} = Hg^{-1}$.`,
      ref: 'Corolario 5.12',
    },
    {
      id: 'cl-06',
      type: 'numeric',
      prompt: r`Sea $H = \langle i\rangle = \{\pm1, \pm i\}\le Q_8$. ¿Cuántas clases laterales izquierdas distintas tiene $H$ en $Q_8$?`,
      answer: 2,
      explanation: r`$1H = -1H = iH = -iH = H$ y $jH = \{j, -j, ji, -ji\} = \{\pm j, \pm k\}$. Como las clases forman una partición y cada una tiene $|H| = 4$ elementos, hay $8/4 = 2$ clases: $H$ y $jH$.`,
      ref: 'Ejemplo 5.15',
    },
    {
      id: 'cl-07',
      type: 'mcq',
      prompt: r`En $D_8$, sea $H = \{1, r^2\}$. Al comparar las clases laterales $gH$ y $Hg$ para $g\in D_8$, ¿qué se observa?`,
      options: [
        { text: r`$gH = Hg$ para toda $g\in D_8$`, correct: true },
        { text: r`Sólo coinciden cuando $g$ es una rotación` },
        { text: r`Sólo coinciden cuando $g\in H$` },
        { text: r`Hay más clases izquierdas que derechas`, why: r`Siempre hay la misma cantidad (Corolario 5.12).` },
      ],
      explanation: r`$r^2\in Z(D_8)$, así que $gr^2 = r^2g$ para toda $g$. Luego $gH = \{g, gr^2\} = \{g, r^2g\} = Hg$.

      En general, todo subgrupo contenido en el centro tiene clases izquierdas y derechas iguales; esto es exactamente ser **normal** (Ejercicio 5.39).`,
      ref: 'Ejercicio 5.19',
    },
  ],
};

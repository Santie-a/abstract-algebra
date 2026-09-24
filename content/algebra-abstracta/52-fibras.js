const r = String.raw;

export default {
  id: 'fibras',
  title: 'Fibras de homomorfismos',
  section: 'Sección 5.2',
  keyIdeas: [
    r`La **fibra** de un homomorfismo $\varphi: G\to H$ sobre $h\in H$ es $\varphi^{-1}(h) = \{g\in G\mid\varphi(g) = h\}$.`,
    r`Si $K = \ker\varphi$ y $u\in\varphi^{-1}(h)$, entonces $\varphi^{-1}(h) = uK = Ku$ (Proposición 5.26): cada fibra es una clase lateral del kernel, izquierda **y** derecha.`,
    r`Las fibras forman un grupo con $(uK)(vK) = (uv)K$, y esta operación no depende de los representantes (Teorema 5.27).`,
    r`Intuición: $\varphi$ "colapsa" el kernel a un punto (la identidad) y cada fibra es una copia trasladada del kernel.`,
  ],
  questions: [
    {
      id: 'fi-01',
      type: 'mcq',
      prompt: r`Sea $\varphi: G\to H$ un homomorfismo con $K = \ker\varphi$, y sea $u\in\varphi^{-1}(h)$. ¿Cuál es la fibra $\varphi^{-1}(h)$?`,
      options: [
        { text: r`$uK$`, correct: true },
        { text: r`$K$`, why: r`$K$ es la fibra sobre $1$. Sólo coincide si $h = 1$.` },
        { text: r`$\{u\}$`, why: r`Sólo cuando $K = 1$, es decir, cuando $\varphi$ es inyectivo.` },
        { text: r`$u^{-1}K$`, why: r`$u^{-1}K$ es la fibra sobre $h^{-1}$, pues $\varphi(u^{-1}) = h^{-1}$.` },
      ],
      explanation: r`Es la Proposición 5.26: si $\varphi(u) = h$, entonces $\varphi(x) = h\iff\varphi(u^{-1}x) = 1\iff u^{-1}x\in K\iff x\in uK$. Análogamente la fibra es $Ku$.`,
      ref: 'Proposición 5.26',
    },
    {
      id: 'fi-02',
      type: 'fill',
      prompt: r`Complete la demostración de que la fibra $X = \varphi^{-1}(h)$ es la clase lateral $uK$, donde $u\in X$ y $K = \ker\varphi$.`,
      template: r`Sea $x\in X$. Entonces $\varphi(x) = h = \varphi(u)$, luego $\varphi(u^{-1}x) =$ [[0]]. Por tanto $u^{-1}x\in$ [[1]], es decir, $x\in$ [[2]].

      Recíprocamente, si $y = uk$ con $k\in K$, entonces $\varphi(y) = \varphi(u)\varphi(k) =$ [[3]] $= h$, así que $y\in X$.`,
      blanks: [r`$1$`, r`$K$`, r`$uK$`, r`$\varphi(u)$`],
      distractors: [r`$h$`, r`$Ku^{-1}$`, r`$\varphi(k)$`, r`$H$`],
      explanation: r`$\varphi(u^{-1}x) = \varphi(u)^{-1}\varphi(x) = h^{-1}h = 1$, así que $u^{-1}x\in K$ y $x = u(u^{-1}x)\in uK$. Para la otra contención se usa que $\varphi(k) = 1$ si $k\in K$.`,
      ref: 'Proposición 5.26',
    },
    {
      id: 'fi-03',
      type: 'mcq',
      prompt: r`Sea $\varphi:\R\to S^1$, $\varphi(x) = e^{2\pi i x}$ (con $\R$ bajo la suma). ¿Cuál es la fibra sobre $-1$?`,
      options: [
        { text: r`$\tfrac12 + \Z$`, correct: true },
        { text: r`$\Z$`, why: r`$\Z = \ker\varphi$ es la fibra sobre $1$.` },
        { text: r`$\tfrac14 + \Z$`, why: r`$e^{2\pi i/4} = i$: es la fibra sobre $i$.` },
        { text: r`$\pi + \Z$` },
      ],
      explanation: r`$e^{2\pi i x} = -1 = e^{\pi i}$ si y sólo si $2\pi x\in\pi + 2\pi\Z$, es decir, $x\in\tfrac12 + \Z$. Como $\ker\varphi = \Z$, la fibra es la clase lateral $\tfrac12 + \Z$ del kernel.`,
      intuition: r`$\varphi$ enrolla la recta real sobre la circunferencia dando una vuelta por cada unidad. Cada punto de la circunferencia recibe una copia trasladada de $\Z$.`,
      ref: 'Ejercicio 5.34',
    },
    {
      id: 'fi-04',
      type: 'multi',
      prompt: r`Sea $K = \{\pm1\}\le Q_8$. En el grupo de fibras $Q_8/K$ (Ejemplo 5.31), ¿cuáles de las siguientes clases son iguales a $(iK)(jK)$?`,
      options: [
        { text: r`$kK$`, correct: true },
        { text: r`$(-k)K$`, correct: true, why: r`$(-k)K = \{-k, k\} = kK$: $k$ y $-k$ representan la misma clase.` },
        { text: r`$(ji)K$`, correct: true, why: r`$ji = -k$, que está en la clase $kK$.` },
        { text: r`$K$`, why: r`$K = (iK)^2$, pues $i^2 = -1\in K$.` },
        { text: r`$iK$` },
      ],
      explanation: r`$(iK)(jK) = (ij)K = kK = \{k, -k\}$. Cada clase tiene dos representantes, y cualquiera de ellos sirve. El grupo de fibras $\{K, iK, jK, kK\}$ tiene todos sus elementos no triviales de orden $2$, así que es isomorfo a $V_4$.`,
      ref: 'Ejemplo 5.31',
    },
    {
      id: 'fi-05',
      type: 'mcq',
      prompt: r`Sea $\varphi:\R^*\to\{\pm1\}$, $\varphi(x) = x/|x|$. ¿Cuál es su kernel y cuáles son sus fibras?`,
      options: [
        { text: r`$\ker\varphi = \R_{>0}$; hay dos fibras: los reales positivos y los negativos`, correct: true },
        { text: r`$\ker\varphi = \{1\}$; hay infinitas fibras`, why: r`$\varphi(2) = 1$, así que $2\in\ker\varphi$.` },
        { text: r`$\ker\varphi = \{\pm1\}$; hay dos fibras`, why: r`$\varphi(-1) = -1\neq 1$.` },
        { text: r`$\ker\varphi = \R_{<0}$; hay dos fibras`, why: r`El kernel siempre contiene a la identidad $1$.` },
      ],
      explanation: r`$\varphi(x) = 1\iff x>0$, así que $K = \ker\varphi = \R_{>0}$. La otra fibra es $\varphi^{-1}(-1) = (-1)K = \R_{<0}$. El grupo de fibras tiene dos elementos, luego es isomorfo a $\Z/2\Z$.`,
      ref: 'Ejemplo 5.32',
    },
    {
      id: 'fi-06',
      type: 'mcq',
      prompt: r`Sea $\pi:\R^2\to\R$, $\pi(x,y) = x + y$. Geométricamente, ¿qué son las fibras de $\pi$?`,
      options: [
        { text: r`Las rectas $x + y = c$, paralelas al kernel $y = -x$`, correct: true },
        { text: r`Las rectas que pasan por el origen`, why: r`Sólo una fibra (el kernel) pasa por el origen; las fibras son disjuntas.` },
        { text: r`Las circunferencias centradas en el origen` },
        { text: r`Las rectas verticales $x = c$`, why: r`$(c, 0)$ y $(c, 1)$ tienen imágenes distintas.` },
      ],
      explanation: r`$\ker\pi = \{(x, -x)\mid x\in\R\}$ es la recta $y = -x$. La fibra sobre $c$ es la clase lateral $(c, 0) + \ker\pi$, es decir, la recta $x + y = c$. Estas rectas paralelas forman una partición del plano, y el grupo de fibras es isomorfo a $\R$.`,
      intuition: r`Proyectar el plano sobre una recta "aplasta" cada recta paralela al kernel en un solo punto.`,
      ref: 'Ejercicio 5.33',
    },
  ],
};

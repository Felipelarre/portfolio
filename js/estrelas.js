// Estrelas caindo no topo inteiro, no sentido contrário ao voo do foguete (baixo-esquerda).
// Canvas 2D leve: pausa fora da tela e fica parado com "reduzir movimento".
(function () {
  const canvas = document.getElementById("estrelasHero");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const reduzMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  // Mesmo ângulo do foguete 3D (rotation.z = -0.72): ele sobe pra cima-direita, as estrelas descem pra baixo-esquerda
  const dirX = -Math.sin(0.72), dirY = Math.cos(0.72);
  let largura = 0, altura = 0, dpr = 1, estrelas = [], visivel = true, cor = "191,212,255", forca = 1;

  function nova(espalhar) {
    const z = Math.random();                     // 0 = longe (pequena e lenta), 1 = perto
    const e = { z, vel: 0.3 + z * 1.2, tam: 0.6 + z * 1.2, rastro: 1 + z * z * 9, alfa: 0.15 + z * 0.45 };
    if (espalhar) { e.x = Math.random() * largura; e.y = Math.random() * altura; }
    else if (Math.random() < 0.6) { e.x = Math.random() * largura * 1.2; e.y = -20; }  // entra por cima
    else { e.x = largura + 20; e.y = Math.random() * altura; }                       // entra pela direita
    return e;
  }

  function ajusta() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    largura = canvas.clientWidth; altura = canvas.clientHeight;
    canvas.width = largura * dpr; canvas.height = altura * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const qtd = Math.round(Math.min(110, largura * altura / 14000));
    estrelas = Array.from({ length: qtd }, () => nova(true));
  }

  function aplicaTema() {
    const claro = document.documentElement.getAttribute("data-theme") === "light";
    cor = claro ? "37,99,235" : "191,212,255";
    forca = claro ? 0.55 : 1;
  }

  function desenha() {
    ctx.clearRect(0, 0, largura, altura);
    ctx.lineCap = "round";
    for (const e of estrelas) {
      ctx.strokeStyle = `rgba(${cor},${e.alfa * forca})`;
      ctx.lineWidth = e.tam;
      ctx.beginPath();
      ctx.moveTo(e.x, e.y);
      ctx.lineTo(e.x - dirX * e.rastro, e.y - dirY * e.rastro);
      ctx.stroke();
    }
  }

  function quadro() {
    for (let i = 0; i < estrelas.length; i++) {
      const e = estrelas[i];
      e.x += dirX * e.vel; e.y += dirY * e.vel;
      if (e.y > altura + 20 || e.x < -20) estrelas[i] = nova(false);
    }
    desenha();
    if (visivel) requestAnimationFrame(quadro);
  }

  aplicaTema(); ajusta();
  new ResizeObserver(() => { ajusta(); if (reduzMovimento) desenha(); }).observe(canvas);
  new MutationObserver(() => { aplicaTema(); if (reduzMovimento) desenha(); })
    .observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  if (reduzMovimento) { desenha(); return; }
  new IntersectionObserver(([en]) => {
    const antes = visivel; visivel = en.isIntersecting;
    if (visivel && !antes) requestAnimationFrame(quadro);
  }).observe(canvas);
  requestAnimationFrame(quadro);
})();

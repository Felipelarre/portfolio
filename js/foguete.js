// ========== FOGUETE 3D DO HERO (Three.js r128) ==========
// Foguete azul subindo na diagonal, com chama, fumaça de partículas e estrelas passando.
// Sem WebGL (ou com "reduzir movimento") fica o foguete em SVG que já está no HTML.
(function () {
  const caixa = document.getElementById("heroFoguete");
  if (!caixa || typeof THREE === "undefined") return;

  const reduzMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  } catch (e) {
    return; // sem WebGL: continua o SVG
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.domElement.className = "foguete-canvas";
  caixa.appendChild(renderer.domElement);
  caixa.classList.add("tem-3d");

  const cena = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
  camera.position.set(0, 0, 11);

  // Luzes: branca de frente, azul por trás pra contornar o foguete
  cena.add(new THREE.AmbientLight(0x8fa8ff, 0.55));
  const luzFrente = new THREE.DirectionalLight(0xffffff, 1.1);
  luzFrente.position.set(4, 5, 6);
  cena.add(luzFrente);
  const luzAzul = new THREE.PointLight(0x2563eb, 2.2, 20);
  luzAzul.position.set(-3, -2, -3);
  cena.add(luzAzul);

  const branco = new THREE.MeshStandardMaterial({ color: 0xe8eaf0, metalness: 0.25, roughness: 0.35 });
  const azul = new THREE.MeshStandardMaterial({ color: 0x2563eb, metalness: 0.35, roughness: 0.3 });
  const azulClaro = new THREE.MeshStandardMaterial({ color: 0x60a5fa, emissive: 0x2563eb, emissiveIntensity: 0.6, metalness: 0.2, roughness: 0.15 });
  const escuro = new THREE.MeshStandardMaterial({ color: 0x1b1f2a, metalness: 0.6, roughness: 0.4 });

  // ---- Foguete (eixo Y = frente) ----
  const foguete = new THREE.Group();

  // Corpo: perfil girado (ogiva)
  const perfil = new THREE.SplineCurve([
    new THREE.Vector2(0.42, -1.4), new THREE.Vector2(0.56, -1.15), new THREE.Vector2(0.62, -0.7),
    new THREE.Vector2(0.63, -0.1), new THREE.Vector2(0.58, 0.5), new THREE.Vector2(0.47, 0.9), new THREE.Vector2(0.34, 1.11)
  ]).getPoints(30);
  const corpo = new THREE.Mesh(new THREE.LatheGeometry(perfil, 48), branco);
  foguete.add(corpo);

  // Ponta azul
  const ponta = new THREE.Mesh(new THREE.ConeGeometry(0.34, 0.75, 48), azul);
  ponta.position.y = 1.47;
  foguete.add(ponta);

  // Faixa azul no meio
  const faixa = new THREE.Mesh(new THREE.CylinderGeometry(0.625, 0.63, 0.12, 48), azul);
  faixa.position.y = -0.55;
  foguete.add(faixa);

  // Janela
  const aro = new THREE.Mesh(new THREE.TorusGeometry(0.22, 0.05, 16, 40), escuro);
  aro.position.set(0, 0.35, 0.57);
  aro.rotation.x = -0.12;
  foguete.add(aro);
  const vidro = new THREE.Mesh(new THREE.CircleGeometry(0.2, 32), azulClaro);
  vidro.position.set(0, 0.35, 0.585);
  vidro.rotation.x = -0.12;
  foguete.add(vidro);

  // Aletas (3)
  const formaAleta = new THREE.Shape();
  formaAleta.moveTo(0, 0);
  formaAleta.lineTo(0.62, -0.55);
  formaAleta.lineTo(0.62, -0.95);
  formaAleta.lineTo(0, -0.62);
  formaAleta.lineTo(0, 0);
  const geoAleta = new THREE.ExtrudeGeometry(formaAleta, { depth: 0.07, bevelEnabled: true, bevelSize: 0.02, bevelThickness: 0.02, bevelSegments: 2 });
  geoAleta.translate(0, 0, -0.035);
  for (let k = 0; k < 3; k++) {
    const aleta = new THREE.Mesh(geoAleta, azul);
    const giro = new THREE.Group();
    aleta.position.set(0.5, -0.6, 0);
    giro.add(aleta);
    giro.rotation.y = (k / 3) * Math.PI * 2 + Math.PI / 2;
    foguete.add(giro);
  }

  // Bocal
  const bocal = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.4, 0.28, 32, 1, true), escuro);
  bocal.position.y = -1.5;
  foguete.add(bocal);

  // Chama: dois cones aditivos
  const chamaExterna = new THREE.Mesh(
    new THREE.ConeGeometry(0.34, 1.4, 32, 1, true),
    new THREE.MeshBasicMaterial({ color: 0x2563eb, transparent: true, opacity: 0.55, blending: THREE.AdditiveBlending, depthWrite: false })
  );
  chamaExterna.rotation.x = Math.PI;
  chamaExterna.position.y = -2.3;
  foguete.add(chamaExterna);
  const chamaInterna = new THREE.Mesh(
    new THREE.ConeGeometry(0.18, 0.9, 32, 1, true),
    new THREE.MeshBasicMaterial({ color: 0xbfdbfe, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending, depthWrite: false })
  );
  chamaInterna.rotation.x = Math.PI;
  chamaInterna.position.y = -2.05;
  foguete.add(chamaInterna);

  // Foguete inclinado na diagonal, igual ao logo (subindo pra direita)
  const voo = new THREE.Group();
  voo.add(foguete);
  voo.rotation.z = -0.72;
  voo.rotation.x = 0.25;
  cena.add(voo);

  // Partículas da fumaça: saem do bocal e vão ficando pra trás
  const textura = (function () {
    const c = document.createElement("canvas");
    c.width = c.height = 64;
    const g = c.getContext("2d");
    const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, "rgba(255,255,255,1)");
    grad.addColorStop(0.4, "rgba(147,197,253,0.6)");
    grad.addColorStop(1, "rgba(37,99,235,0)");
    g.fillStyle = grad;
    g.fillRect(0, 0, 64, 64);
    return new THREE.CanvasTexture(c);
  })();

  const N_FUMACA = 70;
  const fumacaPos = new Float32Array(N_FUMACA * 3);
  const fumacaVida = new Float32Array(N_FUMACA);
  const geoFumaca = new THREE.BufferGeometry();
  geoFumaca.setAttribute("position", new THREE.BufferAttribute(fumacaPos, 3));
  const fumaca = new THREE.Points(geoFumaca, new THREE.PointsMaterial({
    size: 0.45, map: textura, transparent: true, opacity: 0.7, blending: THREE.AdditiveBlending, depthWrite: false, color: 0x93c5fd
  }));
  foguete.add(fumaca);
  for (let i = 0; i < N_FUMACA; i++) fumacaVida[i] = Math.random();

  // Estrelas passando (descem em sentido contrário ao voo)
  const N_ESTRELAS = 140;
  const estPos = new Float32Array(N_ESTRELAS * 3);
  for (let i = 0; i < N_ESTRELAS; i++) {
    estPos[i * 3] = (Math.random() - 0.5) * 14;
    estPos[i * 3 + 1] = (Math.random() - 0.5) * 14;
    estPos[i * 3 + 2] = -2 - Math.random() * 6;
  }
  const geoEst = new THREE.BufferGeometry();
  geoEst.setAttribute("position", new THREE.BufferAttribute(estPos, 3));
  const estrelas = new THREE.Points(geoEst, new THREE.PointsMaterial({
    size: 0.07, color: 0xbfd4ff, transparent: true, opacity: 0.8, depthWrite: false
  }));
  cena.add(estrelas);
  const direcao = new THREE.Vector3(Math.sin(0.72), -Math.cos(0.72), 0); // contrário ao voo

  // Mouse mexe um pouco o foguete
  let alvoX = 0, alvoY = 0;
  caixa.addEventListener("pointermove", e => {
    const r = caixa.getBoundingClientRect();
    alvoX = ((e.clientX - r.left) / r.width - 0.5) * 0.5;
    alvoY = ((e.clientY - r.top) / r.height - 0.5) * 0.5;
  });
  caixa.addEventListener("pointerleave", () => { alvoX = alvoY = 0; });

  function ajustaTamanho() {
    const w = caixa.clientWidth, h = caixa.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  window.addEventListener("resize", ajustaTamanho);
  ajustaTamanho();

  const relogio = new THREE.Clock();
  let visivel = true;
  new IntersectionObserver(([e]) => { visivel = e.isIntersecting; }).observe(caixa);

  function quadro() {
    const dt = Math.min(relogio.getDelta(), 0.05);
    const t = relogio.elapsedTime;

    foguete.rotation.y += dt * 0.6;
    voo.position.y = Math.sin(t * 1.4) * 0.18;
    voo.position.x = Math.cos(t * 1.1) * 0.08;
    voo.rotation.x += ((0.25 + alvoY) - voo.rotation.x) * 0.05;
    voo.rotation.z += ((-0.72 - alvoX) - voo.rotation.z) * 0.05;

    const pisca = 1 + Math.sin(t * 30) * 0.08 + Math.random() * 0.08;
    chamaExterna.scale.set(1, pisca, 1);
    chamaInterna.scale.set(1, 1 + Math.random() * 0.15, 1);

    for (let i = 0; i < N_FUMACA; i++) {
      fumacaVida[i] += dt * 0.9;
      if (fumacaVida[i] > 1) fumacaVida[i] -= 1;
      const v = fumacaVida[i];
      const ang = i * 2.399;
      fumacaPos[i * 3] = Math.cos(ang) * v * 0.55;
      fumacaPos[i * 3 + 1] = -1.7 - v * 3.2;
      fumacaPos[i * 3 + 2] = Math.sin(ang) * v * 0.55;
    }
    geoFumaca.attributes.position.needsUpdate = true;

    for (let i = 0; i < N_ESTRELAS; i++) {
      estPos[i * 3] += direcao.x * dt * 3;
      estPos[i * 3 + 1] += direcao.y * dt * 3;
      if (estPos[i * 3 + 1] < -7 || estPos[i * 3] > 7) {
        estPos[i * 3] = (Math.random() - 0.5) * 14 - 4;
        estPos[i * 3 + 1] = 7 + Math.random() * 2;
      }
    }
    geoEst.attributes.position.needsUpdate = true;

    renderer.render(cena, camera);
  }

  if (reduzMovimento) {
    quadro();
    return;
  }
  (function loop() {
    requestAnimationFrame(loop);
    if (visivel && !document.hidden) quadro();
    else relogio.getDelta();
  })();
})();

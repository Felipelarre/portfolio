// ========== DADOS ==========
// Os projetos ficam direto no index.html (o Google lê sem precisar rodar JS)
const SOCIAL_LINKS = [
  { icone: "fab fa-tiktok", url: "https://www.tiktok.com/@larre.dev", label: "TikTok" },
  { icone: "fab fa-instagram", url: "https://www.instagram.com/larre.dev/", label: "Instagram" },
  { icone: "fab fa-linkedin-in", url: "https://www.linkedin.com/in/felipe-larre/", label: "LinkedIn" },
  { icone: "fab fa-github", url: "https://github.com/Felipelarre", label: "GitHub" }
];

// ========== RENDER SOCIAL ==========
function renderizarRedesSociais() {
  const container = document.getElementById("socialLinks");
  if (!container) return;
  container.innerHTML = SOCIAL_LINKS.map(link => `
    <a href="${link.url}" class="social-link" target="_blank" rel="noopener noreferrer" aria-label="${link.label}">
      <i class="${link.icone}"></i>
    </a>
  `).join("");
}

// ========== TYPING EFFECT ==========
const frases = ["Sites, sistemas e automações", "Soluções que evoluem com você", "Parceiro digital de quem empreende"];
let fraseIndex = 0, charIndex = 0, isDeleting = false;

function typeEffect() {
  const el = document.getElementById("typing");
  if (!el) return;
  const frase = frases[fraseIndex];
  if (isDeleting) {
    el.textContent = frase.substring(0, charIndex - 1);
    charIndex--;
  } else {
    el.textContent = frase.substring(0, charIndex + 1);
    charIndex++;
  }
  let speed = isDeleting ? 50 : 100;
  if (!isDeleting && charIndex === frase.length) { speed = 1800; isDeleting = true; }
  else if (isDeleting && charIndex === 0) { isDeleting = false; fraseIndex = (fraseIndex + 1) % frases.length; speed = 300; }
  setTimeout(typeEffect, speed);
}

// ========== THEME ==========
// localStorage pode lançar erro (cookies bloqueados); sem o try, o erro parava o resto do init
function initTheme() {
  let saved = "dark";
  try { saved = localStorage.getItem("theme") || "dark"; } catch (e) {}
  applyTheme(saved);

  document.getElementById("themeToggle")?.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    applyTheme(current === "dark" ? "light" : "dark");
  });
}

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  try { localStorage.setItem("theme", theme); } catch (e) {}
  const icon = document.querySelector("#themeToggle i");
  if (icon) {
    icon.className = theme === "dark" ? "fas fa-sun" : "fas fa-moon";
  }
}

// ========== MOBILE MENU ==========
function initMobileMenu() {
  const toggle = document.getElementById("menuToggle");
  const nav = document.getElementById("navLinks");
  toggle?.addEventListener("click", () => {
    nav.classList.toggle("show");
    toggle.classList.toggle("open");
  });
  document.querySelectorAll(".nav-links a").forEach(a => {
    a.addEventListener("click", () => {
      nav.classList.remove("show");
      toggle?.classList.remove("open");
    });
  });
}

// ========== HEADER SCROLL ==========
function initHeaderScroll() {
  const header = document.getElementById("header");
  window.addEventListener("scroll", () => {
    header?.classList.toggle("scrolled", window.scrollY > 50);
  });
}

// ========== ACTIVE NAV ==========
function initActiveNav() {
  const sections = document.querySelectorAll("section[id]");
  const links = document.querySelectorAll(".nav-links a");
  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 120) current = s.id;
    });
    links.forEach(a => {
      a.classList.toggle("active", a.getAttribute("href") === `#${current}`);
    });
  });
}

// ========== SMOOTH SCROLL ==========
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", e => {
      const target = document.querySelector(a.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}

// ========== CUSTOM CURSOR ==========
function initCursor() {
  const cursor = document.getElementById("cursor");
  const follower = document.getElementById("cursorFollower");
  if (!cursor || !follower) return;

  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener("mousemove", e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + "px";
    cursor.style.top = mouseY + "px";
  });

  function animateFollower() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    follower.style.left = followerX + "px";
    follower.style.top = followerY + "px";
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  document.querySelectorAll("a, button, .project-card, .skill-card").forEach(el => {
    el.addEventListener("mouseenter", () => {
      cursor.style.transform = "translate(-50%,-50%) scale(2)";
      follower.style.transform = "translate(-50%,-50%) scale(1.5)";
      follower.style.opacity = "0.2";
    });
    el.addEventListener("mouseleave", () => {
      cursor.style.transform = "translate(-50%,-50%) scale(1)";
      follower.style.transform = "translate(-50%,-50%) scale(1)";
      follower.style.opacity = "0.5";
    });
  });
}

// ========== SCROLL REVEAL ==========
function initScrollReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
}

// ========== CONTACT FORM ==========
function initContactForm() {
  document.getElementById("contactForm")?.addEventListener("submit", e => {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();
    const msg = `Novo Contato do Portfólio!\n\nNome: ${name}\nE-mail: ${email}\nAssunto: ${subject}\nMensagem: ${message}`;
    window.medir?.("formulario_enviado");
    window.open(`https://wa.me/5581992939515?text=${encodeURIComponent(msg)}`, "_blank");
    const btn = document.querySelector("#contactForm button[type='submit'] span");
    const form = document.getElementById("contactForm");
    // Só abre o WhatsApp: a mensagem sai quando a pessoa apertar enviar lá
    if (btn) btn.textContent = "Abrindo o WhatsApp...";
    setTimeout(() => {
      form.reset();
      if (btn) btn.textContent = "Enviar pelo WhatsApp";
    }, 3000);
  });
}

// ========== PARTICLES ==========
function initParticles() {
  if (typeof particlesJS !== "function" || !document.getElementById("particles-js")) return;
  particlesJS("particles-js", {
    particles: {
      number: { value: 28, density: { enable: true, value_area: 900 } },
      color: { value: "#2563eb" },
      shape: { type: "circle" },
      opacity: { value: 0.3, random: true },
      size: { value: 2, random: true },
      line_linked: { enable: true, distance: 140, color: "#2563eb", opacity: 0.15, width: 1 },
      move: { enable: true, speed: 1.2, direction: "none", random: true, out_mode: "out" }
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: { enable: true, mode: "grab" },
        onclick: { enable: false },
        resize: true
      },
      modes: { grab: { distance: 160, line_linked: { opacity: 0.4 } } }
    },
    retina_detect: true
  });
}

// ========== YEAR ==========
function setYear() {
  const el = document.getElementById("currentYear");
  if (el) el.textContent = new Date().getFullYear();
}

// ========== SITES NO AR ==========
// O número do topo é contado pelos cartões da seção Projetos: cartão novo, número novo.
// Cartão em desenvolvimento (sem link) não entra na conta.
function contarSitesNoAr() {
  const el = document.getElementById("sitesNoAr");
  const total = [...document.querySelectorAll("#projectsGrid .project-card")]
    .filter(card => !card.querySelector(".project-link.is-disabled")).length;
  if (el && total) el.textContent = total;
}

// ========== FILTRO DE PROJETOS ==========
// Cada cartão tem data-categoria; os que levam data-destaque são os que aparecem em "Todos" antes do "Ver todos".
function initFiltroProjetos() {
  const cards = [...document.querySelectorAll("#projectsGrid .project-card")];
  const filtros = [...document.querySelectorAll("#projectFilters .project-filter")];
  const mais = document.getElementById("projectsMore");
  const maisBtn = document.getElementById("projectsMoreBtn");
  if (!cards.length || !filtros.length || !mais || !maisBtn) return;

  let filtro = "todos";
  let aberto = false;

  function aplicar() {
    cards.forEach(card => {
      const mostra = filtro === "todos"
        ? aberto || card.hasAttribute("data-destaque")
        : card.dataset.categoria === filtro;
      card.hidden = !mostra;
    });
    filtros.forEach(btn => {
      const ativo = btn.dataset.filtro === filtro;
      btn.classList.toggle("active", ativo);
      btn.setAttribute("aria-pressed", ativo);
    });
    const temEscondido = cards.some(card => !card.hasAttribute("data-destaque"));
    mais.hidden = filtro !== "todos" || !temEscondido;
    maisBtn.textContent = aberto ? "Ver menos" : `Ver todos os ${cards.length} projetos`;
    maisBtn.setAttribute("aria-expanded", aberto);
  }

  filtros.forEach(btn => btn.addEventListener("click", () => {
    filtro = btn.dataset.filtro;
    aplicar();
  }));
  maisBtn.addEventListener("click", () => {
    aberto = !aberto;
    aplicar();
    if (!aberto) document.getElementById("projectFilters").scrollIntoView({ block: "start" });
  });

  aplicar();
}

// ========== ZOOM NAS CAPAS DOS PROJETOS ==========
// Toca na capa: abre grande. Toca na imagem: aproxima no ponto tocado e dá pra arrastar.
// Fecha no X, no Esc, tocando fora da imagem ou no "voltar" do celular.
function initZoomCapas() {
  const capas = document.querySelectorAll("#projectsGrid .project-image img");
  if (!capas.length) return;

  const caixa = document.createElement("div");
  caixa.className = "zoom-capa";
  caixa.hidden = true;
  caixa.setAttribute("role", "dialog");
  caixa.setAttribute("aria-modal", "true");
  caixa.setAttribute("aria-label", "Capa do projeto ampliada");
  caixa.innerHTML =
    '<div class="zoom-capa__topo"><p class="zoom-capa__titulo"></p>' +
    '<button type="button" class="zoom-capa__fechar" aria-label="Fechar"><i class="fas fa-xmark" aria-hidden="true"></i></button></div>' +
    '<div class="zoom-capa__area"><img class="zoom-capa__img" alt=""></div>' +
    '<p class="zoom-capa__dica">Toque na imagem para aproximar</p>';
  document.body.appendChild(caixa);

  const area = caixa.querySelector(".zoom-capa__area");
  const img = caixa.querySelector(".zoom-capa__img");
  const titulo = caixa.querySelector(".zoom-capa__titulo");
  const dica = caixa.querySelector(".zoom-capa__dica");
  const fechar = caixa.querySelector(".zoom-capa__fechar");
  let origem = null;
  let comHistorico = false;

  function maiorDoSrcset(el) {
    const itens = (el.getAttribute("srcset") || "").split(",").map((t) => t.trim().split(/\s+/)).filter((x) => x[0]);
    if (!itens.length) return el.currentSrc || el.src;
    itens.sort((a, b) => parseInt(b[1] || "0", 10) - parseInt(a[1] || "0", 10));
    return itens[0][0];
  }

  function aproximar(on, x, y) {
    caixa.classList.toggle("is-zoom", on);
    dica.textContent = on ? "Arraste para ver os detalhes · toque de novo para afastar" : "Toque na imagem para aproximar";
    if (on) {
      // centraliza no ponto tocado
      requestAnimationFrame(() => {
        const r = img.getBoundingClientRect();
        area.scrollLeft = x * r.width - area.clientWidth / 2;
        area.scrollTop = y * r.height - area.clientHeight / 2;
      });
    } else {
      area.scrollLeft = 0; area.scrollTop = 0;
    }
  }

  function abrir(el) {
    origem = el;
    img.src = maiorDoSrcset(el);
    img.alt = el.alt;
    const card = el.closest(".project-card");
    titulo.textContent = card ? (card.querySelector(".project-title") || {}).textContent || "" : "";
    aproximar(false);
    caixa.hidden = false;
    document.documentElement.classList.add("zoom-aberto");
    requestAnimationFrame(() => caixa.classList.add("is-aberto"));
    fechar.focus();
    try { history.pushState({ zoomCapa: true }, ""); comHistorico = true; } catch (e) { comHistorico = false; }
  }

  function fecharCaixa(peloVoltar) {
    if (caixa.hidden) return;
    caixa.classList.remove("is-aberto", "is-zoom");
    caixa.hidden = true;
    document.documentElement.classList.remove("zoom-aberto");
    if (comHistorico && !peloVoltar) { comHistorico = false; history.back(); }
    comHistorico = false;
    if (origem) origem.focus({ preventScroll: true });
  }

  capas.forEach((el) => {
    el.tabIndex = 0;
    el.setAttribute("role", "button");
    el.setAttribute("aria-label", "Ampliar: " + el.alt);
    el.addEventListener("click", () => abrir(el));
    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); abrir(el); }
    });
  });

  // toque sem arrastar: aproxima/afasta; arrastar quando aproximado move a imagem
  let arrasto = null;
  img.addEventListener("pointerdown", (e) => {
    arrasto = { x: e.clientX, y: e.clientY, sl: area.scrollLeft, st: area.scrollTop, moveu: false, mouse: e.pointerType === "mouse" };
  });
  window.addEventListener("pointermove", (e) => {
    if (!arrasto) return;
    const dx = e.clientX - arrasto.x, dy = e.clientY - arrasto.y;
    if (Math.abs(dx) + Math.abs(dy) > 6) arrasto.moveu = true;
    if (arrasto.mouse && caixa.classList.contains("is-zoom")) {
      area.scrollLeft = arrasto.sl - dx; area.scrollTop = arrasto.st - dy;
    }
  });
  img.addEventListener("pointerup", (e) => {
    if (!arrasto) return;
    const moveu = arrasto.moveu;
    arrasto = null;
    if (moveu) return;
    const r = img.getBoundingClientRect();
    aproximar(!caixa.classList.contains("is-zoom"), (e.clientX - r.left) / r.width, (e.clientY - r.top) / r.height);
  });
  window.addEventListener("pointerup", () => { arrasto = null; });
  img.addEventListener("dragstart", (e) => e.preventDefault());

  fechar.addEventListener("click", () => fecharCaixa(false));
  caixa.addEventListener("click", (e) => {
    if (e.target === caixa || e.target === area) fecharCaixa(false);
  });
  document.addEventListener("keydown", (e) => {
    if (caixa.hidden) return;
    if (e.key === "Escape") fecharCaixa(false);
    if (e.key === "Tab") { e.preventDefault(); fechar.focus(); }
  });
  window.addEventListener("popstate", () => fecharCaixa(true));
}

// ========== INIT ==========
document.addEventListener("DOMContentLoaded", () => {
  renderizarRedesSociais();
  typeEffect();
  initTheme();
  initMobileMenu();
  initHeaderScroll();
  initActiveNav();
  initSmoothScroll();
  initCursor();
  initContactForm();
  initParticles();
  setYear();
  contarSitesNoAr();
  initFiltroProjetos();
  initZoomCapas();

  // Run scroll reveal after content is painted
  requestAnimationFrame(() => {
    setTimeout(initScrollReveal, 100);
  });
});

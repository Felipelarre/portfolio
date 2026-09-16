// ========== DADOS ==========
const MEUS_PROJETOS = [
  {
    titulo: "Perfeitta",
    descricao: "Site institucional para loja de moda feminina, com foco em elegância e experiência de compra guiada pelo WhatsApp.",
    destaque: "Cliente vê a peça e já chama no WhatsApp pra comprar, sem sair do site",
    imagem: "assets/images/perfeitta.jpg?v=2",
    urlProjeto: "https://perfeitta.pages.dev/"
  },
  {
    titulo: "Prossigo para o Alvo",
    descricao: "Site institucional para uma comunidade terapêutica cristã que acolhe pessoas em recuperação da dependência química.",
    destaque: "Presença profissional que passa confiança pra quem mais precisa",
    imagem: "assets/images/prossigo-para-o-alvo.jpg?v=2",
    urlProjeto: "https://prossigo-para-o-alvo.pages.dev/"
  },
  {
    titulo: "Seu Antônio — Bar e Petiscaria",
    descricao: "Site para bar e petiscaria no Janga (Paulista-PE): cardápio digital, happy hour, espaço kids e reserva de mesa direto pelo WhatsApp.",
    destaque: "Cardápio e reserva de mesa num clique, sem precisar ligar",
    imagem: "assets/images/seu-antonio.png",
    urlProjeto: "https://seu-antonio.pages.dev/"
  },
  {
    titulo: "Casa dos Frios & Produtos Naturais",
    descricao: "Site para loja de frios e produtos naturais em Maranguape I (Paulista-PE): vitrine com filtro de produtos, galeria e pedido direto pelo WhatsApp.",
    destaque: "Vitrine online que vira pedido pronto no WhatsApp da loja",
    imagem: "assets/images/casa-dos-frios-1280.jpg?v=1",
    imagemPequena: "assets/images/casa-dos-frios-720.jpg?v=1",
    urlProjeto: "https://casa-dos-frios.pages.dev/"
  },
  {
    titulo: "Rota 22 Barbershop",
    descricao: "Site institucional com sistema de agendamento real para barbearia em Maranguape 1 (Paulista-PE): agenda com horários livres, confirmação por e-mail e painel administrativo completo.",
    destaque: "Cliente agenda sozinho, sem ninguém precisar responder o WhatsApp",
    imagem: "assets/images/rota22-barbershop.jpg",
    urlProjeto: "https://rota22-barbershop.pages.dev/",
    badge: "Em manutenção"
  }
];

const SOCIAL_LINKS = [
  { icone: "fab fa-tiktok", url: "https://www.tiktok.com/@larre.dev", label: "TikTok" },
  { icone: "fab fa-instagram", url: "https://www.instagram.com/larre.dev/", label: "Instagram" }
];

// ========== RENDER PROJECTS ==========
function criarCard(projeto) {
  const srcset = projeto.imagemPequena ? `srcset="${projeto.imagemPequena} 720w, ${projeto.imagem} 1280w" sizes="(max-width: 640px) 90vw, 360px"` : "";
  return `
    <div class="project-card reveal">
      <div class="project-image">
        <img src="${projeto.imagem}" ${srcset} alt="${projeto.titulo}" loading="lazy" onerror="this.onerror=null;this.src='assets/images/placeholder.svg';">
        <div class="project-image-overlay"></div>
        ${projeto.badge ? `<span class="project-badge">${projeto.badge}</span>` : ""}
      </div>
      <div class="project-content">
        <h3 class="project-title">${projeto.titulo}</h3>
        <div class="project-highlight"><i class="fas fa-circle-check"></i> ${projeto.destaque}</div>
        <p class="project-desc">${projeto.descricao}</p>
        <div class="project-links">
          <a href="${projeto.urlProjeto}" class="project-link primary" target="_blank" rel="noopener noreferrer">
            <i class="fas fa-external-link-alt"></i> Ver Site
          </a>
        </div>
      </div>
    </div>
  `;
}

function renderizarProjetos() {
  const container = document.getElementById("projectsGrid");
  if (container) container.innerHTML = MEUS_PROJETOS.map(criarCard).join("");
}

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
function initTheme() {
  const saved = localStorage.getItem("theme") || "dark";
  applyTheme(saved);

  document.getElementById("themeToggle")?.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    applyTheme(current === "dark" ? "light" : "dark");
  });
}

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
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
    if (!name || !message) { alert("Preencha nome e mensagem!"); return; }
    const msg = `Novo Contato do Portfólio!\n\nNome: ${name}\nE-mail: ${email}\nAssunto: ${subject}\nMensagem: ${message}`;
    window.open(`https://wa.me/5581992939515?text=${encodeURIComponent(msg)}`, "_blank");
    const btn = document.querySelector("#contactForm button[type='submit'] span");
    const form = document.getElementById("contactForm");
    if (btn) btn.textContent = "Mensagem Enviada!";
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
      number: { value: 60, density: { enable: true, value_area: 900 } },
      color: { value: "#00e5ff" },
      shape: { type: "circle" },
      opacity: { value: 0.4, random: true },
      size: { value: 2.5, random: true },
      line_linked: { enable: true, distance: 140, color: "#00e5ff", opacity: 0.2, width: 1 },
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

// ========== INIT ==========
document.addEventListener("DOMContentLoaded", () => {
  renderizarProjetos();
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

  // Run scroll reveal after content is painted
  requestAnimationFrame(() => {
    setTimeout(initScrollReveal, 100);
  });
});

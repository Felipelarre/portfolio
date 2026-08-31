// ========== DADOS ==========
const MEUS_PROJETOS = [
  {
    titulo: "Prossigo para o Alvo",
    descricao: "Site institucional para comunidade terapêutica cristã que acolhe homens e mulheres em recuperação da dependência química.",
    tecnologias: ["HTML5", "CSS3", "JavaScript"],
    imagem: "assets/images/prossigo-para-o-alvo.jpg",
    urlProjeto: "https://prossigo-para-o-alvo.netlify.app/",
    urlGithub: "https://github.com/Felipelarre/prossigo-para-o-alvo",
    destaque: true
  },
  {
    titulo: "Seu Antônio",
    descricao: "Site para restaurante premium, com cardápio digital sem preços fixos e experiência visual sofisticada.",
    tecnologias: ["HTML5", "CSS3", "JavaScript"],
    imagem: "assets/images/seu-antonio.jpg",
    urlProjeto: "https://seu-antonio-janga.netlify.app",
    urlGithub: "https://github.com/Felipelarre/seu-antonio-janga",
    destaque: true
  },
  {
    titulo: "Perfeitta",
    descricao: "Site para loja de moda feminina, com experiência visual sofisticada e foco em conversão.",
    tecnologias: ["HTML5", "CSS3", "JavaScript"],
    imagem: "assets/images/perfeitta.jpg",
    urlProjeto: "https://perfeitta-site.netlify.app",
    urlGithub: "https://github.com/Felipelarre/perfeitta-site",
    destaque: true
  },
  {
    titulo: "Marcos Pinturas",
    descricao: "Site para empresa de pintura com portfólio de trabalhos e sistema de orçamento online.",
    tecnologias: ["HTML5", "CSS3", "JavaScript"],
    imagem: "assets/images/marcos pintura.png",
    urlProjeto: "https://marcos-pinturas.netlify.app/",
    urlGithub: "https://github.com/Felipelarre/Marcos-Pinturas",
    destaque: false
  },
  {
    titulo: "SolarX Óculos",
    descricao: "E-commerce especializado em óculos de sol com sistema de avaliações e filtros avançados.",
    tecnologias: ["React", "Redux", "Stripe"],
    imagem: "assets/images/solar.png",
    urlProjeto: "https://lively-pothos-c7ef43.netlify.app/",
    urlGithub: "https://github.com/Felipelarre/SolarX",
    destaque: false
  },
  {
    titulo: "TurboFocus",
    descricao: "Aplicativo de produtividade com temporizador Pomodoro, lista de tarefas e métricas.",
    tecnologias: ["React", "Firebase", "Material UI"],
    imagem: "assets/images/turbo.png",
    urlProjeto: "https://resplendent-tanuki-e5ef2b.netlify.app/",
    urlGithub: "https://github.com/Felipelarre/TurboFocus",
    destaque: false
  },
  {
    titulo: "TechPrime",
    descricao: "Plataforma de tecnologia com produtos eletrônicos e serviços de manutenção com garantia.",
    tecnologias: ["Vue.js", "Node.js", "MongoDB"],
    imagem: "assets/images/tech.png",
    urlProjeto: "https://techprime2025.netlify.app/",
    urlGithub: "https://github.com/Felipelarre/TechPrime",
    destaque: false
  },
  {
    titulo: "Casa Recuperação Feminina",
    descricao: "Site institucional para centro de recuperação feminino com informações sobre tratamento.",
    tecnologias: ["WordPress", "PHP", "CSS3"],
    imagem: "assets/images/casa f.png",
    urlProjeto: "https://casaderecuperacaof.netlify.app/",
    urlGithub: "https://github.com/Felipelarre/Projeto-Feminino",
    destaque: false
  },
  {
    titulo: "Ótica Visão",
    descricao: "Site para ótica com catálogo de produtos, localização e sistema de agendamento de exames.",
    tecnologias: ["HTML5", "CSS3", "JavaScript"],
    imagem: "assets/images/otica.png",
    urlProjeto: "https://techprime2025.netlify.app/",
    urlGithub: "https://github.com/Felipelarre/-tica-Vis-o-Perfeita",
    destaque: false
  }
];

const SKILLS_LIST = [
  { icone: "fab fa-html5", titulo: "HTML5", descricao: "Semântica, acessibilidade e estruturação otimizada para SEO" },
  { icone: "fab fa-css3-alt", titulo: "CSS3", descricao: "Design responsivo, animações, Flexbox, Grid e pré-processadores" },
  { icone: "fab fa-js", titulo: "JavaScript", descricao: "ES6+, DOM, APIs, AJAX e programação funcional" },
  { icone: "fab fa-react", titulo: "React", descricao: "Componentes, Hooks, Context API, React Router e Redux" },
  { icone: "fas fa-mobile-alt", titulo: "Responsividade", descricao: "Design mobile-first, media queries e layouts adaptativos" },
  { icone: "fas fa-brush", titulo: "UI/UX Design", descricao: "Figma, prototipação, design systems e experiência do usuário" },
  { icone: "fab fa-node-js", titulo: "Node.js", descricao: "Criação de APIs, Express, backend JavaScript" },
  { icone: "fas fa-database", titulo: "SQL", descricao: "Criação de tabelas, comandos SQL, modelagem de dados" }
];

const SOCIAL_LINKS = [
  { icone: "fab fa-github", url: "https://github.com/Felipelarre", label: "GitHub" },
  { icone: "fab fa-linkedin-in", url: "#", label: "LinkedIn" },
  { icone: "fab fa-twitter", url: "#", label: "Twitter" },
  { icone: "fab fa-instagram", url: "https://instagram.com/olarre", label: "Instagram" }
];

// ========== RENDER SKILLS ==========
function renderizarSkills() {
  const container = document.getElementById("skillsGrid");
  if (!container) return;
  container.innerHTML = SKILLS_LIST.map((skill, i) => `
    <div class="skill-card reveal" style="transition-delay:${i * 0.07}s">
      <div class="skill-icon"><i class="${skill.icone}"></i></div>
      <h3 class="skill-title">${skill.titulo}</h3>
      <p class="skill-desc">${skill.descricao}</p>
    </div>
  `).join("");
}

// ========== RENDER PROJECTS ==========
function criarCard(projeto) {
  const techs = projeto.tecnologias.map(t => `<span class="tech-tag">${t}</span>`).join("");
  return `
    <div class="project-card reveal">
      <div class="project-image">
        <img src="${projeto.imagem}" alt="${projeto.titulo}" loading="lazy">
        <div class="project-image-overlay"></div>
      </div>
      <div class="project-content">
        <h3 class="project-title">${projeto.titulo}</h3>
        <div class="project-tech">${techs}</div>
        <p class="project-desc">${projeto.descricao}</p>
        <div class="project-links">
          <a href="${projeto.urlProjeto}" class="project-link primary" target="_blank" rel="noopener noreferrer">
            <i class="fas fa-external-link-alt"></i> Ver Projeto
          </a>
          <a href="${projeto.urlGithub}" class="project-link" target="_blank" rel="noopener noreferrer">
            <i class="fab fa-github"></i> Código Fonte
          </a>
        </div>
      </div>
    </div>
  `;
}

function renderizarProjetos() {
  const recentes = document.getElementById("projectsGrid");
  const todos = document.getElementById("allProjectsGrid");
  if (recentes) recentes.innerHTML = MEUS_PROJETOS.filter(p => p.destaque).map(criarCard).join("");
  if (todos) todos.innerHTML = MEUS_PROJETOS.map(criarCard).join("");
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
const frases = ["Front-End Developer", "UI/UX Designer", "Criador de Experiências Digitais"];
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
    window.open(`https://wa.me/5581992315619?text=${encodeURIComponent(msg)}`, "_blank");
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
  renderizarSkills();
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

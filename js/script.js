// ========== DADOS ==========
// Os projetos ficam direto no index.html (o Google lê sem precisar rodar JS)
const SOCIAL_LINKS = [
  { icone: "fab fa-tiktok", url: "https://www.tiktok.com/@larre.dev", label: "TikTok" },
  { icone: "fab fa-instagram", url: "https://www.instagram.com/larre.dev/", label: "Instagram" }
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

  // Run scroll reveal after content is painted
  requestAnimationFrame(() => {
    setTimeout(initScrollReveal, 100);
  });
});

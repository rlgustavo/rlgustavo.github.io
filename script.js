/* =====================================================================
   CONFIG — edite esta lista para trocar os textos que aparecem digitando
   ===================================================================== */
const ROLES = [
  "Professor de Jogos Digitais",
  "Desenvolvedor Full Stack",
  "Educador em Tecnologia",
  "Instrutor de Programação"
];

/* =====================================================================
   1. EFEITO DE DIGITAÇÃO NO TERMINAL DO HERO
   ===================================================================== */
(function typewriter() {
  const el = document.getElementById("typed");
  if (!el) return;

  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;

  const TYPE_SPEED = 65;
  const DELETE_SPEED = 35;
  const PAUSE_AFTER_TYPE = 1600;
  const PAUSE_AFTER_DELETE = 300;

  function tick() {
    const current = ROLES[roleIndex];

    if (!deleting) {
      charIndex++;
      el.textContent = current.slice(0, charIndex);
      if (charIndex === current.length) {
        deleting = true;
        return setTimeout(tick, PAUSE_AFTER_TYPE);
      }
      return setTimeout(tick, TYPE_SPEED);
    }

    charIndex--;
    el.textContent = current.slice(0, charIndex);
    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % ROLES.length;
      return setTimeout(tick, PAUSE_AFTER_DELETE);
    }
    return setTimeout(tick, DELETE_SPEED);
  }

  tick();
})();

/* =====================================================================
   2. MENU MOBILE (hamburguer)
   ===================================================================== */
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

navToggle.addEventListener("click", () => {
  navToggle.classList.toggle("is-open");
  navLinks.classList.toggle("is-open");
});

navLinks.querySelectorAll(".nav__link").forEach((link) => {
  link.addEventListener("click", () => {
    navToggle.classList.remove("is-open");
    navLinks.classList.remove("is-open");
  });
});

/* =====================================================================
   3. NAV: fundo ao rolar + link ativo conforme a seção visível
   ===================================================================== */
const nav = document.getElementById("nav");
const sections = document.querySelectorAll(".section, .hero");
const navAnchors = document.querySelectorAll(".nav__link");

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");

        const id = entry.target.getAttribute("id");
        navAnchors.forEach((a) => {
          a.classList.toggle("is-active", a.getAttribute("href") === `#${id}`);
        });
      }
    });
  },
  { threshold: 0.35 }
);

sections.forEach((section) => sectionObserver.observe(section));

/* =====================================================================
   4. BARRA DE PROGRESSO + fundo do nav + botão "voltar ao topo"
   ===================================================================== */
const scrollProgress = document.getElementById("scrollProgress");
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

  scrollProgress.style.width = `${progress}%`;
  nav.classList.toggle("is-scrolled", scrollTop > 40);
  backToTop.classList.toggle("is-visible", scrollTop > 500);
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

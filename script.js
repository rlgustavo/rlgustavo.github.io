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
   EFEITO DE DIGITAÇÃO NO TERMINAL
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

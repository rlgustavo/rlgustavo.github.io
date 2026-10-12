/* =========================================================
   GUSTAVO LIMA — scripts da landing page
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  // Atualiza o ano automaticamente no rodapé.
  const yearElement = document.getElementById("year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // Fecha as outras perguntas quando uma FAQ é aberta.
  // Isso deixa a seção de dúvidas mais organizada no celular.
  const faqItems = document.querySelectorAll(".faq-list details");

  faqItems.forEach((item) => {
    item.addEventListener("toggle", () => {
      if (!item.open) return;

      faqItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.open = false;
        }
      });
    });
  });
});

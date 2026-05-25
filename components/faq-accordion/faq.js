/* ============================================================
   FAQ ACCORDION
   - Abre um item por vez
   - Sincroniza aria-expanded para acessibilidade
   ============================================================ */
document.querySelectorAll(".faq__question").forEach((button) => {
  button.addEventListener("click", function () {
    const item = button.closest(".faq__item");
    if (!item) return;

    const isOpen = item.classList.contains("active");

    // Fecha todos
    document.querySelectorAll(".faq__item.active").forEach((openItem) => {
      openItem.classList.remove("active");
      openItem.querySelector(".faq__question").setAttribute("aria-expanded", "false");
    });

    // Abre o clicado (se estava fechado)
    if (!isOpen) {
      item.classList.add("active");
      button.setAttribute("aria-expanded", "true");
    }
  });
});

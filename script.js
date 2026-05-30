document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".reveal").forEach((el) => {
    el.classList.add("revealed");
  });

  const stickyCta = document.getElementById("stickyCta");
  if (stickyCta) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 400) {
        stickyCta.classList.add("visible");
      } else {
        stickyCta.classList.remove("visible");
      }
    }, { passive: true });
  }

  document.querySelectorAll(".faq__question").forEach((button) => {
    button.addEventListener("click", function () {
      const item = button.closest(".faq__item");
      if (!item) return;

      const isActive = item.classList.contains("active");

      document.querySelectorAll(".faq__item").forEach((el) => {
        el.classList.remove("active");
      });

      if (!isActive) {
        item.classList.add("active");
      }
    });
  });
});

function trackEvent(source = "cta") {
  if (typeof fbq === "function") {
    fbq("track", "InitiateCheckout", {
      content_name: "Metodo Dolceo",
      source: source
    });
  }
}

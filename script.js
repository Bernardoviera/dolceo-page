document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".reveal").forEach((el) => {
    el.classList.add("revealed");
  });

  document.querySelectorAll(".faq__question").forEach((button) => {
    button.addEventListener("click", function () {
      const item = button.closest(".faq__item");

      if (!item) return;

      item.classList.toggle("active");
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

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".reveal").forEach((el) => {
    el.classList.add("revealed");
  });

  document.querySelectorAll(".faq__item").forEach((item) => {
    const button = item.querySelector(".faq__question");
    const answer = item.querySelector(".faq__answer");

    if (!button || !answer) return;

    answer.style.display = "none";

    button.addEventListener("click", function () {
      const isOpen = answer.style.display === "block";

      document.querySelectorAll(".faq__answer").forEach((a) => {
        a.style.display = "none";
      });

      document.querySelectorAll(".faq__question").forEach((q) => {
        q.setAttribute("aria-expanded", "false");
      });

      if (!isOpen) {
        answer.style.display = "block";
        button.setAttribute("aria-expanded", "true");
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

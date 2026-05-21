const CHECKOUT_URL = "https://pay.kiwify.com.br/smJ8YgZ";

function trackEvent(source = "cta") {
  if (typeof fbq === "function") {
    fbq("track", "InitiateCheckout", {
      content_name: "Metodo Dolceo",
      source: source
    });
  }
}

document.querySelectorAll('a[href*="kiwify"]').forEach((btn) => {
  btn.addEventListener("click", () => {
    trackEvent(btn.getAttribute("onclick") || "cta");
  });
});

document.querySelectorAll(".reveal").forEach((el) => {
  el.classList.add("revealed");
});

document.querySelectorAll(".faq__item").forEach((item) => {
  const question = item.querySelector(".faq__question");
  const answer = item.querySelector(".faq__answer");

  if (!question || !answer) return;

  question.addEventListener("click", () => {
    const isOpen = item.classList.contains("open");

    document.querySelectorAll(".faq__item").forEach((otherItem) => {
      otherItem.classList.remove("open");
      const otherAnswer = otherItem.querySelector(".faq__answer");
      const otherQuestion = otherItem.querySelector(".faq__question");

      if (otherAnswer) otherAnswer.style.maxHeight = "0px";
      if (otherQuestion) otherQuestion.setAttribute("aria-expanded", "false");
    });

    if (!isOpen) {
      item.classList.add("open");
      answer.style.maxHeight = answer.scrollHeight + "px";
      question.setAttribute("aria-expanded", "true");
    }
  });
});

console.log("Dolceo carregado corretamente");
"""

path = Path("/mnt/data/script.js")
path.write_text(script, encoding="utf-8")

print(f"Arquivo salvo em: {path}")
document.querySelectorAll(".faq__item").forEach((item) => {
  const button = item.querySelector(".faq__question");
  const answer = item.querySelector(".faq__answer");

  if (!button || !answer) return;

  answer.style.maxHeight = "0px";
  answer.style.overflow = "hidden";
  answer.style.transition = "max-height 0.35s ease";

  button.addEventListener("click", () => {
    const isOpen = item.classList.contains("active");

    document.querySelectorAll(".faq__item").forEach((other) => {
      other.classList.remove("active");

      const otherButton = other.querySelector(".faq__question");
      const otherAnswer = other.querySelector(".faq__answer");

      if (otherButton) otherButton.setAttribute("aria-expanded", "false");
      if (otherAnswer) otherAnswer.style.maxHeight = "0px";
    });

    if (!isOpen) {
      item.classList.add("active");
      button.setAttribute("aria-expanded", "true");
      answer.style.maxHeight = answer.scrollHeight + "px";
    }
  });
});

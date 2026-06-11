document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".reveal").forEach((el) => {
    el.classList.add("revealed");
  });

  // Animated counters
  const counters = document.querySelectorAll("[data-counter]");
  if (counters.length > 0) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.counted) {
          entry.target.dataset.counted = "true";
          const el = entry.target;
          const target = parseFloat(el.dataset.counter);
          const prefix = el.dataset.prefix || "";
          const suffix = el.dataset.suffix || "";
          const decimal = el.dataset.decimal === "true";
          const duration = 1600;
          const start = performance.now();
          function update(now) {
            const progress = Math.min((now - start) / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);
            const value = target * ease;
            el.textContent = prefix + (decimal ? value.toFixed(1) : Math.floor(value)) + suffix;
            if (progress < 1) requestAnimationFrame(update);
          }
          requestAnimationFrame(update);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(el => counterObserver.observe(el));
  }

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

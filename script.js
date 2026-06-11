document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".reveal").forEach((el) => {
    el.classList.add("revealed");
  });

  // Hero particles
  const particlesContainer = document.getElementById("particles");
  if (particlesContainer) {
    const colors = ["#F9BDC5", "#EF93A0", "#C9A96E", "#E8D5B0", "#FDE8EC"];
    for (let i = 0; i < 28; i++) {
      const p = document.createElement("span");
      p.className = "hero__particle";
      const size = 2 + Math.random() * 4;
      const left = Math.random() * 100;
      const bottom = Math.random() * 40;
      const dur = 5 + Math.random() * 6;
      const delay = Math.random() * 8;
      const drift = (Math.random() - 0.5) * 60;
      const color = colors[Math.floor(Math.random() * colors.length)];
      p.style.cssText = `width:${size}px;height:${size}px;left:${left}%;bottom:${bottom}%;background:${color};opacity:0.7;--dur:${dur}s;--delay:${delay}s;--drift:${drift}px;`;
      particlesContainer.appendChild(p);
    }
  }

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
          const duration = 2800;
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

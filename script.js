from pathlib import Path

script = r"""// ============================================================
// MÉTODO DOLCEO — Premium Landing Page JS
// ============================================================

const CHECKOUT_URL = "https://pay.kiwify.com.br/smJ8YgZ";
const PIXEL_EVENT = "InitiateCheckout";

// ===== META PIXEL TRACK =====
function trackEvent(source = "cta") {
  if (typeof fbq !== "undefined") {
    fbq("track", PIXEL_EVENT, {
      content_name: "Metodo Dolceo",
      source: source
    });
  }
}

// ===== CTA REDIRECT =====
document.querySelectorAll('a[href*="kiwify"]').forEach((btn) => {
  btn.addEventListener("click", () => {
    trackEvent(btn.className || "cta");
  });
});

// ===== SCROLL REVEAL =====
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;

        setTimeout(() => {
          entry.target.classList.add("revealed");
        }, delay);

        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12
  }
);

revealElements.forEach((el) => revealObserver.observe(el));

// ===== FAQ ACCORDION =====
document.querySelectorAll(".faq-item").forEach((item) => {
  const button = item.querySelector(".faq-question");

  if (!button) return;

  button.addEventListener("click", () => {
    item.classList.toggle("active");
  });
});

// ===== FLOATING PARALLAX =====
window.addEventListener("mousemove", (e) => {
  const x = (window.innerWidth / 2 - e.clientX) / 40;
  const y = (window.innerHeight / 2 - e.clientY) / 40;

  document.querySelectorAll(".orb").forEach((orb, index) => {
    orb.style.transform = `translate(${x * (index + 1)}px, ${y * (index + 1)}px)`;
  });
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));

    if (target) {
      e.preventDefault();

      target.scrollIntoView({
        behavior: "smooth"
      });
    }
  });
});

// ===== STICKY CTA =====
const stickyButton = document.createElement("a");

stickyButton.href = CHECKOUT_URL;
stickyButton.target = "_blank";
stickyButton.rel = "noopener";
stickyButton.className = "sticky-cta";
stickyButton.innerHTML = "✨ Quero começar agora";

document.body.appendChild(stickyButton);

stickyButton.addEventListener("click", () => {
  trackEvent("sticky_cta");
});

// ===== PARTICLES =====
const particlesContainer = document.getElementById("particles");

if (particlesContainer) {
  for (let i = 0; i < 18; i++) {
    const particle = document.createElement("span");

    particle.classList.add("particle");

    particle.style.left = Math.random() * 100 + "%";
    particle.style.animationDelay = Math.random() * 6 + "s";
    particle.style.animationDuration = 6 + Math.random() * 8 + "s";

    particlesContainer.appendChild(particle);
  }
}

console.log("Método Dolceo JS carregado com sucesso ✨");
"""

path = Path("/mnt/data/script.js")
path.write_text(script, encoding="utf-8")

print(f"Arquivo salvo em: {path}")

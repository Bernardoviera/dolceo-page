/* ========================================================
   MÉTODO DOLCEO — Script
   ======================================================== */

/* ===== REVEAL ON SCROLL (IntersectionObserver) ===== */
(function () {
  if (!("IntersectionObserver" in window)) {
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("revealed"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = parseInt(el.dataset.delay || "0", 10);
          setTimeout(() => el.classList.add("revealed"), delay);
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
})();

/* ===== FAQ ACCORDION ===== */
document.querySelectorAll(".faq__question").forEach((button) => {
  button.addEventListener("click", function () {
    const item = button.closest(".faq__item");
    if (!item) return;

    const isOpen = item.classList.contains("active");

    document.querySelectorAll(".faq__item.active").forEach((openItem) => {
      openItem.classList.remove("active");
      openItem.querySelector(".faq__question").setAttribute("aria-expanded", "false");
    });

    if (!isOpen) {
      item.classList.add("active");
      button.setAttribute("aria-expanded", "true");
    }
  });
});

/* ===== COUNTDOWN TIMER ===== */
(function () {
  const timerEl = document.getElementById("countdown-timer");
  if (!timerEl) return;

  const STORAGE_KEY = "dolceo_offer_end_v2";
  let endTime = parseInt(localStorage.getItem(STORAGE_KEY) || "0", 10);

  if (!endTime || endTime < Date.now()) {
    endTime = Date.now() + 2 * 60 * 60 * 1000;
    try { localStorage.setItem(STORAGE_KEY, String(endTime)); } catch (_) {}
  }

  const hoursEl = timerEl.querySelector("[data-h]");
  const minsEl  = timerEl.querySelector("[data-m]");
  const secsEl  = timerEl.querySelector("[data-s]");

  function update() {
    const remaining = Math.max(0, endTime - Date.now());
    const h = Math.floor(remaining / 3_600_000);
    const m = Math.floor((remaining % 3_600_000) / 60_000);
    const s = Math.floor((remaining % 60_000) / 1_000);
    hoursEl.textContent = String(h).padStart(2, "0");
    minsEl.textContent  = String(m).padStart(2, "0");
    secsEl.textContent  = String(s).padStart(2, "0");
    if (remaining === 0) clearInterval(interval);
  }

  update();
  const interval = setInterval(update, 1000);
})();

/* ===== STICKY CTA — aparece ao sair do hero ===== */
(function () {
  const sticky  = document.getElementById("stickyCta");
  const hero    = document.getElementById("hero");
  if (!sticky || !hero) return;

  const heroObserver = new IntersectionObserver(
    ([entry]) => {
      sticky.classList.toggle("visible", !entry.isIntersecting);
    },
    { threshold: 0 }
  );

  heroObserver.observe(hero);
})();

/* ===== ANIMATED COUNTERS ===== */
(function () {
  function animateCounter(el) {
    const target   = parseFloat(el.dataset.target);
    const suffix   = el.dataset.suffix || "";
    const prefix   = el.dataset.prefix || "";
    const decimals = el.dataset.decimals ? parseInt(el.dataset.decimals) : 0;
    const duration = 1800;
    const start    = performance.now();

    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      // ease-out cubic
      const eased  = 1 - Math.pow(1 - progress, 3);
      const value  = eased * target;
      el.textContent = prefix + value.toFixed(decimals).replace(".", ",") + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  if (!("IntersectionObserver" in window)) return;

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  document.querySelectorAll("[data-target]").forEach((el) => counterObserver.observe(el));
})();

/* ===== SMOOTH SCROLL FOR ANCHOR LINKS ===== */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const selector = this.getAttribute("href");
    if (selector === "#") return;
    const target = document.querySelector(selector);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

/* ===== FB PIXEL EVENT TRACKING ===== */
function trackEvent(source) {
  source = source || "cta";
  try {
    if (typeof fbq === "function") {
      fbq("track", "InitiateCheckout", {
        content_name: "Metodo Dolceo",
        source: source,
      });
    }
  } catch (_) {}
}

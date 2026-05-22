/* ========================================================
   MÉTODO DOLCEO — Script
   ======================================================== */

/* ===== REVEAL ON SCROLL (IntersectionObserver) ===== */
(function () {
  // If browser doesn't support IntersectionObserver, reveal everything immediately
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

    // Close all open items
    document.querySelectorAll(".faq__item.active").forEach((openItem) => {
      openItem.classList.remove("active");
      openItem.querySelector(".faq__question").setAttribute("aria-expanded", "false");
    });

    // If it wasn't open before, open it now
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

  // If no timer stored or it already expired, create a fresh 2-hour window
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
  } catch (_) {
    // fail silently — never block the checkout redirect
  }
}

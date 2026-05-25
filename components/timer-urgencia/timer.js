/* ============================================================
   TIMER DE URGÊNCIA
   - Persiste no localStorage: o timer não reinicia ao dar refresh
   - Muda STORAGE_KEY para resetar o timer em um novo produto
   - Muda DURATION_MS para alterar o tempo (padrão: 2 horas)
   ============================================================ */
(function () {
  const timerEl = document.getElementById("countdown-timer");
  if (!timerEl) return;

  const STORAGE_KEY = "lp_offer_end_v1"; // mude por produto
  const DURATION_MS = 2 * 60 * 60 * 1000; // 2 horas

  let endTime = parseInt(localStorage.getItem(STORAGE_KEY) || "0", 10);

  if (!endTime || endTime < Date.now()) {
    endTime = Date.now() + DURATION_MS;
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

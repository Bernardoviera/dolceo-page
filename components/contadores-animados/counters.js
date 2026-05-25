/* ============================================================
   CONTADORES ANIMADOS
   Adicione data-target="2400" em qualquer <span> ou <strong>.
   Opcionais: data-suffix="%" data-prefix="+" data-decimals="1"
   O número conta do zero ao valor quando entra na viewport.

   Exemplo de uso no HTML:
     <strong><span data-target="2400" data-prefix="+">2.400</span></strong>
     <strong><span data-target="89" data-suffix="%">89%</span></strong>
     <strong><span data-target="4.9" data-decimals="1">4.9</span></strong>
   ============================================================ */
(function () {
  function animateCounter(el) {
    const target   = parseFloat(el.dataset.target);
    const suffix   = el.dataset.suffix   || "";
    const prefix   = el.dataset.prefix   || "";
    const decimals = el.dataset.decimals ? parseInt(el.dataset.decimals) : 0;
    const duration = 1800; // ms
    const start    = performance.now();

    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const value    = eased * target;
      el.textContent = prefix + value.toFixed(decimals).replace(".", ",") + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  if (!("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  document.querySelectorAll("[data-target]").forEach((el) => observer.observe(el));
})();

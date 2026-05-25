/* ============================================================
   STICKY CTA MOBILE
   Aparece quando o usuário rola para fora do hero (#hero).
   O hero precisa ter id="hero" e o sticky ter id="stickyCta".
   ============================================================ */
(function () {
  const sticky = document.getElementById("stickyCta");
  const hero   = document.getElementById("hero");
  if (!sticky || !hero) return;

  if (!("IntersectionObserver" in window)) {
    sticky.classList.add("visible");
    return;
  }

  const observer = new IntersectionObserver(
    ([entry]) => {
      sticky.classList.toggle("visible", !entry.isIntersecting);
    },
    { threshold: 0 }
  );

  observer.observe(hero);
})();

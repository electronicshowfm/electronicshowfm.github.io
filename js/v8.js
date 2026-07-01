/* =========================================================
   ELECTRONIC SHOW V8 — TRANSMISSION EXPERIENCE JS
   Section activation, signal pulses and outbound transmission screen
   ========================================================= */

(function(){
  const sections = document.querySelectorAll('.signal-section-anchor');
  const signalPath = document.querySelector('.signal-path');
  const route = document.querySelector('.route-transmission');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-active');
        }
      });
    }, { threshold: 0.28 });

    sections.forEach(section => observer.observe(section));
  } else {
    sections.forEach(section => section.classList.add('is-active'));
  }

  function triggerSignalPulse(){
    if (!signalPath) return;
    signalPath.classList.remove('is-transmitting');
    void signalPath.offsetWidth;
    signalPath.classList.add('is-transmitting');
  }

  setInterval(triggerSignalPulse, 8500);
  window.addEventListener('load', () => {
    document.body.classList.add('is-loaded');
    setTimeout(triggerSignalPulse, 3200);
  });

  document.querySelectorAll('a[target="_blank"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const href = link.getAttribute('href');
      if (!href || !route) return;

      event.preventDefault();
      route.classList.add('is-active');
      triggerSignalPulse();

      setTimeout(() => {
        window.open(href, '_blank', 'noopener');
        route.classList.remove('is-active');
      }, 650);
    });
  });
})();

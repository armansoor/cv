document.addEventListener('DOMContentLoaded', () => {
  // 1. Tilt Effect for Comic Panels
  const panels = document.querySelectorAll('.comic-panel');

  panels.forEach(panel => {
    panel.addEventListener('mousemove', (e) => {
      const rect = panel.getBoundingClientRect();
      const x = e.clientX - rect.left; // x position within the element
      const y = e.clientY - rect.top;  // y position within the element

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -5; // Invert Y for correct tilt
      const rotateY = ((x - centerX) / centerX) * 5;

      panel.style.setProperty('--tilt-x', `${rotateX}deg`);
      panel.style.setProperty('--tilt-y', `${rotateY}deg`);
    });

    panel.addEventListener('mouseleave', () => {
      // Reset tilt on leave
      panel.style.setProperty('--tilt-x', '0deg');
      panel.style.setProperty('--tilt-y', '0deg');
    });
  });

  // 2. Glitch Effect Logic (Simplified)
  const glitchText = document.querySelector('.glitch');
  if (glitchText) {
    // Just a fun interval to jitter the text occasionally
    setInterval(() => {
      if(Math.random() > 0.9) {
          glitchText.style.transform = `skew(${Math.random() * 10 - 5}deg)`;
          setTimeout(() => {
            glitchText.style.transform = 'skew(0deg)';
          }, 100);
      }
    }, 2000);
  }

  // 3. Robust Scroll Animation for Skill Bars
  const skillBars = document.querySelectorAll('.bar');

  // Store target width and reset to 0 initially
  skillBars.forEach(bar => {
      const targetWidth = bar.style.width;
      bar.dataset.width = targetWidth;
      bar.style.width = '0%';
      bar.style.transition = 'width 1.5s cubic-bezier(0.25, 1, 0.5, 1)';
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        // Restore width after a tiny delay to ensure transition triggers
        setTimeout(() => {
            bar.style.width = bar.dataset.width;
        }, 100);
        observer.unobserve(bar);
      }
    });
  }, { threshold: 0.1 });

  skillBars.forEach(bar => {
    observer.observe(bar);
  });

  console.log('Comic Theme Fully Loaded & Animated! 💥');
});

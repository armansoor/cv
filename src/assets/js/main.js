document.addEventListener('DOMContentLoaded', () => {
  const panels = document.querySelectorAll('.panel');

  panels.forEach(panel => {
    panel.addEventListener('mousemove', (e) => {
      const rect = panel.getBoundingClientRect();
      const x = e.clientX - rect.left; // x position within the element
      const y = e.clientY - rect.top;  // y position within the element

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * 10; // Max rotation 10deg
      const rotateY = ((x - centerX) / centerX) * -10; // Max rotation -10deg

      panel.style.setProperty('--tilt-x', `${rotateX}deg`);
      panel.style.setProperty('--tilt-y', `${rotateY}deg`);
    });

    panel.addEventListener('mouseleave', () => {
      panel.style.setProperty('--tilt-x', '0deg');
      panel.style.setProperty('--tilt-y', '0deg');
    });
  });

  console.log('Comic Theme Loaded! 💥');
});

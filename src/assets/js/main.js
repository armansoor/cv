const navButtons = document.querySelectorAll('.nav-btn');
const sections = document.querySelectorAll('.comic-page');
const panels = document.querySelectorAll('.comic-panel');
const glitchText = document.querySelector('.glitch');
const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = document.querySelector('.theme-icon');

function animateSkills(section) {
  const bars = section.querySelectorAll('.bar');
  bars.forEach(bar => {
    bar.style.width = '0%';
    setTimeout(() => {
      bar.style.width = bar.dataset.width || '100%';
    }, 100);
  });
}

function updateActiveSection(targetId) {
  sections.forEach(sec => {
    const isHero = targetId === 'hero' && sec.classList.contains('hero-section');
    const isActive = sec.id === targetId || isHero;

    sec.classList.toggle('active', isActive);

    if (isActive && sec.id === 'arsenal') {
      animateSkills(sec);
    }
  });
}

function handleNavClick(e) {
  const btn = e.currentTarget;
  const targetId = btn.dataset.target;

  navButtons.forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  updateActiveSection(targetId);
}

function handlePanelMove(e) {
  const panel = e.currentTarget;
  const rect = panel.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  const rotateX = ((y - centerY) / centerY) * -8; // Increased tilt
  const rotateY = ((x - centerX) / centerX) * 8;

  panel.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
}

function resetPanel(e) {
  e.currentTarget.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
}

function startGlitchEffect() {
  if (!glitchText) return;

  setInterval(() => {
    const skew = Math.random() * 20 - 10;
    glitchText.style.transform = `skew(${skew}deg)`;
    setTimeout(() => {
      glitchText.style.transform = 'skew(0deg)';
    }, 100);
  }, 3000);
}

function toggleTheme() {
  const isDark = document.body.getAttribute('data-theme') !== 'light';

  if (isDark) {
    document.body.setAttribute('data-theme', 'light');
    themeIcon.textContent = '☀️';
    localStorage.setItem('theme', 'light');
  } else {
    document.body.removeAttribute('data-theme');
    themeIcon.textContent = '🌙';
    localStorage.setItem('theme', 'dark');
  }
}

function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.body.setAttribute('data-theme', 'light');
    themeIcon.textContent = '☀️';
  }
}

navButtons.forEach(btn => btn.addEventListener('click', handleNavClick));

panels.forEach(panel => {
  if (window.matchMedia('(hover: hover)').matches) {
    panel.addEventListener('mousemove', handlePanelMove);
    panel.addEventListener('mouseleave', resetPanel);
  } else {
    // Optional: Add simple tap effect for touch
    panel.addEventListener('click', () => {
        panel.style.transform = 'scale(0.98)';
        setTimeout(() => panel.style.transform = 'scale(1)', 150);
    });
  }
});

themeToggle.addEventListener('click', toggleTheme);

startGlitchEffect();
initTheme();

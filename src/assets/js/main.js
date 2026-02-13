// main.js - Comic Book Logic

document.addEventListener('DOMContentLoaded', () => {

    // --- Tab Navigation Logic ---
    const navButtons = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.comic-page');

    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');

            // Update Navigation State
            navButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Update Section Visibility
            sections.forEach(sec => {
                if (sec.id === targetId || (targetId === 'hero' && sec.classList.contains('hero-section'))) {
                    sec.classList.add('active');
                    // Trigger animations for the newly active section
                    handleSectionAnimations(sec);
                } else {
                    sec.classList.remove('active');
                }
            });
        });
    });


    // --- 3D Tilt Effect for Comic Panels ---
    const panels = document.querySelectorAll('.comic-panel');

    panels.forEach(panel => {
        panel.addEventListener('mousemove', (e) => {
            const rect = panel.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -5; // Tilt X axis
            const rotateY = ((x - centerX) / centerX) * 5;  // Tilt Y axis

            panel.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });

        panel.addEventListener('mouseleave', () => {
            panel.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale(1)`;
        });
    });

    // --- Glitch Text Randomizer ---
    const glitchText = document.querySelector('.glitch');
    if (glitchText) {
        setInterval(() => {
            const skew = Math.random() * 20 - 10;
            glitchText.style.transform = `skew(${skew}deg)`;
            setTimeout(() => {
                glitchText.style.transform = 'skew(0deg)';
            }, 100);
        }, 3000);
    }

    // --- Animation Handling ---
    function handleSectionAnimations(section) {
        // Skill Bars Animation
        if (section.id === 'arsenal') {
            const bars = section.querySelectorAll('.bar');
            bars.forEach(bar => {
                // Store the original width if not already stored
                if (!bar.dataset.width) {
                    // Check style attribute first
                    const styleWidth = bar.getAttribute('style');
                    if (styleWidth && styleWidth.includes('width:')) {
                         bar.dataset.width = styleWidth.split('width:')[1].split(';')[0].trim();
                    } else {
                        // Fallback or if style is computed
                         bar.dataset.width = bar.style.width || '100%';
                    }
                }

                // Reset width to 0
                bar.style.width = '0%';

                // Animate to full width
                setTimeout(() => {
                    bar.style.width = bar.dataset.width;
                }, 100);
            });
        }
    }

    // Initialize animations for the default active section (Hero) if needed
    // Hero has glitch effect which runs automatically via CSS/JS interval
});

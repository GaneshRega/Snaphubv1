// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('py-2', 'shadow-xl');
        navbar.classList.remove('py-0');
    } else {
        navbar.classList.remove('py-2', 'shadow-xl');
    }
});

// Animations on Scroll
document.addEventListener('DOMContentLoaded', () => {
    // Speed-optimized Reveal animations
    const reveals = document.querySelectorAll('.reveal');
    if (reveals.length > 0) {
        ScrollTrigger.batch('.reveal', {
            onEnter: (batch) => {
                gsap.fromTo(batch, 
                    { 
                        opacity: 0, 
                        y: 15 
                    }, 
                    { 
                        opacity: 1, 
                        y: 0, 
                        duration: 0.6, 
                        stagger: 0.1,
                        ease: 'power2.out',
                        overwrite: true
                    }
                );
            },
            start: 'top 90%',
        });
    }

    // Stats Counter Animation
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        
        ScrollTrigger.create({
            trigger: counter,
            start: 'top 90%',
            onEnter: () => {
                let count = 0;
                const updateCount = () => {
                    const increment = target / 50;
                    if (count < target) {
                        count += increment;
                        counter.innerText = Math.ceil(count);
                        setTimeout(updateCount, 20);
                    } else {
                        counter.innerText = target;
                    }
                };
                updateCount();
            }
        });
    });

    // Dashboard Animation (Homepage Hero)
    const initHeroAnimation = () => {
        const container = document.getElementById('hero-dashboard-animation');
        if (!container) return;

        // Animate floating cards with different speeds
        gsap.to('.dash-card-1', {
            y: -25,
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut"
        });

        gsap.to('.dash-card-2', {
            y: 30,
            duration: 4,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut",
            delay: 0.5
        });

        gsap.to('.dash-card-3', {
            y: -15,
            duration: 2.5,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut",
            delay: 1
        });

        // Animate SVG path (Data Flow)
        const path = document.querySelector('.data-flow-path');
        if (path) {
            const length = path.getTotalLength();
            gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
            gsap.to(path, {
                strokeDashoffset: 0,
                duration: 4,
                repeat: -1,
                ease: "none"
            });
        }
        
        // Pulse effects for nodes
        gsap.to('.node-pulse', {
            scale: 1.5,
            opacity: 0,
            duration: 2,
            repeat: -1,
            ease: "sine.out",
            stagger: 0.5
        });
    };

    initHeroAnimation();

    // Floating elements parallax (Generic)
    gsap.to('.floating', {
        y: -15,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetID = this.getAttribute('href');
            if (targetID === '#') return;
            const target = document.querySelector(targetID);
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Lucide Icons initialization
if (window.lucide) {
    window.lucide.createIcons();
}

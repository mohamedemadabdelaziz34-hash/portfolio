// Theme Toggle Logic
const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = themeToggleBtn.querySelector('i');

const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'light') {
        themeIcon.classList.replace('fa-sun', 'fa-moon');
    }
}

themeToggleBtn.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    
    if (theme === 'light') {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'dark');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        themeIcon.classList.replace('fa-sun', 'fa-moon');
    }
});

// Navigation menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

navLinksItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Navbar scroll effect & Scroll Progress
const nav = document.querySelector('nav');
const scrollProgress = document.getElementById('scroll-progress');

window.addEventListener('scroll', () => {
    // Navbar effect
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }

    // Scroll progress logic
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    if (scrollProgress) {
        scrollProgress.style.width = scrolled + "%";
    }
});

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const revealPoint = 150;

    revealElements.forEach(el => {
        const revealTop = el.getBoundingClientRect().top;
        if (revealTop < windowHeight - revealPoint) {
            el.classList.add('active');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
// Trigger once on load
revealOnScroll();

// Active Navigation Link Update
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    
    // Add hero section to detection
    const hero = document.getElementById('hero');
    if (window.scrollY < hero.offsetHeight / 2) {
        navLinksItems.forEach(a => a.classList.remove('active'));
    }

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navLinksItems.forEach(a => {
        a.classList.remove('active');
        if (current && a.getAttribute('href').includes(current)) {
            a.classList.add('active');
        }
    });
});

// Custom Cursor Logic
const cursorDot = document.querySelector(".cursor-dot");
const cursorOutline = document.querySelector(".cursor-outline");

window.addEventListener("mousemove", (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    // Direct movement for the dot
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    // Modern smoothed movement for the outline
    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 250, fill: "forwards" });

    // Spotlight Effect coordinates (Adjustment #23)
    const gridX = (posX / window.innerWidth) * 100;
    const gridY = (posY / window.innerHeight) * 100;
    document.documentElement.style.setProperty('--mouse-x', `${gridX}%`);
    document.documentElement.style.setProperty('--mouse-y', `${gridY}%`);

    // Side Dots Logic
    const dotNavs = document.querySelectorAll('.dot-nav');
    let currentSection = "";
    
    // Check which section is in view
    const sections = document.querySelectorAll('section, header');
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= (sectionTop - sectionHeight / 3)) {
            currentSection = section.getAttribute('id');
        }
    });

    dotNavs.forEach(dot => {
        dot.classList.remove('active');
        if (dot.getAttribute('data-section') === currentSection) {
            dot.classList.add('active');
        }
    });

    // Interaction states
    const target = e.target;
    const isInteractive = target.closest('a') || target.closest('button') || target.closest('.clickable') || target.closest('.nav-profile-thumb');
    
    if (isInteractive) {
        document.body.classList.add("cursor-active");
    } else {
        document.body.classList.remove("cursor-active");
    }

    // Parallax Effect for Background Blobs
    const blobs = document.querySelectorAll('.blob');
    blobs.forEach((blob, index) => {
        const speed = (index + 1) * 0.02;
        const xOffset = (window.innerWidth / 2 - posX) * speed;
        const yOffset = (window.innerHeight / 2 - posY) * speed;
        blob.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
    });

    // Enhanced Hero Image Tilt
    const tiltImage = document.querySelector('.tilt-effect');
    if (tiltImage && window.innerWidth > 768) {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const offsetX = ((posX - centerX) / centerX) * 20;
        const offsetY = ((posY - centerY) / centerY) * 20;
        tiltImage.style.transform = `rotateX(${-offsetY}deg) rotateY(${offsetX}deg)`;
    }
});

// Magnetic Effect refined for different sizes
const updateMagneticEffect = (e, el, strength) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = el.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    const deltaX = clientX - centerX;
    const deltaY = clientY - centerY;
    
    el.style.transform = `translate(${deltaX * strength}px, ${deltaY * strength}px)`;
};

const magneticElements = document.querySelectorAll('.magnetic');
const magneticSmElements = document.querySelectorAll('.magnetic-sm');

magneticElements.forEach(el => {
    el.addEventListener('mousemove', (e) => updateMagneticEffect(e, el, 0.3));
    el.addEventListener('mouseleave', () => el.style.transform = 'translate(0,0)');
});

magneticSmElements.forEach(el => {
    el.addEventListener('mousemove', (e) => updateMagneticEffect(e, el, 0.15));
    el.addEventListener('mouseleave', () => el.style.transform = 'translate(0,0)');
});

const magneticTextElements = document.querySelectorAll('.magnetic-text');
magneticTextElements.forEach(el => {
    el.addEventListener('mousemove', (e) => updateMagneticEffect(e, el, 0.08));
    el.addEventListener('mouseleave', () => el.style.transform = 'translate(0,0)');
});

const tiltImageContainer = document.querySelector('.tilt-effect');
if (tiltImageContainer) {
    document.addEventListener('mouseleave', () => {
        tiltImageContainer.style.transform = `rotateX(0deg) rotateY(0deg)`;
    });
}

// Image Modal Logic
const modal = document.getElementById("image-modal");
const thumb = document.getElementById("nav-profile-thumb");
const modalImg = document.getElementById("modal-img");
const closeModalBtn = document.querySelector(".close-modal");

if (thumb && modal && modalImg) {
    thumb.addEventListener("click", () => {
        modal.classList.add("show");
        modalImg.src = thumb.src;
    });

    closeModalBtn.addEventListener("click", () => {
        modal.classList.remove("show");
    });

    // Close on background click
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.remove("show");
        }
    });
}

// Typewriter Effect
const typewriterElement = document.getElementById('typewriter');
const phrases = [
    "AI Engineer",
    "Machine Learning Enthusiast",
    "Competitive Programmer",
    "Problem Solver"
];

let phraseIndex = 0;
let letterIndex = 0;
let currentPhrase = "";
let isDeleting = false;
let typeSpeed = 100;

function typeIndicator() {
    if(!typewriterElement) return;

    currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
        // Remove a character
        typewriterElement.textContent = currentPhrase.substring(0, letterIndex - 1);
        letterIndex--;
        typeSpeed = 50; // Faster when deleting
    } else {
        // Add a character
        typewriterElement.textContent = currentPhrase.substring(0, letterIndex + 1);
        letterIndex++;
        typeSpeed = 100; // Normal typing speed
    }

    let nextStepTimeout = typeSpeed;

    if (!isDeleting && letterIndex === currentPhrase.length) {
        nextStepTimeout = 2000; // Pause at the end of word for 2 seconds
        isDeleting = true;
    } else if (isDeleting && letterIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        nextStepTimeout = 500; // Pause before typing next word
    }

    setTimeout(typeIndicator, nextStepTimeout);
}

// Start the typewriter after 1 second delay
setTimeout(typeIndicator, 1000);

// Lens Effect Logic (Adjustment #10)
const lensTriggers = document.querySelectorAll('.project-lens-trigger');
lensTriggers.forEach(trigger => {
    const wrapper = trigger.querySelector('.project-image-wrapper');
    const overlay = trigger.querySelector('.lens-overlay');
    
    if (wrapper && overlay) {
        wrapper.addEventListener('mousemove', (e) => {
            const rect = wrapper.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            
            overlay.style.setProperty('--x', `${x}%`);
            overlay.style.setProperty('--y', `${y}%`);
        });
    }
});

// Text Scramble / Decoder Effect (Adjustment #14)
class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_/[]{}—=+*^?#________';
        this.update = this.update.bind(this);
    }
    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => this.resolve = resolve);
        this.queue = [];
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }
    update() {
        let output = '';
        let complete = 0;
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];
            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += `<span class="dud">${char}</span>`;
            } else {
                output += from;
            }
        }
        this.el.innerHTML = output;
        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }
    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}

// Apply Text Scramble to Nav Links
const navLinksItemsToScramble = document.querySelectorAll('.nav-link');
navLinksItemsToScramble.forEach(link => {
    const fx = new TextScramble(link);
    const originalText = link.innerText;
    
    link.addEventListener('mouseenter', () => {
        fx.setText(originalText);
    });
});

// Top Bar Typewriter Logic (Adjustment: AI ENGINEER loop)
const topTypewriter = document.getElementById('top-typewriter-text');
const topPhrases = ["AI ENGINEER"];
let topPhraseIdx = 0;
let topLetterIdx = 0;
let topIsDeleting = false;

function typeTop() {
    if(!topTypewriter) return;
    const current = topPhrases[topPhraseIdx];
    
    if(topIsDeleting) {
        topTypewriter.textContent = current.substring(0, topLetterIdx - 1);
        topLetterIdx--;
    } else {
        topTypewriter.textContent = current.substring(0, topLetterIdx + 1);
        topLetterIdx++;
    }
    
    let speed = topIsDeleting ? 50 : 150;
    
    if(!topIsDeleting && topLetterIdx === current.length) {
        speed = 2000;
        topIsDeleting = true;
    } else if(topIsDeleting && topLetterIdx === 0) {
        topIsDeleting = false;
        topPhraseIdx = (topPhraseIdx + 1) % topPhrases.length;
        speed = 500;
    }
    
    setTimeout(typeTop, speed);
}

// Start top typewriter
typeTop();

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

// Intersection Observer for Reveal Animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal-active');
            // Once revealed, we can stop observing it
            revealObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Target all reveal classes
const revealTargets = document.querySelectorAll('.reveal-up, .reveal-scale, .reveal-right, .reveal-left');
revealTargets.forEach(target => revealObserver.observe(target));

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

// Initialize Vanilla Tilt for cards
if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll(".glass-card, .project-card, .stat-card"), {
        max: 8,
        speed: 400,
        glare: true,
        "max-glare": 0.2,
        perspective: 1200,
        scale: 1.02
    });
}

// Social Buttons Hover Enhancement
const socialBtns = document.querySelectorAll('.social-btn');
socialBtns.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        btn.style.boxShadow = `0 0 25px var(--primary-glow)`;
    });
    btn.addEventListener('mouseleave', () => {
        btn.style.boxShadow = 'none';
    });
});

// AI Chatbot Logic
const chatBubble = document.getElementById('ai-chat-bubble');
const chatWindow = document.getElementById('ai-chat-window');
const closeChat = document.getElementById('close-chat');
const langToggle = document.getElementById('chat-lang-toggle');
const chatInput = document.getElementById('chat-input');
const chatSend = document.getElementById('chat-send');
const chatMessages = document.getElementById('chat-messages');
const chatSuggestions = document.getElementById('chat-suggestions');

let currentLang = 'EN';

const translations = {
    EN: {
        welcome: "Hello! I'm Mohamed's Neural Assistant. I've indexed his entire portfolio. Ask me anything!",
        placeholder: "Ask about skills, projects, or just say hi...",
        thinking: "Analyzing neural nodes...",
        suggestions: ["Explain Skills", "Show Projects", "Who is Mohamed?", "Contact Info"],
        noMatch: "I couldn't find a direct match in my local nodes, but Mohamed likely handles that! Want to see his contact info?",
        responses: {
            "skills": "Mohamed's core stack includes Python, C++, and PyTorch. He's specialized in Deep Learning, Computer Vision, and Algorithmic Problem Solving.",
            "projects": "He has worked on an AI Diagnostic System (97.2% accuracy), Autonomous Pathfinding for Logistics, and Arabic Sign Language Recognition (Ar-SLR).",
            "contact": "You can reach Mohamed at mohamedemadabdelaziz34@gmail.com or call +20 1203080495. Check the footer for social links!",
            "who": "Mohamed Emad is an AI Engineering student at Zagazig National University, an ICPC participant, and a passionate problem solver.",
            "hello": "Greetings! I am ready to process your query about Mohamed's professional background.",
            "hi": "Hello! How can I assist your exploration of this portfolio today?",
            "thanks": "You're welcome! I'm here to help. Anything else?",
            "price": "For project collaborations and pricing, please contact Mohamed directly through the 'Let's Connect' section.",
            "education": "He is pursuing a Bachelor of Computers and Information at Zagazig National University, specializing in AI (Expected 2026).",
            "hobby": "Besides AI, Mohamed is a competitive programmer and an enthusiast of algorithmic challenges.",
            "experience": "He has a strong background in self-learning AI technologies and has participated in ICPC, showcasing his problem-solving skills.",
            "services": "Mohamed offers Portfolio Creation, Landing Page Design, and AI/ML Solution Development.",
            "time": () => `My system clock says it is currently ${new Date().toLocaleTimeString()}.`,
            "name": "His name is Eng: Mohamed Emad Abdelaziz.",
            "default": "That's an interesting inquiry! While I focus on Mohamed's portfolio, he can definitely discuss that with you. Shall I show you his contact info?"
        }
    },
    AR: {
        welcome: "أهلاً بك! أنا المساعد العصبي لمحمد. لقد قمت بفحص ملفه الشخصي بالكامل. اسألني أي شيء!",
        placeholder: "اسأل عن المهارات، المشاريع، أو فقط قل مرحباً...",
        thinking: "جاري تحليل البيانات...",
        suggestions: ["شرح المهارات", "عرض المشاريع", "من هو محمد؟", "معلومات التواصل"],
        noMatch: "لم أجد إجابة مباشرة في بياناتي المحلية، ولكن من المؤكد أن محمد يمكنه مساعدتك! هل تريد رؤية معلومات التواصل؟",
        responses: {
            "مهارات": "مهارات محمد الأساسية تشمل Python و C++ و PyTorch. هو متخصص في التعلم العميق، الرؤية الحاسوبية، وحل المشكلات البرمجية.",
            "مشاريع": "من أبرز مشاريعه: نظام التشخيص الطبي بالذكاء الاصطناعي، نظام الملاحة الذكي للمستودعات، ومترجم لغة الإشارة العربية (Ar-SLR).",
            "تواصل": "يمكنك التواصل مع محمد عبر البريد: mohamedemadabdelaziz34@gmail.com أو الهاتف: 01203080495.",
            "من": "محمد عماد طالب هندسة ذكاء اصطناعي بجامعة الزقازيق الأهلية، مشارك في مسابقة ICPC، وشغوف بحل المشكلات المعقدة.",
            "أهلا": "أهلاً بك! أنا جاهز للرد على استفساراتك حول مسيرة محمد المهنية.",
            "مرحبا": "مرحباً! كيف يمكنني مساعدتك في استكشاف هذا الملف الشخصي اليوم؟",
            "شكرا": "عفواً! أنا هنا للمساعدة. هل هناك شيء آخر؟",
            "سعر": "بخصوص التعاون في المشاريع والأسعار، يرجى التواصل مع محمد مباشرة من خلال قسم 'التواصل'.",
            "تعليم": "يدرس محمد في جامعة الزقازيق الأهلية، كلية الحاسبات والمعلومات، تخصص ذكاء اصطناعي (تخرج متوقع 2026).",
            "هواية": "بالإضافة للذكاء الاصطناعي، محمد مبرمج تنافسي ويحب التحديات الخوارزمية.",
            "خبرة": "يمتلك خبرة قوية في التعلم الذاتي لتقنيات الذكاء الاصطناعي وشارك في ICPC، مما يظهر مهاراته في حل المشكلات.",
            "خدمات": "يقدم محمد خدمات: إنشاء المواقع التعريفية، تصميم صفحات الهبوط، وتطوير حلول الذكاء الاصطناعي.",
            "وقت": () => `الساعة الآن بتوقيتي هي ${new Date().toLocaleTimeString('ar-EG')}.`,
            "اسم": "اسمه المهندس محمد عماد عبد العزيز.",
            "افتراضي": "هذا استفسار مثير للاهتمام! سيسعد محمد بمناقشة ذلك معك. هل أعرض لك معلومات التواصل الخاصة به؟"
        }
    }
};

function addMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', sender);
    if (sender === 'bot') {
        const icon = document.createElement('i');
        icon.classList.add('fas', 'fa-robot', 'bot-msg-icon');
        msgDiv.appendChild(icon);
        const textSpan = document.createElement('span');
        msgDiv.appendChild(textSpan);
        chatMessages.appendChild(msgDiv);
        
        // Typewriter effect for bot response
        let i = 0;
        const speed = 20;
        function type() {
            if (i < text.length) {
                textSpan.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }
        }
        type();
    } else {
        msgDiv.textContent = text;
        chatMessages.appendChild(msgDiv);
    }
    
    if (currentLang === 'AR') msgDiv.classList.add('rtl-msg');
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showTyping() {
    const typing = document.createElement('div');
    typing.classList.add('typing-indicator', 'message');
    typing.id = 'typing-indicator';
    typing.innerHTML = `<span></span><span></span><span></span> <small style="margin-left:8px; opacity:0.7">${translations[currentLang].thinking}</small>`;
    typing.style.display = 'flex';
    chatMessages.appendChild(typing);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function removeTyping() {
    const typing = document.getElementById('typing-indicator');
    if (typing) typing.remove();
}

function updateSuggestions() {
    chatSuggestions.innerHTML = '';
    translations[currentLang].suggestions.forEach(suggest => {
        const chip = document.createElement('div');
        chip.classList.add('suggestion-chip');
        chip.textContent = suggest;
        chip.addEventListener('click', () => {
            handleBotInteraction(suggest);
        });
        chatSuggestions.appendChild(chip);
    });
}

function getBotResponse(input) {
    const lowerInput = input.toLowerCase();
    const res = translations[currentLang].responses;
    
    // Check for specific matches first
    for (let key in res) {
        if (lowerInput.includes(key.toLowerCase())) {
            const response = res[key];
            return typeof response === 'function' ? response() : response;
        }
    }

    // Site Search Fallback: Try to find context in the webpage
    const pageText = document.body.innerText.toLowerCase();
    const words = lowerInput.split(' ').filter(w => w.length > 3);
    for(let word of words) {
        if(pageText.includes(word)) {
            return currentLang === 'EN' ? 
                `I found some information related to '${word}' in the portfolio. You might want to check the corresponding section!` :
                `لقد وجدت بعض المعلومات المتعلقة بـ '${word}' في ملف التعريف. قد ترغب في مراجعة القسم المخصص لذلك!`;
        }
    }

    return res["default"];
}

const handleBotInteraction = (text) => {
    const msg = text || chatInput.value.trim();
    if (msg) {
        if (!text) chatInput.value = '';
        addMessage(msg, 'user');
        
        showTyping();
        
        // Dynamic response time for "Thinking" feel
        const delay = Math.random() * 800 + 1000;
        
        setTimeout(() => {
            removeTyping();
            const response = getBotResponse(msg);
            addMessage(response, 'bot');
        }, delay);
    }
};

if (chatBubble && chatWindow && closeChat && langToggle) {
    updateSuggestions();

    chatBubble.addEventListener('click', () => {
        chatWindow.classList.add('active');
    });

    closeChat.addEventListener('click', () => {
        chatWindow.classList.remove('active');
    });

    langToggle.addEventListener('click', () => {
        currentLang = currentLang === 'EN' ? 'AR' : 'EN';
        langToggle.textContent = currentLang;
        chatInput.placeholder = translations[currentLang].placeholder;
        chatMessages.innerHTML = '';
        addMessage(translations[currentLang].welcome, 'bot');
        updateSuggestions();
    });

    chatSend.addEventListener('click', () => handleBotInteraction());
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleBotInteraction();
    });
}

// AI Neural Architect Logic
const architectBtn = document.getElementById('architect-btn');
const architectInput = document.getElementById('architect-input');
const architectLoader = document.getElementById('architect-loader');
const architectReport = document.getElementById('architect-report');

const architectKnowledge = {
    vision: {
        keywords: ['see', 'detect', 'look', 'image', 'video', 'camera', 'face', 'object', 'scan', 'pathology', 'medical', 'eye'],
        model: 'Convolutional Neural Networks (CNN) / Vision Transformer (ViT)',
        tools: ['PyTorch', 'OpenCV', 'CUDA'],
        project: 'AI Diagnostic System',
        desc: 'Based on your request, I recommend a vision-based architecture using deep layer feature extraction.'
    },
    language: {
        keywords: ['text', 'speak', 'write', 'language', 'translate', 'chat', 'sign', 'speech', 'voice'],
        model: 'Long Short-Term Memory (LSTM) / Transformer / BERT',
        tools: ['PyTorch', 'NLTK', 'MediaPipe'],
        project: 'Ar-SLR: Arab Sign Language Recognizer',
        desc: 'This project requires NLP/Sequence modeling to understand temporal dependencies in communication.'
    },
    robotics: {
        keywords: ['move', 'robot', 'path', 'warehouse', 'warehouse', 'autonomous', 'navigation', 'agent'],
        model: 'Reinforcement Learning (PPO/DQN) / A* Optimization',
        tools: ['ROS2', 'TensorFlow', 'Python'],
        project: 'Neural Pathfinding for Logistics',
        desc: 'A multi-agent reinforcement learning approach would be optimal for dynamic pathfinding.'
    },
    general: {
        model: 'Deep Neural Network (DNN)',
        tools: ['Python', 'Scikit-learn', 'Pandas'],
        project: 'Generic ML Framework',
        desc: 'A robust data pipeline and custom feature engineering would be the starting point for this challenge.'
    }
};

if (architectBtn && architectInput && architectLoader && architectReport) {
    architectBtn.addEventListener('click', () => {
        const input = architectInput.value.trim().toLowerCase();
        if (!input) return;

        // Reset and Show Loader
        architectReport.innerHTML = '';
        architectLoader.style.display = 'flex';
        architectBtn.disabled = true;

        setTimeout(() => {
            architectLoader.style.display = 'none';
            architectBtn.disabled = false;

            // Simple Logic to determine category
            let category = 'general';
            for (let key in architectKnowledge) {
                if (key === 'general') continue;
                if (architectKnowledge[key].keywords.some(k => input.includes(k))) {
                    category = key;
                    break;
                }
            }

            const data = architectKnowledge[category];
            const tags = data.tools.map(t => `<span class="arch-tag">${t}</span>`).join('');

            architectReport.innerHTML = `
                <div class="report-section">
                    <h4>Recommended Model</h4>
                    <div class="report-content">${data.model}</div>
                </div>
                <div class="report-section">
                    <h4>Proposed Tech Stack</h4>
                    <div class="tag-cloud">${tags}</div>
                </div>
                <div class="report-section">
                    <h4>Architect's Note</h4>
                    <div class="report-content">${data.desc}</div>
                </div>
                <div class="relevant-project">
                    <h5>Relevant Reference from My Portfolio:</h5>
                    <p><strong>${data.project}</strong></p>
                    <small>Check the Case Studies section for a deep dive into this logic.</small>
                </div>
            `;
        }, 2500);
    });
}


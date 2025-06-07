document.addEventListener('DOMContentLoaded', function() {
    // ========== Mobile Menu ==========
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navList = document.querySelector('.nav-list');
    
    mobileMenuBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        navList.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });
    
    // Fechar menu ao clicar nos links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            navList.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });
    
    // ========== Header Scroll Effect ==========
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // ========== Full-Page Hero Carousel ==========
    class HeroCarousel {
        constructor() {
            this.slides = document.querySelectorAll('.hero-slide');
            this.indicatorsContainer = document.querySelector('.hero-indicators');
            this.prevBtn = document.querySelector('.hero-prev');
            this.nextBtn = document.querySelector('.hero-next');
            this.currentIndex = 0;
            this.autoRotate = true;
            this.rotateSpeed = 6000; // 6 segundos
            this.touchStartX = 0;
            this.touchEndX = 0;
            
            this.init();
        }
        
        init() {
            this.createIndicators();
            this.setEventListeners();
            this.showSlide(this.currentIndex);
            
            if (this.autoRotate) {
                this.startRotation();
            }
        }
        
        createIndicators() {
            this.slides.forEach((_, index) => {
                const indicator = document.createElement('div');
                indicator.classList.add('hero-indicator');
                indicator.addEventListener('click', () => this.goToSlide(index));
                this.indicatorsContainer.appendChild(indicator);
            });
        }
        
        setEventListeners() {
            // Controles de navegação
            this.prevBtn.addEventListener('click', () => {
                this.prevSlide();
                this.resetRotation();
            });
            
            this.nextBtn.addEventListener('click', () => {
                this.nextSlide();
                this.resetRotation();
            });
            
            // Touch events para mobile
            const heroCarousel = document.querySelector('.hero-carousel');
            heroCarousel.addEventListener('touchstart', (e) => {
                this.touchStartX = e.changedTouches[0].screenX;
            }, { passive: true });
            
            heroCarousel.addEventListener('touchend', (e) => {
                this.touchEndX = e.changedTouches[0].screenX;
                this.handleSwipe();
            }, { passive: true });
            
            // Pausa no hover
            heroCarousel.addEventListener('mouseenter', () => {
                if (this.autoRotate) this.stopRotation();
            });
            
            heroCarousel.addEventListener('mouseleave', () => {
                if (this.autoRotate) this.startRotation();
            });
            
            // Seta de scroll
            document.querySelector('.scroll-down').addEventListener('click', () => {
                const nextSection = document.querySelector('section:not(.hero-carousel)');
                window.scrollTo({
                    top: nextSection.offsetTop,
                    behavior: 'smooth'
                });
            });
        }
        
        handleSwipe() {
            const difference = this.touchStartX - this.touchEndX;
            const swipeThreshold = 50;
            
            if (difference > swipeThreshold) {
                // Swipe para a esquerda (próximo slide)
                this.nextSlide();
            } else if (difference < -swipeThreshold) {
                // Swipe para a direita (slide anterior)
                this.prevSlide();
            }
            
            this.resetRotation();
        }
        
        showSlide(index) {
            // Atualiza índice atual
            this.currentIndex = (index + this.slides.length) % this.slides.length;
            
            // Esconde todos os slides
            this.slides.forEach(slide => {
                slide.classList.remove('active');
                slide.style.zIndex = '0';
            });
            
            // Mostra slide atual
            const currentSlide = this.slides[this.currentIndex];
            currentSlide.classList.add('active');
            currentSlide.style.zIndex = '1';
            
            // Atualiza indicadores
            const indicators = this.indicatorsContainer.querySelectorAll('.hero-indicator');
            indicators.forEach(ind => ind.classList.remove('active'));
            indicators[this.currentIndex].classList.add('active');
        }
        
        nextSlide() {
            this.showSlide(this.currentIndex + 1);
        }
        
        prevSlide() {
            this.showSlide(this.currentIndex - 1);
        }
        
        goToSlide(index) {
            this.showSlide(index);
            this.resetRotation();
        }
        
        startRotation() {
            this.interval = setInterval(() => this.nextSlide(), this.rotateSpeed);
        }
        
        stopRotation() {
            clearInterval(this.interval);
        }
        
        resetRotation() {
            this.stopRotation();
            if (this.autoRotate) this.startRotation();
        }
    }
    
    // ========== Testimonials Carousel ==========
    class TestimonialsCarousel {
        constructor() {
            this.slides = document.querySelectorAll('.depoimento-slide');
            this.indicatorsContainer = document.querySelector('.depoimento-indicators');
            this.prevBtn = document.querySelector('.depoimento-prev');
            this.nextBtn = document.querySelector('.depoimento-next');
            this.currentIndex = 0;
            
            this.init();
        }
        
        init() {
            this.createIndicators();
            this.setEventListeners();
            this.showSlide(this.currentIndex);
        }
        
        createIndicators() {
            this.slides.forEach((_, index) => {
                const indicator = document.createElement('div');
                indicator.classList.add('depoimento-indicator');
                indicator.addEventListener('click', () => this.goToSlide(index));
                this.indicatorsContainer.appendChild(indicator);
            });
        }
        
        setEventListeners() {
            this.prevBtn.addEventListener('click', () => this.prevSlide());
            this.nextBtn.addEventListener('click', () => this.nextSlide());
        }
        
        showSlide(index) {
            // Atualiza índice atual
            this.currentIndex = (index + this.slides.length) % this.slides.length;
            
            // Esconde todos os slides
            this.slides.forEach(slide => slide.classList.remove('active'));
            
            // Mostra slide atual
            this.slides[this.currentIndex].classList.add('active');
            
            // Atualiza indicadores
            const indicators = this.indicatorsContainer.querySelectorAll('.depoimento-indicator');
            indicators.forEach(ind => ind.classList.remove('active'));
            indicators[this.currentIndex].classList.add('active');
        }
        
        nextSlide() {
            this.showSlide(this.currentIndex + 1);
        }
        
        prevSlide() {
            this.showSlide(this.currentIndex - 1);
        }
        
        goToSlide(index) {
            this.showSlide(index);
        }
    }
    
    // ========== Results Chart ==========
    function initResultsChart() {
        const ctx = document.getElementById('resultsChart').getContext('2d');
        return new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Acompanhamento', 'Coaching', 'Consultoria', 'Formação', 'Desporto', 'Recrutamento'],
                datasets: [{
                    label: 'Taxa de Sucesso (%)',
                    data: [85, 82, 78, 80, 88, 75],
                    backgroundColor: 'rgba(52, 152, 219, 0.7)',
                    borderColor: 'rgba(52, 152, 219, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.parsed.y + '% de sucesso';
                            }
                        }
                    }
                }
            }
        });
    }
    
    // ========== Smooth Scrolling ==========
    function initSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // ========== Form Submission ==========
    function initContactForm() {
        const contactForm = document.getElementById('contactForm');
        if (!contactForm) return;
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulação de envio - substituir por código real
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.disabled = true;
            submitBtn.textContent = 'Enviando...';
            
            setTimeout(() => {
                // Aqui você normalmente faria uma requisição AJAX
                alert('Mensagem enviada com sucesso! Entrarei em contato em breve.');
                
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
                contactForm.reset();
            }, 1500);
        });
    }
    
    // ========== Detect Touch Device ==========
    function detectTouchDevice() {
        return ('ontouchstart' in window) || 
               (navigator.maxTouchPoints > 0) || 
               (navigator.msMaxTouchPoints > 0);
    }
    
    // ========== Animation on Scroll ==========
    function initScrollAnimations() {
        const animateElements = document.querySelectorAll(
            '.section-title, .section-subtitle, .sobre-destaque, ' +
            '.servico-card, .resultado-stat, .depoimento-card, .info-card'
        );
        
        function checkElements() {
            animateElements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (elementTop < windowHeight * 0.85) {
                    element.classList.add('animated');
                }
            });
        }
        
        window.addEventListener('scroll', checkElements);
        window.addEventListener('load', checkElements);
        checkElements(); // Verifica elementos já visíveis no carregamento
    }
    
    // ========== Initialize All ==========
    function initAll() {
        // Verifica se é dispositivo touch
        if (detectTouchDevice()) {
            document.body.classList.add('touch-device');
        }
        
        // Inicializa componentes
        new HeroCarousel();
        new TestimonialsCarousel();
        initResultsChart();
        initSmoothScrolling();
        initContactForm();
        initScrollAnimations();
    }
    
    // Inicia tudo quando o DOM estiver pronto
    initAll();
});
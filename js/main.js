document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navList = document.querySelector('.nav-list');
    
    mobileMenuBtn.addEventListener('click', function() {
        navList.classList.toggle('active');
        this.querySelector('i').classList.toggle('fa-bars');
        this.querySelector('i').classList.toggle('fa-times');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navList.classList.remove('active');
            mobileMenuBtn.querySelector('i').classList.add('fa-bars');
            mobileMenuBtn.querySelector('i').classList.remove('fa-times');
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Hero Carousel
    const heroSlides = document.querySelectorAll('.hero-slide');
    const heroPrevBtn = document.querySelector('.hero-prev');
    const heroNextBtn = document.querySelector('.hero-next');
    let currentHeroSlide = 0;
    let heroInterval;
    
    function showHeroSlide(n) {
        heroSlides.forEach(slide => slide.classList.remove('active'));
        currentHeroSlide = (n + heroSlides.length) % heroSlides.length;
        heroSlides[currentHeroSlide].classList.add('active');
        updateHeroIndicators();
    }
    
    function nextHeroSlide() {
        showHeroSlide(currentHeroSlide + 1);
    }
    
    function prevHeroSlide() {
        showHeroSlide(currentHeroSlide - 1);
    }
    
    function updateHeroIndicators() {
        const indicators = document.querySelectorAll('.hero-indicator');
        indicators.forEach((indicator, index) => {
            if (index === currentHeroSlide) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }
    
    function createHeroIndicators() {
        const indicatorsContainer = document.querySelector('.hero-indicators');
        heroSlides.forEach((_, index) => {
            const indicator = document.createElement('div');
            indicator.classList.add('hero-indicator');
            if (index === 0) indicator.classList.add('active');
            indicator.addEventListener('click', () => showHeroSlide(index));
            indicatorsContainer.appendChild(indicator);
        });
    }
    
    function startHeroInterval() {
        heroInterval = setInterval(nextHeroSlide, 5000);
    }
    
    function resetHeroInterval() {
        clearInterval(heroInterval);
        startHeroInterval();
    }
    
    heroPrevBtn.addEventListener('click', function() {
        prevHeroSlide();
        resetHeroInterval();
    });
    
    heroNextBtn.addEventListener('click', function() {
        nextHeroSlide();
        resetHeroInterval();
    });
    
    // Pause on hover
    document.querySelector('.hero-carousel').addEventListener('mouseenter', function() {
        clearInterval(heroInterval);
    });
    
    document.querySelector('.hero-carousel').addEventListener('mouseleave', function() {
        startHeroInterval();
    });
    
    // Initialize
    createHeroIndicators();
    startHeroInterval();
    
    // Testimonials Carousel
    const testimonialSlides = document.querySelectorAll('.depoimento-slide');
    const testimonialPrevBtn = document.querySelector('.depoimento-prev');
    const testimonialNextBtn = document.querySelector('.depoimento-next');
    let currentTestimonialSlide = 0;
    
    function showTestimonialSlide(n) {
        testimonialSlides.forEach(slide => slide.classList.remove('active'));
        currentTestimonialSlide = (n + testimonialSlides.length) % testimonialSlides.length;
        testimonialSlides[currentTestimonialSlide].classList.add('active');
        updateTestimonialIndicators();
    }
    
    function nextTestimonialSlide() {
        showTestimonialSlide(currentTestimonialSlide + 1);
    }
    
    function prevTestimonialSlide() {
        showTestimonialSlide(currentTestimonialSlide - 1);
    }
    
    function updateTestimonialIndicators() {
        const indicators = document.querySelectorAll('.depoimento-indicator');
        indicators.forEach((indicator, index) => {
            if (index === currentTestimonialSlide) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }
    
    function createTestimonialIndicators() {
        const indicatorsContainer = document.querySelector('.depoimento-indicators');
        testimonialSlides.forEach((_, index) => {
            const indicator = document.createElement('div');
            indicator.classList.add('depoimento-indicator');
            if (index === 0) indicator.classList.add('active');
            indicator.addEventListener('click', () => showTestimonialSlide(index));
            indicatorsContainer.appendChild(indicator);
        });
    }
    
    testimonialPrevBtn.addEventListener('click', prevTestimonialSlide);
    testimonialNextBtn.addEventListener('click', nextTestimonialSlide);
    
    // Initialize
    createTestimonialIndicators();
    
    // Results Chart
    const ctx = document.getElementById('resultsChart').getContext('2d');
    const resultsChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Acompanhamento', 'Coaching', 'Consultoria', 'Formação', 'Desporto', 'Recrutamento'],
            datasets: [{
                label: 'Taxa de Sucesso (%)',
                data: [85, 82, 78, 80, 88, 75],
                backgroundColor: [
                    'rgba(52, 152, 219, 0.7)',
                    'rgba(52, 152, 219, 0.7)',
                    'rgba(52, 152, 219, 0.7)',
                    'rgba(52, 152, 219, 0.7)',
                    'rgba(52, 152, 219, 0.7)',
                    'rgba(52, 152, 219, 0.7)'
                ],
                borderColor: [
                    'rgba(52, 152, 219, 1)',
                    'rgba(52, 152, 219, 1)',
                    'rgba(52, 152, 219, 1)',
                    'rgba(52, 152, 219, 1)',
                    'rgba(52, 152, 219, 1)',
                    'rgba(52, 152, 219, 1)'
                ],
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
    
    // Smooth scrolling for anchor links
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
    
    // Form submission
    const contactForm = document.querySelector('.contato-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Here you would typically send the form data to a server
            // For demonstration, we'll just show an alert
            alert('Mensagem enviada com sucesso! Entrarei em contato em breve.');
            this.reset();
        });
    }
    
    // Animation on scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.section-title, .section-subtitle, .sobre-destaque, .servico-card, .resultado-stat, .depoimento-card, .info-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animated');
            }
        });
    }
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on page load
});
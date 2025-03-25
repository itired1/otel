document.addEventListener('DOMContentLoaded', function() {
    // Инициализация демо-формы
    const demoForm = document.getElementById('demo-form');
    const calculateBtn = document.getElementById('calculate-btn');
    const resultValue = document.getElementById('result-value');
    
    if (calculateBtn) {
        calculateBtn.addEventListener('click', function() {
            // Простая логика расчета скидки
            const city = document.getElementById('demo-city').value;
            const days = parseInt(document.getElementById('demo-days').value);
            const category = parseInt(document.getElementById('demo-category').value);
            
            let discount = 0;
            
            // Логика расчета скидки
            if (days >= 7) discount += 15;
            if (days >= 14) discount += 10;
            if (category >= 4) discount += 5;
            if (city === 'sochi') discount += 5;
            
            // Ограничение максимальной скидки
            discount = Math.min(discount, 30);
            
            // Анимация изменения значения
            animateValue(resultValue, 0, discount, 1000);
        });
    }
    
    // Форма поиска
    const searchForm = document.getElementById('test-0-search');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Здесь должна быть логика поиска и перехода на страницу результатов
            window.location.href = 'search.html';
        });
    }
    
    // Форма подписки
    const subscribeForm = document.querySelector('.subscribe-form');
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            alert(`Спасибо за подписку! На адрес ${email} будут приходить эксклюзивные предложения.`);
            this.reset();
        });
    }
    
    // Инициализация прогресс-баров
    const progressBars = document.querySelectorAll('.progress-bar');
    progressBars.forEach(bar => {
        const value = bar.dataset.value;
        bar.style.width = `${value}%`;
    });
    
    // Плавная прокрутка для якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Анимация при скролле
    initScrollAnimations();
});

// Функция для анимации числовых значений
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value + '%';
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Инициализация анимаций при скролле
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.infographic__item, .advantage-card, .promo-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}
// Инициализация всех форм
function initForms() {
    // Валидация форм
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function(e) {
            let valid = true;
            
            // Проверка обязательных полей
            this.querySelectorAll('[required]').forEach(input => {
                if (!input.value.trim()) {
                    input.classList.add('error');
                    valid = false;
                } else {
                    input.classList.remove('error');
                }
            });
            
            if (!valid) {
                e.preventDefault();
                alert('Пожалуйста, заполните все обязательные поля');
            }
        });
    });
    
    // Обработка ошибок полей
    document.querySelectorAll('input, select, textarea').forEach(input => {
        input.addEventListener('input', function() {
            this.classList.remove('error');
        });
    });
}

// Инициализация всех страниц
function initPages() {
    // Добавляем класс для текущей страницы
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav__link').forEach(link => {
        const linkPath = link.getAttribute('href').split('/').pop();
        if (linkPath === currentPath) {
            link.classList.add('active');
        }
    });
    
    // Инициализация анимаций при скролле
    initScrollAnimations();
}

// Запуск всех инициализаций
document.addEventListener('DOMContentLoaded', function() {
    initForms();
    initPages();
    
    // Дополнительные инициализации для конкретных страниц
    if (document.querySelector('.room-details')) {
        // Инициализация для страницы номера
    }
    
    if (document.querySelector('.auth-section')) {
        // Инициализация для страниц авторизации
    }
});
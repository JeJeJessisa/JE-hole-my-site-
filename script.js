// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 为卡片添加悬停效果
    const cards = document.querySelectorAll('.award-card, .hobby-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // 平滑滚动效果
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 数字计数动画
    function animateCounter(element, target, duration) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        }
        
        updateCounter();
    }

    // 滚动时的渐入效果
    function handleScrollAnimation() {
        const elements = document.querySelectorAll('.section-title, .award-card, .hobby-card');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }

    // 初始设置
    function init() {
        const animatedElements = document.querySelectorAll('.section-title, .award-card, .hobby-card');
        animatedElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
        
        // 触发一次滚动动画
        handleScrollAnimation();
    }

    // 事件监听
    window.addEventListener('scroll', handleScrollAnimation);
    
    // 初始化
    init();

    // 添加随机浮动效果
    function randomFloat() {
        const cards = document.querySelectorAll('.award-card, .hobby-card');
        cards.forEach(card => {
            const randomX = (Math.random() - 0.5) * 10;
            const randomY = (Math.random() - 0.5) * 10;
            card.style.transform = `translate(${randomX}px, ${randomY}px)`;
        });
        
        setTimeout(randomFloat, 3000);
    }
    
    // 启动随机浮动效果
    setTimeout(randomFloat, 2000);

    // 添加点击效果
    document.addEventListener('click', function(e) {
        if (e.target.tagName === 'BUTTON' || e.target.classList.contains('card')) {
            const ripple = document.createElement('span');
            const rect = e.target.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            ripple.classList.add('ripple');
            
            e.target.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        }
    });
});

// 添加CSS动画效果
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
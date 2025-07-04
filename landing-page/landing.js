// Landing Page JavaScript
class LandingPage {
    constructor() {
        this.apiBaseUrl = 'https://betbay-backend.vercel.app';//'https://betabay.vercel.app';
        this.init();
    }

    init() {
        this.bindEvents();
        this.handleAuthCallback();
        this.animateOnScroll();
    }

    bindEvents() {
        // Login buttons
        const loginButtons = document.querySelectorAll('#login-btn, #cta-login, #final-cta');
        loginButtons.forEach(btn => {
            btn.addEventListener('click', () => this.login());
        });

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    login() {
        // Redirect to backend OAuth
        window.location.href = `${this.apiBaseUrl}/api/auth/slack`;
    }

    handleAuthCallback() {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        const authStatus = urlParams.get('auth');
        
        if (token && authStatus === 'success') {
            // Store token and redirect to main app
            localStorage.setItem('authToken', token);
            
            // Show success message
            this.showNotification('Successfully logged in! Redirecting...', 'success');
            
            // Redirect to main app after a short delay
            setTimeout(() => {
                window.location.href = '/public/'; // or wherever your main app is hosted
            }, 2000);
            
        } else if (authStatus === 'error') {
            this.showNotification('Authentication failed. Please try again.', 'error');
            // Clean up URL
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">
                    ${type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ'}
                </span>
                <span class="notification-message">${message}</span>
            </div>
        `;

        // Add styles if not already present
        if (!document.querySelector('#notification-styles')) {
            const styles = document.createElement('style');
            styles.id = 'notification-styles';
            styles.textContent = `
                .notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    padding: 16px 24px;
                    border-radius: 8px;
                    color: white;
                    font-weight: 500;
                    z-index: 10000;
                    transform: translateX(400px);
                    transition: transform 0.3s ease;
                    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
                }
                .notification.show {
                    transform: translateX(0);
                }
                .notification-success {
                    background: linear-gradient(135deg, #48bb78, #38a169);
                }
                .notification-error {
                    background: linear-gradient(135deg, #f56565, #e53e3e);
                }
                .notification-info {
                    background: linear-gradient(135deg, #4299e1, #3182ce);
                }
                .notification-content {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }
                .notification-icon {
                    font-weight: bold;
                    font-size: 16px;
                }
            `;
            document.head.appendChild(styles);
        }

        // Add to DOM
        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => notification.classList.add('show'), 100);

        // Remove after delay
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    }

    animateOnScroll() {
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Add animation styles and observe elements
        const animatedElements = document.querySelectorAll('.feature-card, .step, .stat, .app-card');
        animatedElements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
            observer.observe(el);
        });

        // Parallax effect for hero visual
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const heroVisual = document.querySelector('.hero-visual');
            if (heroVisual) {
                heroVisual.style.transform = `translateY(${scrolled * 0.2}px)`;
            }
        });
    }

    // Counter animation for stats
    animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        counters.forEach(counter => {
            const target = parseInt(counter.textContent.replace(/[^0-9]/g, ''));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += step;
                if (current >= target) {
                    counter.textContent = counter.textContent.replace(/[0-9,]+/, target.toLocaleString());
                } else {
                    counter.textContent = counter.textContent.replace(/[0-9,]+/, Math.floor(current).toLocaleString());
                    requestAnimationFrame(updateCounter);
                }
            };

            // Start animation when element is visible
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        updateCounter();
                        observer.unobserve(entry.target);
                    }
                });
            });

            observer.observe(counter);
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new LandingPage();
});

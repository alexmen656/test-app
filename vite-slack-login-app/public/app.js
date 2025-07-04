class BetaBayApp {
    constructor() {
        this.user = null;
        this.apps = [];
        this.authToken = null;
        // API Base URL - change this to your deployed backend URL
        this.apiBaseUrl = 'https://betbay-backend.vercel.app';//'https://betabay.vercel.app';
        this.init();
    }

    init() {
        this.bindEvents();
        this.handleAuthCallback();
        this.checkAuthStatus();
    }

    bindEvents() {
        // Login/Logout buttons
        document.getElementById('login-btn').addEventListener('click', () => this.login());
        document.getElementById('logout-btn').addEventListener('click', () => this.logout());

        // Modal events
        document.getElementById('submit-app-btn').addEventListener('click', () => this.openSubmitModal());
        document.getElementById('close-modal').addEventListener('click', () => this.closeSubmitModal());
        document.getElementById('cancel-submit').addEventListener('click', () => this.closeSubmitModal());
        
        // Form submission
        document.getElementById('submit-form').addEventListener('submit', (e) => this.submitApp(e));

        // Close modal when clicking outside
        document.getElementById('submit-modal').addEventListener('click', (e) => {
            if (e.target === document.getElementById('submit-modal')) {
                this.closeSubmitModal();
            }
        });

        // ESC key to close modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && document.getElementById('submit-modal').style.display === 'block') {
                this.closeSubmitModal();
            }
        });
    }

    handleAuthCallback() {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        const authStatus = urlParams.get('auth');
        
        if (token && authStatus === 'success') {
            // Store token in localStorage
            localStorage.setItem('authToken', token);
            this.authToken = token;
            
            // Clean up URL
            window.history.replaceState({}, document.title, window.location.pathname);
        } else if (authStatus === 'error') {
            this.showError('Authentication failed. Please try again.');
            // Clean up URL
            window.history.replaceState({}, document.title, window.location.pathname);
        }
        
        // Load token from localStorage if available
        if (!this.authToken) {
            this.authToken = localStorage.getItem('authToken');
        }
    }

    async checkAuthStatus() {
        try {
            this.showLoading(true);
            
            const headers = {};
            if (this.authToken) {
                headers['Authorization'] = `Bearer ${this.authToken}`;
            }
            
            const response = await fetch(`${this.apiBaseUrl}/api/auth/user`, {
                headers,
                credentials: 'include'
            });
            
            if (response.ok) {
                const userData = await response.json();
                this.setUser(userData);
                await this.loadApps();
            } else {
                this.setUser(null);
            }
        } catch (error) {
            console.error('Error checking auth status:', error);
            this.setUser(null);
        } finally {
            this.showLoading(false);
        }
    }

    login() {
        window.location.href = `${this.apiBaseUrl}/api/auth/slack`;
    }

    async logout() {
        try {
            this.showLoading(true);
            
            const headers = {};
            if (this.authToken) {
                headers['Authorization'] = `Bearer ${this.authToken}`;
            }
            
            const response = await fetch(`${this.apiBaseUrl}/api/logout`, { 
                method: 'POST',
                credentials: 'include',
                headers
            });
            
            // Clear token regardless of response
            localStorage.removeItem('authToken');
            this.authToken = null;
            this.setUser(null);
            
            if (response.ok) {
                this.showNotification('Successfully logged out', 'success');
            } else {
                this.showNotification('Error during logout', 'error');
            }
        } catch (error) {
            console.error('Logout error:', error);
            // Still clear local data
            localStorage.removeItem('authToken');
            this.authToken = null;
            this.setUser(null);
            this.showNotification('Error during logout', 'error');
        } finally {
            this.showLoading(false);
        }
    }

    setUser(userData) {
        this.user = userData;
        this.updateUI();
    }

    updateUI() {
        const loginBtn = document.getElementById('login-btn');
        const userInfo = document.getElementById('user-info');
        const welcomeSection = document.getElementById('welcome-section');
        const dashboardSection = document.getElementById('dashboard-section');

        if (this.user) {
            // Show user info, hide login button
            loginBtn.style.display = 'none';
            userInfo.style.display = 'flex';
            
            // Update user info
            document.getElementById('user-name').textContent = this.user.name;
            document.getElementById('user-avatar').src = this.user.image || '/default-avatar.svg';
            document.getElementById('user-avatar').alt = `${this.user.name} Avatar`;

            // Show dashboard, hide welcome
            welcomeSection.style.display = 'none';
            dashboardSection.style.display = 'block';
        } else {
            // Show login button, hide user info
            loginBtn.style.display = 'inline-flex';
            userInfo.style.display = 'none';

            // Show welcome, hide dashboard
            welcomeSection.style.display = 'block';
            dashboardSection.style.display = 'none';
        }
    }

    async loadApps() {
        try {
            const response = await fetch(`${this.apiBaseUrl}/api/apps`, {
                credentials: 'include'
            });
            if (response.ok) {
                this.apps = await response.json();
                this.renderApps();
            } else {
                this.showNotification('Fehler beim Laden der Apps', 'error');
            }
        } catch (error) {
            console.error('Error loading apps:', error);
            this.showNotification('Fehler beim Laden der Apps', 'error');
        }
    }

    renderApps() {
        const appsList = document.getElementById('apps-list');
        
        if (this.apps.length === 0) {
            appsList.innerHTML = '<p class="no-apps">Noch keine Apps verfügbar.</p>';
            return;
        }

        appsList.innerHTML = this.apps.map(app => `
            <div class="app-card" onclick="appInstance.viewApp(${app.id})">
                <h4>${this.escapeHtml(app.name)}</h4>
                <p>${this.escapeHtml(app.description)}</p>
                <div class="app-meta">
                    <span>Von: ${this.escapeHtml(app.submittedBy)}</span>
                    <span class="app-status ${app.status === 'approved' ? 'status-approved' : 'status-pending'}">
                        ${app.status === 'approved' ? '✅ Genehmigt' : '⏳ Ausstehend'}
                    </span>
                </div>
                <div class="app-meta" style="margin-top: 0.5rem;">
                    <span>Kategorie: ${this.escapeHtml(app.category)}</span>
                    <span>Eingereicht: ${app.submitDate}</span>
                </div>
            </div>
        `).join('');
    }

    viewApp(appId) {
        const app = this.apps.find(a => a.id === appId);
        if (app) {
            this.showNotification(`App "${app.name}" wird geöffnet...`, 'info');
            // In einer echten App würde hier die App geöffnet oder mehr Details angezeigt
            if (app.url) {
                window.open(app.url, '_blank');
            }
        }
    }

    openSubmitModal() {
        if (!this.user) {
            this.showNotification('Bitte melde dich zuerst an', 'warning');
            return;
        }
        document.getElementById('submit-modal').style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    closeSubmitModal() {
        document.getElementById('submit-modal').style.display = 'none';
        document.body.style.overflow = 'auto';
        document.getElementById('submit-form').reset();
    }

    async submitApp(event) {
        event.preventDefault();
        
        const formData = new FormData(event.target);
        const appData = {
            name: formData.get('name'),
            description: formData.get('description'),
            category: formData.get('category'),
            url: formData.get('url') || null
        };

        // Validation
        if (!appData.name || !appData.description || !appData.category) {
            this.showNotification('Bitte fülle alle Pflichtfelder aus', 'error');
            return;
        }

        try {
            this.showLoading(true);
            
            const headers = {
                'Content-Type': 'application/json',
            };
            
            if (this.authToken) {
                headers['Authorization'] = `Bearer ${this.authToken}`;
            }
            
            const response = await fetch(`${this.apiBaseUrl}/api/apps`, {
                method: 'POST',
                headers,
                credentials: 'include',
                body: JSON.stringify(appData)
            });

            if (response.ok) {
                const newApp = await response.json();
                this.apps.unshift(newApp); // Add to beginning of array
                this.renderApps();
                this.closeSubmitModal();
                this.showNotification('App successfully submitted!', 'success');
            } else {
                const error = await response.json();
                this.showNotification(error.error || 'Error submitting app', 'error');
            }
        } catch (error) {
            console.error('Submit error:', error);
            this.showNotification('Fehler beim Einreichen der App', 'error');
        } finally {
            this.showLoading(false);
        }
    }

    showLoading(show) {
        const loading = document.getElementById('loading');
        loading.style.display = show ? 'flex' : 'none';
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">${this.getNotificationIcon(type)}</span>
                <span class="notification-message">${this.escapeHtml(message)}</span>
                <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
            </div>
        `;

        // Add styles if not already added
        if (!document.getElementById('notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                .notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    z-index: 3000;
                    max-width: 400px;
                    border-radius: 8px;
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
                    animation: slideIn 0.3s ease;
                }
                .notification-content {
                    display: flex;
                    align-items: center;
                    padding: 1rem;
                    gap: 0.75rem;
                }
                .notification-success { background: #d1fae5; color: #065f46; border-left: 4px solid #10b981; }
                .notification-error { background: #fee2e2; color: #991b1b; border-left: 4px solid #ef4444; }
                .notification-warning { background: #fef3c7; color: #92400e; border-left: 4px solid #f59e0b; }
                .notification-info { background: #dbeafe; color: #1e40af; border-left: 4px solid #3b82f6; }
                .notification-close {
                    background: none;
                    border: none;
                    font-size: 1.2rem;
                    cursor: pointer;
                    opacity: 0.7;
                    margin-left: auto;
                }
                .notification-close:hover { opacity: 1; }
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
            `;
            document.head.appendChild(style);
        }

        // Add to page
        document.body.appendChild(notification);

        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 5000);
    }

    getNotificationIcon(type) {
        const icons = {
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️'
        };
        return icons[type] || icons.info;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize the app
const appInstance = new BetaBayApp();

// Handle page load from Slack redirect
window.addEventListener('load', () => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('auth') === 'success') {
        appInstance.showNotification('Erfolgreich mit Slack angemeldet!', 'success');
        // Clean up URL
        window.history.replaceState({}, document.title, window.location.pathname);
    } else if (urlParams.get('auth') === 'error') {
        appInstance.showNotification('Fehler bei der Slack-Anmeldung', 'error');
        window.history.replaceState({}, document.title, window.location.pathname);
    }
});

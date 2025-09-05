/* ===== BOUTON CHAT FLOTTANT QUALIOPI ===== */
/* Fichier: assets/js/chat-button.js */

/**
 * Configuration du chat Qualiopi
 */
const CHAT_CONFIG = {
    url: 'https://omiaio.app.n8n.cloud/webhook/84f2dfa8-4ab8-4c54-998e-a1f69c3fb107/chat',
    windowFeatures: {
        width: 450,
        height: 700,
        scrollbars: 'yes',
        resizable: 'yes'
    },
    animations: {
        delayBeforeShow: 2000, // 2 secondes
        enablePulse: false // Animation pulse pour attirer l'attention
    }
};

/**
 * Fonction principale pour ouvrir le chat Qualiopi
 */
function openQualiopiChat() {
    const { width, height } = CHAT_CONFIG.windowFeatures;
    const left = (screen.width / 2) - (width / 2);
    const top = (screen.height / 2) - (height / 2);
    
    const features = `width=${width},height=${height},scrollbars=${CHAT_CONFIG.windowFeatures.scrollbars},resizable=${CHAT_CONFIG.windowFeatures.resizable},left=${left},top=${top}`;
    
    try {
        window.open(CHAT_CONFIG.url, '_blank', features);
        
        // Analytics (optionnel)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'chat_opened', {
                event_category: 'engagement',
                event_label: 'qualiopi_assistant'
            });
        }
    } catch (error) {
        console.error('Erreur lors de l\'ouverture du chat:', error);
        // Fallback: ouvrir dans le même onglet
        window.location.href = CHAT_CONFIG.url;
    }
}

/**
 * Animation d'apparition du bouton au chargement
 */
function initChatButtonAnimation() {
    const floatButton = document.getElementById('chat-float-button');
    if (!floatButton) return;

    // Style initial (invisible)
    floatButton.style.opacity = '0';
    floatButton.style.transform = 'translateY(100px)';
    floatButton.style.transition = 'all 0.5s ease';
    
    // Animation d'entrée après délai
    setTimeout(() => {
        floatButton.style.opacity = '1';
        floatButton.style.transform = 'translateY(0)';
        floatButton.classList.add('animate-in');
        
        // Animation pulse optionnelle
        if (CHAT_CONFIG.animations.enablePulse) {
            setTimeout(() => {
                floatButton.classList.add('pulse');
            }, 1000);
        }
    }, CHAT_CONFIG.animations.delayBeforeShow);
}

/**
 * Création dynamique du bouton (alternative au HTML statique)
 */
function createChatButton() {
    const chatButton = document.createElement('div');
    chatButton.id = 'chat-float-button';
    chatButton.className = 'chat-float-button';
    chatButton.innerHTML = `
        <button onclick="openQualiopiChat()" title="Assistant Qualiopi - Posez vos questions" aria-label="Ouvrir l'assistant Qualiopi">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 13.54 2.38 14.99 3.06 16.26L2 22L7.74 20.94C9.01 21.62 10.46 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C10.74 20 9.54 19.67 8.5 19.09L8.19 18.93L4.93 19.78L5.78 16.52L5.62 16.21C5.04 15.17 4.71 13.97 4.71 12.71C4.71 7.98 8.27 4.29 12.71 4.29C17.15 4.29 20.71 7.98 20.71 12.71C20.71 17.44 17.15 21.13 12.71 21.13L12 20Z" fill="currentColor"/>
                <path d="M8.5 9.5C8.5 9.22 8.72 9 9 9H15C15.28 9 15.5 9.22 15.5 9.5C15.5 9.78 15.28 10 15 10H9C8.72 10 8.5 9.78 8.5 9.5ZM8.5 12C8.5 11.72 8.72 11.5 9 11.5H15C15.28 11.5 15.5 11.72 15.5 12C15.5 12.28 15.28 12.5 15 12.5H9C8.72 12.5 8.5 12.28 8.5 12ZM8.5 14.5C8.5 14.22 8.72 14 9 14H13C13.28 14 13.5 14.22 13.5 14.5C13.5 14.78 13.28 15 13 15H9C8.72 15 8.5 14.78 8.5 14.5Z" fill="currentColor"/>
            </svg>
            <span>Assistant Qualiopi</span>
        </button>
    `;
    
    document.body.appendChild(chatButton);
    return chatButton;
}

/**
 * Fonction pour désactiver/réactiver le bouton
 */
function toggleChatButton(enable = true) {
    const button = document.querySelector('.chat-float-button button');
    if (button) {
        button.disabled = !enable;
        button.style.opacity = enable ? '1' : '0.5';
        button.style.cursor = enable ? 'pointer' : 'not-allowed';
    }
}

/**
 * Fonction pour cacher/montrer le bouton selon la page
 */
function hideChatButtonOnPages(pagesToHide = []) {
    const currentPage = window.location.pathname.split('/').pop();
    const shouldHide = pagesToHide.some(page => currentPage.includes(page));
    
    const chatButton = document.getElementById('chat-float-button');
    if (chatButton && shouldHide) {
        chatButton.style.display = 'none';
    }
}

/**
 * Initialisation au chargement du DOM
 */
document.addEventListener('DOMContentLoaded', function() {
    // Vérifier si le bouton existe déjà dans le HTML
    let chatButton = document.getElementById('chat-float-button');
    
    // Si pas de bouton dans le HTML, le créer dynamiquement (décommentez si besoin)
    // if (!chatButton) {
    //     chatButton = createChatButton();
    // }
    
    // Initialiser l'animation
    if (chatButton) {
        initChatButtonAnimation();
    }
    
    // Masquer sur certaines pages (optionnel)
    // hideChatButtonOnPages(['admin', 'login', 'checkout']);
    
    console.log('✅ Bouton chat Qualiopi initialisé');
});

/**
 * Gestion des erreurs
 */
window.addEventListener('error', function(e) {
    if (e.filename && e.filename.includes('chat-button')) {
        console.warn('Erreur dans le bouton chat:', e.message);
    }
});

/**
 * Export pour modules ES6 (optionnel)
 */
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        openQualiopiChat,
        createChatButton,
        toggleChatButton,
        CHAT_CONFIG
    };
}

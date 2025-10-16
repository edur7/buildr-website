// Main JavaScript functionality - Restored

// --- Particle Animation ---
function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const size = Math.random() * 15 + 5;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.bottom = '-50px';
    
    const duration = Math.random() * 10 + 10;
    particle.style.animation = `float-particle ${duration}s linear`;
    
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
        particlesContainer.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, duration * 1000);
    }
}

function initializeParticles() {
    // Ensure particles only run if the container exists on the page
    if (document.getElementById('particles')) {
        setInterval(createParticle, 500);
    }
}

// --- Lightbox functionality (Robust addEventListener version) ---
function openLightbox(imgSrc) {
    const oldLightbox = document.getElementById('image-lightbox');
    if (oldLightbox) {
        oldLightbox.remove();
    }

    const lightbox = document.createElement('div');
    lightbox.id = 'image-lightbox';
    lightbox.style.position = 'fixed';
    lightbox.style.zIndex = '10000';
    lightbox.style.left = '0';
    lightbox.style.top = '0';
    lightbox.style.width = '100%';
    lightbox.style.height = '100%';
    lightbox.style.backgroundColor = 'rgba(0,0,0,0.9)';
    lightbox.style.display = 'flex';
    lightbox.style.alignItems = 'center';
    lightbox.style.justifyContent = 'center';

    const lightboxImg = document.createElement('img');
    lightboxImg.src = imgSrc;
    lightboxImg.style.maxWidth = '98%';
    lightboxImg.style.maxHeight = '98%';

    const closeBtn = document.createElement('span');
    closeBtn.innerHTML = '&times;';
    closeBtn.style.position = 'absolute';
    closeBtn.style.top = '15px';
    closeBtn.style.right = '35px';
    closeBtn.style.color = '#fff';
    closeBtn.style.fontSize = '40px';
    closeBtn.style.fontWeight = 'bold';
    closeBtn.style.cursor = 'pointer';

    closeBtn.addEventListener('click', closeLightbox);
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    lightbox.appendChild(lightboxImg);
    lightbox.appendChild(closeBtn);
    document.body.appendChild(lightbox);
}

function closeLightbox() {
    const lightbox = document.getElementById('image-lightbox');
    if (lightbox) {
        lightbox.remove();
    }
}

// --- Initialize all functionalities ---
document.addEventListener('DOMContentLoaded', function() {
    initializeParticles();
    // Other general initializations can be added here in the future
});

// Make lightbox function globally available for carousel.js
window.openLightbox = openLightbox;
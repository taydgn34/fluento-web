// EmailJS configuration
const EMAILJS_SERVICE_ID = 'service_vc8nz2w';
const EMAILJS_TEMPLATE_ID = 'template_0ros6rh';
const EMAILJS_PUBLIC_KEY = 'QjvtJGpdpKl8wK7i5';

// Initialize EmailJS (will be loaded from CDN)
function initEmailJS() {
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_PUBLIC_KEY);
    }
}

// Carousel functionality for mobile
let slideIndex = 1;

function currentSlide(n) {
    showSlide(slideIndex = n);
}

function showSlide(n) {
    const slides = document.getElementsByClassName("carousel-item");
    const dots = document.getElementsByClassName("dot");
    
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active");
    }
    
    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove("active");
    }
    
    if (slides[slideIndex - 1]) {
        slides[slideIndex - 1].classList.add("active");
    }
    
    if (dots[slideIndex - 1]) {
        dots[slideIndex - 1].classList.add("active");
    }
}

// Auto-slide functionality for mobile carousel
function autoSlide() {
    slideIndex++;
    if (slideIndex > document.getElementsByClassName("carousel-item").length) {
        slideIndex = 1;
    }
    showSlide(slideIndex);
}

// Start auto-slide only on mobile devices
function startAutoSlide() {
    if (window.innerWidth <= 768) {
        setInterval(autoSlide, 4000); // Change slide every 4 seconds
    }
}

// Email validation function
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Send email notification
async function sendEmailNotification(email) {
    console.log('EmailJS gönderimi başlıyor...');
    try {
        if (typeof emailjs === 'undefined') {
            console.error('EmailJS not loaded');
            return false;
        }

        const templateParams = {
            to_email: 'fluentomailservices@gmail.com', // Buraya kendi email adresinizi yazın
            user_email: email,
            message: `Yeni waitlist kaydı: ${email}`,
            subject: 'Fluento - Yeni Waitlist Kaydı'
        };

        console.log('EmailJS parametreleri:', templateParams);

        const response = await emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID,
            templateParams
        );

        console.log('Email sent successfully:', response);
        return true;
    } catch (error) {
        console.error('Email sending failed:', error);
        return false;
    }
}

// Form submission handling function
async function handleFormSubmission(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value.trim();
    const form = e.target;
    const button = form.querySelector('.cta-button');
    const buttonSpan = button.querySelector('span');
    const originalButtonText = buttonSpan.textContent;
    
    // Validate email
    if (!validateEmail(email)) {
        showInlineError('Lütfen geçerli bir email adresi girin.');
        return;
    }
    
    // Show loading state
    form.classList.add('loading');
    buttonSpan.textContent = 'Kaydediliyor...';
    console.log('Form gönderiliyor, buton durumu:', buttonSpan.textContent);
    
    try {
        // Send email notification with timeout
        const emailSent = await Promise.race([
            sendEmailNotification(email),
            new Promise((_, reject) => 
                setTimeout(() => reject(new Error('Email gönderimi zaman aşımına uğradı')), 10000)
            )
        ]);
        
        console.log('Email gönderim sonucu:', emailSent);
        
        if (emailSent) {
            // Show success content in waitlist container
            showSuccessInContainer(email);
            console.log('Success mesajı gösterildi');
            
            // HEMEN buton durumunu resetle - success mesajı gösterildiği anda
            form.classList.remove('loading');
            buttonSpan.textContent = 'Waitlist\'e Katıl';
            document.getElementById('email').value = ''; // Email input'unu temizle
            console.log('Buton ve input hemen resetlendi:', buttonSpan.textContent);
            
            // Reset to original form after 4 seconds
            setTimeout(() => {
                console.log('4 saniye sonra form tamamen reset ediliyor...');
                resetWaitlistContainer();
            }, 4000);
        } else {
            showInlineError('Email gönderiminde bir hata oluştu. Lütfen tekrar deneyin.');
            form.classList.remove('loading');
            buttonSpan.textContent = originalButtonText;
        }
        
    } catch (error) {
        console.error('Form submission error:', error);
        showInlineError('Bir hata oluştu. Lütfen tekrar deneyin.');
        form.classList.remove('loading');
        buttonSpan.textContent = originalButtonText;
    }
}

// Attach form event listener
function attachFormEventListener() {
    const form = document.getElementById('waitlistForm');
    if (form) {
        // Remove existing event listener first
        form.removeEventListener('submit', handleFormSubmission);
        // Add new event listener
        form.addEventListener('submit', handleFormSubmission);
    }
}



// Show inline error message
function showInlineError(message) {
    // Remove existing error messages
    const existingErrors = document.querySelectorAll('.inline-error');
    existingErrors.forEach(error => error.remove());
    
    // Create error element
    const errorElement = document.createElement('div');
    errorElement.className = 'inline-error';
    errorElement.textContent = message;
    errorElement.style.cssText = `
        background: linear-gradient(45deg, #e74c3c, #c0392b);
        color: white;
        padding: 12px 20px;
        border-radius: 25px;
        margin-top: 15px;
        font-size: 0.9rem;
        font-weight: 500;
        animation: slideIn 0.3s ease;
        text-align: center;
    `;
    
    // Add error to form
    const form = document.getElementById('waitlistForm');
    form.appendChild(errorElement);
    
    // Hide error after 3 seconds
    setTimeout(() => {
        errorElement.style.opacity = '0';
        setTimeout(() => {
            if (errorElement.parentNode) {
                errorElement.parentNode.removeChild(errorElement);
            }
        }, 300);
    }, 3000);
}

// Show success content in waitlist container
function showSuccessInContainer(email) {
    const container = document.querySelector('.waitlist-container');
    
    // Store original content
    if (!container.dataset.originalContent) {
        container.dataset.originalContent = container.innerHTML;
    }
    
    // Create success content
    const successContent = `
        <div class="success-content" style="animation: successFadeIn 0.5s ease;">
            <div style="font-size: 3rem; margin-bottom: 20px;">🎉</div>
            <h2 style="font-size: 2rem; margin-bottom: 20px; color: #27ae60;">Harika!</h2>
            <p style="font-size: 1.2rem; margin-bottom: 15px; color: #2c3e50; font-weight: 500;">
                Email adresiniz başarıyla waitlist'e eklendi!
            </p>
            <p style="font-size: 1rem; margin-bottom: 25px; color: #7f8c8d;">
                <strong>${email}</strong>
            </p>
            <div style="background: linear-gradient(45deg, #27ae60, #2ecc71); color: white; padding: 15px 25px; border-radius: 25px; font-weight: 600;">
                Uygulama hazır olduğunda size hemen haber vereceğiz! 🚀
            </div>
            <p style="font-size: 0.9rem; margin-top: 20px; color: #95a5a6;">
                Bu sayfa 4 saniye içinde sıfırlanacak...
            </p>
        </div>
    `;
    
    container.innerHTML = successContent;
}

// Reset waitlist container to original state
function resetWaitlistContainer() {
    const container = document.querySelector('.waitlist-container');
    
    if (container.dataset.originalContent) {
        container.style.opacity = '0';
        setTimeout(() => {
            container.innerHTML = container.dataset.originalContent;
            container.style.opacity = '1';
            // Re-attach form event listener after reset
            attachFormEventListener();
        }, 300);
    }
}

// Handle image loading errors (show placeholder)
function handleImageError(img) {
    img.style.display = 'none';
    const parent = img.parentElement;
    if (!parent.querySelector('.image-placeholder')) {
        const placeholder = document.createElement('div');
        placeholder.className = 'image-placeholder';
        placeholder.style.cssText = `
            width: 100%;
            height: 100%;
            background: linear-gradient(45deg, #C4D9EB, #ffffff);
            display: flex;
            align-items: center;
            justify-content: center;
            color: #7f8c8d;
            font-size: 1.1rem;
            font-weight: 500;
            text-align: center;
            padding: 20px;
            border-radius: 20px;
        `;
        placeholder.innerHTML = 'Fluento<br/>Ekran Görüntüsü<br/>📱';
        parent.appendChild(placeholder);
    }
}

// Add error handling to all images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', () => handleImageError(img));
        
        // If image src doesn't exist, trigger error immediately
        if (!img.src || img.src.endsWith('screenshot1.png') || 
            img.src.endsWith('screenshot2.png') || 
            img.src.endsWith('screenshot3.png')) {
            handleImageError(img);
        }
    });
    
    // Initialize EmailJS
    initEmailJS();
    
    // Start auto-slide for mobile
    startAutoSlide();
    
    // Attach form event listener
    attachFormEventListener();
});

// Handle window resize to show/hide appropriate views
window.addEventListener('resize', function() {
    const isMobile = window.innerWidth <= 768;
    const desktopView = document.querySelector('.desktop-view');
    const mobileView = document.querySelector('.mobile-view');
    
    if (isMobile) {
        desktopView.style.display = 'none';
        mobileView.style.display = 'block';
    } else {
        desktopView.style.display = 'flex';
        mobileView.style.display = 'none';
    }
});

// Touch/swipe support for mobile carousel
let startX = 0;
let endX = 0;

document.addEventListener('touchstart', function(e) {
    startX = e.touches[0].clientX;
});

document.addEventListener('touchend', function(e) {
    endX = e.changedTouches[0].clientX;
    handleSwipe();
});

function handleSwipe() {
    const carousel = document.querySelector('.carousel-container');
    if (!carousel) return;
    
    const swipeThreshold = 50;
    const diff = startX - endX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swiped left - next slide
            slideIndex++;
            if (slideIndex > document.getElementsByClassName("carousel-item").length) {
                slideIndex = 1;
            }
        } else {
            // Swiped right - previous slide
            slideIndex--;
            if (slideIndex < 1) {
                slideIndex = document.getElementsByClassName("carousel-item").length;
            }
        }
        showSlide(slideIndex);
    }
} 
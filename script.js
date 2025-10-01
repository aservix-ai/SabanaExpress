// Navegación móvil
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    // Toggle del menú móvil
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        // Animación del botón hamburguesa
        const spans = navToggle.querySelectorAll('span');
        spans.forEach((span, index) => {
            if (navMenu.classList.contains('active')) {
                if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
                if (index === 1) span.style.opacity = '0';
                if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                span.style.transform = 'none';
                span.style.opacity = '1';
            }
        });
    });

    // Cerrar menú al hacer click en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const spans = navToggle.querySelectorAll('span');
            spans.forEach(span => {
                span.style.transform = 'none';
                span.style.opacity = '1';
            });
        });
    });

    // Cerrar menú al hacer click fuera
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            const spans = navToggle.querySelectorAll('span');
            spans.forEach(span => {
                span.style.transform = 'none';
                span.style.opacity = '1';
            });
        }
    });
});

// Scroll suave para navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Compensar por el header fijo
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Efecto parallax sutil en el hero
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && heroContent) {
        const rate = scrolled * -0.5;
        heroContent.style.transform = `translateY(${rate}px)`;
    }
});

// Header transparente que se vuelve sólido al hacer scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    const scrollPosition = window.scrollY;
    
    if (header) {
        if (scrollPosition > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = '#ffffff';
            header.style.backdropFilter = 'none';
        }
    }
});

// Split banners carousel - reusable autoplay initializer
function initSplitCarouselAutoplay({ selector = '.split-carousel', interval = 5000 } = {}) {
    const carousel = document.querySelector(selector);
    if (!carousel) return () => {};
    const track = carousel.querySelector('.split-track');
    const slides = Array.from(carousel.querySelectorAll('.split-slide'));
    const dots = Array.from(carousel.querySelectorAll('.split-dot'));
    const prev = carousel.querySelector('.split-prev');
    const next = carousel.querySelector('.split-next');
    let index = 0;
    const total = slides.length || 1;

    function goTo(i) {
        index = (i + total) % total;
        if (track) track.style.transform = `translateX(-${index * (100 / total)}%)`;
        dots.forEach((d, di) => d.classList.toggle('is-active', di === index));
    }

    prev && prev.addEventListener('click', () => goTo(index - 1));
    next && next.addEventListener('click', () => goTo(index + 1));
    dots.forEach(d => d.addEventListener('click', () => goTo(parseInt(d.dataset.index))));

    // autoplay controls
    let timer;
    const start = () => { stop(); timer = setInterval(() => goTo(index + 1), interval); };
    const stop = () => { if (timer) { clearInterval(timer); timer = null; } };
    carousel.addEventListener('mouseenter', stop);
    carousel.addEventListener('mouseleave', start);
    start();
    return stop;
}

// Start autoplay on load
document.addEventListener('DOMContentLoaded', () => {
    initSplitCarouselAutoplay({ selector: '.split-carousel', interval: 5000 });
});

// Animaciones al hacer scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar elementos para animaciones
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.services-text, .clients h2, .clients p, .client-logo');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Efecto hover en los logos de clientes
document.addEventListener('DOMContentLoaded', function() {
    const clientLogos = document.querySelectorAll('.client-logo');
    
    clientLogos.forEach(logo => {
        logo.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.05)';
        });
        
        logo.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Botón WhatsApp con animación
document.addEventListener('DOMContentLoaded', function() {
    const whatsappBtn = document.querySelector('.whatsapp-btn');
    
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', function() {
            // Aquí puedes agregar el número de WhatsApp real
            const phoneNumber = '573001234567'; // Reemplaza con el número real
            const message = encodeURIComponent('Hola, me interesa conocer más sobre sus servicios de transporte de carga.');
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
            
            window.open(whatsappUrl, '_blank');
        });
        
        // Animación de pulso
        setInterval(() => {
            if (whatsappBtn) {
                whatsappBtn.style.animation = 'pulse 2s infinite';
            }
        }, 5000);
    }
});

// Animación de pulso para WhatsApp
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% {
            box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.7);
        }
        70% {
            box-shadow: 0 0 0 10px rgba(37, 211, 102, 0);
        }
        100% {
            box-shadow: 0 0 0 0 rgba(37, 211, 102, 0);
        }
    }
`;
document.head.appendChild(style);

// Efecto de escritura para el título principal
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Aplicar efecto de escritura cuando la página carga
window.addEventListener('load', function() {
    const logoName = document.querySelector('.logo-name');
    if (logoName) {
        const originalText = logoName.textContent;
        logoName.style.opacity = '1';
        setTimeout(() => {
            typeWriter(logoName, originalText, 150);
        }, 1000);
    }
});

// Smooth scrolling personalizado para mejor rendimiento
function smoothScrollTo(target, duration = 1000) {
    const targetElement = document.querySelector(target);
    if (!targetElement) return;
    
    const startPosition = window.pageYOffset;
    const targetPosition = targetElement.offsetTop - 80;
    const distance = targetPosition - startPosition;
    let startTime = null;
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }
    
    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
    
    requestAnimationFrame(animation);
}

// Lazy loading para imágenes
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});

// Manejo de formularios (si se agregan más adelante)
function handleFormSubmission(formElement, successCallback) {
    formElement.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validación básica
        const inputs = formElement.querySelectorAll('input[required], textarea[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = '#ef4444';
                input.focus();
            } else {
                input.style.borderColor = '#d1d5db';
            }
        });
        
        if (isValid && successCallback) {
            successCallback();
        }
    });
}

// Performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Aplicar debounce al scroll
const debouncedScroll = debounce(function() {
    // Aquí puedes agregar lógica adicional de scroll si es necesaria
}, 16); // ~60fps

window.addEventListener('scroll', debouncedScroll);

// ========================================================================================
// FORMULARIO DE COTIZACIONES PROGRESIVO
// ========================================================================================

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('quoteForm');
    const formMessage = document.getElementById('formMessage');
    
    if (!form) return;

    // Secuencia de campos que aparecerán progresivamente
    const fieldSequence = [
        'ciudadOrigen',
        'ciudadDestino', 
        'tipoCarga',
        'serviciosAdicionales',
        'numeroTelefono',
        'nombreCompleto',
        'correoElectronico',
        'pesoEstimado',
        'dimensiones',
        'comentarios',
        'submitBtn'
    ];

    let currentStep = 0;
    const totalSteps = fieldSequence.length;

    // Función para mostrar el siguiente campo
    function showNextField() {
        if (currentStep < fieldSequence.length) {
            const fieldId = fieldSequence[currentStep];
            const field = document.getElementById(fieldId);
            
            if (field) {
                field.classList.remove('hidden');
                field.classList.add('entering');
                
                // Animar entrada
                setTimeout(() => {
                    field.classList.add('active');
                    field.classList.remove('entering');
                }, 50);

                // Auto-focus en el primer input del campo
                setTimeout(() => {
                    const input = field.querySelector('input, select, textarea');
                    if (input && fieldId !== 'submitBtn') {
                        input.focus();
                    }
                }, 300);

                currentStep++;
                updateProgress();
            }
        }
    }

    // Función para actualizar la barra de progreso
    function updateProgress() {
        const progressBar = document.querySelector('.form-progress');
        if (progressBar) {
            const progress = (currentStep / totalSteps) * 100;
            progressBar.style.width = `${progress}%`;
        }
    }

    // Función para validar campo
    function validateField(field) {
        const input = field.querySelector('input, select, textarea');
        if (!input) return false;

        let isValid = false;
        
        if (input.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            isValid = emailRegex.test(input.value);
        } else if (input.type === 'tel') {
            const phoneRegex = /^[\+]?[\d\s\-\(\)]{10,}$/;
            isValid = phoneRegex.test(input.value.trim());
        } else if (input.type === 'number') {
            isValid = input.value && parseInt(input.value) > 0;
        } else if (input.tagName === 'SELECT') {
            isValid = input.value !== '';
        } else {
            isValid = input.value.trim().length >= 2;
        }

        // Validación especial para dimensiones
        if (field.id === 'dimensiones') {
            const largo = field.querySelector('#largo');
            const ancho = field.querySelector('#ancho');
            const alto = field.querySelector('#alto');
            isValid = largo.value && ancho.value && alto.value && 
                     parseInt(largo.value) > 0 && parseInt(ancho.value) > 0 && parseInt(alto.value) > 0;
        }

        // Aplicar estilos de validación
        field.classList.remove('valid', 'invalid');
        if (isValid) {
            field.classList.add('valid');
        } else if (input.value.length > 0) {
            field.classList.add('invalid');
        }

        return isValid;
    }

    // Event listeners para cada campo
    fieldSequence.forEach((fieldId, index) => {
        const field = document.getElementById(fieldId);
        if (!field || fieldId === 'submitBtn') return;

        const inputs = field.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            // Validación en tiempo real
            input.addEventListener('input', function() {
                validateField(field);
            });

            input.addEventListener('blur', function() {
                const isValid = validateField(field);
                
                // Si el campo es válido y es el actual en la secuencia, mostrar el siguiente
                if (isValid && index === currentStep - 1) {
                    setTimeout(() => {
                        showNextField();
                    }, 500);
                }
            });

            // Para selects, validar inmediatamente al cambiar
            if (input.tagName === 'SELECT') {
                input.addEventListener('change', function() {
                    const isValid = validateField(field);
                    
                    if (isValid && index === currentStep - 1) {
                        setTimeout(() => {
                            showNextField();
                        }, 300);
                    }
                });
            }
        });
    });

    // Crear barra de progreso
    const progressBar = document.createElement('div');
    progressBar.className = 'form-progress';
    form.parentElement.appendChild(progressBar);

    // Inicializar mostrando los primeros dos campos
    showNextField(); // Ciudad origen
    setTimeout(() => showNextField(), 200); // Ciudad destino

    // Manejo del envío del formulario
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Validar todos los campos visibles
        let allValid = true;
        const visibleFields = document.querySelectorAll('.form-group.active:not(#submitBtn)');
        
        visibleFields.forEach(field => {
            if (!validateField(field)) {
                allValid = false;
            }
        });

        if (!allValid) {
            showMessage('Por favor completa todos los campos correctamente.', 'error');
            return;
        }

        // Mostrar mensaje de carga
        showMessage('Enviando solicitud...', 'loading');

        // Recopilar datos del formulario
        const formData = new FormData(form);
        const data = {};
        
        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }

        // Agregar dimensiones concatenadas
        if (data.largo && data.ancho && data.alto) {
            data.dimensiones = `${data.largo} × ${data.ancho} × ${data.alto} cm`;
        }

        try {
            // Enviar por correo usando EmailJS o similar
            await sendQuoteEmail(data);
            showMessage('¡Solicitud enviada exitosamente! Te contactaremos pronto.', 'success');
            
            // Limpiar formulario después de 3 segundos
            setTimeout(() => {
                form.reset();
                resetForm();
            }, 3000);
            
        } catch (error) {
            console.error('Error enviando formulario:', error);
            showMessage('Error al enviar la solicitud. Por favor intenta nuevamente.', 'error');
        }
    });

    // Función para mostrar mensajes
    function showMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
        formMessage.classList.remove('hidden');
        
        // Scroll hacia el mensaje
        formMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    // Función para resetear el formulario
    function resetForm() {
        currentStep = 0;
        
        // Ocultar todos los campos excepto los primeros dos
        fieldSequence.forEach((fieldId, index) => {
            const field = document.getElementById(fieldId);
            if (field) {
                field.classList.remove('active', 'valid', 'invalid', 'entering');
                if (index > 1) {
                    field.classList.add('hidden');
                }
            }
        });

        // Reinicializar
        setTimeout(() => {
            showNextField(); // Ciudad origen
            setTimeout(() => showNextField(), 200); // Ciudad destino
        }, 500);
        
        formMessage.classList.add('hidden');
        updateProgress();
    }

    // Función para enviar email
    async function sendQuoteEmail(data) {
        // Construir el contenido del email
        const emailContent = `
            Nueva Solicitud de Cotización - Sabana Express
            =============================================
            
            INFORMACIÓN DE CONTACTO:
            • Nombre: ${data.nombre}
            • Email: ${data.email}
            • Teléfono: ${data.telefono}
            
            DETALLES DEL ENVÍO:
            • Ciudad de Origen: ${data.origen}
            • Ciudad de Destino: ${data.destino}
            • Tipo de Carga: ${data.carga}
            • Servicios Adicionales: ${data.servicios}
            
            ESPECIFICACIONES:
            • Peso Estimado: ${data.peso} kg
            • Dimensiones: ${data.dimensiones}
            
            COMENTARIOS:
            ${data.comentarios || 'No hay comentarios adicionales'}
            
            =============================================
            Fecha: ${new Date().toLocaleString('es-CO')}
        `;

        // Opción 1: Usar mailto (funciona en todos los navegadores)
        const subject = encodeURIComponent(`Nueva Cotización - ${data.nombre}`);
        const body = encodeURIComponent(emailContent);
        const mailtoLink = `mailto:cotizaciones@sabanaexpress.com?subject=${subject}&body=${body}`;
        
        // Abrir cliente de correo predeterminado
        window.open(mailtoLink);
        
        // Opción 2: Si quieres usar un servicio como EmailJS, descomenta esto:
        /*
        // Requiere configurar EmailJS
        return emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
            from_name: data.nombre,
            from_email: data.email,
            phone: data.telefono,
            origen: data.origen,
            destino: data.destino,
            tipo_carga: data.carga,
            servicios: data.servicios,
            peso: data.peso,
            dimensiones: data.dimensiones,
            comentarios: data.comentarios,
            fecha: new Date().toLocaleString('es-CO')
        });
        */
        
        // Simular éxito después de un breve delay
        return new Promise(resolve => setTimeout(resolve, 1000));
    }
});

// ========================================================================================
// FUNCIONES AUXILIARES PARA EL FORMULARIO
// ========================================================================================

// Formatear número de teléfono mientras se escribe
document.addEventListener('DOMContentLoaded', function() {
    const phoneInput = document.getElementById('telefono');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 10) {
                value = value.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3');
            }
            e.target.value = value;
        });
    }
});

// Auto-completar ciudades colombianas
const ciudadesColombianas = [
    'Bogotá', 'Medellín', 'Cali', 'Barranquilla', 'Cartagena', 'Cúcuta', 
    'Bucaramanga', 'Pereira', 'Santa Marta', 'Ibagué', 'Pasto', 'Manizales',
    'Neiva', 'Villavicencio', 'Armenia', 'Valledupar', 'Montería', 'Sincelejo',
    'Popayán', 'Tunja', 'Florencia', 'Riohacha', 'Yopal', 'Quibdó',
    'Envigado', 'Itagüí', 'Bello', 'Sabaneta', 'La Estrella', 'Caldas'
];

function setupCityAutocomplete(inputId) {
    const input = document.getElementById(inputId);
    if (!input) return;

    let currentSuggestions = [];
    
    input.addEventListener('input', function() {
        const value = this.value.toLowerCase();
        if (value.length < 2) {
            hideSuggestions();
            return;
        }

        currentSuggestions = ciudadesColombianas.filter(city => 
            city.toLowerCase().includes(value)
        );

        showSuggestions(this, currentSuggestions);
    });

    function showSuggestions(input, suggestions) {
        hideSuggestions();
        
        if (suggestions.length === 0) return;

        const container = document.createElement('div');
        container.className = 'city-suggestions';
        container.style.cssText = `
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            z-index: 1000;
            max-height: 200px;
            overflow-y: auto;
        `;

        suggestions.slice(0, 5).forEach(city => {
            const item = document.createElement('div');
            item.textContent = city;
            item.style.cssText = `
                padding: 0.75rem 1rem;
                cursor: pointer;
                border-bottom: 1px solid #f1f5f9;
            `;
            item.addEventListener('mouseenter', () => {
                item.style.backgroundColor = '#f8fafc';
            });
            item.addEventListener('mouseleave', () => {
                item.style.backgroundColor = 'white';
            });
            item.addEventListener('click', () => {
                input.value = city;
                hideSuggestions();
                input.blur();
                
                // Trigger validation
                const event = new Event('input', { bubbles: true });
                input.dispatchEvent(event);
            });
            container.appendChild(item);
        });

        input.parentElement.style.position = 'relative';
        input.parentElement.appendChild(container);
    }

    function hideSuggestions() {
        const existing = document.querySelector('.city-suggestions');
        if (existing) {
            existing.remove();
        }
    }

    // Ocultar sugerencias al hacer click fuera
    document.addEventListener('click', function(e) {
        if (!input.contains(e.target)) {
            hideSuggestions();
        }
    });
}

// Configurar autocompletado para origen y destino
document.addEventListener('DOMContentLoaded', function() {
    setupCityAutocomplete('origen');
    setupCityAutocomplete('destino');
});

// ========================================================================================
// FUNCIONALIDAD DE SERVICIOS
// ========================================================================================

document.addEventListener('DOMContentLoaded', function() {
    // Manejar clicks en botones de servicios
    const serviceButtons = document.querySelectorAll('.btn-service');
    const whatsappContact = document.querySelector('.whatsapp-contact');
    
    serviceButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Obtener el tipo de servicio desde la card padre
            const serviceCard = this.closest('.service-card');
            const serviceName = serviceCard.querySelector('h3').textContent;
            
            // Redirigir a la sección de cotizaciones con el servicio preseleccionado
            const cotizacionesSection = document.getElementById('cotizaciones');
            if (cotizacionesSection) {
                cotizacionesSection.scrollIntoView({ behavior: 'smooth' });
                
                // Preseleccionar el tipo de servicio en el formulario
                setTimeout(() => {
                    presetServiceType(serviceName);
                }, 500);
            }
        });
    });

    // Manejar click en WhatsApp
    if (whatsappContact) {
        whatsappContact.addEventListener('click', function() {
            const phoneNumber = '573001234567'; // Reemplaza con el número real
            const message = encodeURIComponent('Hola, necesito asesoría personalizada sobre sus servicios de transporte.');
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
            
            window.open(whatsappUrl, '_blank');
        });
    }

    // Función para preseleccionar tipo de servicio en el formulario
    function presetServiceType(serviceName) {
        const serviceSelect = document.getElementById('servicios');
        if (serviceSelect) {
            let optionValue = '';
            
            switch(serviceName) {
                case 'Transporte Nacional':
                    optionValue = 'tracking-tiempo-real';
                    break;
                case 'Transporte Urbano':
                    optionValue = 'entrega-programada';
                    break;
                case 'Mudanzas':
                    optionValue = 'embalaje';
                    break;
            }
            
            if (optionValue) {
                serviceSelect.value = optionValue;
                // Trigger change event para activar la validación
                const changeEvent = new Event('change', { bubbles: true });
                serviceSelect.dispatchEvent(changeEvent);
            }
        }
    }

    // Animaciones de entrada para las cards de servicios
    const serviceCards = document.querySelectorAll('.service-card');
    
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 200);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    serviceCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        cardObserver.observe(card);
    });
});
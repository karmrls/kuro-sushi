document.addEventListener('DOMContentLoaded', () => {

    // 1. LÓGICA DEL MENÚ MÓVIL (Con validación)
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('nav-links');

    if (menuToggle && navLinks) {
        const icon = menuToggle.querySelector('i');

        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            if (navLinks.classList.contains('active')) {
                if (icon) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-xmark');
                }
            } else {
                if (icon) {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            }
        });
    }

    // 2. ANIMACIONES AL HACER SCROLL (Fade-in)
    const fadeElements = document.querySelectorAll('.fade-in');

    if (fadeElements.length > 0) {
        const observerOptions = {
            root: null,
            threshold: 0.15,
            rootMargin: "0px"
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        fadeElements.forEach(el => observer.observe(el));
    }

    // 3. CARRITO DE COMPRAS Y CHECKOUT WHATSAPP
    const cartToggle = document.getElementById('cart-toggle');
    const cartDrawer = document.getElementById('cart-drawer');
    const closeCart = document.getElementById('close-cart');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotalPrice = document.getElementById('cart-total-price');
    const checkoutBtn = document.getElementById('checkout-btn');
    
    // --- GESTIÓN DE BOTONES TÁCTILES DE ENTREGA ---
    let selectedDeliveryType = 'Recoger en local'; // Opción predeterminada
    const deliveryBtns = document.querySelectorAll('.delivery-btn');
    const addressGroup = document.getElementById('address-group');
    const addressInput = document.getElementById('client-address');

    deliveryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Cambiar clase activa entre los botones
            deliveryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            selectedDeliveryType = btn.getAttribute('data-value');

            // Mostrar u ocultar el campo de dirección de forma dinámica
            if (addressGroup && addressInput) {
                if (selectedDeliveryType === 'Recoger en local') {
                    addressGroup.style.display = 'none';
                    addressInput.value = ''; // Limpiar el texto si cambia de opinión
                } else {
                    addressGroup.style.display = 'flex';
                }
            }
        });
    });

    // Cargar carrito guardado en el navegador (localStorage)
    let cart = JSON.parse(localStorage.getItem('kuro_cart')) || [];

    // Abrir y cerrar el panel lateral del carrito
    if (cartToggle && cartDrawer) {
        cartToggle.addEventListener('click', () => cartDrawer.classList.add('active'));
        if (closeCart) {
            closeCart.addEventListener('click', () => cartDrawer.classList.remove('active'));
        }
    }

    // Función principal para actualizar la interfaz del carrito
    function updateCart() {
        localStorage.setItem('kuro_cart', JSON.stringify(cart));
        
        // Actualizar el número flotante en el icono del carrito
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        if (cartCount) cartCount.textContent = totalItems;

        // Renderizar los productos dentro del panel
        if (cartItemsContainer) {
            if (cart.length === 0) {
                cartItemsContainer.innerHTML = `<p class="empty-cart-msg">Tu carrito está vacío.</p>`;
            } else {
                cartItemsContainer.innerHTML = '';
                cart.forEach((item, index) => {
                    cartItemsContainer.innerHTML += `
                        <div class="cart-item">
                            <div class="cart-item-info">
                                <h4>${item.name} (x${item.quantity})</h4>
                                <p>$${item.price * item.quantity} MXN</p>
                            </div>
                            <button class="remove-item" data-index="${index}"><i class="fa-solid fa-trash"></i></button>
                        </div>
                    `;
                });

                // Activar los botones de eliminar producto individual
                document.querySelectorAll('.remove-item').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        const idx = e.currentTarget.getAttribute('data-index');
                        cart.splice(idx, 1);
                        updateCart();
                    });
                });
            }
        }

        // Calcular el precio total
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        if (cartTotalPrice) cartTotalPrice.textContent = `$${total} MXN`;
    }

    // Escuchar clics en los botones "Ordenar" de cualquier tarjeta del menú
    document.querySelectorAll('.menu-card').forEach(card => {
        const orderBtn = card.querySelector('.btn-order');
        if (orderBtn) {
            orderBtn.addEventListener('click', () => {
                const nameElement = card.querySelector('h3');
                const priceElement = card.querySelector('.price');

                if (nameElement && priceElement) {
                    const name = nameElement.textContent;
                    const priceText = priceElement.textContent;
                    const price = parseInt(priceText.replace(/[^0-9]/g, ''));

                    // Buscar si el platillo ya estaba agregado para sumar cantidad
                    const existingItem = cart.find(item => item.name === name);
                    if (existingItem) {
                        existingItem.quantity += 1;
                    } else {
                        cart.push({ name, price, quantity: 1 });
                    }

                    updateCart();
                    
                    // Abrir el carrito automáticamente como confirmación visual
                    if (cartDrawer) cartDrawer.classList.add('active');
                }
            });
        }
    });

    // Enviar el pedido empaquetado a WhatsApp
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cart.length === 0) {
                alert('Tu carrito está vacío. Agrega platillos antes de ordenar.');
                return;
            }

            const clientName = document.getElementById('client-name').value.trim();
            const deliveryType = selectedDeliveryType; // Tomamos el valor de los botones táctiles
            const clientAddress = document.getElementById('client-address').value.trim();

            if (!clientName) {
                alert('Por favor, ingresa tu nombre para el pedido.');
                return;
            }

            if (deliveryType === 'A domicilio' && !clientAddress) {
                alert('Por favor, ingresa tu dirección para el envío a domicilio.');
                return;
            }

            let message = `*Nuevo Pedido - Kuro Sushi*%0A%0A`;
            message += `👤 *Cliente:* ${clientName}%0A`;
            message += `🛵 *Método:* ${deliveryType}%0A`;
            if (deliveryType === 'A domicilio') {
                message += `📍 *Dirección:* ${clientAddress}%0A`;
            }
            message += `%0A*Detalle del pedido:*%0A`;

            let total = 0;
            cart.forEach(item => {
                message += `- ${item.name} (x${item.quantity}) : $${item.price * item.quantity} MXN%0A`;
                total += item.price * item.quantity;
            });

            message += `%0A*Total a pagar: $${total} MXN*%0A¡Gracias!`;

            const phoneNumber = '5216180000000'; // Tu número real de WhatsApp
            window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
        });
    }

    // Inicializar el estado del carrito al cargar la página
    updateCart();
});
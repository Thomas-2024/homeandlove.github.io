// Funcionalidad específica para la página de detalle del producto

// Cambiar imagen principal
function changeImage(thumbnail, newSrc) {
    // Remover clase active de todas las miniaturas
    document.querySelectorAll('.thumbnail').forEach(thumb => {
        thumb.classList.remove('active');
    });
    
    // Agregar clase active a la miniatura clickeada
    thumbnail.classList.add('active');
    
    // Cambiar imagen principal
    document.getElementById('mainImage').src = newSrc;
}

// Cambiar cantidad
function changeQuantity(change) {
    const quantityInput = document.getElementById('quantityInput');
    let currentValue = parseInt(quantityInput.value);
    let newValue = currentValue + change;
    
    // Validar límites
    if (newValue < 1) newValue = 1;
    if (newValue > 10) newValue = 10;
    
    quantityInput.value = newValue;
}

// Agregar al carrito desde la página de detalle
function addToCartDetail() {
    const quantity = parseInt(document.getElementById('quantityInput').value);
    const selectedColor = document.querySelector('.color-option.active').dataset.color;
    
    // Simular producto con información de la página
    const product = {
        id: 1,
        name: "Sofá Moderno 3 Plazas",
        price: 299990,
        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop",
        color: selectedColor,
        quantity: quantity
    };
    
    // Agregar al carrito (usando la función del script principal)
    if (typeof addToCart === 'function') {
        for (let i = 0; i < quantity; i++) {
            addToCart(product.id);
        }
    }
    
    showNotification(`Agregado al carrito: ${product.name} (${quantity} unidad${quantity > 1 ? 'es' : ''})`);
}

// Comprar ahora
function buyNow() {
    addToCartDetail();
    // Aquí se redirigiría a la página de checkout
    showNotification('Redirigiendo al checkout...');
    setTimeout(() => {
        alert('Funcionalidad de checkout en desarrollo');
    }, 1000);
}

// Agregar a favoritos
function addToWishlistDetail() {
    showNotification('Producto agregado a favoritos');
}

// Mostrar tab específico
function showTab(tabName) {
    // Ocultar todos los tabs
    document.querySelectorAll('.tab-panel').forEach(panel => {
        panel.classList.remove('active');
    });
    
    // Remover clase active de todos los botones
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Mostrar tab seleccionado
    document.getElementById(tabName).classList.add('active');
    
    // Agregar clase active al botón clickeado
    event.target.classList.add('active');
}

// Mostrar notificación
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #28a745;
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        z-index: 3000;
        animation: slideIn 0.3s ease;
        font-family: 'Inter', sans-serif;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 2000);
}

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Configurar event listeners para el carrito
    const cartBtn = document.getElementById('cartBtn');
    const cartModal = document.getElementById('cartModal');
    const closeCart = document.getElementById('closeCart');
    
    if (cartBtn) {
        cartBtn.addEventListener('click', function(e) {
            e.preventDefault();
            cartModal.classList.add('active');
        });
    }
    
    if (closeCart) {
        closeCart.addEventListener('click', function() {
            cartModal.classList.remove('active');
        });
    }
    
    // Cerrar carrito al hacer clic fuera
    document.addEventListener('click', function(e) {
        if (cartModal.classList.contains('active') && 
            !cartModal.contains(e.target) && 
            !cartBtn.contains(e.target)) {
            cartModal.classList.remove('active');
        }
    });
    
    // Configurar color options
    const colorOptions = document.querySelectorAll('.color-option');
    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remover clase active de todas las opciones
            colorOptions.forEach(opt => opt.classList.remove('active'));
            // Agregar clase active a la opción seleccionada
            this.classList.add('active');
        });
    });
    
    // Configurar input de cantidad
    const quantityInput = document.getElementById('quantityInput');
    if (quantityInput) {
        quantityInput.addEventListener('change', function() {
            let value = parseInt(this.value);
            if (isNaN(value) || value < 1) {
                this.value = 1;
            } else if (value > 10) {
                this.value = 10;
            }
        });
    }
}); 
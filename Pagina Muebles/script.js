// Datos de productos (simulando una base de datos)
const products = [
    {
        id: 1,
        name: "Sofá Moderno 3 Plazas",
        price: 299990,
        originalPrice: 399990,
        category: "sala",
        material: "tela",
        color: "gris",
        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop",
        badge: "Oferta"
    },
    {
        id: 2,
        name: "Mesa de Comedor Extensible",
        price: 189990,
        originalPrice: 189990,
        category: "comedor",
        material: "madera",
        color: "marron",
        image: "https://images.unsplash.com/photo-1617098907765-56dbbdde3b1f?w=400&h=300&fit=crop",
        badge: null
    },
    {
        id: 3,
        name: "Cama King Size con Cabecera",
        price: 459990,
        originalPrice: 599990,
        category: "dormitorio",
        material: "madera",
        color: "marron",
        image: "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=400&h=300&fit=crop",
        badge: "Nuevo"
    },
    {
        id: 4,
        name: "Escritorio de Oficina",
        price: 129990,
        originalPrice: 159990,
        category: "oficina",
        material: "madera",
        color: "blanco",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
        badge: "Oferta"
    },
    {
        id: 5,
        name: "Silla de Comedor 6 Unidades",
        price: 89990,
        originalPrice: 89990,
        category: "comedor",
        material: "madera",
        color: "marron",
        image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=400&h=300&fit=crop",
        badge: null
    },
    {
        id: 6,
        name: "Mesa de Centro Moderna",
        price: 79990,
        originalPrice: 99990,
        category: "sala",
        material: "vidrio",
        color: "negro",
        image: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=400&h=300&fit=crop",
        badge: "Oferta"
    },
    {
        id: 7,
        name: "Ropero 3 Puertas",
        price: 259990,
        originalPrice: 259990,
        category: "dormitorio",
        material: "madera",
        color: "blanco",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
        badge: null
    },
    {
        id: 8,
        name: "Sofá Cama 2 Plazas",
        price: 199990,
        originalPrice: 249990,
        category: "sala",
        material: "tela",
        color: "gris",
        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop",
        badge: "Oferta"
    },
    {
        id: 9,
        name: "Mesa de Noche",
        price: 59990,
        originalPrice: 59990,
        category: "dormitorio",
        material: "madera",
        color: "marron",
        image: "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=400&h=300&fit=crop",
        badge: null
    },
    {
        id: 10,
        name: "Estantería Librero",
        price: 89990,
        originalPrice: 119990,
        category: "oficina",
        material: "madera",
        color: "marron",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
        badge: "Oferta"
    },
    {
        id: 11,
        name: "Silla de Oficina Ergonómica",
        price: 159990,
        originalPrice: 159990,
        category: "oficina",
        material: "tela",
        color: "negro",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
        badge: null
    },
    {
        id: 12,
        name: "Mesa de Comedor Redonda",
        price: 149990,
        originalPrice: 189990,
        category: "comedor",
        material: "madera",
        color: "marron",
        image: "https://images.unsplash.com/photo-1617098907765-56dbbdde3b1f?w=400&h=300&fit=crop",
        badge: "Oferta"
    }
];

// Estado de la aplicación
let cart = [];
let filteredProducts = [...products];
let currentPage = 1;
const productsPerPage = 8;

// Elementos del DOM
const productsGrid = document.getElementById('productsGrid');
const cartModal = document.getElementById('cartModal');
const cartBtn = document.getElementById('cartBtn');
const closeCart = document.getElementById('closeCart');
const cartItems = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');
const productCount = document.getElementById('productCount');

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    renderProducts();
    setupEventListeners();
    updateCartCount();
    setupCategoryNavigation();
});

// Configurar event listeners
function setupEventListeners() {
    // Carrito
    cartBtn.addEventListener('click', toggleCart);
    closeCart.addEventListener('click', toggleCart);
    
    // Filtros
    const filterCheckboxes = document.querySelectorAll('.filter-group input[type="checkbox"]');
    filterCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', applyFilters);
    });
    
    // Rango de precios
    const priceRange = document.getElementById('priceRange');
    const minPrice = document.getElementById('minPrice');
    const maxPrice = document.getElementById('maxPrice');
    
    if (priceRange) {
        priceRange.addEventListener('input', function() {
            maxPrice.value = this.value;
            applyFilters();
        });
    }
    
    if (minPrice && maxPrice) {
        minPrice.addEventListener('change', applyFilters);
        maxPrice.addEventListener('change', applyFilters);
    }
    
    // Colores
    const colorOptions = document.querySelectorAll('.color-option');
    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            this.classList.toggle('active');
            applyFilters();
        });
    });
    
    // Limpiar filtros
    const clearFiltersBtn = document.querySelector('.clear-filters');
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', clearFilters);
    }
    
    // Ordenamiento
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', applyFilters);
    }
    
    // Paginación
    const prevPage = document.querySelector('.prev-page');
    const nextPage = document.querySelector('.next-page');
    
    if (prevPage) {
        prevPage.addEventListener('click', () => changePage(-1));
    }
    if (nextPage) {
        nextPage.addEventListener('click', () => changePage(1));
    }
}

// Renderizar productos
function renderProducts() {
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const productsToShow = filteredProducts.slice(startIndex, endIndex);
    
    productsGrid.innerHTML = '';
    
    productsToShow.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
    
    updateProductCount();
    updatePagination();
}

// Crear tarjeta de producto
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    const discount = product.originalPrice > product.price ? 
        Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;
    
    card.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}">
            ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
        </div>
        <div class="product-info">
            <h3 class="product-title">${product.name}</h3>
            <div class="product-price">
                <span class="current-price">$${formatPrice(product.price)}</span>
                ${product.originalPrice > product.price ? 
                    `<span class="original-price">$${formatPrice(product.originalPrice)}</span>` : ''}
                ${discount > 0 ? `<span class="discount">-${discount}%</span>` : ''}
            </div>
            <div class="product-actions">
                <button class="add-to-cart" onclick="addToCart(${product.id})">
                    <i class="fas fa-shopping-cart"></i> Agregar
                </button>
                <button class="add-to-wishlist" onclick="addToWishlist(${product.id})">
                    <i class="fas fa-heart"></i>
                </button>
            </div>
        </div>
    `;
    
    // Hacer la tarjeta clickeable para ver detalles
    card.style.cursor = 'pointer';
    card.addEventListener('click', function(e) {
        // No abrir detalles si se hace clic en los botones
        if (e.target.closest('.product-actions')) {
            return;
        }
        openProductDetail(product.id);
    });
    
    return card;
}

// Formatear precio
function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// Aplicar filtros
function applyFilters() {
    const categoryFilters = Array.from(document.querySelectorAll('.filter-group input[type="checkbox"][value]'))
        .filter(cb => cb.checked)
        .map(cb => cb.value);
    
    const materialFilters = Array.from(document.querySelectorAll('.filter-group input[type="checkbox"][value]'))
        .filter(cb => cb.checked)
        .map(cb => cb.value);
    
    const minPrice = parseInt(document.getElementById('minPrice')?.value || 0);
    const maxPrice = parseInt(document.getElementById('maxPrice')?.value || 1000000);
    
    const selectedColors = Array.from(document.querySelectorAll('.color-option.active'))
        .map(option => option.dataset.color);
    
    // Filtrar productos
    filteredProducts = products.filter(product => {
        const categoryMatch = categoryFilters.length === 0 || categoryFilters.includes(product.category);
        const materialMatch = materialFilters.length === 0 || materialFilters.includes(product.material);
        const priceMatch = product.price >= minPrice && product.price <= maxPrice;
        const colorMatch = selectedColors.length === 0 || selectedColors.includes(product.color);
        
        return categoryMatch && materialMatch && priceMatch && colorMatch;
    });
    
    // Ordenar productos
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        const sortValue = sortSelect.value;
        
        switch(sortValue) {
            case 'price-low':
                filteredProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filteredProducts.sort((a, b) => b.price - a.price);
                break;
            case 'newest':
                filteredProducts.sort((a, b) => b.id - a.id);
                break;
            default:
                // Más populares (orden por defecto)
                break;
        }
    }
    
    currentPage = 1;
    renderProducts();
}

// Limpiar filtros
function clearFilters() {
    // Limpiar checkboxes
    document.querySelectorAll('.filter-group input[type="checkbox"]').forEach(cb => {
        cb.checked = false;
    });
    
    // Limpiar rango de precios
    const priceRange = document.getElementById('priceRange');
    const minPrice = document.getElementById('minPrice');
    const maxPrice = document.getElementById('maxPrice');
    
    if (priceRange) priceRange.value = 500000;
    if (minPrice) minPrice.value = 0;
    if (maxPrice) maxPrice.value = 500000;
    
    // Limpiar colores
    document.querySelectorAll('.color-option').forEach(option => {
        option.classList.remove('active');
    });
    
    // Resetear ordenamiento
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) sortSelect.value = 'popular';
    
    // Aplicar filtros
    filteredProducts = [...products];
    currentPage = 1;
    renderProducts();
}

// Actualizar contador de productos
function updateProductCount() {
    const count = filteredProducts.length;
    productCount.textContent = `${count} producto${count !== 1 ? 's' : ''} encontrado${count !== 1 ? 's' : ''}`;
}

// Actualizar paginación
function updatePagination() {
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    const pageNumbers = document.querySelector('.page-numbers');
    
    if (pageNumbers) {
        pageNumbers.innerHTML = '';
        
        for (let i = 1; i <= totalPages; i++) {
            const pageSpan = document.createElement('span');
            pageSpan.textContent = i;
            if (i === currentPage) {
                pageSpan.classList.add('active');
            }
            pageSpan.addEventListener('click', () => {
                currentPage = i;
                renderProducts();
            });
            pageNumbers.appendChild(pageSpan);
        }
    }
    
    // Actualizar botones de navegación
    const prevBtn = document.querySelector('.prev-page');
    const nextBtn = document.querySelector('.next-page');
    
    if (prevBtn) prevBtn.disabled = currentPage === 1;
    if (nextBtn) nextBtn.disabled = currentPage === totalPages;
}

// Cambiar página
function changePage(direction) {
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    const newPage = currentPage + direction;
    
    if (newPage >= 1 && newPage <= totalPages) {
        currentPage = newPage;
        renderProducts();
    }
}

// Funciones del carrito
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCartCount();
    updateCartDisplay();
    
    // Mostrar notificación
    showNotification('Producto agregado al carrito');
}

function addToWishlist(productId) {
    showNotification('Producto agregado a favoritos');
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    updateCartDisplay();
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCartCount();
            updateCartDisplay();
        }
    }
}

function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

function updateCartDisplay() {
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; color: #666;">Tu carrito está vacío</p>';
        cartTotal.textContent = '$0';
        return;
    }
    
    let total = 0;
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-price">$${formatPrice(item.price)}</div>
            </div>
            <div class="cart-item-quantity">
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                <span>${item.quantity}</span>
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
            </div>
            <button class="remove-item" onclick="removeFromCart(${item.id})">Eliminar</button>
        `;
        
        cartItems.appendChild(cartItem);
    });
    
    cartTotal.textContent = `$${formatPrice(total)}`;
}

function toggleCart() {
    cartModal.classList.toggle('active');
    if (cartModal.classList.contains('active')) {
        updateCartDisplay();
    }
}

// Abrir página de detalle del producto
function openProductDetail(productId) {
    // Por ahora, redirigir a la página de ejemplo
    // En una implementación real, esto sería dinámico
    window.location.href = `product-detail.html?id=${productId}`;
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

// Configurar navegación entre categorías
function setupCategoryNavigation() {
    const categoryLinks = document.querySelectorAll('.dropdown-menu a[href*="categoria-"]');
    
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            
            // Si estamos en la página principal, navegar a la categoría
            if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
                window.location.href = href;
            } else {
                // Si estamos en otra página, navegar a la categoría
                window.location.href = href;
            }
        });
    });
}

// Cerrar carrito al hacer clic fuera
document.addEventListener('click', function(e) {
    if (cartModal.classList.contains('active') && 
        !cartModal.contains(e.target) && 
        !cartBtn.contains(e.target)) {
        toggleCart();
    }
});

// Animaciones CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style); 
// Cargar detalle del producto cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    inicializarDatos();
    actualizarNavbarUsuario();
    actualizarContadorCarrito();
    cargarDetalleProducto();
    cargarProductosRelacionados();
});

function cargarDetalleProducto() {
    const productoId = parseInt(localStorage.getItem('productoDetalleId'));
    const productos = obtenerProductos();
    const producto = productos.find(p => p.id === productoId);

    if (!producto) {
        document.getElementById('productDetailContainer').innerHTML = 
            '<div class="col-12"><p class="text-center text-muted">Producto no encontrado.</p></div>';
        return;
    }

    // Actualizar breadcrumb
    document.getElementById('productBreadcrumb').textContent = producto.nombre;

    // Determinar imagen
    let imagenHTML = '';
    if (producto.imagen && (producto.imagen.startsWith('data:') || producto.imagen.startsWith('img/'))) {
        imagenHTML = `<img src="${producto.imagen}" alt="${producto.nombre}" class="img-fluid rounded">`;
    } else {
        imagenHTML = `<div style="font-size: 150px; text-align: center;">${producto.imagen || '🍷'}</div>`;
    }

    const container = document.getElementById('productDetailContainer');
    container.innerHTML = `
        <div class="col-md-6">
            <div class="product-detail-image">
                ${imagenHTML}
            </div>
        </div>
        <div class="col-md-6">
            <p class="product-type">${producto.tipo}</p>
            <h1>${producto.nombre}</h1>
            <p class="text-muted mb-3">ID: ${producto.id}</p>
            
            <div class="product-price-section mb-4">
                <h2 class="product-price text-danger">$${parseFloat(producto.precio).toFixed(2)}</h2>
            </div>

            <div class="product-description-detail mb-4">
                <h5>Descripción:</h5>
                <p>${producto.descripcion}</p>
            </div>

            <div class="product-type-detail mb-4">
                <h5>Tipo de Licor:</h5>
                <p class="badge bg-custom">${producto.tipo}</p>
            </div>

            <div class="quantity-section mb-4">
                <label for="cantidad" class="form-label">Cantidad:</label>
                <div class="input-group" style="max-width: 150px;">
                    <button class="btn btn-outline-secondary" type="button" id="decreaseBtn">-</button>
                    <input type="number" class="form-control text-center" id="cantidad" value="1" min="1" max="99">
                    <button class="btn btn-outline-secondary" type="button" id="increaseBtn">+</button>
                </div>
            </div>

            <div class="action-buttons">
                <button class="btn btn-custom btn-lg me-2" onclick="agregarAlCarritoConCantidad()">
                    🛒 Agregar al Carrito
                </button>
                <a href="index.html#productos" class="btn btn-outline-custom btn-lg">
                    ← Volver al Catálogo
                </a>
            </div>

            <div class="mt-4 p-3 bg-light rounded">
                <h5>ℹ️ Información de Envío</h5>
                <ul class="list-unstyled">
                    <li>✓ Envío rápido a toda la región</li>
                    <li>✓ Embalaje especial para bebidas frágiles</li>
                    <li>✓ Garantía de producto en perfecto estado</li>
                    <li>✓ Devolución de 30 días</li>
                </ul>
            </div>
        </div>
    `;

    // Configurar eventos de cantidad
    document.getElementById('decreaseBtn').addEventListener('click', () => {
        let cantidad = parseInt(document.getElementById('cantidad').value);
        if (cantidad > 1) {
            document.getElementById('cantidad').value = cantidad - 1;
        }
    });

    document.getElementById('increaseBtn').addEventListener('click', () => {
        let cantidad = parseInt(document.getElementById('cantidad').value);
        if (cantidad < 99) {
            document.getElementById('cantidad').value = cantidad + 1;
        }
    });
}

function agregarAlCarritoConCantidad() {
    const productoId = parseInt(localStorage.getItem('productoDetalleId'));
    const cantidad = parseInt(document.getElementById('cantidad').value);
    
    if (cantidad < 1) {
        mostrarNotificacion('La cantidad debe ser mayor a 0', 'warning');
        return;
    }

    agregarAlCarrito(productoId, cantidad);
}

function cargarProductosRelacionados() {
    const productoId = parseInt(localStorage.getItem('productoDetalleId'));
    const productos = obtenerProductos();
    const productoActual = productos.find(p => p.id === productoId);

    if (!productoActual) return;

    // Obtener productos del mismo tipo (máximo 3)
    const relacionados = productos
        .filter(p => p.tipo === productoActual.tipo && p.id !== productoId)
        .slice(0, 3);

    // Si no hay productos del mismo tipo, mostrar otros aleatoriamente
    if (relacionados.length === 0) {
        for (let i = 0; i < Math.min(3, productos.length); i++) {
            if (productos[i].id !== productoId) {
                relacionados.push(productos[i]);
            }
        }
    }

    const container = document.getElementById('relatedProductsContainer');
    container.innerHTML = '';

    if (relacionados.length === 0) {
        container.innerHTML = '<div class="col-12"><p class="text-center text-muted">No hay productos relacionados.</p></div>';
        return;
    }

    relacionados.forEach(producto => {
        const col = document.createElement('div');
        col.className = 'col-md-6 col-lg-4 mb-4';

        let imagenHTML = '';
        if (producto.imagen && (producto.imagen.startsWith('data:') || producto.imagen.startsWith('img/'))) {
            imagenHTML = `<img src="${producto.imagen}" alt="${producto.nombre}" class="product-image">`;
        } else {
            imagenHTML = `<div class="product-icon">${producto.imagen || '🍷'}</div>`;
        }

        col.innerHTML = `
            <div class="product-card">
                <div class="product-header">
                    ${imagenHTML}
                </div>
                <div class="product-body">
                    <p class="product-type">${producto.tipo}</p>
                    <h5 class="product-name">${producto.nombre}</h5>
                    <p class="product-description">${producto.descripcion.substring(0, 100)}...</p>
                    <p class="product-price">$${parseFloat(producto.precio).toFixed(2)}</p>
                    <div class="product-actions">
                        <button class="btn-detail" onclick="verProducto(${producto.id})">Ver Detalle</button>
                        <button class="btn-cart" onclick="agregarAlCarrito(${producto.id})">🛒 Agregar</button>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(col);
    });
}

function verProducto(productoId) {
    localStorage.setItem('productoDetalleId', productoId);
    window.location.reload();
}

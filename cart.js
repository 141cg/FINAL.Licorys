// Cargar carrito cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    inicializarDatos();
    actualizarNavbarUsuario();
    actualizarContadorCarrito();
    cargarCarrito();
});

const ENVIO = 5.00;
const IVA = 0.19;

function cargarCarrito() {
    const carrito = obtenerCarrito();
    const container = document.getElementById('cartItemsContainer');

    if (carrito.length === 0) {
        container.innerHTML = `
            <div class="alert alert-info">
                <h4>Tu carrito está vacío</h4>
                <p>No hay productos en tu carrito. <a href="index.html#productos">¡Ve al catálogo!</a></p>
            </div>
        `;
        document.getElementById('checkoutBtn').disabled = true;
        actualizarTotales();
        return;
    }

    container.innerHTML = '';

    carrito.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item card mb-3';
        
        let imagenHTML = '';
        if (item.imagen && (item.imagen.startsWith('data:') || item.imagen.startsWith('img/'))) {
            imagenHTML = `<img src="${item.imagen}" alt="${item.nombre}" class="cart-item-image">`;
        } else {
            imagenHTML = `<div class="cart-item-icon">${item.imagen || '🍷'}</div>`;
        }

        itemDiv.innerHTML = `
            <div class="row g-0">
                <div class="col-md-2">
                    <div class="cart-item-img-container">
                        ${imagenHTML}
                    </div>
                </div>
                <div class="col-md-5">
                    <div class="card-body">
                        <p class="text-muted small">${item.tipo}</p>
                        <h5>${item.nombre}</h5>
                        <p class="text-danger fw-bold">$${parseFloat(item.precio).toFixed(2)}</p>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="card-body d-flex align-items-center">
                        <div class="input-group" style="max-width: 120px;">
                            <button class="btn btn-sm btn-outline-secondary" type="button" onclick="actualizarCantidad(${item.id}, ${item.cantidad - 1})">-</button>
                            <input type="number" class="form-control form-control-sm text-center" value="${item.cantidad}" disabled>
                            <button class="btn btn-sm btn-outline-secondary" type="button" onclick="actualizarCantidad(${item.id}, ${item.cantidad + 1})">+</button>
                        </div>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="card-body text-end">
                        <p class="fw-bold">$${(item.precio * item.cantidad).toFixed(2)}</p>
                        <button class="btn btn-sm btn-danger" onclick="eliminarDelCarrito(${item.id})">
                            🗑️ Eliminar
                        </button>
                    </div>
                </div>
            </div>
        `;

        container.appendChild(itemDiv);
    });

    actualizarTotales();
}

function actualizarCantidad(productoId, nuevaCantidad) {
    if (nuevaCantidad < 1) {
        if (confirm('¿Deseas eliminar este producto del carrito?')) {
            eliminarDelCarrito(productoId);
        }
        return;
    }
    
    if (nuevaCantidad > 99) {
        mostrarNotificacion('Cantidad máxima: 99 unidades', 'warning');
        return;
    }

    actualizarCantidadCarrito(productoId, nuevaCantidad);
    cargarCarrito();
}

function actualizarTotales() {
    const subtotal = calcularTotalCarrito();
    const iva = subtotal * IVA;
    const total = subtotal + iva + ENVIO;

    document.getElementById('subtotalAmount').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('taxAmount').textContent = `$${iva.toFixed(2)}`;
    document.getElementById('totalAmount').textContent = `$${total.toFixed(2)}`;

    const checkoutBtn = document.getElementById('checkoutBtn');
    checkoutBtn.disabled = obtenerCarrito().length === 0;
}

function irAlCheckout() {
    window.location.href = 'checkout.html';
}

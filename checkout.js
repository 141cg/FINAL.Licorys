// Cargar checkout cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    inicializarDatos();
    
    // Verificar que el usuario está autenticado
    const usuarioActual = obtenerUsuarioActual();
    if (!usuarioActual) {
        alert('Debes iniciar sesión para continuar con el checkout');
        window.location.href = 'auth.html';
        return;
    }
    
    // Pre-llenar datos del usuario
    document.getElementById('nombre').value = usuarioActual.nombre;
    document.getElementById('email').value = usuarioActual.email;
    
    cargarResumenCheckout();
});

const ENVIO = 5.00;
const IVA = 0.19;

function cargarResumenCheckout() {
    const carrito = obtenerCarrito();

    if (carrito.length === 0) {
        window.location.href = 'cart.html';
        return;
    }

    // Cargar items del checkout
    const itemsList = document.getElementById('checkoutItemsList');
    itemsList.innerHTML = '';

    carrito.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'checkout-item mb-2 pb-2 border-bottom';
        itemDiv.innerHTML = `
            <div class="d-flex justify-content-between align-items-center">
                <div>
                    <p class="mb-1 fw-bold">${item.nombre}</p>
                    <p class="mb-0 text-muted small">${item.tipo}</p>
                </div>
                <div class="text-end">
                    <p class="mb-1">x${item.cantidad}</p>
                    <p class="mb-0 text-danger fw-bold">$${(item.precio * item.cantidad).toFixed(2)}</p>
                </div>
            </div>
        `;
        itemsList.appendChild(itemDiv);
    });

    // Actualizar totales
    actualizarTotalesCheckout();
}

function actualizarTotalesCheckout() {
    const subtotal = calcularTotalCarrito();
    const iva = subtotal * IVA;
    const total = subtotal + iva + ENVIO;

    document.getElementById('checkoutSubtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('checkoutIVA').textContent = `$${iva.toFixed(2)}`;
    document.getElementById('checkoutEnvio').textContent = `$${ENVIO.toFixed(2)}`;
    document.getElementById('checkoutTotal').textContent = `$${total.toFixed(2)}`;
}

function procesarPedido(event) {
    event.preventDefault();

    // Validar que hay items en el carrito
    const carrito = obtenerCarrito();
    if (carrito.length === 0) {
        mostrarNotificacion('El carrito está vacío', 'warning');
        return;
    }

    // Validar términos
    if (!document.getElementById('terminos').checked) {
        mostrarNotificacion('Debes aceptar los términos y condiciones', 'warning');
        return;
    }

    // Recolectar datos del formulario
    const pedido = {
        id: '#' + Date.now().toString().slice(-8),
        fecha: new Date().toISOString(),
        cliente: {
            nombre: document.getElementById('nombre').value,
            email: document.getElementById('email').value,
            telefono: document.getElementById('telefono').value,
            cedula: document.getElementById('cedula').value
        },
        envio: {
            direccion: document.getElementById('direccion').value,
            ciudad: document.getElementById('ciudad').value,
            departamento: document.getElementById('departamento').value,
            codigoPostal: document.getElementById('codigoPostal').value
        },
        metodoPago: document.querySelector('input[name="metodoPago"]:checked').value,
        items: carrito,
        subtotal: calcularTotalCarrito(),
        iva: calcularTotalCarrito() * IVA,
        envio: ENVIO,
        total: calcularTotalCarrito() + (calcularTotalCarrito() * IVA) + ENVIO,
        estado: 'pendiente'
    };

    // Guardar pedido
    let pedidos = obtenerPedidos();
    pedidos.push(pedido);
    guardarPedidos(pedidos);

    // Limpiar carrito
    guardarCarrito([]);

    // Mostrar modal de confirmación
    document.getElementById('pedidoNumero').textContent = pedido.id;
    const confirmationModal = new bootstrap.Modal(document.getElementById('confirmationModal'));
    confirmationModal.show();

    // Opcional: Enviar datos a backend
    enviarPedidoAlBackend(pedido);
}

async function enviarPedidoAlBackend(pedido) {
    try {
        const response = await fetch('http://localhost:8080/pedidos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(pedido)
        });

        if (response.ok) {
            console.log('Pedido enviado al backend exitosamente');
        }
    } catch (error) {
        console.log('Nota: El backend no está disponible, pedido guardado localmente');
        // El pedido ya está guardado en localStorage, esto es solo para informar
    }
}

function volverAlInicio() {
    window.location.href = 'index.html';
}

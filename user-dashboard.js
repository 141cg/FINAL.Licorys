// Dashboard de usuario
document.addEventListener('DOMContentLoaded', function() {
    inicializarDatos();
    const usuario = verificarAutenticacion();
    
    if (usuario) {
        cargarPerfilUsuario(usuario);
        cargarComprasUsuario(usuario);
        cargarDirecciones(usuario);
        configurarEventosDashboard();
    }
});

function cargarPerfilUsuario(usuario) {
    document.getElementById('nombreUsuario').textContent = usuario.nombre;
    document.getElementById('emailUsuario').textContent = usuario.email;
    document.getElementById('fechaRegistro').textContent = new Date(usuario.fechaRegistro).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // Datos en la sección de perfil
    document.getElementById('perfilNombre').textContent = usuario.nombre;
    document.getElementById('perfilEmail').textContent = usuario.email;
    document.getElementById('perfilFecha').textContent = new Date(usuario.fechaRegistro).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function cargarComprasUsuario(usuario) {
    const pedidos = obtenerPedidos();
    const pedidosUsuario = pedidos.filter(p => p.cliente.email === usuario.email);
    const container = document.getElementById('comprasContainer');

    if (pedidosUsuario.length === 0) {
        container.innerHTML = `
            <div class="alert alert-info">
                <h5>📦 No tienes compras aún</h5>
                <p>¿Qué esperas? <a href="index.html#productos">¡Ve a comprar licores premium!</a></p>
            </div>
        `;
        return;
    }

    container.innerHTML = '';

    // Mostrar compras en orden inverso (más recientes primero)
    pedidosUsuario.reverse().forEach(pedido => {
        const compraDiv = document.createElement('div');
        compraDiv.className = 'compra-card';

        const fechaPedido = new Date(pedido.fecha).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });

        const estadoClase = pedido.estado === 'entregado' ? 'estado-entregado' : 'estado-pendiente';
        const estadoTexto = pedido.estado === 'entregado' ? 'Entregado' : 'Pendiente';

        let itemsHTML = '';
        pedido.items.forEach(item => {
            itemsHTML += `
                <div class="compra-item">
                    <div class="compra-item-info">
                        <div class="compra-item-nombre">${item.nombre}</div>
                        <div class="compra-item-tipo">${item.tipo}</div>
                    </div>
                    <div style="text-align: right;">
                        <div>x${item.cantidad}</div>
                        <div class="compra-item-precio">$${(item.precio * item.cantidad).toFixed(2)}</div>
                    </div>
                </div>
            `;
        });

        compraDiv.innerHTML = `
            <div class="compra-header">
                <span class="compra-numero">${pedido.id}</span>
                <span class="compra-estado ${estadoClase}">${estadoTexto}</span>
            </div>
            <div class="text-muted small mb-3">
                📅 ${fechaPedido}
            </div>
            <div class="compra-items">
                ${itemsHTML}
            </div>
            <div class="compra-totales">
                <div class="compra-total-row">
                    <span>Subtotal:</span>
                    <span>$${pedido.subtotal.toFixed(2)}</span>
                </div>
                <div class="compra-total-row">
                    <span>IVA (19%):</span>
                    <span>$${pedido.iva.toFixed(2)}</span>
                </div>
                <div class="compra-total-row">
                    <span>Envío:</span>
                    <span>$${pedido.envio.toFixed(2)}</span>
                </div>
                <div class="compra-total-final">
                    <span>Total:</span>
                    <span>$${pedido.total.toFixed(2)}</span>
                </div>
            </div>
            <div class="mt-3 text-muted small">
                <strong>Enviado a:</strong> ${pedido.envio.direccion}, ${pedido.envio.ciudad}<br>
                <strong>Método de pago:</strong> ${pedido.metodoPago}
            </div>
        `;

        container.appendChild(compraDiv);
    });
}

function cargarDirecciones(usuario) {
    const pedidos = obtenerPedidos();
    const direcciones = [];

    // Extraer direcciones únicas de los pedidos
    pedidos.forEach(pedido => {
        if (pedido.cliente.email === usuario.email) {
            const direccionStr = JSON.stringify(pedido.envio);
            if (!direcciones.some(d => JSON.stringify(d) === direccionStr)) {
                direcciones.push(pedido.envio);
            }
        }
    });

    const container = document.getElementById('direccionesContainer');

    if (direcciones.length === 0) {
        container.innerHTML = `
            <div class="alert alert-info">
                <p>No tienes direcciones registradas aún. Cuando completes tu primera compra, aparecerá aquí.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = '';

    direcciones.forEach((dir, index) => {
        const dirDiv = document.createElement('div');
        dirDiv.className = 'card mb-3';
        dirDiv.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">📍 Dirección ${index + 1}</h5>
                <p class="card-text">
                    <strong>${dir.direccion}</strong><br>
                    ${dir.ciudad}, ${dir.departamento}<br>
                    Código Postal: ${dir.codigoPostal || 'No especificado'}
                </p>
            </div>
        `;
        container.appendChild(dirDiv);
    });
}

function mostrarSeccion(nombreSeccion) {
    // Ocultar todas las secciones
    document.querySelectorAll('[id^="seccion"]').forEach(seccion => {
        seccion.classList.remove('seccion-activa');
        seccion.classList.add('seccion-oculta');
    });

    // Mostrar sección seleccionada
    const seccionId = 'seccion' + nombreSeccion.charAt(0).toUpperCase() + nombreSeccion.slice(1);
    const seccion = document.getElementById(seccionId);
    if (seccion) {
        seccion.classList.remove('seccion-oculta');
        seccion.classList.add('seccion-activa');
    }

    // Actualizar botones del menú
    document.querySelectorAll('.list-group-item').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
}

function configurarEventosDashboard() {
    const formCambiarContraseña = document.getElementById('formCambiarContraseña');
    if (formCambiarContraseña) {
        formCambiarContraseña.addEventListener('submit', cambiarContraseña);
    }
}

function cambiarContraseña(event) {
    event.preventDefault();

    const usuario = obtenerUsuarioActual();
    const contraseñaActual = document.getElementById('contraseñaActual').value;
    const contraseñaNueva = document.getElementById('contraseñaNueva').value;
    const contraseñaConfirmar = document.getElementById('contraseñaConfirmar').value;

    if (contraseñaActual !== usuario.contraseña) {
        alert('La contraseña actual es incorrecta');
        return;
    }

    if (contraseñaNueva.length < 6) {
        alert('La nueva contraseña debe tener al menos 6 caracteres');
        return;
    }

    if (contraseñaNueva !== contraseñaConfirmar) {
        alert('Las contraseñas no coinciden');
        return;
    }

    // Actualizar contraseña
    const usuarios = obtenerUsuarios();
    const index = usuarios.findIndex(u => u.id === usuario.id);
    if (index !== -1) {
        usuarios[index].contraseña = contraseñaNueva;
        guardarUsuarios(usuarios);

        // Actualizar usuario actual
        usuario.contraseña = contraseñaNueva;
        guardarUsuarioActual(usuario);

        alert('Contraseña cambiada exitosamente');
        document.getElementById('formCambiarContraseña').reset();
    }
}

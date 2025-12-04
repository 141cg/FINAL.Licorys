// Dashboard de administrador
let productoEditando = null;

document.addEventListener('DOMContentLoaded', function() {
    inicializarDatos();
    const admin = verificarAdministrador();
    
    if (admin) {
        cargarEstadisticas();
        cargarPedidos();
        cargarUsuarios();
        cargarProductos();
        cargarMensajes();
    }
});

function cargarEstadisticas() {
    const usuarios = obtenerUsuarios();
    const pedidos = obtenerPedidos();
    const mensajes = obtenerMensajesContacto();

    const totalUsuarios = usuarios.length;
    const totalPedidos = pedidos.length;
    const pedidosEntregados = pedidos.filter(p => p.estado === 'entregado').length;
    const totalIngresos = pedidos.reduce((suma, p) => suma + p.total, 0);
    const mensajesNuevos = mensajes.filter(m => m.estado === 'nuevo').length;

    document.getElementById('totalUsuarios').textContent = totalUsuarios;
    document.getElementById('totalPedidos').textContent = totalPedidos;
    document.getElementById('pedidosEntregados').textContent = pedidosEntregados;
    document.getElementById('totalIngresos').textContent = '$' + totalIngresos.toFixed(2);
    document.getElementById('mensajesNuevos').textContent = mensajesNuevos;
}

function cargarPedidos(filtro = '') {
    const pedidos = obtenerPedidos();
    const container = document.getElementById('pedidosContainer');

    let pedidosFiltrados = pedidos;
    if (filtro) {
        pedidosFiltrados = pedidos.filter(p => p.estado === filtro);
    }

    if (pedidosFiltrados.length === 0) {
        container.innerHTML = '<p class="text-muted">No hay pedidos</p>';
        return;
    }

    container.innerHTML = '';

    pedidosFiltrados.reverse().forEach(pedido => {
        const pedidoDiv = document.createElement('div');
        pedidoDiv.className = 'pedido-card';

        const fechaPedido = new Date(pedido.fecha).toLocaleDateString('es-ES');
        const estadoBadge = pedido.estado === 'entregado' 
            ? '<span class="badge bg-success">Entregado</span>'
            : '<span class="badge bg-warning">Pendiente</span>';

        let itemsHTML = '';
        pedido.items.forEach(item => {
            itemsHTML += `<li>${item.nombre} (x${item.cantidad}) - $${(item.precio * item.cantidad).toFixed(2)}</li>`;
        });

        pedidoDiv.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                <h5>${pedido.id}</h5>
                ${estadoBadge}
            </div>
            <p><strong>Cliente:</strong> ${pedido.cliente.nombre} (${pedido.cliente.email})</p>
            <p><strong>Teléfono:</strong> ${pedido.cliente.telefono}</p>
            <p><strong>Fecha:</strong> ${fechaPedido}</p>
            <p><strong>Dirección:</strong> ${pedido.envio.direccion}, ${pedido.envio.ciudad}</p>
            <p><strong>Método de Pago:</strong> ${pedido.metodoPago}</p>
            <p><strong>Items:</strong></p>
            <ul>${itemsHTML}</ul>
            <p><strong>Total:</strong> $${pedido.total.toFixed(2)}</p>
            <div style="margin-top: 15px;">
                ${pedido.estado === 'pendiente' 
                    ? `<button class="btn btn-sm btn-success" onclick="marcarEntregado('${pedido.id}')">✓ Marcar como Entregado</button>`
                    : `<button class="btn btn-sm btn-secondary" onclick="marcarPendiente('${pedido.id}')">↶ Marcar como Pendiente</button>`
                }
            </div>
        `;

        container.appendChild(pedidoDiv);
    });
}

function marcarEntregado(pedidoId) {
    const pedidos = obtenerPedidos();
    const pedido = pedidos.find(p => p.id === pedidoId);
    
    if (pedido) {
        pedido.estado = 'entregado';
        guardarPedidos(pedidos);
        cargarEstadisticas();
        cargarPedidos();
        alert('Pedido marcado como entregado');
    }
}

function marcarPendiente(pedidoId) {
    const pedidos = obtenerPedidos();
    const pedido = pedidos.find(p => p.id === pedidoId);
    
    if (pedido) {
        pedido.estado = 'pendiente';
        guardarPedidos(pedidos);
        cargarEstadisticas();
        cargarPedidos();
        alert('Pedido marcado como pendiente');
    }
}

function filtrarPedidos() {
    const filtro = document.getElementById('filtroEstado').value;
    cargarPedidos(filtro);
}

function cargarUsuarios() {
    const usuarios = obtenerUsuarios();
    const container = document.getElementById('usuariosContainer');

    if (usuarios.length === 0) {
        container.innerHTML = '<p class="text-muted">No hay usuarios</p>';
        return;
    }

    container.innerHTML = '';

    usuarios.forEach(usuario => {
        const usuarioDiv = document.createElement('div');
        usuarioDiv.className = 'usuario-card';

        const rolBadge = usuario.rol === 'admin' 
            ? '<span class="badge bg-danger">Administrador</span>'
            : '<span class="badge bg-info">Usuario</span>';

        const fechaRegistro = new Date(usuario.fechaRegistro).toLocaleDateString('es-ES');

        usuarioDiv.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <h6><strong>${usuario.nombre}</strong></h6>
                    <p class="text-muted small">${usuario.email}</p>
                    <p class="small">📅 Registrado: ${fechaRegistro}</p>
                </div>
                ${rolBadge}
            </div>
        `;

        container.appendChild(usuarioDiv);
    });
}

function cargarProductos() {
    const productos = obtenerProductos();
    const container = document.getElementById('productosContainer');

    if (productos.length === 0) {
        container.innerHTML = '<p class="text-muted">No hay productos</p>';
        return;
    }

    // Agrupar productos por categoría
    const productosPorCategoria = {};
    productos.forEach(producto => {
        const categoria = producto.categoria || 'Sin categoría';
        if (!productosPorCategoria[categoria]) {
            productosPorCategoria[categoria] = [];
        }
        productosPorCategoria[categoria].push(producto);
    });

    container.innerHTML = '';

    // Mostrar productos agrupados por categoría
    const categorias = ['Licores Premium', 'Licores Tradicionales', 'Vinos'];
    
    categorias.forEach(categoria => {
        if (productosPorCategoria[categoria]) {
            const categoriaDiv = document.createElement('div');
            categoriaDiv.style.marginBottom = '30px';
            
            categoriaDiv.innerHTML = `<h5 style="color: var(--color-vino); border-bottom: 2px solid var(--color-vino); padding-bottom: 10px; margin-bottom: 15px;">${categoria}</h5>`;
            
            const productosDiv = document.createElement('div');
            productosDiv.style.display = 'grid';
            productosDiv.style.gap = '15px';
            
            productosPorCategoria[categoria].forEach(producto => {
                const productoCard = document.createElement('div');
                productoCard.className = 'producto-card';
                
                productoCard.innerHTML = `
                    <div style="display: flex; justify-content: space-between; align-items: start;">
                        <div style="flex: 1;">
                            <h6><strong>${producto.nombre}</strong></h6>
                            <p class="text-muted small">${producto.tipo}</p>
                            <p class="small">${producto.descripcion.substring(0, 100)}...</p>
                            <p><strong>Precio:</strong> $${producto.precio.toFixed(2)}</p>
                        </div>
                        <div style="text-align: right;">
                            <button class="btn btn-sm btn-primary me-2" onclick="editarProducto(${producto.id})">
                                ✏️ Editar
                            </button>
                            <button class="btn btn-sm btn-danger" onclick="eliminarProductoAdmin(${producto.id})">
                                🗑️ Eliminar
                            </button>
                        </div>
                    </div>
                `;
                
                productosDiv.appendChild(productoCard);
            });
            
            categoriaDiv.appendChild(productosDiv);
            container.appendChild(categoriaDiv);
        }
    });

    // Mostrar productos sin categoría
    if (productosPorCategoria['Sin categoría']) {
        const sinCategoriaDiv = document.createElement('div');
        sinCategoriaDiv.style.marginBottom = '30px';
        
        sinCategoriaDiv.innerHTML = `<h5 style="color: #ccc; border-bottom: 2px solid #ccc; padding-bottom: 10px; margin-bottom: 15px;">Sin categoría</h5>`;
        
        productosPorCategoria['Sin categoría'].forEach(producto => {
            const productoCard = document.createElement('div');
            productoCard.className = 'producto-card';
            
            productoCard.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: start;">
                    <div style="flex: 1;">
                        <h6><strong>${producto.nombre}</strong></h6>
                        <p class="text-muted small">${producto.tipo}</p>
                        <p class="small">${producto.descripcion.substring(0, 100)}...</p>
                        <p><strong>Precio:</strong> $${producto.precio.toFixed(2)}</p>
                    </div>
                    <div style="text-align: right;">
                        <button class="btn btn-sm btn-primary me-2" onclick="editarProducto(${producto.id})">
                            ✏️ Editar
                        </button>
                        <button class="btn btn-sm btn-danger" onclick="eliminarProductoAdmin(${producto.id})">
                            🗑️ Eliminar
                        </button>
                    </div>
                </div>
            `;
            
            sinCategoriaDiv.appendChild(productoCard);
        });
        
        container.appendChild(sinCategoriaDiv);
    }
}

function abrirAgregarProducto() {
    productoEditando = null;
    document.getElementById('formProducto').reset();
    document.querySelector('#modalProducto .modal-title').textContent = 'Agregar Nuevo Producto';
    new bootstrap.Modal(document.getElementById('modalProducto')).show();
}

function editarProducto(productoId) {
    const productos = obtenerProductos();
    const producto = productos.find(p => p.id === productoId);

    if (!producto) return;

    productoEditando = producto.id;
    document.getElementById('productoNombre').value = producto.nombre;
    document.getElementById('productoCategoria').value = producto.categoria || '';
    actualizarTiposProducto();
    document.getElementById('productoTipo').value = producto.tipo;
    document.getElementById('productoPrecio').value = producto.precio;
    document.getElementById('productoDescripcion').value = producto.descripcion;
    document.getElementById('productoImagen').value = producto.imagen;
    
    document.querySelector('#modalProducto .modal-title').textContent = 'Editar Producto';
    new bootstrap.Modal(document.getElementById('modalProducto')).show();
}

function guardarProducto() {
    const nombre = document.getElementById('productoNombre').value.trim();
    const categoria = document.getElementById('productoCategoria').value;
    const tipo = document.getElementById('productoTipo').value;
    const precio = parseFloat(document.getElementById('productoPrecio').value);
    const descripcion = document.getElementById('productoDescripcion').value.trim();
    const imagen = document.getElementById('productoImagen').value.trim();

    if (!nombre || !categoria || !tipo || !precio || !descripcion) {
        alert('Por favor completa todos los campos requeridos');
        return;
    }

    let productos = obtenerProductos();

    if (productoEditando) {
        // Editar producto existente
        const index = productos.findIndex(p => p.id === productoEditando);
        if (index !== -1) {
            productos[index] = {
                ...productos[index],
                nombre,
                categoria,
                tipo,
                precio,
                descripcion,
                imagen: imagen || productos[index].imagen
            };
        }
    } else {
        // Agregar nuevo producto
        const nuevoProducto = {
            id: Date.now(),
            nombre,
            categoria,
            tipo,
            precio,
            descripcion,
            imagen: imagen || '🍷'
        };
        productos.push(nuevoProducto);
    }

    guardarProductos(productos);
    bootstrap.Modal.getInstance(document.getElementById('modalProducto')).hide();
    cargarProductos();
    alert(productoEditando ? 'Producto actualizado' : 'Producto agregado');
}

function eliminarProductoAdmin(productoId) {
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
        let productos = obtenerProductos();
        productos = productos.filter(p => p.id !== productoId);
        guardarProductos(productos);
        cargarProductos();
        alert('Producto eliminado');
    }
}

function actualizarTiposProducto() {
    const categoria = document.getElementById('productoCategoria').value;
    const tipoSelect = document.getElementById('productoTipo');
    
    let tipos = [];
    
    if (categoria === 'Licores Premium') {
        tipos = ['Whisky Premium', 'Ron Premium', 'Tequila Premium', 'Cognac', 'Armagnac'];
    } else if (categoria === 'Licores Tradicionales') {
        tipos = ['Whisky', 'Ron', 'Tequila', 'Vodka', 'Ginebra', 'Baileys', 'Licor'];
    } else if (categoria === 'Vinos') {
        tipos = ['Vino Tinto', 'Vino Blanco', 'Vino Rosado', 'Champagne', 'Espumante'];
    }
    
    tipoSelect.innerHTML = '<option value="">Seleccionar...</option>';
    tipos.forEach(tipo => {
        const option = document.createElement('option');
        option.value = tipo;
        option.textContent = tipo;
        tipoSelect.appendChild(option);
    });
}

// ==================== FUNCIONES DE MENSAJES DE CONTACTO ====================

function cargarMensajes(filtro = '') {
    const mensajes = obtenerMensajesContacto();
    const container = document.getElementById('mensajesContainer');

    let mensajesFiltrados = mensajes;
    if (filtro) {
        mensajesFiltrados = mensajes.filter(m => m.estado === filtro);
    }

    if (mensajesFiltrados.length === 0) {
        container.innerHTML = '<p class="text-muted">No hay mensajes</p>';
        return;
    }

    container.innerHTML = '';

    mensajesFiltrados.reverse().forEach(mensaje => {
        const mensajeDiv = document.createElement('div');
        mensajeDiv.className = `mensaje-card ${mensaje.estado || 'nuevo'}`;

        const fechaMensaje = new Date(mensaje.fecha).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });

        const estadoBadge = {
            'nuevo': '<span class="badge bg-warning">Nuevo</span>',
            'leído': '<span class="badge bg-secondary">Leído</span>',
            'respondido': '<span class="badge bg-success">Respondido</span>'
        }[mensaje.estado] || '<span class="badge bg-warning">Nuevo</span>';

        mensajeDiv.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 15px;">
                <div>
                    <h5 style="margin-bottom: 5px;">${mensaje.nombre}</h5>
                    <p style="margin-bottom: 5px; color: #666;"><strong>Email:</strong> <a href="mailto:${mensaje.email}">${mensaje.email}</a></p>
                    <p style="margin-bottom: 5px; color: #666;"><strong>Teléfono:</strong> ${mensaje.telefono || 'No indicado'}</p>
                    <p style="margin-bottom: 10px; color: #999; font-size: 0.9em;">${fechaMensaje}</p>
                </div>
                ${estadoBadge}
            </div>
            <div style="background: white; padding: 15px; border-radius: 4px; margin-bottom: 15px;">
                <p style="margin-bottom: 10px;"><strong>Asunto:</strong> ${mensaje.asunto}</p>
                <p style="margin: 0; color: #333; line-height: 1.6;">${mensaje.mensaje.replace(/\n/g, '<br>')}</p>
            </div>
            <div style="display: flex; gap: 10px;">
                ${mensaje.estado !== 'leído' 
                    ? `<button class="btn btn-sm btn-info" onclick="marcarMensajeLeido('${mensaje.id}')">👁️ Marcar como Leído</button>`
                    : ''
                }
                ${mensaje.estado !== 'respondido' 
                    ? `<button class="btn btn-sm btn-success" onclick="marcarMensajeRespondido('${mensaje.id}')">✓ Marcar como Respondido</button>`
                    : ''
                }
                <button class="btn btn-sm btn-danger" onclick="eliminarMensaje('${mensaje.id}')">🗑️ Eliminar</button>
            </div>
        `;

        container.appendChild(mensajeDiv);
    });
}

function filtrarMensajes() {
    const filtro = document.getElementById('filtroMensajes').value;
    cargarMensajes(filtro);
}

function buscarMensajes() {
    const termino = document.getElementById('buscarMensajes').value.toLowerCase();
    const mensajes = obtenerMensajesContacto();
    const container = document.getElementById('mensajesContainer');

    if (!termino) {
        cargarMensajes();
        return;
    }

    const mensajesFiltrados = mensajes.filter(m => 
        m.nombre.toLowerCase().includes(termino) || 
        m.email.toLowerCase().includes(termino) ||
        m.asunto.toLowerCase().includes(termino) ||
        m.mensaje.toLowerCase().includes(termino)
    );

    if (mensajesFiltrados.length === 0) {
        container.innerHTML = '<p class="text-muted">No hay resultados de búsqueda</p>';
        return;
    }

    container.innerHTML = '';

    mensajesFiltrados.reverse().forEach(mensaje => {
        const mensajeDiv = document.createElement('div');
        mensajeDiv.className = `mensaje-card ${mensaje.estado || 'nuevo'}`;

        const fechaMensaje = new Date(mensaje.fecha).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });

        const estadoBadge = {
            'nuevo': '<span class="badge bg-warning">Nuevo</span>',
            'leído': '<span class="badge bg-secondary">Leído</span>',
            'respondido': '<span class="badge bg-success">Respondido</span>'
        }[mensaje.estado] || '<span class="badge bg-warning">Nuevo</span>';

        mensajeDiv.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 15px;">
                <div>
                    <h5 style="margin-bottom: 5px;">${mensaje.nombre}</h5>
                    <p style="margin-bottom: 5px; color: #666;"><strong>Email:</strong> <a href="mailto:${mensaje.email}">${mensaje.email}</a></p>
                    <p style="margin-bottom: 5px; color: #666;"><strong>Teléfono:</strong> ${mensaje.telefono || 'No indicado'}</p>
                    <p style="margin-bottom: 10px; color: #999; font-size: 0.9em;">${fechaMensaje}</p>
                </div>
                ${estadoBadge}
            </div>
            <div style="background: white; padding: 15px; border-radius: 4px; margin-bottom: 15px;">
                <p style="margin-bottom: 10px;"><strong>Asunto:</strong> ${mensaje.asunto}</p>
                <p style="margin: 0; color: #333; line-height: 1.6;">${mensaje.mensaje.replace(/\n/g, '<br>')}</p>
            </div>
            <div style="display: flex; gap: 10px;">
                ${mensaje.estado !== 'leído' 
                    ? `<button class="btn btn-sm btn-info" onclick="marcarMensajeLeido('${mensaje.id}')">👁️ Marcar como Leído</button>`
                    : ''
                }
                ${mensaje.estado !== 'respondido' 
                    ? `<button class="btn btn-sm btn-success" onclick="marcarMensajeRespondido('${mensaje.id}')">✓ Marcar como Respondido</button>`
                    : ''
                }
                <button class="btn btn-sm btn-danger" onclick="eliminarMensaje('${mensaje.id}')">🗑️ Eliminar</button>
            </div>
        `;

        container.appendChild(mensajeDiv);
    });
}

function marcarMensajeLeido(mensajeId) {
    const mensajes = obtenerMensajesContacto();
    const mensaje = mensajes.find(m => m.id === mensajeId);
    
    if (mensaje) {
        mensaje.estado = 'leído';
        localStorage.setItem('mensajesContacto', JSON.stringify(mensajes));
        cargarMensajes();
        alert('Mensaje marcado como leído');
    }
}

function marcarMensajeRespondido(mensajeId) {
    const mensajes = obtenerMensajesContacto();
    const mensaje = mensajes.find(m => m.id === mensajeId);
    
    if (mensaje) {
        mensaje.estado = 'respondido';
        localStorage.setItem('mensajesContacto', JSON.stringify(mensajes));
        cargarMensajes();
        alert('Mensaje marcado como respondido');
    }
}

function eliminarMensaje(mensajeId) {
    if (confirm('¿Estás seguro de que deseas eliminar este mensaje?')) {
        let mensajes = obtenerMensajesContacto();
        mensajes = mensajes.filter(m => m.id !== mensajeId);
        localStorage.setItem('mensajesContacto', JSON.stringify(mensajes));
        cargarMensajes();
        alert('Mensaje eliminado');
    }
}

function obtenerMensajesContacto() {
    const mensajes = localStorage.getItem('mensajesContacto');
    return mensajes ? JSON.parse(mensajes) : [];
}

// ==================== INICIALIZACIÓN ==================== 

// Usuario admin por defecto
const usuarioAdminDefecto = {
    id: 1,
    nombre: "Administrador",
    email: "admin@licorys.com",
    contraseña: "admin123",
    rol: "admin",
    fechaRegistro: new Date().toISOString(),
    estado: "activo"
};

// Productos por defecto
const productosDefecto = [

    {
        id: 6,
        nombre: "Baileys Original",
        descripcion: " Descubre Baileys Irish Cream, la mezcla perfecta de whisky irlandés, crema fresca y un toque de cacao que conquista a todos los paladares. Cremoso, suave y delicioso, Baileys es el licor ideal para disfrutar solo, con hielo o en tus cócteles y postres favoritos.",
        precio:109.000,
        tipo: "Baileys",
        categoria: "Licores Tradicionales",
        imagen: "img/Bailyes.png"
    },
    {
        id: 7,
        nombre: "Buchanan's",
        descripcion:
          "Buchanan's es el equilibrio perfecto entre elegancia, carácter y madurez. Envejecido por casi dos décadas, este whisky escocés premium ofrece una experiencia intensa y sofisticada, con notas de roble tostado, frutas secas, chocolate oscuro y un final suave que permanece.",
        precio:420.000,
        tipo: "Whisky Premium",
        categoria: "Licores Premium",
        imagen: "img/BUCHANANS-18.png"
    },
    {
        id: 8,
        nombre: "Don Julio Tequila",
        descripcion: " Descubre Don Julio 70, la edición especial que redefine la experiencia del tequila. Con su innovador proceso de añejamiento en barricas de roble francés y un sabor complejo, suave y lleno de matices, este tequila es el favorito de los amantes de lo exclusivo.",
        precio:410.000,
        tipo: "Tequila Premium",
        categoria: "Licores Premium",
        imagen: "img/DonJulio70.jpg"
    },
    {
        id: 9,
        nombre: "Old Parr Whisky",
        descripcion: "Descubre Old Parr, el whisky escocés que combina tradición y fuerza en cada sorbo. Con su característico sabor robusto y suave a la vez, Old Parr es el compañero ideal para quienes buscan calidad y personalidad en un solo licor.",
        precio:390.000,
        tipo: "Whisky",
        categoria: "Licores Tradicionales",
        imagen: "img/oldparr.jpg"
    },
    {
        id: 10,
        nombre: "José Cuervo Especial",
        descripcion: "Disfruta de José Cuervo, el tequila más icónico y reconocido a nivel mundial. Con siglos de tradición y maestría, cada botella ofrece un sabor auténtico, vibrante y lleno de carácter, ideal para cualquier ocasión.",
        precio:92.000,
        tipo: "Tequila",
        categoria: "Licores Tradicionales",
        imagen: "img/josecuervo.jpg"
    }
];

// Comentarios por defecto
const comentariosDefecto = [
    {
        id: 1,
        nombre: "Carlos Rodríguez",
        calificacion: "⭐⭐⭐⭐⭐",
        texto: "Excelente servicio y productos de muy buena calidad. Volvería sin dudarlo.",
        fecha: "2025-11-20"
    },
    {
        id: 2,
        nombre: "María García",
        calificacion: "⭐⭐⭐⭐",
        texto: "Muy buena selección de vinos. El personal es muy amable y conocedor.",
        fecha: "2025-11-18"
    },
    {
        id: 3,
        nombre: "Juan López",
        calificacion: "⭐⭐⭐⭐⭐",
        texto: "Lícorera rustica auténtica con verdadera calidad. Recomiendo ampliamente.",
        fecha: "2025-11-15"
    }
];

// Inicializar localStorage al cargar
document.addEventListener('DOMContentLoaded', function() {
    inicializarDatos();
    actualizarNavbarUsuario();
    cargarProductos();
    cargarComentarios();
    configurarEventos();
});

// ==================== FUNCIONES DE STORAGE ==================== 

function inicializarDatos() {
    // Inicializar productos - siempre actualizar con la versión nueva
    localStorage.setItem('productos', JSON.stringify(productosDefecto));

    // Inicializar comentarios
    if (!localStorage.getItem('comentarios')) {
        localStorage.setItem('comentarios', JSON.stringify(comentariosDefecto));
    }

    // Inicializar mensajes de contacto
    if (!localStorage.getItem('mensajesContacto')) {
        localStorage.setItem('mensajesContacto', JSON.stringify([]));
    }

    // Inicializar carrito
    if (!localStorage.getItem('carrito')) {
        localStorage.setItem('carrito', JSON.stringify([]));
    }

    // Inicializar pedidos
    if (!localStorage.getItem('pedidos')) {
        localStorage.setItem('pedidos', JSON.stringify([]));
    }

    // Inicializar usuarios con admin por defecto
    if (!localStorage.getItem('usuarios')) {
        localStorage.setItem('usuarios', JSON.stringify([usuarioAdminDefecto]));
    }

    // Inicializar sesión actual
    if (!localStorage.getItem('usuarioActual')) {
        localStorage.setItem('usuarioActual', JSON.stringify(null));
    }
}

function obtenerProductos() {
    return JSON.parse(localStorage.getItem('productos')) || [];
}

function guardarProductos(productos) {
    localStorage.setItem('productos', JSON.stringify(productos));
}

function obtenerComentarios() {
    return JSON.parse(localStorage.getItem('comentarios')) || [];
}

function guardarComentarios(comentarios) {
    localStorage.setItem('comentarios', JSON.stringify(comentarios));
}

function obtenerMensajesContacto() {
    return JSON.parse(localStorage.getItem('mensajesContacto')) || [];
}

function guardarMensajesContacto(mensajes) {
    localStorage.setItem('mensajesContacto', JSON.stringify(mensajes));
}

function obtenerCarrito() {
    return JSON.parse(localStorage.getItem('carrito')) || [];
}

function guardarCarrito(carrito) {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function obtenerPedidos() {
    return JSON.parse(localStorage.getItem('pedidos')) || [];
}

function guardarPedidos(pedidos) {
    localStorage.setItem('pedidos', JSON.stringify(pedidos));
}

function agregarAlCarrito(productoId, cantidad = 1) {
    const productos = obtenerProductos();
    const producto = productos.find(p => p.id === productoId);
    
    if (!producto) {
        mostrarNotificacion('Producto no encontrado', 'warning');
        return;
    }

    let carrito = obtenerCarrito();
    const itemExistente = carrito.find(item => item.id === productoId);

    if (itemExistente) {
        itemExistente.cantidad += cantidad;
    } else {
        carrito.push({
            id: productoId,
            nombre: producto.nombre,
            precio: producto.precio,
            imagen: producto.imagen,
            tipo: producto.tipo,
            cantidad: cantidad
        });
    }

    guardarCarrito(carrito);
    actualizarContadorCarrito();
    mostrarNotificacion(`${producto.nombre} agregado al carrito`, 'success');
}

function eliminarDelCarrito(productoId) {
    let carrito = obtenerCarrito();
    carrito = carrito.filter(item => item.id !== productoId);
    guardarCarrito(carrito);
    actualizarContadorCarrito();
}

function actualizarCantidadCarrito(productoId, cantidad) {
    let carrito = obtenerCarrito();
    const item = carrito.find(item => item.id === productoId);
    
    if (item) {
        if (cantidad <= 0) {
            eliminarDelCarrito(productoId);
        } else {
            item.cantidad = cantidad;
            guardarCarrito(carrito);
        }
    }
    actualizarContadorCarrito();
}

function actualizarContadorCarrito() {
    const carrito = obtenerCarrito();
    const total = carrito.reduce((suma, item) => suma + item.cantidad, 0);
    const contador = document.getElementById('cartCounter');
    if (contador) {
        contador.textContent = total;
        contador.style.display = total > 0 ? 'block' : 'none';
    }
}

function calcularTotalCarrito() {
    const carrito = obtenerCarrito();
    return carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);
}

// ==================== AUTENTICACIÓN ==================== 

function obtenerUsuarios() {
    return JSON.parse(localStorage.getItem('usuarios')) || [usuarioAdminDefecto];
}

function guardarUsuarios(usuarios) {
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
}

function obtenerUsuarioActual() {
    const usuario = localStorage.getItem('usuarioActual');
    return usuario ? JSON.parse(usuario) : null;
}

function guardarUsuarioActual(usuario) {
    localStorage.setItem('usuarioActual', JSON.stringify(usuario));
}

function registrarUsuario(nombre, email, contraseña) {
    const usuarios = obtenerUsuarios();
    
    // Validar que el email no exista
    if (usuarios.some(u => u.email === email)) {
        return { exito: false, mensaje: 'El email ya está registrado' };
    }
    
    // Crear nuevo usuario
    const nuevoUsuario = {
        id: Date.now(),
        nombre: nombre,
        email: email,
        contraseña: contraseña, // En producción, usar hash
        rol: "usuario",
        fechaRegistro: new Date().toISOString(),
        estado: "activo"
    };
    
    usuarios.push(nuevoUsuario);
    guardarUsuarios(usuarios);
    
    return { exito: true, mensaje: 'Registro exitoso', usuario: nuevoUsuario };
}

function loginUsuario(email, contraseña) {
    const usuarios = obtenerUsuarios();
    const usuario = usuarios.find(u => u.email === email && u.contraseña === contraseña);
    
    if (!usuario) {
        return { exito: false, mensaje: 'Email o contraseña incorrectos' };
    }
    
    guardarUsuarioActual(usuario);
    return { exito: true, mensaje: 'Login exitoso', usuario: usuario };
}

function logoutUsuario() {
    guardarUsuarioActual(null);
    guardarCarrito([]); // Limpiar carrito al logout
}

function actualizarNavbarUsuario() {
    const usuarioActual = obtenerUsuarioActual();
    const navbarUsuario = document.getElementById('navbarUsuario');
    
    if (!navbarUsuario) return;
    
    if (usuarioActual) {
        navbarUsuario.innerHTML = `
            <div class="d-flex align-items-center gap-2">
                <span class="text-light">👤 ${usuarioActual.nombre}</span>
                <a href="${usuarioActual.rol === 'admin' ? 'admin-dashboard.html' : 'user-dashboard.html'}" class="btn btn-sm btn-warning">
                    ${usuarioActual.rol === 'admin' ? '⚙️ Admin' : '📊 Mi Dashboard'}
                </a>
                <button class="btn btn-sm btn-danger" onclick="logoutYRedireccionar()">Logout</button>
            </div>
        `;
    } else {
        navbarUsuario.innerHTML = `
            <a href="auth.html" class="btn btn-warning">Ingresar</a>
        `;
    }
}

function logoutYRedireccionar() {
    logoutUsuario();
    window.location.href = 'index.html';
}

function verificarAutenticacion() {
    const usuarioActual = obtenerUsuarioActual();
    if (!usuarioActual) {
        window.location.href = 'auth.html';
    }
    return usuarioActual;
}

function verificarAdministrador() {
    const usuarioActual = obtenerUsuarioActual();
    if (!usuarioActual || usuarioActual.rol !== 'admin') {
        window.location.href = 'index.html';
    }
    return usuarioActual;
}

// ==================== GESTIÓN DE PRODUCTOS ==================== 

function cargarProductos() {
    const productos = obtenerProductos();
    const container = document.getElementById('productosContainer');
    container.innerHTML = '';

    if (productos.length === 0) {
        container.innerHTML = '<div class="col-12"><p class="text-center text-muted">No hay productos disponibles.</p></div>';
        return;
    }

    productos.forEach(producto => {
        const productCard = crearTarjetaProducto(producto);
        container.appendChild(productCard);
    });
}

function crearTarjetaProducto(producto) {
    const col = document.createElement('div');
    col.className = 'col-md-6 col-lg-4';
    
    // Determinar si la imagen es base64, archivo o emoji
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
                <p class="product-description">${producto.descripcion}</p>
                <p class="product-price">$${parseFloat(producto.precio).toFixed(2)}</p>
                <div class="product-actions">
                    <button class="btn-detail" onclick="irAlDetalle(${producto.id})">Ver Detalle</button>
                    <button class="btn-cart" onclick="agregarAlCarrito(${producto.id})">🛒 Agregar</button>
                </div>
            </div>
        </div>
    `;
    return col;
}

function irAlDetalle(productoId) {
    localStorage.setItem('productoDetalleId', productoId);
    window.location.href = 'product-detail.html';
}

function abrirEditarProducto(id) {
    const productos = obtenerProductos();
    const producto = productos.find(p => p.id === id);
    
    if (!producto) return;

    document.getElementById('productoNombre').value = producto.nombre;
    document.getElementById('productoDescripcion').value = producto.descripcion;
    document.getElementById('productoPrecio').value = producto.precio;
    document.getElementById('productoTipo').value = producto.tipo;

    // Cambiar el modo a edición
    document.getElementById('formProducto').dataset.editando = id;
    document.getElementById('btnGuardarProducto').textContent = 'Actualizar Producto';
}

function eliminarProducto(id) {
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
        let productos = obtenerProductos();
        productos = productos.filter(p => p.id !== id);
        guardarProductos(productos);
        cargarProductos();
        mostrarNotificacion('Producto eliminado exitosamente', 'success');
    }
}

// ==================== GESTIÓN DE COMENTARIOS ==================== 

function cargarComentarios() {
    const comentarios = obtenerComentarios();
    const container = document.getElementById('comentariosContainer');
    container.innerHTML = '';

    if (comentarios.length === 0) {
        container.innerHTML = '<div class="col-12"><p class="text-center text-muted">No hay comentarios aún. ¡Sé el primero en comentar!</p></div>';
        return;
    }

    // Mostrar comentarios en orden inverso (más recientes primero)
    [...comentarios].reverse().forEach(comentario => {
        const commentCard = crearTarjetaComentario(comentario);
        container.appendChild(commentCard);
    });
}

function crearTarjetaComentario(comentario) {
    const col = document.createElement('div');
    col.className = 'col-md-6';
    
    const fecha = new Date(comentario.fecha).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    col.innerHTML = `
        <div class="comment-card">
            <div class="comment-header">
                <h5 class="comment-name">${comentario.nombre}</h5>
                <span class="comment-rating">${comentario.calificacion}</span>
            </div>
            <p class="comment-text">"${comentario.texto}"</p>
            <p class="comment-date">Publicado el ${fecha}</p>
            <div class="comment-actions">
                <button class="btn-delete-comment" onclick="eliminarComentario(${comentario.id})">Eliminar</button>
            </div>
        </div>
    `;
    return col;
}

function eliminarComentario(id) {
    if (confirm('¿Deseas eliminar este comentario?')) {
        let comentarios = obtenerComentarios();
        comentarios = comentarios.filter(c => c.id !== id);
        guardarComentarios(comentarios);
        cargarComentarios();
        mostrarNotificacion('Comentario eliminado exitosamente', 'success');
    }
}

// ==================== EVENTOS ==================== 

function configurarEventos() {
    // Evento para guardar comentario
    document.getElementById('btnGuardarComentario').addEventListener('click', guardarComentario);

    // Evento para formulario de contacto
    document.getElementById('formularioContacto').addEventListener('submit', enviarFormularioContacto);

    // Limpiar modales al cerrar
    document.getElementById('agregarComentarioModal').addEventListener('hidden.bs.modal', limpiarFormularioComentario);
}

function guardarComentario() {
    const nombre = document.getElementById('comentarioNombre').value.trim();
    const calificacion = document.getElementById('comentarioCalificacion').value;
    const texto = document.getElementById('comentarioTexto').value.trim();

    if (!nombre || !calificacion || !texto) {
        mostrarNotificacion('Por favor completa todos los campos', 'warning');
        return;
    }

    const nuevoComentario = {
        id: Date.now(),
        nombre,
        calificacion,
        texto,
        fecha: new Date().toISOString().split('T')[0]
    };

    let comentarios = obtenerComentarios();
    comentarios.push(nuevoComentario);
    guardarComentarios(comentarios);

    cargarComentarios();
    limpiarFormularioComentario();
    bootstrap.Modal.getInstance(document.getElementById('agregarComentarioModal')).hide();
    mostrarNotificacion('Comentario publicado exitosamente', 'success');
}

function enviarFormularioContacto(e) {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const asunto = document.getElementById('asunto').value.trim();
    const mensaje = document.getElementById('mensaje').value.trim();

    if (!nombre || !email || !asunto || !mensaje) {
        mostrarNotificacion('Por favor completa todos los campos requeridos', 'warning');
        return;
    }

    const nuevoMensaje = {
        id: Date.now(),
        nombre,
        email,
        telefono,
        asunto,
        mensaje,
        estado: 'nuevo',
        fecha: new Date().toISOString()
    };

    let mensajes = obtenerMensajesContacto();
    mensajes.push(nuevoMensaje);
    guardarMensajesContacto(mensajes);

    document.getElementById('formularioContacto').reset();
    mostrarNotificacion('¡Mensaje enviado! Nos pondremos en contacto pronto.', 'success');
}

// ==================== FUNCIONES AUXILIARES ==================== 

function limpiarFormularioComentario() {
    document.getElementById('formComentario').reset();
}

function mostrarNotificacion(mensaje, tipo = 'info') {
    // Crear elemento de notificación
    const notificacion = document.createElement('div');
    notificacion.className = `alert alert-${tipo === 'success' ? 'success' : tipo === 'warning' ? 'warning' : 'info'} alert-dismissible fade show`;
    notificacion.role = 'alert';
    notificacion.innerHTML = `
        ${mensaje}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;

    // Insertar en la parte superior del body
    document.body.insertBefore(notificacion, document.body.firstChild);

    // Auto-cerrar después de 4 segundos
    setTimeout(() => {
        notificacion.remove();
    }, 4000);
}

// ==================== SCROLL SUAVE ==================== 

// Implementar scroll suave para los enlaces del menú
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==================== ANIMACIONES AL HACER SCROLL ==================== 

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observar tarjetas de productos y comentarios
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.querySelectorAll('.product-card, .comment-card').forEach(card => {
            observer.observe(card);
        });
    }, 100);
});

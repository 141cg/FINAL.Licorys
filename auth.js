// Manejo de autenticación
document.addEventListener('DOMContentLoaded', function() {
    inicializarDatos();
    configurarEventosAuth();
});

function configurarEventosAuth() {
    document.getElementById('formLogin').addEventListener('submit', procesarLogin);
    document.getElementById('formRegistro').addEventListener('submit', procesarRegistro);
}

function procesarLogin(event) {
    event.preventDefault();

    const email = document.getElementById('loginEmail').value.trim();
    const contraseña = document.getElementById('loginPassword').value;

    if (!email || !contraseña) {
        mostrarAlerta('Por favor completa todos los campos', 'warning');
        return;
    }

    const resultado = loginUsuario(email, contraseña);

    if (resultado.exito) {
        mostrarAlerta('¡Login exitoso! Redirigiendo...', 'success');
        setTimeout(() => {
            if (resultado.usuario.rol === 'admin') {
                window.location.href = 'admin-dashboard.html';
            } else {
                window.location.href = 'user-dashboard.html';
            }
        }, 1500);
    } else {
        mostrarAlerta(resultado.mensaje, 'danger');
    }
}

function procesarRegistro(event) {
    event.preventDefault();

    const nombre = document.getElementById('registerNombre').value.trim();
    const email = document.getElementById('registerEmail').value.trim();
    const contraseña = document.getElementById('registerPassword').value;
    const contraseña2 = document.getElementById('registerPassword2').value;
    const aceptoTerminos = document.getElementById('aceptoTerminos').checked;

    // Validaciones
    if (!nombre || !email || !contraseña || !contraseña2) {
        mostrarAlerta('Por favor completa todos los campos', 'warning');
        return;
    }

    if (nombre.length < 3) {
        mostrarAlerta('El nombre debe tener al menos 3 caracteres', 'warning');
        return;
    }

    if (!validarEmail(email)) {
        mostrarAlerta('Email inválido', 'warning');
        return;
    }

    if (contraseña.length < 6) {
        mostrarAlerta('La contraseña debe tener al menos 6 caracteres', 'warning');
        return;
    }

    if (contraseña !== contraseña2) {
        mostrarAlerta('Las contraseñas no coinciden', 'warning');
        return;
    }

    if (!aceptoTerminos) {
        mostrarAlerta('Debes aceptar los términos y condiciones', 'warning');
        return;
    }

    const resultado = registrarUsuario(nombre, email, contraseña);

    if (resultado.exito) {
        mostrarAlerta('¡Registro exitoso! Iniciando sesión...', 'success');
        setTimeout(() => {
            loginUsuario(email, contraseña);
            window.location.href = 'user-dashboard.html';
        }, 1500);
    } else {
        mostrarAlerta(resultado.mensaje, 'danger');
    }
}

function mostrarAlerta(mensaje, tipo) {
    const alertDiv = document.getElementById('alertaMensaje');
    alertDiv.className = `alert alert-${tipo}`;
    alertDiv.textContent = mensaje;
    alertDiv.style.display = 'block';

    // Auto-cerrar después de 5 segundos
    setTimeout(() => {
        alertDiv.style.display = 'none';
    }, 5000);
}

function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

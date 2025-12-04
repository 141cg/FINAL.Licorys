# 🍷 Licorera Rustica - Sitio Web

Un sitio web moderno y responsivo para una licorera con diseño premium y funcionalidades interactivas de e-commerce completo.

## 📋 Características

✅ **Navegación Premium** - Navbar sticky con gradientes y efectos hover suave  
✅ **Carrusel Dinámico** - 4 slides con animaciones y controles mejorados  
✅ **Sección Quiénes Somos** - Historia y valores con tarjetas visuales  
✅ **Sistema de Carrito de Compras** - Agregar productos, ver detalle, gestionar cantidades  
✅ **Página de Detalle de Producto** - Información completa, productos relacionados  
✅ **Checkout Seguro** - Formulario de compra con datos personales y envío  
✅ **Autenticación de Usuarios** - Sistema de login/registro con roles (usuario/admin)  
✅ **Dashboard de Usuario** - Ver mis compras, perfil, dirección de envío  
✅ **Panel de Administrador** - Gestionar pedidos, usuarios, productos y mensajes  
✅ **Gestión de Mensajes** - Módulo completo para mensajes de contacto  
✅ **Sistema de Comentarios** - Los clientes pueden dejar reseñas con calificación  
✅ **Formulario de Contacto** - Recibir consultas de clientes con filtros  
✅ **Almacenamiento Local** - Todos los datos se guardan en localStorage  
✅ **Diseño Responsivo** - Optimizado para móviles, tablets y desktop  
✅ **Paleta Premium** - Gradientes, sombras y transiciones elegantes  
✅ **Categorías de Productos** - Licores Premium, Licores Tradicionales, Vinos  

## 🎨 Mejoras de Diseño

### Visual Moderno
- **Gradientes dinámicos** en navbar, botones y secciones
- **Efectos hover** suave con transiciones cubic-bezier
- **Sombras premium** con profundidad visual
- **Colores mejorados** con acentos dorados y beige elegante
- **Tipografía optimizada** con pesos 700-800 para títulos
- **Animaciones fluidas** en cards y elementos interactivos

### Experiencia de Usuario
- Transiciones de 0.3-0.4s para movimientos naturales
- Cards con elevación al pasar el mouse (translateY + scale)
- Bordes decorativos con gradientes
- Iconos y emojis para mejor identificación visual
- Espaciado mejorado (padding y margin aumentados)
- Radius de 8-12px para look moderno

## 🚀 Cómo Usar

### Usuario Normal
1. **Registrarse**: Ve a `auth.html` y crea una nueva cuenta
2. **Comprar**: Navega por el catálogo en `index.html`
3. **Ver Detalle**: Haz clic en "Ver Detalle" de un producto
4. **Carrito**: Agrega productos y ve a cart.html
5. **Checkout**: Completa la compra con tus datos
6. **Dashboard**: Visualiza tus compras en `user-dashboard.html`

### Administrador
**Credenciales por defecto:**
- **Email**: `admin@licorys.com`
- **Contraseña**: `admin123`

**Acceso**:
1. Inicia sesión con las credenciales de admin
2. Serás redirigido a `admin-dashboard.html`
3. Desde allí puedes:
   - ✅ Gestionar pedidos (marcar como entregado)
   - ✅ Ver lista de usuarios registrados
   - ✅ Agregar, editar y eliminar productos
   - ✅ Ver estadísticas de ingresos y pedidos

## 📁 Estructura de Archivos

```
LICORYS/
├── index.html              # Página principal / Catálogo
├── auth.html               # Login / Registro de usuarios
├── product-detail.html     # Detalle de un producto
├── cart.html               # Carrito de compras
├── checkout.html           # Formulario de compra
├── user-dashboard.html     # Dashboard del usuario
├── admin-dashboard.html    # Panel de administrador
├── ingreso.html            # Página de registro adicional (legacy)
│
├── script.js               # Lógica compartida (carrito, autenticación)
├── auth.js                 # Lógica de login/registro
├── product-detail.js       # Lógica de página de detalle
├── cart.js                 # Lógica del carrito
├── checkout.js             # Lógica de checkout
├── user-dashboard.js       # Lógica del dashboard de usuario
├── admin-dashboard.js      # Lógica del panel de admin
├── controlador.js          # Controlador de registro (legacy)
├── consumo.js              # Cliente API para backend (legacy)
│
├── styles.css              # Estilos CSS personalizados
├── img/                    # Imágenes de productos
└── README.md              # Este archivo
```

## 🔐 Sistema de Autenticación

### Usuarios (localStorage)
Se guardan en `localStorage.usuarios` con la siguiente estructura:
```json
{
  "id": 1234567890,
  "nombre": "Juan Pérez",
  "email": "juan@ejemplo.com",
  "contraseña": "password123",
  "rol": "usuario",
  "fechaRegistro": "2025-12-04T10:30:00Z",
  "estado": "activo"
}
```

### Sesión Actual
Se guarda en `localStorage.usuarioActual` el usuario que ha iniciado sesión.

### Roles
- **`usuario`** - Cliente normal con acceso a dashboard personal
- **`admin`** - Administrador con acceso al panel de administración

## 🛒 Sistema de Carrito y Compras

### Carrito (localStorage)
```json
[
  {
    "id": 6,
    "nombre": "Baileys Original",
    "precio": 109.00,
    "imagen": "img/Bailyes.png",
    "tipo": "Baileys",
    "cantidad": 2
  }
]
```

### Pedidos (localStorage)
```json
{
  "id": "#12345678",
  "fecha": "2025-12-04T10:30:00Z",
  "cliente": {
    "nombre": "Juan Pérez",
    "email": "juan@ejemplo.com",
    "telefono": "3001234567",
    "cedula": "1234567890"
  },
  "envio": {
    "direccion": "Calle 1 #100",
    "ciudad": "Bogotá",
    "departamento": "Cundinamarca",
    "codigoPostal": "110000"
  },
  "metodoPago": "transferencia",
  "items": [...],
  "subtotal": 218.00,
  "iva": 41.42,
  "envio": 5.00,
  "total": 264.42,
  "estado": "pendiente"
}
```

## 💾 Almacenamiento Local

El sitio utiliza localStorage para guardar:
- `usuarios` - Lista de usuarios registrados
- `usuarioActual` - Usuario que ha iniciado sesión
- `productos` - Catálogo de licores
- `carrito` - Items en el carrito
- `pedidos` - Historial de compras
- `comentarios` - Reseñas de clientes
- `mensajesContacto` - Mensajes de contacto

## 🎨 Paleta de Colores

| Color | Código Hex | Uso |
|-------|-----------|-----|
| Vino Tinto | `#722f37` | Textos principales, botones |
| Vino Tinto Light | `#8b4050` | Gradientes, bordes |
| Beige | `#d4a574` | Acentos, iconos |
| Beige Light | `#e8c9a0` | Hover states |
| Rosa Viejo | `#c27a7a` | Acentos secundarios |
| Rosa Viejo Light | `#d9a2a2` | Gradientes |

## 📁 Estructura de Archivos

```
SITIOWEBCONIA/
├── index.html          # Archivo HTML principal
├── styles.css          # Estilos CSS (Bootstrap + custom)
├── script.js           # Lógica JavaScript y localStorage
└── README.md          # Este archivo
```

## 🚀 Cómo Usar

1. **Abrir el sitio**: Abre `index.html` en tu navegador web
2. **Los datos se guardan automáticamente** en el localStorage de tu navegador

## 💾 Almacenamiento en localStorage

El sitio utiliza localStorage para guardar:

- **Productos**: Lista de vinos y licores con precios
- **Comentarios**: Reseñas de clientes
- **Mensajes de Contacto**: Consultas recibidas

```javascript
// Los datos se almacenan con estas claves:
localStorage.productos           // Array de productos
localStorage.comentarios         // Array de comentarios
localStorage.mensajesContacto    // Array de mensajes
```

## 📱 Responsividad

El sitio es completamente responsivo:

- **Desktop**: Ancho completo con layout optimizado
- **Tablet**: Columnas adaptadas (md breakpoint)
- **Móvil**: Vista de columna única con navegación colapsable

### Breakpoints Bootstrap utilizados:
- `lg`: ≥ 992px
- `md`: ≥ 768px
- `sm`: ≥ 576px
- Móvil: < 576px

## 🎯 Funcionalidades Principales

### Navegación
- Barra de navegación fija
- Enlaces suaves a cada sección
- Menú responsive con hamburguesa en móvil

### Carrusel
- 4 slides rotatorios
- Controles automáticos
- Navegación manual con botones

### Productos
- Visualización en grid responsivo
- Formulario modal para agregar productos
- Botones para editar y eliminar
- 5 productos predeterminados

### Comentarios
- Mostrar reseñas con calificación de estrellas
- Formulario para nuevos comentarios
- Fecha de publicación automática
- Opción para eliminar comentarios

### Contacto
- Formulario con validación
- Información de ubicación y teléfono
- Almacenamiento de mensajes
- Notificaciones de confirmación

### Footer
- Enlaces rápidos
- Enlaces a redes sociales
- Información de derechos

## 🛠️ Tecnologías Utilizadas

- **HTML5** - Estructura semántica
- **CSS3** - Estilos y animaciones
- **Bootstrap 5.3** - Framework responsivo
- **JavaScript Vanilla** - Lógica e interactividad
- **localStorage** - Persistencia de datos

## 🎨 Animaciones y Efectos

- Animación de carga en el carrusel
- Hover effects en tarjetas
- Transiciones suaves en botones
- Scroll suave a secciones
- Fade-in al entrar al viewport

## 📝 Datos Predeterminados

### Productos Iniciales
1. Merlot Gran Reserva - $45.99
2. Sauvignon Blanc Premium - $38.99
3. Rosado Elegante - $35.99
4. Espumante Celebración - $52.99
5. Whisky Single Malt - $89.99

### Comentarios Iniciales
- 3 reseñas de prueba con calificaciones

## 🔧 Personalización

### Cambiar Colores
Edita las variables CSS en `styles.css`:

```css
:root {
    --color-vino: #722f37;
    --color-beige: #d4a574;
    --color-rosa-viejo: #c27a7a;
}
```

### Cambiar Tipografía
Busca en `styles.css`:

```css
--font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
```

### Agregar/Modificar Productos
Edita el array `productosDefecto` en `script.js`

## 💡 Tips

- **Limpiar datos**: Abre DevTools (F12) → Console → `localStorage.clear()`
- **Ver datos guardados**: Console → `JSON.parse(localStorage.productos)`
- **Exportar datos**: Copy-paste desde la consola a un archivo JSON

## 📱 Compatibilidad

- ✅ Chrome/Edge (últimas versiones)
- ✅ Firefox (últimas versiones)
- ✅ Safari (últimas versiones)
- ✅ Móviles iOS y Android

## 📞 Contacto (Ejemplo)

- **Teléfono**: +1 (555) 123-4567
- **Email**: info@licorerarustica.com
- **Ubicación**: Calle Principal 123

*Actualiza estos datos en el archivo HTML*

## 📄 Licencia

Este proyecto es de uso libre. Siéntete libre de modificarlo y adaptarlo a tus necesidades.

---

**Hecho con ❤️ para Licorera Rustica**

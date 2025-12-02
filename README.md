# 🍷 Licorera Rustica - Sitio Web

Un sitio web moderno y responsivo para una licorera con diseño rústico y funcionalidades interactivas.

## 📋 Características

✅ **Menú de Navegación Sticky** - Navegación fija con scroll suave  
✅ **Carrusel de Imágenes** - 4 slides con contenido personalizado  
✅ **Sección Quiénes Somos** - Historia y valores de la empresa  
✅ **Gestión de Productos** - Agregar, editar y eliminar productos  
✅ **Sistema de Comentarios** - Los clientes pueden dejar reseñas  
✅ **Formulario de Contacto** - Recibir consultas de clientes  
✅ **Almacenamiento Local** - Todos los datos se guardan en localStorage  
✅ **Diseño Responsivo** - Optimizado para móviles, tablets y desktop  
✅ **Paleta de Colores Rústica** - Vino tinto, beige, rosa viejo  
✅ **Tipografía Sans Serif** - Segoe UI para mejor legibilidad  

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

# ⛪ Catálogo Digital — Tienda Cositas Divinas
> **Parroquia de la Santa Cruz**  
> Aplicación web moderna, interactiva y optimizada al 100% para dispositivos móviles (*Mobile-First*) desarrollada con **Vue 3** y **Vite**.

![Vue.js](https://img.shields.io/badge/Vue.js-3.x-4FC08D?style=for-the-badge&logo=vuedotjs&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![WhatsApp](https://img.shields.io/badge/WhatsApp-Orders-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)
![Mobile First](https://img.shields.io/badge/UX-Mobile--First-FF6B6B?style=for-the-badge)
![Security](https://img.shields.io/badge/Security-CSP%20%7C%20HSTS%20%7C%20SSL-blue?style=for-the-badge)

---

## 📖 Descripción del Proyecto

Este proyecto es el catálogo digital oficial de la **Tienda Cositas Divinas**, perteneciente a la **Parroquia de la Santa Cruz**. Permite a los feligreses y visitantes explorar de manera rápida, fluida e intuitiva una variedad de 60 artículos religiosos, regalos y detalles para el hogar divididos en cajones de categorías interactivos, con carrito de compras y pedido directo por **WhatsApp**.

> **Misión Evangelizadora y Social:**  
> *"Cada artículo de este catálogo ha sido seleccionado para acompañarte en tu camino de fe y devoción. Al adquirir nuestros productos, no solo llevas contigo un artículo especial, sino que también contribuyes a la recaudación de fondos para la organización del **XII Retiro de Emaús Mujeres**."*

---

## ✨ Características Principales

### 🛒 Carrito de Compras Móvil con Icono y Exponente
- **Icono compacto en móvil**: En pantallas de teléfono, el carrito no obstruye la pantalla ni bloquea la visualización de los artículos; se ubica como un icono estilizado en la barra superior.
- **Exponente dinámico (*Badge*)**: Muestra en tiempo real la cantidad total acumulada de artículos seleccionados con micro-animaciones al añadir unidades.
- **Cajón desplegable (*Bottom Sheet* / Drawer)**: Al presionar el icono, se despliega una interfaz fluida desde la parte inferior que incluye:
  - Imagen, nombre, categoría y precio unitario de cada producto.
  - Controles de cantidad (`−` y `+`) con actualización instantánea y botón de eliminación.
  - Cálculo automático del total en Pesos Colombianos (COP).
  - Botón de acción directa hacia WhatsApp con el pedido listo.
- **Persistencia en `localStorage`**: La selección del usuario permanece guardada si se recarga la página o se navega entre aplicaciones.

### 💬 Pedidos Directos por WhatsApp (+57 301 7705554)
- Al hacer clic en **"Consultar disponibilidad / Comprar"**, se abre automáticamente una conversación en WhatsApp dirigida al número **`+57 301 7705554`**.
- El mensaje prediseñado incluye:
  - Saludo cordial e identificación de la tienda parroquial.
  - Mención al propósito del XII Retiro de Emaús Mujeres.
  - Lista estructurada con cantidades, nombres de productos, precios y referencias.
  - Total de la compra y solicitud de instrucciones de entrega y métodos de pago.

### 🗄️ Categorías en Cajones Interactivos Tipo Card
- Cada categoría se presenta como una tarjeta elegante con imagen representativa, contador de productos, título, descripción y botón para desplegar.
- Al seleccionar una categoría, la sección `#productos` se expande con desplazamiento suave e inteligente.

### � Mayor Capacidad de Visualización
- **Escritorio**: Hasta **24 productos por página** para una navegación amplia y continua.
- **Móviles**: Hasta **16 productos por página**, optimizando la velocidad de carga y reduciendo la necesidad de paginación constante.

### 🛡️ Seguridad, Privacidad y Cifrado SSL/TLS
- **Cifrado HTTPS obligatorio**: Implementación de `upgrade-insecure-requests` en la directiva CSP para garantizar que todas las conexiones viajen encriptadas con SSL/TLS.
- **Content Security Policy (CSP)**: Protección contra ataques de inyección de código (XSS), restringiendo la ejecución y carga de recursos únicamente a fuentes autorizadas y seguras (Google Fonts, Unsplash, WhatsApp).
- **Cabeceras de respuesta seguras**:
  - `Strict-Transport-Security (HSTS)`: Obliga al navegador a usar HTTPS de forma estricta (`max-age=63072000; includeSubDomains; preload`).
  - `X-Content-Type-Options: nosniff`: Previene ataques basados en confusión de tipos MIME.
  - `X-Frame-Options: SAMEORIGIN`: Protege contra ataques de *clickjacking* o incrustaciones no autorizadas en iframes.
  - `Permissions-Policy`: Restringe el acceso innecesario a hardware del dispositivo (cámara, micrófono, geolocalización).
- **Archivos listos para producción**: Incluye `vercel.json` y `public/_headers` (Netlify / Cloudflare Pages) preconfigurados.
- **Arquitectura estática segura**: Al ser una aplicación cliente sin base de datos SQL en el servidor, existe **cero riesgo de inyección SQL**.

### 🇪🇸 Estandarización de Código en Español
- Toda la base del código (nombres de clases CSS, funciones, estados reactivos del composable `useCart.js`, métodos y transiciones) está estandarizada en idioma español, facilitando el mantenimiento y la comprensión del proyecto.

---

## 📁 Estructura del Proyecto

```text
Catalogo/
├── .gitignore                     # Archivos y carpetas ignorados por git
├── index.html                     # HTML principal con CSP, HSTS y metadatos móviles
├── package.json                   # Dependencias y scripts del proyecto
├── README.md                      # Documentación completa del proyecto
├── vercel.json                    # Cabeceras de seguridad para despliegues en Vercel
├── vite.config.js                 # Configuración del empaquetador Vite
├── public/
│   └── _headers                   # Cabeceras de seguridad para Netlify y Cloudflare
└── src/
    ├── App.vue                    # Componente raíz de la aplicación
    ├── main.js                    # Punto de entrada de Vue 3
    ├── assets/
    │   ├── logo.JPG               # Escudo oficial de la Parroquia
    │   ├── main.css               # Estilos globales, variables y utilidades móviles
    │   ├── base.css               # Paleta de colores y tipografía base
    │   └── Productos/             # Fotografías originales de los productos
    ├── composables/
    │   └── useCart.js             # Estado global del carrito y generador de pedidos WhatsApp
    ├── components/
    │   ├── cart/
    │   │   └── CartDrawer.vue     # Cajón deslizable y modal del carrito de compras
    │   ├── layout/
    │   │   └── Navbar.vue         # Barra de navegación superior con icono de carrito
    │   └── catalog/
    │       ├── CatalogFilters.vue # Cajones de categorías tipo card
    │       ├── ProductCard.vue    # Tarjeta de producto y modal de detalles ampliado
    │       ├── ProductGrid.vue    # Cuadrícula adaptable de productos
    │       └── SortSelect.vue     # Selector de ordenamiento (precio, nombre)
    ├── data/
    │   ├── categories.js          # Datos y descripciones de las categorías
    │   └── products.js            # Base de 60 productos catalogados
    └── views/
        └── CatalogView.vue        # Vista principal con banner de misión y catálogo
```

---

## 🚀 Instalación y Desarrollo Local

### Prerrequisitos
- **Node.js**: v18.0.0 o superior
- **npm**: v9.0.0 o superior

```bash
# 1. Clonar el repositorio
git clone https://github.com/dsrueda3691/TiendaCositasDivinas.git
cd TiendaCositasDivinas

# 2. Instalar dependencias
npm install

# 3. Iniciar el servidor local de desarrollo
npm run dev

# 4. Compilar para producción (genera la carpeta dist/)
npm run build

# 5. Previsualizar la compilación de producción localmente
npm run preview
```

---

## 🌐 Despliegue en Producción y Protección WAF

Para alojar esta página en la web con certificado SSL y firewall WAF gratuito:

1. **Alojamiento con SSL automático (HTTPS)**:
   - Conectar el repositorio de GitHub a [Vercel](https://vercel.com) o [Netlify](https://netlify.com).
   - El certificado SSL/TLS de Let's Encrypt se activará y renovará de forma **100% automática y gratuita**.
   - Las cabeceras de seguridad de `vercel.json` o `public/_headers` se aplicarán automáticamente.

2. **Firewall WAF y Anti-DDoS (Opcional recomendado)**:
   - Para añadir una capa extra de protección contra tráfico malicioso, bots y ataques DDoS de capa 7, se puede conectar el dominio a **Cloudflare (Plan Gratuito)**.
   - Cloudflare funcionará como un escudo WAF global y optimizará la entrega de imágenes a través de su CDN.

---

## 📤 Control de Versiones

```bash
# Registrar cambios y confirmar
git add .
git commit -m "docs: actualizar documentacion en espanol con politicas de seguridad y visualizacion"

# Subir a la rama principal
git push origin main
```

# Tienda Cositas Divinas

Catálogo digital de la **Parroquia de la Santa Cruz** para consultar artículos religiosos, detalles para el hogar y productos devocionales. La aplicación permite explorar el catálogo, consultar los detalles de cada artículo, preparar una selección de compra y enviarla directamente por WhatsApp.

> Los productos vendidos apoyan la recaudación de fondos para la organización del **XII Retiro de Emaús Mujeres**.

## Sitio publicado

La versión en producción está disponible en:

**[https://tienda-cositas-divinas.vercel.app/](https://tienda-cositas-divinas.vercel.app/)**

## Propósito

El proyecto funciona como un escaparate digital sencillo y accesible para la tienda parroquial. No procesa pagos ni gestiona inventario en línea: su objetivo es que la persona pueda conocer los productos, armar un pedido y consultar disponibilidad, entrega y medios de pago con la parroquia a través de WhatsApp.

## Funcionalidades

### Catálogo y navegación

- Muestra una colección de **60 artículos** con imagen, nombre, descripción, categoría y precio en pesos colombianos (COP).
- Organiza los productos en estas categorías:
  - **Hogar y Decoración:** 13 productos.
  - **Pines y Llaveros:** 16 productos.
  - **Pastilleros e Imanes:** 17 productos.
  - **Bolsos y Fundas:** 6 productos.
  - **Librería y Devoción:** 8 productos.
  - **Todos:** la colección completa.
- Presenta las categorías como cajones interactivos. Al seleccionar uno, la aplicación despliega su colección y desplaza la vista hasta los productos.
- Permite cerrar el cajón activo y volver a abrirlo desde el estado vacío.
- Incluye paginación cuando la categoría tiene más productos de los que caben en la página actual.
- Muestra hasta 24 productos por página en escritorio y hasta 16 en teléfonos pequeños.
- Carga las imágenes de producto de forma diferida para mejorar el rendimiento.

### Ordenamiento

Dentro de la categoría desplegada se puede ordenar la lista por:

- Recomendados, en el orden original del catálogo.
- Menor precio.
- Mayor precio.
- Nombre de A a Z.
- Nombre de Z a A.

Al cambiar de categoría, orden o página, la aplicación regresa a la primera página y desplaza suavemente la vista al comienzo de los resultados.

### Detalles de productos

- Cada tarjeta se puede abrir para consultar una vista ampliada.
- El panel de detalles incluye imagen, descripción, precio, categoría y referencia con formato `#CD-XXX`.
- Desde la tarjeta o desde el panel de detalles se puede agregar el artículo al carrito.
- La cantidad se puede aumentar o disminuir sin salir del catálogo.
- El panel se adapta a escritorio y dispositivos móviles y bloquea temporalmente el desplazamiento del fondo mientras está abierto.

### Carrito de compras

- El carrito está disponible como widget lateral en escritorio y como botón con contador en dispositivos móviles.
- Muestra la cantidad total de unidades seleccionadas y el total estimado.
- Permite aumentar o disminuir cantidades, eliminar artículos individualmente o vaciar toda la selección.
- Muestra el precio unitario y el subtotal de cada artículo.
- Guarda la selección en `localStorage` con la clave `cositas_divinas_cart`, por lo que el carrito se conserva al recargar la página en el mismo navegador.
- Ofrece un estado vacío con acceso para continuar explorando el catálogo.

### Pedidos por WhatsApp

El botón **Consultar disponibilidad / Comprar** abre WhatsApp hacia el número de la tienda, `+57 301 770 5554`, con un mensaje generado automáticamente. El mensaje incluye:

- Saludo e identificación de la Tienda Cositas Divinas.
- Referencia de apoyo al XII Retiro de Emaús Mujeres.
- Cantidad y nombre de cada producto.
- Precio de cada línea y referencia del artículo.
- Total estimado en COP.
- Solicitud de confirmación de disponibilidad, medios de pago y entrega.

La disponibilidad, el valor final, el pago y la entrega deben confirmarse directamente con la parroquia.

### Experiencia y accesibilidad

- Diseño responsive con enfoque mobile-first.
- Navegación por teclado en las tarjetas de categorías mediante `Enter` y `Espacio`.
- Etiquetas `alt`, roles ARIA, nombres accesibles para botones y diálogos modales.
- Animaciones de entrada, transiciones del carrito y reducción de movimiento cuando el sistema activa `prefers-reduced-motion`.
- Fuentes e imágenes optimizadas para una experiencia fluida en dispositivos móviles.

### Analítica

La aplicación integra `@vercel/analytics` desde `src/main.js` para habilitar la analítica de Vercel en el despliegue publicado.

## Tecnologías utilizadas

- [Vue 3](https://vuejs.org/) con Composition API y componentes `.vue`.
- [Vite](https://vite.dev/) como servidor de desarrollo y herramienta de compilación.
- JavaScript con módulos ES.
- CSS modular por componente y estilos globales.
- `localStorage` para la persistencia local del carrito.
- WhatsApp mediante enlaces `wa.me`, sin API de servidor.
- Vercel para el alojamiento de producción y la analítica.

## Estructura del proyecto

```text
Catalogo/
├── index.html                  # Documento HTML, metadatos y CSP del cliente
├── package.json                # Dependencias y comandos npm
├── README.md                   # Documentación del proyecto
├── vercel.json                 # Cabeceras de seguridad para Vercel
├── vite.config.js              # Configuración de Vite y el plugin de Vue
├── public/
│   └── _headers                # Archivo de referencia para plataformas compatibles
└── src/
    ├── App.vue                 # Composición raíz: barra lateral y catálogo
    ├── main.js                 # Punto de entrada y analítica de Vercel
    ├── assets/
    │   ├── base.css            # Variables y estilos base
    │   ├── main.css             # Estilos globales de la aplicación
    │   └── Productos/           # Imágenes locales del catálogo
    ├── components/
    │   ├── cart/
    │   │   └── CartDrawer.vue  # Panel, resumen y enlace de WhatsApp
    │   ├── catalog/
    │   │   ├── CatalogFilters.vue # Cajones de categorías
    │   │   ├── ProductCard.vue     # Tarjeta y detalles de producto
    │   │   ├── ProductGrid.vue     # Cuadrícula responsive
    │   │   └── SortSelect.vue      # Selector reutilizable de ordenamiento
    │   └── layout/
    │       └── Navbar.vue       # Marca y acceso al carrito
    ├── composables/
    │   └── useCart.js           # Estado, cálculos y persistencia del carrito
    ├── data/
    │   ├── categories.js        # Categorías, textos e imágenes representativas
    │   └── products.js          # Datos de los 60 productos
    └── views/
        └── CatalogView.vue      # Vista principal, filtros y paginación
```

## Requisitos

- Node.js 18 o una versión posterior.
- npm 9 o una versión posterior.
- Un navegador moderno con soporte para módulos ES, `localStorage` e `IntersectionObserver`.

## Instalación y desarrollo local

```bash
git clone https://github.com/dsrueda3691/TiendaCositasDivinas.git
cd TiendaCositasDivinas
npm install
npm run dev
```

Vite mostrará la URL local, normalmente `http://localhost:5173`.

## Comandos disponibles

| Comando | Descripción |
| --- | --- |
| `npm install` | Instala las dependencias del proyecto. |
| `npm run dev` | Inicia el servidor de desarrollo con recarga automática. |
| `npm run build` | Genera la compilación optimizada en `dist/`. |
| `npm run preview` | Sirve localmente la compilación de producción. |

Antes de publicar cambios, se recomienda ejecutar:

```bash
npm run build
```

## Despliegue en Vercel

El proyecto ya está desplegado en Vercel en [tienda-cositas-divinas.vercel.app](https://tienda-cositas-divinas.vercel.app/).

Para conectar el repositorio o actualizar el proyecto:

1. Importar `dsrueda3691/TiendaCositasDivinas` en Vercel.
2. Mantener el framework como **Vite**.
3. Usar `npm run build` como comando de compilación.
4. Usar `dist` como directorio de salida.
5. Publicar la rama principal o activar los despliegues automáticos desde GitHub.

Vercel sirve automáticamente la aplicación por HTTPS. El archivo `vercel.json` añade estas cabeceras a las respuestas:

- `Strict-Transport-Security` para forzar HTTPS en navegadores compatibles.
- `X-Content-Type-Options: nosniff` para evitar la interpretación incorrecta de tipos MIME.
- `X-Frame-Options: SAMEORIGIN` para reducir riesgos de clickjacking.
- `Referrer-Policy: strict-origin-when-cross-origin` para limitar la información enviada en el referente.
- `Permissions-Policy` para deshabilitar cámara, micrófono, geolocalización y pagos, funciones que la aplicación no utiliza.

Además, `index.html` define una política CSP, metadatos responsive y configuración de idioma, tema y descripción.

## Cómo actualizar el catálogo

Los productos se mantienen en `src/data/products.js`. Para agregar o modificar un artículo:

1. Añadir la imagen correspondiente en `src/assets/Productos/`.
2. Registrar el archivo mediante el nombre exacto usado por `getImage()`.
3. Crear o actualizar el objeto del producto con `id`, `nombre`, `precio`, `imagen`, `descripcion` y `categoria`.
4. Verificar que la categoría coincida exactamente con una de las categorías disponibles.
5. Actualizar los contadores y textos de `src/data/categories.js` si cambia el total de una categoría.
6. Ejecutar `npm run build` y revisar el flujo de catálogo, carrito y WhatsApp.

El número de WhatsApp y el texto del pedido se encuentran en `src/composables/useCart.js`. Si cambia el número de contacto, deben actualizarse el destino `wa.me` y el texto de referencia en el mismo archivo.

## Alcance y limitaciones actuales

- No existe backend, base de datos, autenticación ni panel administrativo.
- El inventario se define en archivos JavaScript y se publica junto con la aplicación.
- El carrito se guarda únicamente en el navegador de cada visitante; no se sincroniza entre dispositivos.
- No hay pago en línea: WhatsApp es el canal para confirmar disponibilidad, precio final, pago y entrega.
- Los precios mostrados son estimados y deben validarse antes de cerrar la compra.
- El despliegue es una aplicación estática generada por Vite.

## Licencia y contenido

Este repositorio contiene el código, textos e imágenes del catálogo de la Tienda Cositas Divinas y de la Parroquia de la Santa Cruz. Antes de reutilizar o redistribuir fotografías, logotipos, textos o datos de contacto, solicita autorización a sus responsables.

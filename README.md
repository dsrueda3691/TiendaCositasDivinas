# ⛪ Catálogo Digital — Tienda Cositas Divinas
> **Parroquia de la Santa Cruz**  
> Aplicación web moderna, interactiva y optimizada al 100% para dispositivos móviles (Mobile-First) desarrollada con **Vue 3** y **Vite**.

![Vue.js](https://img.shields.io/badge/Vue.js-3.x-4FC08D?style=for-the-badge&logo=vuedotjs&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-Modern_Flex_&_Grid-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Mobile First](https://img.shields.io/badge/UX-Mobile--First-FF6B6B?style=for-the-badge)

---

## 📖 Descripción del Proyecto

Este proyecto es el catálogo digital oficial de la **Tienda Cositas Divinas**, perteneciente a la **Parroquia de la Santa Cruz**. Permite a los feligreses y visitantes explorar de manera rápida, fluida e intuitiva una variedad de 60 artículos religiosos, regalos y detalles para el hogar divididos en categorías temáticas.

La interfaz fue diseñada con una filosofía **Mobile-First**, priorizando la velocidad de carga, la ergonomía táctil en smartphones y transiciones suaves inspiradas en aplicaciones nativas para iOS y Android.

---

## ✨ Características Principales

### 📱 Optimización Mobile-First de Alto Nivel
- **Barra de navegación fija (*sticky*)**: Con efecto de desenfoque translúcido (*glassmorphism / backdrop-blur*), logo parroquial visible y enlaces con desplazamiento horizontal.
- **Categorías con scroll horizontal fluido**: Los filtros de categoría no se apilan verticalmente en pantallas pequeñas; se desplazan de lado a lado con barras de desplazamiento ocultas para maximizar el área visible.
- **Dimensiones táctiles recomendadas (≥ 44px)**: Todos los botones, filtros y selectores cumplen con los estándares de accesibilidad para pulsación cómoda con los dedos.
- **Prevención de comportamientos indeseados**:
  - Se eliminó el destello azul de toque en móviles (`-webkit-tap-highlight-color: transparent`).
  - Desactivado el zoom accidental por doble pulsación (`touch-action: manipulation`).
  - Prevención de desborde y recarga accidental (*pull-to-refresh* con `overscroll-behavior-y: contain`).

### 🎭 Animaciones y Micro-interacciones
- **Transición suave de pestañas (*Cross-fade & Slide*)**: Al cambiar de categoría o página, el catálogo actual se desvanece suavemente y los nuevos productos entran sin parpadeos ni choques de maquetación.
- **Entrada escalonada (*Staggered Entry*)**: Las tarjetas de productos aparecen en cascada progresiva para una sensación visual elegante y dinámica.
- **Componente de Detalles (Modal & Bottom Sheet)**:
  - **En móviles**: Se despliega desde abajo hacia arriba como un *bottom-sheet* nativo con tirador táctil (*drag handle*), cerrándose con un deslizamiento continuo hacia abajo (sin cortes instantáneos).
  - **En computadoras de escritorio**: Se abre como panel lateral desde la derecha con desenfoque de fondo (*backdrop blur*).
  - **Bloqueo de scroll seguro**: Al abrirse el modal se desactiva el scroll del fondo sin generar saltos de pantalla.
- **Hover inteligente**: Los efectos flotantes y elevaciones solo se activan en dispositivos con puntero/ratón (`@media (hover: hover)`), evitando anomalías visuales durante el desplazamiento táctil.

### 🛍️ Catálogo y Gestión de Productos
- **60 productos reales catalogados** con sus respectivas imágenes de alta calidad optimizadas en peso.
- **5 categorías temáticas**:
  1. `Hogar y Decoración`: Adornos, colgantes de puerta, cruces, placas de pared, delantales y letreros.
  2. `Pines y Llaveros`: Pines devocionales de metal esmaltado, medallas y llaveros de San Benito.
  3. `Pastilleros e Imanes`: Pastilleros metálicos de bolsillo e imanes para nevera.
  4. `Bolsos y Fundas`: Bolsos de tela, tote bags, fundas de almohada y cargadores.
  5. `Librería y Devoción`: Porta Biblias, pestañas separadoras, marcapáginas y stickers.
- **Ordenamiento dinámico**:
  - Recomendados.
  - Precio: Menor a Mayor.
  - Precio: Mayor a Menor.
  - Nombre: A a Z.
  - Nombre: Z a A.
- **Paginación táctil**: Botones anterior/siguiente y ventana adaptativa de números de página.
- **Carga diferida (*Lazy Loading*)**: Las imágenes se cargan a medida que el usuario se desplaza, reduciendo el consumo de datos móviles.

---

## 🛠️ Tecnologías Utilizadas

- **[Vue 3](https://vuejs.org/)**: Framework progresivo de JavaScript utilizando la **Composition API** con la sintaxis concisa de `<script setup>`.
- **[Vite](https://vitejs.dev/)**: Herramienta de compilación ultrarrápida para desarrollo local instantáneo y empaquetado optimizado para producción.
- **CSS Moderno**:
  - Variables CSS (*Custom Properties*) para consistencia en la paleta de colores.
  - CSS Grid y Flexbox responsivos.
  - Animaciones aceleradas por hardware (GPU) con `transform` y `opacity`.
- **Importación dinámica de activos**: `import.meta.glob` para procesamiento y versionado automático de las 60 imágenes de productos.

---

## 📁 Estructura del Proyecto

```text
Catalogo/
├── .gitignore                     # Archivos y carpetas ignorados por git
├── index.html                     # Entrada HTML con metadatos móviles y prefetch
├── package.json                   # Dependencias y scripts de ejecución
├── vite.config.js                 # Configuración de Vite y plugin de Vue
└── src/
    ├── App.vue                    # Componente raíz (layout general)
    ├── main.js                    # Punto de entrada de la aplicación
    ├── assets/
    │   ├── logo.JPG               # Logo de la Parroquia de la Santa Cruz
    │   ├── main.css               # Estilos globales y utilidades móviles
    │   ├── base.css               # Variables base del sistema de diseño
    │   └── Productos/             # 60 imágenes de los productos del catálogo
    ├── components/
    │   ├── layout/
    │   │   └── Navbar.vue         # Barra de navegación (sidebar en PC, sticky en móvil)
    │   └── catalog/
    │       ├── CatalogFilters.vue # Filtros de categorías y selector de orden
    │       ├── ProductCard.vue    # Tarjeta de producto y modal de detalles
    │       ├── ProductGrid.vue    # Cuadrícula responsiva con entrada escalonada
    │       └── SortSelect.vue     # Componente modular de ordenamiento
    ├── data/
    │   ├── categories.js          # Lista de categorías disponibles
    │   └── products.js            # Base de datos de los 60 productos con imágenes y precios
    └── views/
        └── CatalogView.vue        # Vista principal que coordina filtros, productos y paginación
```

---

## 🚀 Instalación y Puesta en Marcha

### Prerrequisitos
Asegúrate de tener instalado **[Node.js](https://nodejs.org/)** (versión 18 o superior recomendada).

### 1. Clonar el repositorio
```bash
git clone https://github.com/TU_USUARIO/TU_REPOSITORIO.git
cd TU_REPOSITORIO
```

### 2. Instalar las dependencias
```bash
npm install
```

### 3. Iniciar el servidor de desarrollo
```bash
npm run dev
```
La aplicación se iniciará en `http://localhost:5173/` (o el puerto disponible que indique la consola).

### 4. Compilar para producción
```bash
npm run build
```
Generará los archivos listos para despliegue en la carpeta `/dist` (comprimidos y con *hash* de caché).

### 5. Previsualizar la versión de producción localmente
```bash
npm run preview
```

---

## 📤 Guía para Subir a GitHub

Si aún no has vinculado tu proyecto a GitHub, sigue estos pasos desde la terminal en la raíz del proyecto:

```bash
# 1. Inicializar el repositorio Git (si no está inicializado)
git init

# 2. Agregar todos los archivos al seguimiento
git add .

# 3. Crear el primer commit
git commit -m "feat: catálogo digital mobile-first con 60 productos y animaciones fluidas"

# 4. Cambiar a la rama principal
git branch -M main

# 5. Conectar con tu repositorio remoto de GitHub (reemplaza con tu URL)
git remote add origin https://github.com/TU_USUARIO/NOMBRE_DEL_REPO.git

# 6. Subir el proyecto a GitHub
git push -u origin main
```

---

## 🌐 Despliegue en la Web (Hosting Gratuito)

Este proyecto puede desplegarse en segundos en cualquiera de las siguientes plataformas:

- **[Vercel](https://vercel.com/)**: Conecta tu repositorio de GitHub, selecciona el framework *Vite* y presiona **Deploy**.
- **[Netlify](https://www.netlify.com/)**: Conecta tu repositorio, configura como Build command `npm run build` y Publish directory `dist`.
- **[GitHub Pages](https://pages.github.com/)**: Requiere configurar la propiedad `base` en `vite.config.js` (`base: './'`).

---

## 📄 Licencia

Este proyecto fue desarrollado para la **Tienda Cositas Divinas** de la **Parroquia de la Santa Cruz**. Todos los derechos sobre las marcas y fotografías pertenecen a la parroquia. Código abierto bajo licencia [MIT](LICENSE).


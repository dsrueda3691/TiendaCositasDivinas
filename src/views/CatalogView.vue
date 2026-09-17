<template>
  <div id="inicio" class="vista-catalogo">
    <header class="vista-catalogo__introduccion">
      <p class="vista-catalogo__antetitulo">Tienda Cositas Divinas</p>
      <h1>Detalles que acompañan cada momento</h1>
      <p>Explora nuestras categorías organizadas en cajones y descubre una selección especial para el hogar y la devoción.</p>
    </header>

    
    <section id="proposito" class="pancarta-mision" aria-label="Propósito de evangelización">
      <div class="pancarta-mision__interior">
        <div class="pancarta-mision__contenedor-imagen">
          <img
            :src="imagenBanner"
            alt="Biblia y rosario en un ambiente de oración"
            class="pancarta-mision__imagen"
          />
          <span class="pancarta-mision__pie-imagen">Detalles con propósito</span>
        </div>
        <div class="pancarta-mision__contenido">
          <span class="pancarta-mision__etiqueta">Propósito de Evangelización</span>
          <p class="pancarta-mision__cita">
            Cada artículo de este catálogo ha sido seleccionado para acompañarte en tu camino de fe y devoción.
          </p>
          <p class="pancarta-mision__causa">
            Al adquirir nuestros productos, no solo llevas contigo un artículo especial, sino que también contribuyes a la recaudación de fondos para la organización del
            <strong>XII Retiro de Emaus Mujeres</strong>.
          </p>
          <p class="pancarta-mision__agradecimiento">
            ¡Muchas gracias por hacer parte de este propósito de evangelización!
          </p>
        </div>
      </div>
    </section>

    
    <CatalogFilters
      :categories="categories"
      :selected-category="categoriaSeleccionada"
      :selected-sort="ordenSeleccionado"
      :is-drawer-open="estaCajonAbierto"
      @select-category="seleccionarCategoria"
      @select-sort="seleccionarOrden"
      @toggle-drawer="alternarCajon"
    />

    
    <Transition name="despliegue-cajon">
      <section
        v-if="estaCajonAbierto"
        id="productos"
        ref="contenedorProductos"
        class="seccion-cajon-desplegado"
      >
     
        <div class="cajon-desplegado__pancarta">
          <div class="cajon-desplegado__informacion-pancarta">
            <span class="cajon-desplegado__antetitulo">Categoria desplegado</span>
            <h2 class="cajon-desplegado__titulo">
              {{ tituloCategoriaActual }}
              <span class="cajon-desplegado__conteo">({{ productosFiltrados.length }} productos)</span>
            </h2>
          </div>

          <div class="cajon-desplegado__controles">
            <label class="cajon-desplegado__ordenar">
              <span>Ordenar</span>
              <select :value="ordenSeleccionado" @change="seleccionarOrden($event.target.value)">
                <option value="default">Recomendados</option>
                <option value="price-asc">Menor precio</option>
                <option value="price-desc">Mayor precio</option>
                <option value="name-asc">Nombre: A a Z</option>
                <option value="name-desc">Nombre: Z a A</option>
              </select>
            </label>

            <button
              class="cajon-desplegado__boton-alternar"
              type="button"
              title="Cerrar cajón"
              aria-label="Cerrar sección desplegada"
              @click="alternarCajon"
            >
              Cerrar Articulos ✕
            </button>
          </div>
        </div>

        
        <div class="vista-catalogo__productos">
          <Transition name="transicion-pestaña-vista" mode="out-in">
            <ProductGrid
              :key="`${categoriaSeleccionada}-${paginaActual}-${ordenSeleccionado}`"
              :products="productosPaginados"
            />
          </Transition>
        </div>

        
        <nav v-if="totalPaginas > 1" class="paginacion" aria-label="Páginas de productos">
          <button
            class="paginacion__boton paginacion__boton--flecha"
            type="button"
            :disabled="paginaActual === 1"
            aria-label="Página anterior"
            @click="irAPagina(paginaActual - 1)"
          >
            ‹
          </button>

          <button
            v-for="pagina in paginasVisibles"
            :key="pagina"
            class="paginacion__boton"
            :class="{ 'paginacion__boton--activa': pagina === paginaActual }"
            type="button"
            :aria-current="pagina === paginaActual ? 'page' : undefined"
            @click="irAPagina(pagina)"
          >
            {{ pagina }}
          </button>

          <button
            class="paginacion__boton paginacion__boton--flecha"
            type="button"
            :disabled="paginaActual === totalPaginas"
            aria-label="Página siguiente"
            @click="irAPagina(paginaActual + 1)"
          >
            ›
          </button>
        </nav>
      </section>

      
      <div v-else class="estado-cajon-cerrado">
        <span class="estado-cajon-cerrado__icono">🛒</span>
        <h3>Ninguna Categoria Seleccionada</h3>
        <p>Toca cualquiera de las tarjetas de arriba para desplegar su catálogo de productos.</p>
        <button class="estado-cajon-cerrado__boton" type="button" @click="alternarCajon">
          Reabrir Categoria desplegada ▾
        </button>
      </div>
    </Transition>

    
    <footer id="contacto" class="pie-catalogo">
      <div class="pie-catalogo__interior">
        <p class="pie-catalogo__parroquia">Parroquia de la Santa Cruz — Tienda Cositas Divinas</p>
        <p class="pie-catalogo__retiro">
          En apoyo a la organización del <strong>XII Retiro de Emaus Mujeres</strong>
        </p>
        <p class="pie-catalogo__bendicion">Que Dios bendiga abundantemente tu hogar y a tu familia.</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import CatalogFilters from '../components/catalog/CatalogFilters.vue'
import ProductGrid from '../components/catalog/ProductGrid.vue'
import { categories } from '../data/categories'
import { products } from '../data/products'
import imagenBanner from '../assets/banner.jpeg'

const categoriaSeleccionada = ref('Todos')
const ordenSeleccionado = ref('default')
const estaCajonAbierto = ref(true)
const paginaActual = ref(1)
alternarCajon()

const productosPorPagina = ref(24)
const contenedorProductos = ref(null)
let consultaMovil

const tituloCategoriaActual = computed(() => {
  if (categoriaSeleccionada.value === 'Todos') return 'Todos los Productos'
  return categoriaSeleccionada.value
})

const productosFiltrados = computed(() =>
  categoriaSeleccionada.value === 'Todos'
    ? products
    : products.filter((producto) => producto.categoria === categoriaSeleccionada.value),
)

const productosOrdenados = computed(() => {
  const lista = [...productosFiltrados.value]

  switch (ordenSeleccionado.value) {
    case 'price-asc':
      return lista.sort((a, b) => a.precio - b.precio)
    case 'price-desc':
      return lista.sort((a, b) => b.precio - a.precio)
    case 'name-asc':
      return lista.sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'))
    case 'name-desc':
      return lista.sort((a, b) => b.nombre.localeCompare(a.nombre, 'es'))
    default:
      return lista
  }
})

const totalPaginas = computed(() =>
  Math.max(1, Math.ceil(productosFiltrados.value.length / productosPorPagina.value)),
)

const productosPaginados = computed(() => {
  const inicio = (paginaActual.value - 1) * productosPorPagina.value
  return productosOrdenados.value.slice(inicio, inicio + productosPorPagina.value)
})

// Ventana de páginas visibles en móvil y escritorio
const paginasVisibles = computed(() => {
  const total = totalPaginas.value
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1)

  const actual = paginaActual.value
  let inicio = Math.max(1, actual - 2)
  let fin = Math.min(total, inicio + 4)
  if (fin - inicio < 4) inicio = Math.max(1, fin - 4)

  return Array.from({ length: fin - inicio + 1 }, (_, i) => inicio + i)
})

function seleccionarCategoria(categoria) {
  categoriaSeleccionada.value = categoria
  estaCajonAbierto.value = true
  paginaActual.value = 1
  desplazarAlInicioProductos()
}

function alternarCajon() {
  estaCajonAbierto.value = !estaCajonAbierto.value
  if (estaCajonAbierto.value) {
    desplazarAlInicioProductos()
  }
}

function seleccionarOrden(orden) {
  ordenSeleccionado.value = orden
  paginaActual.value = 1
  desplazarAlInicioProductos()
}

function irAPagina(numeroPagina) {
  if (numeroPagina < 1 || numeroPagina > totalPaginas.value) return
  paginaActual.value = numeroPagina
  desplazarAlInicioProductos()
}

function desplazarAlInicioProductos() {
  nextTick(() => {
    if (contenedorProductos.value) {
      contenedorProductos.value.scrollIntoView({ block: 'start', behavior: 'smooth' })
    }
  })
}

function actualizarProductosPorPagina() {
  // Cantidad máxima ampliada: 16 en teléfonos móviles y 24 en pantallas de escritorio
  productosPorPagina.value = consultaMovil.matches ? 16 : 24
  paginaActual.value = 1
}

onMounted(() => {
  consultaMovil = window.matchMedia('(max-width: 560px)')
  actualizarProductosPorPagina()
  consultaMovil.addEventListener('change', actualizarProductosPorPagina)
})

onBeforeUnmount(() => {
  consultaMovil?.removeEventListener('change', actualizarProductosPorPagina)
})
</script>

<style>
/* ── Diseño del Catálogo (Permite scroll natural en toda la página) ── */
.vista-catalogo {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  margin: 0 auto;
  max-width: 1400px;
  padding: 2.5rem clamp(1rem, 4vw, 4rem);
  width: 100%;
}

/* ── Encabezado de Introducción ─────────────────────── */
.vista-catalogo__introduccion {
  animation: animacion-entrada-intro .3s ease-out both;
  margin-bottom: 1.5rem;
  max-width: 720px;
}

.vista-catalogo__antetitulo {
  color: var(--accent);
  font-size: .8rem;
  font-weight: 700;
  letter-spacing: .08em;
  text-transform: uppercase;
}

.vista-catalogo h1 {
  font-size: clamp(1.6rem, 5vw, 3.2rem);
  line-height: 1.15;
  margin: .3rem 0 .6rem;
  color: var(--ink);
}

.vista-catalogo__introduccion > p:last-child {
  color: var(--muted);
  font-size: .95rem;
  line-height: 1.5;
}

/* ── Banner de Propósito (XII Retiro de Emaús Mujeres) ── */
.pancarta-mision {
  animation: animacion-entrada-intro .5s cubic-bezier(0.16, 1, 0.3, 1) .08s both;
  background: var(--surface);
  border: 1px solid var(--line);
  border-left: 5px solid var(--olive);
  border-radius: 1rem;
  box-shadow: 0 12px 30px rgba(74, 52, 40, .12);
  margin-bottom: 2rem;
  overflow: hidden;
  padding: 0;
}

.pancarta-mision__interior {
  display: grid;
  gap: 0;
  grid-template-columns: minmax(18rem, 1.05fr) minmax(0, 1fr);
  align-items: stretch;
}

.pancarta-mision__contenedor-imagen {
  min-height: 21rem;
  overflow: hidden;
  position: relative;
}

.pancarta-mision__contenedor-imagen::after {
  background: linear-gradient(180deg, transparent 55%, rgba(41, 39, 37, .55) 100%);
  content: '';
  inset: 0;
  pointer-events: none;
  position: absolute;
}

.pancarta-mision__imagen {
  border-radius: 0;
  display: block;
  height: 100%;
  min-height: 21rem;
  object-fit: cover;
  width: 100%;
}

.pancarta-mision__pie-imagen {
  background: rgba(41, 39, 37, .84);
  border-radius: 0 .45rem 0 .45rem;
  bottom: 0;
  color: #fff;
  font-size: .68rem;
  font-weight: 700;
  left: 0;
  padding: .4rem .55rem;
  position: absolute;
  z-index: 1;
}

.pancarta-mision__contenido {
  display: flex;
  flex-direction: column;
  gap: .55rem;
  justify-content: center;
  padding: 2.25rem 2.5rem;
  position: relative;
}

.pancarta-mision__contenido::before {
  color: var(--accent);
  content: '✦';
  font-family: Georgia, serif;
  font-size: 1.15rem;
  left: 1.1rem;
  line-height: 1;
  opacity: .7;
  position: absolute;
  top: 1.15rem;
}

.pancarta-mision__etiqueta {
  align-self: flex-start;
  background: var(--accent);
  border-radius: 999px;
  color: #fff;
  font-size: .68rem;
  font-weight: 800;
  letter-spacing: .06em;
  box-shadow: 0 4px 10px rgba(181, 138, 58, .2);
  padding: .3rem .75rem;
  text-transform: uppercase;
}

.pancarta-mision__cita {
  font-family: 'Cormorant Garamond', Georgia, serif;
  color: var(--ink);
  font-size: 1.35rem;
  font-weight: 600;
  line-height: 1.45;
  margin: 0;
  max-width: 34rem;
  position: relative;
}

.pancarta-mision__cita::after {
  background: var(--accent);
  content: '';
  display: block;
  height: 2px;
  margin-top: 1rem;
  opacity: .45;
  width: 3rem;
}

.pancarta-mision__causa {
  color: var(--ink);
  font-size: .95rem;
  line-height: 1.55;
  margin: 0;
  max-width: 38rem;
}

.pancarta-mision__causa strong {
  color: var(--accent-strong);
  font-weight: 800;
}

.pancarta-mision__agradecimiento {
  color: var(--accent-strong);
  font-size: .95rem;
  font-weight: 800;
  margin: .2rem 0 0;
  font-style: italic;
  border-left: 2px solid var(--accent);
  padding-left: .75rem;
}

/* ── Sección del Cajón Desplegado ───────────────────── */
.seccion-cajon-desplegado {
  animation: animacion-aparicion-cajon .32s cubic-bezier(0.16, 1, 0.3, 1) both;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 1.25rem;
  box-shadow: 0 6px 24px rgba(44, 42, 40, .06);
  padding: 1.5rem;
  margin-bottom: 2rem;
  scroll-margin-top: 5rem;
}

/* Banner superior del cajón desplegado */
.cajon-desplegado__pancarta {
  align-items: center;
  border-bottom: 1px solid var(--line);
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
}

.cajon-desplegado__antetitulo {
  color: var(--accent);
  font-size: .75rem;
  font-weight: 800;
  letter-spacing: .08em;
  text-transform: uppercase;
}

.cajon-desplegado__titulo {
  color: var(--ink);
  font-size: 1.35rem;
  font-weight: 800;
  margin: .15rem 0 0;
}

.cajon-desplegado__conteo {
  color: var(--muted);
  font-size: .92rem;
  font-weight: 600;
}

.cajon-desplegado__controles {
  align-items: center;
  display: flex;
  gap: .75rem;
}

.cajon-desplegado__ordenar {
  align-items: center;
  color: var(--muted);
  display: flex;
  font-size: .82rem;
  font-weight: 700;
  gap: .45rem;
}

.cajon-desplegado__ordenar select {
  appearance: none;
  background: var(--canvas);
  border: 1px solid var(--line);
  border-radius: .5rem;
  color: var(--ink);
  cursor: pointer;
  font: inherit;
  font-weight: 700;
  min-height: 2.25rem;
  padding: .35rem 1.6rem .35rem .65rem;
  transition: border-color .2s ease;
}

.cajon-desplegado__ordenar select:focus {
  border-color: var(--accent);
  outline: 2px solid var(--soft-accent);
  outline-offset: 2px;
}

.cajon-desplegado__boton-alternar {
  align-items: center;
  background: var(--canvas);
  border: 1px solid var(--line);
  border-radius: .5rem;
  color: var(--muted);
  cursor: pointer;
  display: inline-flex;
  font: inherit;
  font-size: .8rem;
  font-weight: 700;
  min-height: 2.25rem;
  padding: .35rem .75rem;
  transition: all .2s ease;
}

.cajon-desplegado__boton-alternar:hover {
  background: var(--soft-accent);
  border-color: var(--accent);
  color: var(--accent-strong);
}

.cajon-desplegado__boton-alternar:active {
  transform: scale(.95);
}

/* ── Contenedor de productos ────────────────────────── */
.vista-catalogo__productos {
  padding: .25rem 0 1rem;
}

/* ── Transición al expandir / contraer cajón ─────────── */
.despliegue-cajon-enter-active {
  transition: opacity .35s cubic-bezier(0.16, 1, 0.3, 1),
              transform .35s cubic-bezier(0.16, 1, 0.3, 1);
}

.despliegue-cajon-leave-active {
  transition: opacity .22s ease-in,
              transform .22s ease-in;
}

.despliegue-cajon-enter-from {
  opacity: 0;
  transform: translateY(-12px);
}

.despliegue-cajon-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* ── Transición al cambiar de categoría o página ────── */
.transicion-pestaña-vista-enter-active {
  transition: opacity .24s cubic-bezier(0.16, 1, 0.3, 1),
              transform .24s cubic-bezier(0.16, 1, 0.3, 1);
}

.transicion-pestaña-vista-leave-active {
  transition: opacity .14s ease-in,
              transform .14s ease-in;
}

.transicion-pestaña-vista-enter-from {
  opacity: 0;
  transform: translateY(12px) scale(.99);
}

.transicion-pestaña-vista-leave-to {
  opacity: 0;
  transform: translateY(-8px) scale(.99);
}

/* ── Estado cuando el cajón está cerrado ────────────── */
.estado-cajon-cerrado {
  align-items: center;
  background: var(--surface);
  border: 2px dashed var(--line);
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  gap: .5rem;
  padding: 3rem 1.5rem;
  text-align: center;
  margin-bottom: 2rem;
  animation: animacion-aparicion-cajon .3s ease-out both;
}

.estado-cajon-cerrado__icono {
  font-size: 2.25rem;
}

.estado-cajon-cerrado h3 {
  font-size: 1.25rem;
  margin: .25rem 0;
  color: var(--ink);
}

.estado-cajon-cerrado p {
  color: var(--muted);
  font-size: .92rem;
  margin: 0 0 .75rem;
}

.estado-cajon-cerrado__boton {
  background: var(--accent);
  border: none;
  border-radius: .55rem;
  color: #fff;
  cursor: pointer;
  font: inherit;
  font-size: .88rem;
  font-weight: 700;
  min-height: 2.5rem;
  padding: .6rem 1.25rem;
  transition: background-color .2s ease, transform .15s ease;
}

.estado-cajon-cerrado__boton:hover {
  background: var(--accent-strong);
}

.estado-cajon-cerrado__boton:active {
  transform: scale(.96);
}

/* ── Paginación ─────────────────────────────────────── */
.paginacion {
  display: flex;
  gap: .4rem;
  justify-content: center;
  margin-top: 1.5rem;
  padding-bottom: .25rem;
}

.paginacion__boton {
  align-items: center;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: .5rem;
  color: var(--muted);
  cursor: pointer;
  display: inline-flex;
  flex: 0 0 2.75rem;
  font: inherit;
  font-weight: 600;
  height: 2.75rem;
  justify-content: center;
  padding: 0;
  transition: background-color .2s ease, border-color .2s ease, color .2s ease, transform .15s ease;
  width: 2.75rem;
}

.paginacion__boton--flecha {
  font-size: 1.3rem;
  font-weight: 700;
}

.paginacion__boton:disabled {
  cursor: default;
  opacity: .35;
}

.paginacion__boton:active:not(:disabled) {
  background: var(--soft-accent);
  border-color: var(--accent);
  color: var(--accent-strong);
  transform: scale(.95);
}

@media (hover: hover) {
  .paginacion__boton:hover:not(:disabled) {
    border-color: var(--accent);
    color: var(--accent-strong);
  }
}

.paginacion__boton--activa {
  background: var(--accent);
  border-color: var(--accent);
  color: #fff;
  box-shadow: 0 3px 10px rgba(138, 93, 73, .25);
}

/* ── Pie de Página Parroquial ────────────────────────── */
.pie-catalogo {
  border-top: 1px solid var(--line);
  margin-top: 2rem;
  padding: 2rem 1rem 3rem;
  text-align: center;
}

.pie-catalogo__interior {
  display: flex;
  flex-direction: column;
  gap: .35rem;
  max-width: 600px;
  margin: 0 auto;
}

.pie-catalogo__parroquia {
  color: var(--accent-strong);
  font-size: 1rem;
  font-weight: 800;
  margin: 0;
}

.pie-catalogo__retiro {
  color: var(--ink);
  font-size: .92rem;
  margin: 0;
}

.pie-catalogo__bendicion {
  color: var(--muted);
  font-size: .84rem;
  font-style: italic;
  margin: .35rem 0 0;
}

@keyframes animacion-entrada-intro {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes animacion-aparicion-cajon {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ── Móvil Layout ───────────────────────────────────── */
@media (max-width: 560px) {
  .vista-catalogo {
    padding: 1.25rem .75rem 2.5rem;
  }

  .vista-catalogo__introduccion {
    margin-bottom: 1rem;
  }

  .vista-catalogo__antetitulo { font-size: .72rem; }

  .vista-catalogo__introduccion > p:last-child {
    font-size: .88rem;
  }

  /* Pancarta misión en móvil */
  .pancarta-mision {
    padding: 0;
    margin-bottom: 1.25rem;
  }

  .pancarta-mision__interior {
    align-items: stretch;
    grid-template-columns: 1fr;
    gap: 0;
  }

  .pancarta-mision__contenedor-imagen {
    flex-basis: auto;
    min-height: 13.5rem;
  }

  .pancarta-mision__imagen {
    min-height: 13.5rem;
  }

  .pancarta-mision__contenido {
    padding: 1.25rem 1rem 1.4rem;
  }

  .pancarta-mision__cita {
    font-size: 1.15rem;
  }

  .pancarta-mision__causa {
    font-size: .86rem;
  }

  .pancarta-mision__agradecimiento {
    font-size: .88rem;
  }

  .seccion-cajon-desplegado {
    border-radius: 1rem;
    padding: 1rem .75rem;
    margin-bottom: 1.25rem;
  }

  .cajon-desplegado__pancarta {
    flex-direction: column;
    align-items: flex-start;
    gap: .75rem;
    padding-bottom: .85rem;
    margin-bottom: 1rem;
  }

  .cajon-desplegado__titulo {
    font-size: 1.15rem;
  }

  .cajon-desplegado__controles {
    width: 100%;
    justify-content: space-between;
  }

  .cajon-desplegado__ordenar {
    flex: 1;
  }

  .cajon-desplegado__ordenar select {
    flex: 1;
    font-size: .82rem;
  }

  .cajon-desplegado__boton-alternar {
    font-size: .75rem;
    padding: .35rem .6rem;
  }

  .paginacion {
    gap: .3rem;
  }

  .paginacion__boton {
    flex: 0 0 2.75rem;
    font-size: .85rem;
    height: 2.75rem;
    width: 2.75rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .vista-catalogo__introduccion,
  .pancarta-mision,
  .seccion-cajon-desplegado,
  .despliegue-cajon-enter-active,
  .despliegue-cajon-leave-active,
  .transicion-pestaña-vista-enter-active,
  .transicion-pestaña-vista-leave-active {
    transition: none !important;
    animation: none !important;
  }
}
</style>

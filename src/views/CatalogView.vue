<template>
  <div id="inicio" class="catalog-view">
    <header class="catalog-view__intro">
      <p class="catalog-view__eyebrow">Tienda Cositas Divinas</p>
      <h1>Detalles que acompañan cada momento</h1>
      
    </header>

   
    <section id="proposito" class="mission-banner" aria-label="Propósito de evangelización">
      <div class="mission-banner__inner">
        <div class="mission-banner__image-wrap">
          <img
            :src="missionImage"
            alt="Biblia y rosario en un ambiente de oración"
            class="mission-banner__image"
          />
          <span class="mission-banner__image-caption">Detalles con propósito</span>
        </div>
        <div class="mission-banner__content">
          <span class="mission-banner__tag">Propósito de Evangelización</span>
          <p class="mission-banner__quote">
            Cada artículo de este catálogo ha sido seleccionado para acompañarte en tu camino de fe y devoción.
          </p>
          <p class="mission-banner__cause">
            Al adquirir nuestros productos, no solo llevas contigo un artículo especial, sino que también contribuyes a la recaudación de fondos para la organización del
            <strong>XII Retiro de Emaus Mujeres</strong>.
          </p>
          <p class="mission-banner__gratitude">
            ¡Muchas gracias por hacer parte de este propósito de evangelización!
          </p>
        </div>
      </div>
    </section>

    <!-- Sección de Cajones / Cards de Categorías -->
    <CatalogFilters
      :categories="categories"
      :selected-category="selectedCategory"
      :selected-sort="selectedSort"
      :is-drawer-open="isDrawerOpen"
      @select-category="selectCategory"
      @select-sort="selectSort"
      @toggle-drawer="toggleDrawer"
    />

    <!-- Sección Desplegada con los Productos del Cajón -->
    <Transition name="drawer-expand">
      <section
        v-if="isDrawerOpen"
        id="productos"
        ref="productsContainer"
        class="deployed-drawer-section"
      >
        <!-- Barra de control del cajón desplegado -->
        <div class="deployed-drawer__banner">
          <div class="deployed-drawer__banner-info">
            <span class="deployed-drawer__eyebrow">Cajón desplegado</span>
            <h2 class="deployed-drawer__title">
              {{ currentCategoryTitle }}
              <span class="deployed-drawer__count">({{ filteredProducts.length }} productos)</span>
            </h2>
          </div>

          <div class="deployed-drawer__controls">
            <label class="deployed-drawer__sort">
              <span>Ordenar</span>
              <select :value="selectedSort" @change="selectSort($event.target.value)">
                <option value="default">Recomendados</option>
                <option value="price-asc">Menor precio</option>
                <option value="price-desc">Mayor precio</option>
                <option value="name-asc">Nombre: A a Z</option>
                <option value="name-desc">Nombre: Z a A</option>
              </select>
            </label>

            <button
              class="deployed-drawer__toggle-btn"
              type="button"
              title="Cerrar cajón"
              aria-label="Cerrar sección desplegada"
              @click="toggleDrawer"
            >
              Cerrar cajón ✕
            </button>
          </div>
        </div>

        <!-- Grid de productos con transición fluida -->
        <div class="catalog-view__products">
          <Transition name="tab-view" mode="out-in">
            <ProductGrid
              :key="`${selectedCategory}-${currentPage}-${selectedSort}`"
              :products="pagedProducts"
              @add-to-cart="handleAddToCart"
              @set-cart-quantity="handleSetCartQuantity"
            />
          </Transition>
        </div>

        <!-- Paginación táctil -->
        <nav v-if="totalPages > 1" class="pagination" aria-label="Páginas de productos">
          <button
            class="pagination__button pagination__button--arrow"
            type="button"
            :disabled="currentPage === 1"
            aria-label="Página anterior"
            @click="goToPage(currentPage - 1)"
          >
            ‹
          </button>

          <button
            v-for="page in visiblePages"
            :key="page"
            class="pagination__button"
            :class="{ 'pagination__button--active': page === currentPage }"
            type="button"
            :aria-current="page === currentPage ? 'page' : undefined"
            @click="goToPage(page)"
          >
            {{ page }}
          </button>

          <button
            class="pagination__button pagination__button--arrow"
            type="button"
            :disabled="currentPage === totalPages"
            aria-label="Página siguiente"
            @click="goToPage(currentPage + 1)"
          >
            ›
          </button>
        </nav>
      </section>

      <!-- Estado cuando el cajón está cerrado / contraído -->
      <div v-else class="drawer-closed-state">
        <span class="drawer-closed-state__icon">📦</span>
        <h3>El cajón está cerrado</h3>
        <p>Toca cualquiera de las tarjetas de arriba para desplegar su catálogo de productos.</p>
        <button class="drawer-closed-state__btn" type="button" @click="toggleDrawer">
          Reabrir cajón desplegado ▾
        </button>
      </div>
    </Transition>

    <!-- Footer de la parroquia -->
    <footer id="contacto" class="catalog-footer">
      <div class="catalog-footer__inner">
        <p class="catalog-footer__parish">Parroquia de la Santa Cruz — Tienda Cositas Divinas</p>
        <p class="catalog-footer__retreat">
          En apoyo a la organización del <strong>XII Retiro de Emaus Mujeres</strong>
        </p>
        <p class="catalog-footer__blessing">Que Dios bendiga abundantemente tu hogar y a tu familia.</p>
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
import missionImage from '../assets/banner.jpeg'

const emit = defineEmits(['add-to-cart', 'set-cart-quantity'])

const selectedCategory = ref('Todos')
const selectedSort = ref('default')
const isDrawerOpen = ref(true)
const currentPage = ref(1)
const productsPerPage = ref(12)
const productsContainer = ref(null)
let mobileQuery

const currentCategoryTitle = computed(() => {
  if (selectedCategory.value === 'Todos') return 'Todos los Productos'
  return selectedCategory.value
})

const filteredProducts = computed(() =>
  selectedCategory.value === 'Todos'
    ? products
    : products.filter((product) => product.categoria === selectedCategory.value),
)

const sortedProducts = computed(() => {
  const list = [...filteredProducts.value]

  switch (selectedSort.value) {
    case 'price-asc':
      return list.sort((a, b) => a.precio - b.precio)
    case 'price-desc':
      return list.sort((a, b) => b.precio - a.precio)
    case 'name-asc':
      return list.sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'))
    case 'name-desc':
      return list.sort((a, b) => b.nombre.localeCompare(a.nombre, 'es'))
    default:
      return list
  }
})

const totalPages = computed(() => Math.max(1, Math.ceil(filteredProducts.value.length / productsPerPage.value)))

const pagedProducts = computed(() => {
  const start = (currentPage.value - 1) * productsPerPage.value
  return sortedProducts.value.slice(start, start + productsPerPage.value)
})

function handleAddToCart(product) {
  emit('add-to-cart', product)
}

function handleSetCartQuantity({ product, quantity }) {
  emit('set-cart-quantity', { product, quantity })
}

// Ventana de páginas visibles en móvil y escritorio
const visiblePages = computed(() => {
  const total = totalPages.value
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1)

  const current = currentPage.value
  let start = Math.max(1, current - 2)
  let end = Math.min(total, start + 4)
  if (end - start < 4) start = Math.max(1, end - 4)

  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
})

function selectCategory(category) {
  selectedCategory.value = category
  isDrawerOpen.value = true
  currentPage.value = 1
  scrollToProductsStart()
}

function toggleDrawer() {
  isDrawerOpen.value = !isDrawerOpen.value
  if (isDrawerOpen.value) {
    scrollToProductsStart()
  }
}

function selectSort(sort) {
  selectedSort.value = sort
  currentPage.value = 1
  scrollToProductsStart()
}

function goToPage(page) {
  if (page < 1 || page > totalPages.value) return
  currentPage.value = page
  scrollToProductsStart()
}

function scrollToProductsStart() {
  nextTick(() => {
    if (productsContainer.value) {
      productsContainer.value.scrollIntoView({ block: 'start', behavior: 'smooth' })
    }
  })
}

function updateProductsPerPage() {
  productsPerPage.value = mobileQuery.matches ? 8 : 12
  currentPage.value = 1
}

onMounted(() => {
  mobileQuery = window.matchMedia('(max-width: 560px)')
  updateProductsPerPage()
  mobileQuery.addEventListener('change', updateProductsPerPage)
})

onBeforeUnmount(() => {
  mobileQuery?.removeEventListener('change', updateProductsPerPage)
})
</script>

<style>
/* ── Catalog layout (Permite scroll natural en toda la página) ── */
.catalog-view {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  margin: 0 auto;
  max-width: 1400px;
  padding: 2.5rem clamp(1rem, 4vw, 4rem);
  width: 100%;
}

/* ── Intro header ───────────────────────────────────── */
.catalog-view__intro {
  animation: intro-enter .5s cubic-bezier(0.16, 1, 0.3, 1) both;
  margin-bottom: 1.5rem;
  max-width: 720px;
}

.catalog-view__eyebrow {
  color: var(--accent);
  font-size: .8rem;
  font-weight: 700;
  letter-spacing: .08em;
  text-transform: uppercase;
}

.catalog-view h1 {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: clamp(1.6rem, 5vw, 3.2rem);
  line-height: 1.15;
  margin: .3rem 0 .6rem;
  color: var(--ink);
}

.catalog-view__intro > p:last-child {
  color: var(--muted);
  font-size: .95rem;
  line-height: 1.5;
}

/* ── Mission Banner (Propósito Emaús Mujeres) ────────── */
.mission-banner {
  animation: intro-enter .5s cubic-bezier(0.16, 1, 0.3, 1) .08s both;
  background: var(--surface);
  border: 1px solid var(--line);
  border-left: 5px solid var(--olive);
  border-radius: 1rem;
  box-shadow: 0 12px 30px rgba(74, 52, 40, .12);
  margin-bottom: 2rem;
  overflow: hidden;
  padding: 0;
}

.mission-banner__inner {
  display: grid;
  gap: 0;
  grid-template-columns: minmax(18rem, 1.05fr) minmax(0, 1fr);
  align-items: stretch;
}

.mission-banner__image-wrap {
  min-height: 21rem;
  overflow: hidden;
  position: relative;
}

.mission-banner__image-wrap::after {
  background: linear-gradient(180deg, transparent 55%, rgba(41, 39, 37, .55) 100%);
  content: '';
  inset: 0;
  pointer-events: none;
  position: absolute;
}

.mission-banner__image {
  border-radius: 0;
  display: block;
  height: 100%;
  min-height: 21rem;
  object-fit: cover;
  width: 100%;
}

.mission-banner__image-caption {
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

.mission-banner__icon-col {
  flex-shrink: 0;
}

.mission-banner__badge-icon {
  align-items: center;
  background: var(--surface);
  border: 2px solid var(--accent);
  border-radius: 50%;
  color: var(--accent-strong);
  display: flex;
  font-size: 1.35rem;
  font-weight: 800;
  height: 3rem;
  justify-content: center;
  width: 3rem;
  box-shadow: 0 4px 10px rgba(138, 93, 73, .15);
}

.mission-banner__content {
  display: flex;
  flex-direction: column;
  gap: .55rem;
  justify-content: center;
  padding: 2.25rem 2.5rem;
  position: relative;
}

.mission-banner__content::before {
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

.mission-banner__tag {
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

.mission-banner__quote {
  font-family: 'Cormorant Garamond', Georgia, serif;
  color: var(--ink);
  font-size: 1.35rem;
  font-weight: 600;
  line-height: 1.45;
  margin: 0;
  max-width: 34rem;
  position: relative;
}

.mission-banner__quote::after {
  background: var(--accent);
  content: '';
  display: block;
  height: 2px;
  margin-top: 1rem;
  opacity: .45;
  width: 3rem;
}

.mission-banner__cause {
  color: var(--ink);
  font-size: .95rem;
  line-height: 1.55;
  margin: 0;
  max-width: 38rem;
}

.mission-banner__cause strong {
  color: var(--accent-strong);
  font-weight: 800;
}

.mission-banner__gratitude {
  color: var(--accent-strong);
  font-size: .95rem;
  font-weight: 800;
  margin: .2rem 0 0;
  font-style: italic;
  border-left: 2px solid var(--accent);
  padding-left: .75rem;
}

/* ── Deployed Drawer Section ────────────────────────── */
.deployed-drawer-section {
  animation: drawer-fade-in .5s cubic-bezier(0.16, 1, 0.3, 1) .16s both;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 1.25rem;
  box-shadow: 0 6px 24px rgba(44, 42, 40, .06);
  padding: 1.5rem;
  margin-bottom: 2rem;
  scroll-margin-top: 5rem;
}

/* Banner superior del cajón desplegado */
.deployed-drawer__banner {
  align-items: center;
  border-bottom: 1px solid var(--line);
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
}

.deployed-drawer__eyebrow {
  color: var(--accent);
  font-size: .75rem;
  font-weight: 800;
  letter-spacing: .08em;
  text-transform: uppercase;
}

.deployed-drawer__title {
  color: var(--ink);
  font-size: 1.35rem;
  font-weight: 800;
  margin: .15rem 0 0;
}

.deployed-drawer__count {
  color: var(--muted);
  font-size: .92rem;
  font-weight: 600;
}

.deployed-drawer__controls {
  align-items: center;
  display: flex;
  gap: .75rem;
}

.deployed-drawer__sort {
  align-items: center;
  color: var(--muted);
  display: flex;
  font-size: .82rem;
  font-weight: 700;
  gap: .45rem;
}

.deployed-drawer__sort select {
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

.deployed-drawer__sort select:focus {
  border-color: var(--accent);
  outline: 2px solid var(--soft-accent);
  outline-offset: 2px;
}

.deployed-drawer__toggle-btn {
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

.deployed-drawer__toggle-btn:hover {
  background: var(--soft-accent);
  border-color: var(--accent);
  color: var(--accent-strong);
}

.deployed-drawer__toggle-btn:active {
  transform: scale(.95);
}

/* ── Products list ──────────────────────────────────── */
.catalog-view__products {
  padding: .25rem 0 1rem;
}

/* ── Drawer Expand / Collapse Transitions ───────────── */
.drawer-expand-enter-active {
  transition: opacity .35s cubic-bezier(0.16, 1, 0.3, 1),
              transform .35s cubic-bezier(0.16, 1, 0.3, 1);
}

.drawer-expand-leave-active {
  transition: opacity .22s ease-in,
              transform .22s ease-in;
}

.drawer-expand-enter-from {
  opacity: 0;
  transform: translateY(-12px);
}

.drawer-expand-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* ── Cross-fade on category or sort switch ──────────── */
.tab-view-enter-active {
  transition: opacity .24s cubic-bezier(0.16, 1, 0.3, 1),
              transform .24s cubic-bezier(0.16, 1, 0.3, 1);
}

.tab-view-leave-active {
  transition: opacity .14s ease-in,
              transform .14s ease-in;
}

.tab-view-enter-from {
  opacity: 0;
  transform: translateY(12px) scale(.99);
}

.tab-view-leave-to {
  opacity: 0;
  transform: translateY(-8px) scale(.99);
}

/* ── Closed Drawer Placeholder ──────────────────────── */
.drawer-closed-state {
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
  animation: drawer-fade-in .4s cubic-bezier(0.16, 1, 0.3, 1) .16s both;
}

.drawer-closed-state__icon {
  font-size: 2.25rem;
}

.drawer-closed-state h3 {
  font-size: 1.25rem;
  margin: .25rem 0;
  color: var(--ink);
}

.drawer-closed-state p {
  color: var(--muted);
  font-size: .92rem;
  margin: 0 0 .75rem;
}

.drawer-closed-state__btn {
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

.drawer-closed-state__btn:hover {
  background: var(--accent-strong);
}

.drawer-closed-state__btn:active {
  transform: scale(.96);
}

/* ── Pagination ─────────────────────────────────────── */
.pagination {
  display: flex;
  gap: .4rem;
  justify-content: center;
  margin-top: 1.5rem;
  padding-bottom: .25rem;
}

.pagination__button {
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

.pagination__button--arrow {
  font-size: 1.3rem;
  font-weight: 700;
}

.pagination__button:disabled {
  cursor: default;
  opacity: .35;
}

.pagination__button:active:not(:disabled) {
  background: var(--soft-accent);
  border-color: var(--accent);
  color: var(--accent-strong);
  transform: scale(.95);
}

@media (hover: hover) {
  .pagination__button:hover:not(:disabled) {
    border-color: var(--accent);
    color: var(--accent-strong);
  }
}

.pagination__button--active {
  background: var(--accent);
  border-color: var(--accent);
  color: #fff;
  box-shadow: 0 3px 10px rgba(138, 93, 73, .25);
}

/* ── Parish Footer ──────────────────────────────────── */
.catalog-footer {
  border-top: 1px solid var(--line);
  margin-top: 2rem;
  padding: 2rem 1rem 3rem;
  text-align: center;
}

.catalog-footer__inner {
  display: flex;
  flex-direction: column;
  gap: .35rem;
  max-width: 600px;
  margin: 0 auto;
}

.catalog-footer__parish {
  color: var(--accent-strong);
  font-size: 1rem;
  font-weight: 800;
  margin: 0;
}

.catalog-footer__retreat {
  color: var(--ink);
  font-size: .92rem;
  margin: 0;
}

.catalog-footer__blessing {
  color: var(--muted);
  font-size: .84rem;
  font-style: italic;
  margin: .35rem 0 0;
}

@keyframes intro-enter {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes drawer-fade-in {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ── Mobile Layout ──────────────────────────────────── */
@media (max-width: 560px) {
  .catalog-view {
    padding: 1.25rem .75rem 2.5rem;
  }

  .catalog-view__intro {
    margin-bottom: 1rem;
  }

  .catalog-view__eyebrow { font-size: .72rem; }

  .catalog-view__intro > p:last-child {
    font-size: .88rem;
  }

  /* Mission banner en móvil */
  .mission-banner {
    padding: 1rem .85rem;
    margin-bottom: 1.25rem;
  }

  .mission-banner__inner {
    align-items: stretch;
    grid-template-columns: 1fr;
    gap: .75rem;
  }

  .mission-banner__image-wrap {
    flex-basis: auto;
    min-height: 13.5rem;
  }

  .mission-banner__image { min-height: 13.5rem; }

  .mission-banner__content { padding: 1.25rem 1rem 1.4rem; }
  .mission-banner__quote { font-size: 1.15rem; }

  .mission-banner__badge-icon {
    height: 2.35rem;
    width: 2.35rem;
    font-size: 1.1rem;
  }

  .mission-banner__quote {
    font-size: .9rem;
  }

  .mission-banner__cause {
    font-size: .86rem;
  }

  .mission-banner__gratitude {
    font-size: .88rem;
  }

  .deployed-drawer-section {
    border-radius: 1rem;
    padding: 1rem .75rem;
    margin-bottom: 1.25rem;
  }

  .deployed-drawer__banner {
    flex-direction: column;
    align-items: flex-start;
    gap: .75rem;
    padding-bottom: .85rem;
    margin-bottom: 1rem;
  }

  .deployed-drawer__title {
    font-size: 1.15rem;
  }

  .deployed-drawer__controls {
    width: 100%;
    justify-content: space-between;
  }

  .deployed-drawer__sort {
    flex: 1;
  }

  .deployed-drawer__sort select {
    flex: 1;
    font-size: .82rem;
  }

  .deployed-drawer__toggle-btn {
    font-size: .75rem;
    padding: .35rem .6rem;
  }

  .pagination {
    gap: .3rem;
  }

  .pagination__button {
    flex: 0 0 2.75rem;
    font-size: .85rem;
    height: 2.75rem;
    width: 2.75rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .catalog-view__intro,
  .mission-banner,
  .deployed-drawer-section,
  .drawer-expand-enter-active,
  .drawer-expand-leave-active,
  .tab-view-enter-active,
  .tab-view-leave-active {
    transition: none !important;
    animation: none !important;
  }
}
</style>

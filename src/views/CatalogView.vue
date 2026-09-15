<template>
  <section id="inicio" class="catalog-view">
    <header class="catalog-view__intro">
      <p class="catalog-view__eyebrow">Tienda Cositas Divinas</p>
      <h1>Detalles que acompañan cada momento</h1>
      <p>Explora una selección especial para el hogar, regalos y ocasiones significativas.</p>
    </header>

    <CatalogFilters
      :categories="categories"
      :selected-category="selectedCategory"
      :selected-sort="selectedSort"
      @select-category="selectCategory"
      @select-sort="selectSort"
    />

    <div id="productos" ref="productsContainer" class="catalog-view__products">
      <Transition name="tab-view" mode="out-in">
        <ProductGrid
          :key="`${selectedCategory}-${currentPage}-${selectedSort}`"
          :products="pagedProducts"
        />
      </Transition>
    </div>

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
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import CatalogFilters from '../components/catalog/CatalogFilters.vue'
import ProductGrid from '../components/catalog/ProductGrid.vue'
import { categories } from '../data/categories'
import { products } from '../data/products'

const selectedCategory = ref('Todos')
const selectedSort = ref('default')
const currentPage = ref(1)
const productsPerPage = ref(12)
const productsContainer = ref(null)
let mobileQuery

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

// Show a window of pages around currentPage on mobile
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
  currentPage.value = 1
  scrollToProductsStart()
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
    productsContainer.value?.scrollTo({ top: 0, behavior: 'smooth' })

    if (window.matchMedia('(max-width: 900px)').matches) {
      productsContainer.value?.scrollIntoView({ block: 'start', behavior: 'smooth' })
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
/* ── Catalog layout ─────────────────────────────────── */
.catalog-view {
  display: grid;
  grid-template-rows: auto auto minmax(0, 1fr) auto;
  height: 100%;
  margin: 0 auto;
  max-width: 1400px;
  padding: 2.5rem clamp(1rem, 4vw, 4rem);
  width: 100%;
}

/* ── Intro header ───────────────────────────────────── */
.catalog-view__intro {
  animation: intro-enter .3s ease-out both;
  margin-bottom: 1.5rem;
  max-width: 680px;
}

.catalog-view__eyebrow {
  color: var(--accent);
  font-size: .8rem;
  font-weight: 700;
  letter-spacing: .08em;
  text-transform: uppercase;
}

.catalog-view h1 {
  font-size: clamp(1.6rem, 5vw, 3.4rem);
  line-height: 1.1;
  margin: .3rem 0 .6rem;
}

.catalog-view__intro > p:last-child {
  color: var(--muted);
  font-size: .95rem;
}

/* ── Products scroll area ───────────────────────────── */
.catalog-view__products {
  min-height: 0;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding: .25rem .25rem 1.5rem;
  scrollbar-gutter: stable;
}

/* ── Tab transition (cross-fade on category or sort switch) ── */
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

@keyframes intro-enter {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ── Pagination ─────────────────────────────────────── */
.pagination {
  display: flex;
  gap: .4rem;
  justify-content: center;
  margin-top: 1.25rem;
  padding-bottom: .5rem;
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

/* ── Mobile layout ──────────────────────────────────── */
@media (max-width: 900px) {
  .catalog-view {
    display: flex;
    flex-direction: column;
    height: auto;
  }
  .catalog-view__products {
    overflow: visible;
  }
}

@media (max-width: 560px) {
  .catalog-view {
    padding: 1.25rem .75rem;
  }

  .catalog-view__intro {
    margin-bottom: 1rem;
  }

  .catalog-view__eyebrow { font-size: .72rem; }

  .catalog-view__intro > p:last-child {
    font-size: .88rem;
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
  .tab-view-enter-active,
  .tab-view-leave-active {
    transition: none !important;
    animation: none !important;
  }
}
</style>

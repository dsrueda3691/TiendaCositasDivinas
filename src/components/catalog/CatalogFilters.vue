<template>
  <section id="categorias" class="category-drawers-section" aria-label="Cajones de categorías">
    <div class="category-drawers__header">
      <div>
        <span class="category-drawers__eyebrow">Categorías de la Tienda</span>
        <h2 class="category-drawers__title">Cajones de Categorías</h2>
      </div>
      <p class="category-drawers__subtitle">
        Toca cualquier cajón para desplegar su colección de productos.
      </p>
    </div>

    <!-- Cuadrícula de Cajones / Cards de Categorías -->
    <div class="category-drawers__grid" role="group" aria-label="Cajones de categorías">
      <article
        v-for="drawer in categoryDrawers"
        :key="drawer.id"
        class="category-drawer-card"
        :class="{
          'category-drawer-card--active': drawer.nombre === selectedCategory && isDrawerOpen,
        }"
        :aria-expanded="drawer.nombre === selectedCategory && isDrawerOpen"
        tabindex="0"
        role="button"
        @click="handleClick(drawer.nombre)"
        @keydown.enter="handleClick(drawer.nombre)"
        @keydown.space.prevent="handleClick(drawer.nombre)"
      >
        <div class="category-drawer-card__image-container">
          <img
            :src="drawer.imagen"
            :alt="drawer.titulo"
            class="category-drawer-card__image"
            loading="lazy"
            decoding="async"
          />
          <span class="category-drawer-card__badge">{{ drawer.etiqueta }}</span>

          <span
            v-if="drawer.nombre === selectedCategory && isDrawerOpen"
            class="category-drawer-card__open-pill"
          >
            Abierto
          </span>
        </div>

        <div class="category-drawer-card__content">
          <div class="category-drawer-card__info">
            <h3 class="category-drawer-card__name">{{ drawer.titulo }}</h3>
            <p class="category-drawer-card__desc">{{ drawer.descripcion }}</p>
          </div>

          <div class="category-drawer-card__footer">
            <span class="category-drawer-card__action-text">
              {{ drawer.nombre === selectedCategory && isDrawerOpen ? 'Cajón desplegado' : 'Desplegar cajón' }}
            </span>
            <span class="category-drawer-card__action-arrow" aria-hidden="true">
              {{ drawer.nombre === selectedCategory && isDrawerOpen ? '▲' : '▼' }}
            </span>
          </div>
        </div>

        <!-- Flecha indicadora inferior que conecta con la sección desplegada -->
        <div
          v-if="drawer.nombre === selectedCategory && isDrawerOpen"
          class="category-drawer-card__pointer"
          aria-hidden="true"
        ></div>
      </article>
    </div>
  </section>
</template>

<script setup>
import { categoryDrawers } from '../../data/categories'

const props = defineProps({
  categories: { type: Array, required: true },
  selectedCategory: { type: String, required: true },
  selectedSort: { type: String, required: true },
  isDrawerOpen: { type: Boolean, default: true },
})

const emit = defineEmits(['select-category', 'select-sort', 'toggle-drawer'])

function handleClick(category) {
  if (category === props.selectedCategory) {
    emit('toggle-drawer')
  } else {
    emit('select-category', category)
  }
}
</script>

<style>
/* ── Category Drawers Section ───────────────────────── */
.category-drawers-section {
  animation: drawers-enter .35s ease-out both;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 1.25rem;
  box-shadow: 0 4px 20px rgba(44, 42, 40, .05);
  margin-bottom: 2rem;
  padding: 1.5rem;
}

.category-drawers__header {
  display: flex;
  flex-direction: column;
  gap: .25rem;
  margin-bottom: 1.25rem;
}

.category-drawers__eyebrow {
  color: var(--accent);
  font-size: .75rem;
  font-weight: 800;
  letter-spacing: .08em;
  text-transform: uppercase;
}

.category-drawers__title {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 1.7rem;
  font-weight: 800;
  line-height: 1.2;
  margin: .2rem 0;
  color: var(--ink);
}

.category-drawers__subtitle {
  color: var(--muted);
  font-size: .92rem;
  margin: 0;
}

/* ── Grid of Drawer Cards ───────────────────────────── */
.category-drawers__grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

/* ── Drawer Card ────────────────────────────────────── */
.category-drawer-card {
  background: var(--canvas);
  border: 2px solid transparent;
  border-radius: 1rem;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  transition: transform .25s cubic-bezier(0.16, 1, 0.3, 1),
              box-shadow .25s cubic-bezier(0.16, 1, 0.3, 1),
              border-color .22s ease,
              background-color .22s ease;
  user-select: none;
}

@supports (animation-timeline: view()) {
  .category-drawer-card {
    animation: category-scroll-reveal .55s cubic-bezier(0.16, 1, 0.3, 1) both;
    animation-timeline: view();
    animation-range: entry 0% cover 24%;
  }
}

@keyframes category-scroll-reveal {
  from { opacity: 0; transform: translateY(20px) scale(.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

@media (hover: hover) {
  .category-drawer-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 24px rgba(44, 42, 40, .1);
    border-color: color-mix(in srgb, var(--accent) 40%, transparent);
  }

  .category-drawer-card:hover .category-drawer-card__image {
    transform: scale(1.06);
  }
}

.category-drawer-card:active {
  transform: scale(.97);
}

/* Estado activo / abierto */
.category-drawer-card--active {
  background: var(--surface);
  border-color: var(--accent) !important;
  box-shadow: 0 8px 24px rgba(74, 52, 40, .2);
}

.category-drawer-card--active .category-drawer-card__footer {
  background: var(--accent);
  color: #fff;
}

.category-drawer-card--active .category-drawer-card__action-text,
.category-drawer-card--active .category-drawer-card__action-arrow {
  color: #fff;
  font-weight: 800;
}

/* ── Image & Badges ─────────────────────────────────── */
.category-drawer-card__image-container {
  aspect-ratio: 16 / 10;
  background: var(--beige);
  overflow: hidden;
  position: relative;
  width: 100%;
}

.category-drawer-card__image {
  display: block;
  height: 100%;
  object-fit: cover;
  transition: transform .35s cubic-bezier(0.16, 1, 0.3, 1);
  width: 100%;
}

.category-drawer-card__badge {
  background: rgba(44, 42, 40, .75);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 999px;
  color: #fff;
  font-size: .68rem;
  font-weight: 700;
  left: .65rem;
  padding: .2rem .55rem;
  position: absolute;
  top: .65rem;
  letter-spacing: .02em;
}

.category-drawer-card__open-pill {
  background: var(--accent);
  border-radius: 999px;
  color: #fff;
  font-size: .68rem;
  font-weight: 800;
  right: .65rem;
  padding: .2rem .55rem;
  position: absolute;
  top: .65rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, .2);
}

/* ── Card Body ──────────────────────────────────────── */
.category-drawer-card__content {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
}

.category-drawer-card__info {
  background: #eee5d5;
  border-bottom: 1px solid color-mix(in srgb, var(--accent-strong) 14%, transparent);
  min-height: 6rem;
  padding: .85rem 1rem .65rem;
}

.category-drawer-card__name {
  color: var(--ink);
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 1.05rem;
  font-weight: 800;
  line-height: 1.25;
  margin: 0 0 .25rem;
}

.category-drawer-card__desc {
  color: var(--muted);
  font-size: .82rem;
  line-height: 1.4;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* ── Card Footer / Action Button ────────────────────── */
.category-drawer-card__footer {
  align-items: center;
  background: color-mix(in srgb, var(--accent) 10%, transparent);
  border-top: 1px solid var(--line);
  display: flex;
  justify-content: space-between;
  min-height: 2.25rem;
  padding: .45rem 1rem;
  transition: background-color .2s ease, color .2s ease;
}

.category-drawer-card__action-text {
  color: var(--accent-strong);
  font-size: .8rem;
  font-weight: 700;
}

.category-drawer-card__action-arrow {
  color: var(--accent-strong);
  font-size: .75rem;
  transition: transform .2s ease;
}

/* ── Pointer Triangle on Desktop ────────────────────── */
.category-drawer-card__pointer {
  display: none;
}

@keyframes drawers-enter {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ── Tablet: 2 Columns ──────────────────────────────── */
@media (max-width: 900px) {
  .category-drawers-section {
    padding: 1.25rem;
    margin-bottom: 1.5rem;
  }

  .category-drawers__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: .85rem;
  }
}

/* ── Mobile: 2 Compact Columns ──────────────────────── */
@media (max-width: 560px) {
  .category-drawers-section {
    border-radius: 1rem;
    padding: 1rem .85rem;
    margin-bottom: 1.25rem;
  }

  .category-drawers__title {
    font-size: 1.15rem;
  }

  .category-drawers__subtitle {
    font-size: .82rem;
  }

  .category-drawers__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: .65rem;
  }

  .category-drawer-card__image-container {
    aspect-ratio: 4 / 3;
  }

  .category-drawer-card__info {
    min-height: 4.25rem;
    padding: .65rem .65rem .45rem;
  }

  .category-drawer-card__name {
    font-size: .88rem;
  }

  .category-drawer-card__desc {
    display: none; /* Keep mobile cards clean and compact */
  }

  .category-drawer-card__badge {
    font-size: .62rem;
    left: .4rem;
    top: .4rem;
    padding: .15rem .4rem;
  }

  .category-drawer-card__open-pill {
    font-size: .62rem;
    right: .4rem;
    top: .4rem;
    padding: .15rem .4rem;
  }

  .category-drawer-card__footer {
    min-height: 2rem;
    padding: .35rem .65rem;
  }

  .category-drawer-card__action-text {
    font-size: .72rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .category-drawers-section,
  .category-drawer-card,
  .category-drawer-card__image {
    transition: none !important;
    animation: none !important;
  }
}
</style>

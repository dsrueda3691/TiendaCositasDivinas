<template>
  <article class="product-card" @click="openDetails">
    <div class="product-card__image-container">
      <img
        :src="product.imagen"
        :alt="product.nombre"
        class="product-card__image"
        loading="lazy"
        decoding="async"
      />
    </div>
    <div class="product-card__content">
      <div class="product-card__meta">
        <span class="product-card__category">{{ product.categoria }}</span>
        <span class="product-card__availability">Disponible</span>
      </div>
      <h2>{{ product.nombre }}</h2>
      <p>{{ product.descripcion }}</p>
      <div class="product-card__footer">
        <strong>{{ formatPrice(product.precio) }}</strong>
        <button
          class="product-card__details-button"
          type="button"
          aria-label="Ver detalles del producto"
          @click.stop="openDetails"
        >
          Detalles <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  </article>

  <Teleport to="body">
    <Transition name="details-sheet">
      <div v-if="isDetailsOpen" class="details-overlay" @click.self="closeDetails">
        <aside
          class="details-panel"
          role="dialog"
          aria-modal="true"
          :aria-labelledby="`details-title-${product.id}`"
        >
          <!-- Handle bar for mobile bottom-sheet -->
          <div class="details-panel__handle" aria-hidden="true"></div>

          <button
            class="details-panel__close"
            type="button"
            aria-label="Cerrar detalles"
            @click="closeDetails"
          >
            ×
          </button>

          <div class="details-panel__image-wrap">
            <img
              :src="product.imagen"
              :alt="product.nombre"
              class="details-panel__image"
              decoding="async"
            />
          </div>

          <div class="details-panel__content">
            <span class="product-card__category">{{ product.categoria }}</span>
            <h2 :id="`details-title-${product.id}`">{{ product.nombre }}</h2>
            <p>{{ product.descripcion }}</p>
            <strong class="details-panel__price">{{ formatPrice(product.precio) }}</strong>

            <dl class="details-panel__facts">
              <div>
                <dt>Referencia</dt>
                <dd>#CD-{{ String(product.id).padStart(3, '0') }}</dd>
              </div>
              <div>
                <dt>Categoría</dt>
                <dd>{{ product.categoria }}</dd>
              </div>
            </dl>

            <p class="details-panel__note">
              Consulta disponibilidad y pedidos directamente con la Parroquia de la Santa Cruz.
            </p>
          </div>
        </aside>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { onBeforeUnmount, ref, watch } from 'vue'

defineProps({
  product: { type: Object, required: true },
})

const isDetailsOpen = ref(false)

function openDetails() {
  isDetailsOpen.value = true
}

function closeDetails() {
  isDetailsOpen.value = false
}

// Lock scroll without screen jumps
watch(isDetailsOpen, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

onBeforeUnmount(() => {
  document.body.style.overflow = ''
})

const formatPrice = (price) =>
  new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(price)
</script>

<style>
/* ── Product Card ───────────────────────────────────── */
.product-card {
  background: var(--surface);
  border-radius: 1rem;
  border: 1px solid var(--line);
  box-shadow: 0 4px 16px rgba(48, 47, 43, .05);
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  cursor: pointer;
  transition: transform .25s cubic-bezier(0.16, 1, 0.3, 1),
              box-shadow .25s cubic-bezier(0.16, 1, 0.3, 1),
              border-color .2s ease;
  user-select: none;
}

@media (hover: hover) {
  .product-card:hover {
    box-shadow: 0 12px 28px rgba(48, 47, 43, .12);
    transform: translateY(-4px);
    border-color: color-mix(in srgb, var(--accent) 40%, transparent);
  }

  .product-card:hover .product-card__image {
    transform: scale(1.04);
  }
}

.product-card:active {
  transform: scale(.98);
}

.product-card__image-container {
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background: var(--canvas);
  position: relative;
}

.product-card__image {
  display: block;
  height: 100%;
  width: 100%;
  object-fit: cover;
  transition: transform .35s cubic-bezier(0.16, 1, 0.3, 1);
}

.product-card__content {
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 1rem;
}

.product-card__meta {
  align-items: center;
  display: flex;
  justify-content: space-between;
}

.product-card__content h2 {
  font-size: 1.05rem;
  font-weight: 700;
  margin: .4rem 0;
  line-height: 1.3;
}

.product-card__content p {
  color: var(--muted);
  font-size: .88rem;
  line-height: 1.45;
  margin: 0 0 .75rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-card__content strong {
  color: var(--accent-strong);
  font-size: 1.05rem;
  font-weight: 800;
}

.product-card__category {
  color: var(--muted);
  font-size: .72rem;
  font-weight: 700;
  letter-spacing: .04em;
  text-transform: uppercase;
}

.product-card__availability {
  background: var(--soft-accent);
  border-radius: 999px;
  color: var(--accent-strong);
  font-size: .68rem;
  font-weight: 700;
  padding: .25rem .5rem;
}

.product-card__footer {
  align-items: center;
  display: flex;
  gap: .5rem;
  justify-content: space-between;
  margin-top: auto;
  padding-top: .4rem;
}

.product-card__details-button {
  align-items: center;
  background: transparent;
  border: 1px solid var(--accent);
  border-radius: .5rem;
  color: var(--accent-strong);
  cursor: pointer;
  display: inline-flex;
  font: inherit;
  font-size: .82rem;
  font-weight: 700;
  gap: .3rem;
  min-height: 2.5rem;
  padding: .45rem .75rem;
  transition: background-color .2s ease, color .2s ease, transform .15s ease;
}

.product-card__details-button:active {
  background: var(--accent);
  color: #fff;
  transform: scale(.95);
}

@media (hover: hover) {
  .product-card__details-button:hover {
    background: var(--accent);
    color: #fff;
  }
}

/* ── Details Panel — Overlay ────────────────────────── */
.details-overlay {
  position: fixed;
  inset: 0;
  background: rgba(44, 42, 40, .5);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  display: flex;
  justify-content: flex-end;
  align-items: stretch;
  z-index: 999;
}

.details-panel {
  background: var(--surface);
  box-shadow: -10px 0 35px rgba(44, 42, 40, .2);
  max-width: 28rem;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior-y: contain;
  padding: 1.5rem;
  position: relative;
  width: min(100%, 28rem);
  display: flex;
  flex-direction: column;
}

.details-panel__handle {
  display: none;
}

.details-panel__close {
  align-items: center;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 50%;
  color: var(--ink);
  cursor: pointer;
  display: flex;
  font-size: 1.5rem;
  height: 2.5rem;
  justify-content: center;
  line-height: 1;
  position: absolute;
  right: 1.25rem;
  top: 1.25rem;
  width: 2.5rem;
  z-index: 2;
  transition: background-color .2s ease, transform .15s ease;
}

.details-panel__close:active {
  transform: scale(.9);
}

.details-panel__image-wrap {
  border-radius: .85rem;
  overflow: hidden;
  background: var(--canvas);
}

.details-panel__image {
  display: block;
  height: 16rem;
  object-fit: cover;
  width: 100%;
}

.details-panel__content {
  padding: 1.25rem 0 0;
  display: flex;
  flex-direction: column;
  gap: .5rem;
}

.details-panel__content h2 {
  font-size: 1.5rem;
  line-height: 1.25;
  margin: .25rem 0;
}

.details-panel__content p {
  color: var(--muted);
  line-height: 1.55;
  margin: 0;
}

.details-panel__price {
  color: var(--accent-strong);
  font-size: 1.4rem;
  font-weight: 800;
  margin: .35rem 0;
  display: block;
}

.details-panel__facts {
  border-bottom: 1px solid var(--line);
  border-top: 1px solid var(--line);
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(2, 1fr);
  margin: 1rem 0;
  padding: 1rem 0;
}

.details-panel__facts div { display: grid; gap: .2rem; }
.details-panel__facts dt { color: var(--muted); font-size: .75rem; font-weight: 700; text-transform: uppercase; }
.details-panel__facts dd { font-size: .95rem; font-weight: 600; margin: 0; }

.details-panel__note {
  background: var(--soft-accent);
  border-left: 3px solid var(--accent);
  border-radius: 0 .5rem .5rem 0;
  font-size: .88rem;
  padding: .75rem;
  color: var(--ink) !important;
}

/* ── Ultra Smooth Transition (Desktop & Mobile) ─────── */
.details-sheet-enter-active,
.details-sheet-leave-active {
  transition: opacity 0.32s cubic-bezier(0.16, 1, 0.3, 1),
              backdrop-filter 0.32s cubic-bezier(0.16, 1, 0.3, 1);
}

.details-sheet-enter-active .details-panel,
.details-sheet-leave-active .details-panel {
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1),
              opacity 0.25s ease;
}

/* Desktop entry / exit */
.details-sheet-enter-from,
.details-sheet-leave-to {
  opacity: 0;
  backdrop-filter: blur(0px);
  -webkit-backdrop-filter: blur(0px);
}

.details-sheet-enter-from .details-panel,
.details-sheet-leave-to .details-panel {
  transform: translateX(100%);
  opacity: 0.8;
}

.details-sheet-enter-to .details-panel,
.details-sheet-leave-from .details-panel {
  transform: translateX(0);
  opacity: 1;
}

/* ── Mobile: Bottom Sheet ───────────────────────────── */
@media (max-width: 560px) {
  .details-overlay {
    align-items: flex-end;
    justify-content: stretch;
  }

  .details-panel {
    border-radius: 1.5rem 1.5rem 0 0;
    box-shadow: 0 -8px 32px rgba(44, 42, 40, .22);
    max-height: 90vh;
    max-width: 100%;
    width: 100%;
    padding: .75rem 1.25rem 2rem;
  }

  .details-panel__handle {
    display: block;
    width: 3rem;
    height: .32rem;
    background: var(--line);
    border-radius: 999px;
    margin: 0 auto .75rem;
  }

  .details-panel__image {
    height: 13rem;
  }

  /* Mobile entry / exit: bottom slide */
  .details-sheet-enter-from .details-panel,
  .details-sheet-leave-to .details-panel {
    transform: translateY(100%) !important;
    opacity: 1 !important;
  }

  .details-sheet-enter-to .details-panel,
  .details-sheet-leave-from .details-panel {
    transform: translateY(0) !important;
    opacity: 1 !important;
  }

  .product-card__content {
    padding: .85rem;
  }

  .product-card__content h2 { font-size: .95rem; }
  .product-card__content p { font-size: .82rem; margin-bottom: .5rem; }
  .product-card__content strong { font-size: .95rem; }

  .product-card__details-button {
    font-size: .78rem;
    padding: .4rem .65rem;
    min-height: 2.25rem;
  }
}

/* ── Reduced motion ─────────────────────────────────── */
@media (prefers-reduced-motion: reduce) {
  .product-card,
  .product-card__image,
  .product-card__details-button,
  .details-sheet-enter-active,
  .details-sheet-leave-active,
  .details-sheet-enter-active .details-panel,
  .details-sheet-leave-active .details-panel {
    transition: none !important;
  }
}
</style>

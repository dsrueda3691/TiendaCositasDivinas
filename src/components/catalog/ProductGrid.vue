<template>
  <div class="product-grid">
    <ProductCard
      v-for="(product, index) in products"
      :key="product.id"
      :product="product"
      class="product-grid__item"
      :style="{ '--product-delay': `${Math.min(index * 28, 220)}ms` }"
    />
    <p v-if="!products.length" class="product-grid__empty">No hay productos en esta categoría.</p>
  </div>
</template>

<script setup>
import ProductCard from './ProductCard.vue'

defineProps({
  products: { type: Array, required: true },
})
</script>

<style>
.product-grid {
  display: grid;
  gap: 1.25rem;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  width: 100%;
}

.product-grid__empty {
  color: var(--muted);
  grid-column: 1 / -1;
  padding: 3rem 1rem;
  text-align: center;
  font-size: 1rem;
}

/* ── Card staggered cascade ─────────────────────────── */
.product-grid__item {
  animation: card-enter .32s cubic-bezier(0.16, 1, 0.3, 1) both;
  animation-delay: var(--product-delay, 0ms);
  will-change: transform, opacity;
}

@keyframes card-enter {
  from {
    opacity: 0;
    transform: translateY(14px) scale(.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* ── Tablet: 2 columns ──────────────────────────────── */
@media (max-width: 900px) {
  .product-grid {
    gap: 1rem;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

/* ── Phone: 2 columns, tighter gap ──────────────────── */
@media (max-width: 560px) {
  .product-grid {
    gap: .65rem;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (prefers-reduced-motion: reduce) {
  .product-grid__item {
    animation: none !important;
  }
}
</style>

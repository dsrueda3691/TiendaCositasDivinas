<template>
  <div class="cuadricula-productos">
    <ProductCard
      v-for="(producto, indice) in products"
      :key="producto.id"
      :product="producto"
      class="cuadricula-productos__articulo"
      :style="{ '--retraso-producto': `${Math.min(indice * 28, 220)}ms` }"
      @add-to-cart="$emit('add-to-cart', $event)"
      @set-cart-quantity="$emit('set-cart-quantity', $event)"
    />
    <p v-if="!products.length" class="cuadricula-productos__vacio">
      No hay productos en esta categoría.
    </p>
  </div>
</template>

<script setup>
import ProductCard from './ProductCard.vue'

defineProps({
  products: { type: Array, required: true },
})

defineEmits(['add-to-cart', 'set-cart-quantity'])
</script>

<style>
.cuadricula-productos {
  display: grid;
  gap: 1.25rem;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  width: 100%;
}

.cuadricula-productos__vacio {
  color: var(--muted);
  grid-column: 1 / -1;
  padding: 3rem 1rem;
  text-align: center;
  font-size: 1rem;
}

/* ── Entrada en cascada escalonada ──────────────────── */
.cuadricula-productos__articulo {
  animation: animacion-entrada-tarjeta .32s cubic-bezier(0.16, 1, 0.3, 1) both;
  animation-delay: var(--retraso-producto, 0ms);
  will-change: transform, opacity;
}

@keyframes animacion-entrada-tarjeta {
  from {
    opacity: 0;
    transform: translateY(14px) scale(.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* ── Tablet: 2 columnas ──────────────────────────────── */
@media (max-width: 900px) {
  .cuadricula-productos {
    gap: 1rem;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

/* ── Teléfono: 2 columnas compactas ──────────────────── */
@media (max-width: 560px) {
  .cuadricula-productos {
    gap: .65rem;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (prefers-reduced-motion: reduce) {
  .cuadricula-productos__articulo {
    animation: none !important;
  }
}
</style>

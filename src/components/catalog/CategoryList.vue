<template>
  <div class="category-list" aria-label="Filtrar por categoría">
    <button
      v-for="category in categories"
      :key="category"
      class="category-list__button"
      :class="{ 'category-list__button--active': category === selectedCategory }"
      type="button"
      @click="$emit('select', category)"
    >
      {{ category }}
    </button>
  </div>
</template>

<script setup>
defineProps({
  categories: { type: Array, required: true },
  selectedCategory: { type: String, required: true },
})

defineEmits(['select'])
</script>

<style>
.category-list { animation: section-enter .4s ease-out both; display: flex; flex-wrap: wrap; gap: .75rem; margin-bottom: 1.5rem; }
.category-list__button { background: var(--surface); border: 1px solid var(--line); border-radius: 999px; color: var(--muted); cursor: pointer; padding: .65rem 1rem; transition: background-color .2s ease, border-color .2s ease, color .2s ease, transform .2s ease; }
.category-list__button:hover { border-color: var(--accent); color: var(--accent-strong); transform: translateY(-1px); }
.category-list__button--active { background: var(--accent); border-color: var(--accent); color: #fff; }

@keyframes section-enter {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (prefers-reduced-motion: reduce) {
  .category-list { animation: none; }
}
</style>

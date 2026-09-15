<template>
  <label class="sort-select">
    <span>Ordenar por</span>
    <select :value="selectedSort" @change="$emit('select', $event.target.value)">
      <option value="default">Recomendados</option>
      <option value="price-asc">Menor precio</option>
      <option value="price-desc">Mayor precio</option>
      <option value="name-asc">Nombre: A a Z</option>
      <option value="name-desc">Nombre: Z a A</option>
    </select>
  </label>
</template>

<script setup>
defineProps({
  selectedSort: { type: String, required: true },
})

defineEmits(['select'])
</script>

<style>
.sort-select { align-items: center; color: var(--muted); display: flex; font-size: .85rem; font-weight: 700; gap: .6rem; white-space: nowrap; }
.sort-select select { appearance: none; background: var(--surface); border: 1px solid var(--line); border-radius: .5rem; color: var(--ink); cursor: pointer; font: inherit; font-weight: 600; padding: .65rem 2.25rem .65rem .75rem; }
.sort-select select:focus { border-color: var(--accent); outline: 2px solid var(--soft-accent); outline-offset: 2px; }

@media (max-width: 560px) {
  .sort-select { align-items: flex-start; flex-direction: column; gap: .35rem; }
  .sort-select select { width: 100%; }
}
</style>

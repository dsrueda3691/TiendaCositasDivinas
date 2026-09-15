<template>
  <section id="categorias" class="catalog-filters" aria-label="Filtros del catálogo">
    <div class="catalog-filters__categories hide-scrollbar" role="group" aria-label="Filtrar por categoría">
      <button
        v-for="category in categories"
        :key="category"
        class="catalog-filters__category"
        :class="{ 'catalog-filters__category--active': category === selectedCategory }"
        type="button"
        @click="$emit('select-category', category)"
      >
        <span class="catalog-filters__dot" aria-hidden="true"></span>
        {{ category }}
      </button>
    </div>

    <div class="catalog-filters__sort-row">
      <label class="catalog-filters__sort">
        <span>Ordenar por</span>
        <select :value="selectedSort" @change="$emit('select-sort', $event.target.value)">
          <option value="default">Recomendados</option>
          <option value="price-asc">Menor precio</option>
          <option value="price-desc">Mayor precio</option>
          <option value="name-asc">Nombre: A a Z</option>
          <option value="name-desc">Nombre: Z a A</option>
        </select>
      </label>
    </div>
  </section>
</template>

<script setup>
defineProps({
  categories: { type: Array, required: true },
  selectedCategory: { type: String, required: true },
  selectedSort: { type: String, required: true },
})

defineEmits(['select-category', 'select-sort'])
</script>

<style>
.catalog-filters {
  animation: filters-enter .3s ease-out both;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: .9rem;
  box-shadow: 0 4px 16px rgba(44, 42, 40, .04);
  display: flex;
  flex-direction: column;
  gap: .75rem;
  margin-bottom: 1.5rem;
  padding: .85rem 1rem;
}

/* ── Categories ─────────────────────────────────────── */
.catalog-filters__categories {
  display: flex;
  flex-wrap: wrap;
  gap: .5rem;
}

.catalog-filters__category {
  align-items: center;
  background: var(--canvas);
  border: 1px solid transparent;
  border-radius: .65rem;
  color: var(--muted);
  cursor: pointer;
  display: inline-flex;
  font: inherit;
  font-size: .88rem;
  font-weight: 700;
  gap: .45rem;
  min-height: 2.5rem;
  padding: .5rem .85rem;
  transition: all .22s cubic-bezier(0.16, 1, 0.3, 1);
  user-select: none;
}

.catalog-filters__dot {
  background: var(--line);
  border-radius: 50%;
  flex-shrink: 0;
  height: .45rem;
  transition: background-color .2s ease, transform .2s ease;
  width: .45rem;
}

@media (hover: hover) {
  .catalog-filters__category:hover {
    background: var(--soft-accent);
    color: var(--accent-strong);
    border-color: color-mix(in srgb, var(--accent) 20%, transparent);
  }
}

.catalog-filters__category:active {
  transform: scale(.94);
}

.catalog-filters__category--active {
  background: var(--accent) !important;
  border-color: var(--accent) !important;
  color: #fff !important;
  box-shadow: 0 4px 12px rgba(138, 93, 73, .28);
}

.catalog-filters__category--active .catalog-filters__dot {
  background: #fff;
  transform: scale(1.2);
}

/* ── Sort ────────────────────────────────────────────── */
.catalog-filters__sort-row {
  display: flex;
  justify-content: flex-end;
}

.catalog-filters__sort {
  align-items: center;
  color: var(--muted);
  display: flex;
  font-size: .78rem;
  font-weight: 700;
  gap: .55rem;
}

.catalog-filters__sort select {
  appearance: none;
  background: var(--canvas);
  border: 1px solid var(--line);
  border-radius: .45rem;
  color: var(--ink);
  cursor: pointer;
  font: inherit;
  font-weight: 700;
  min-height: 2.5rem;
  padding: .45rem 1.8rem .45rem .65rem;
  transition: border-color .2s ease;
}

.catalog-filters__sort select:focus {
  border-color: var(--accent);
  outline: 2px solid var(--soft-accent);
  outline-offset: 2px;
}

@keyframes filters-enter {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ── Mobile: horizontal scroll categories ───────────── */
@media (max-width: 560px) {
  .catalog-filters {
    border-radius: .75rem;
    gap: .5rem;
    padding: .65rem .75rem;
  }

  .catalog-filters__categories {
    flex-wrap: nowrap;
    gap: .4rem;
    overflow-x: auto;
    -ms-overflow-style: none;
    padding-bottom: .25rem;
    scrollbar-width: none;
  }
  .catalog-filters__categories::-webkit-scrollbar { display: none; }

  .catalog-filters__category {
    border-radius: 999px;
    flex-shrink: 0;
    font-size: .82rem;
    padding: .5rem .85rem;
    white-space: nowrap;
  }

  .catalog-filters__sort-row {
    justify-content: stretch;
  }

  .catalog-filters__sort {
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
  }

  .catalog-filters__sort select {
    flex: 1;
    font-size: .82rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .catalog-filters { animation: none; }
}
</style>

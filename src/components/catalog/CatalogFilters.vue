<template>
  <section id="categorias" class="seccion-cajones-categorias" aria-label="Cajones de categorías">
    <div class="cajones-categorias__encabezado">
      <div>
        <span class="cajones-categorias__antetitulo">Categorías de la Tienda</span>
        <h2 class="cajones-categorias__titulo">Articulos Por Categorías</h2>
      </div>
      <p class="cajones-categorias__subtitulo">
        Toca cualquier Categoria para desplegar su colección de productos.
      </p>
    </div>

    
    <div class="cajones-categorias__cuadricula" role="group" aria-label="Cajones de categorías">
      <article
        v-for="cajon in categoryDrawers"
        :key="cajon.id"
        class="tarjeta-cajon-categoria"
        :class="{
          'tarjeta-cajon-categoria--activa': cajon.nombre === selectedCategory && isDrawerOpen,
        }"
        :aria-expanded="cajon.nombre === selectedCategory && isDrawerOpen"
        tabindex="0"
        role="button"
        @click="manejarClicCajon(cajon.nombre)"
        @keydown.enter="manejarClicCajon(cajon.nombre)"
        @keydown.space.prevent="manejarClicCajon(cajon.nombre)"
      >
        <div class="tarjeta-cajon-categoria__contenedor-imagen">
          <img
            :src="cajon.imagen"
            :alt="cajon.titulo"
            class="tarjeta-cajon-categoria__imagen"
            loading="lazy"
            decoding="async"
          />
          <span class="tarjeta-cajon-categoria__insignia">{{ cajon.etiqueta }}</span>

          <span
            v-if="cajon.nombre === selectedCategory && isDrawerOpen"
            class="tarjeta-cajon-categoria__pildora-abierto"
          >
            Abierto
          </span>
        </div>

        <div class="tarjeta-cajon-categoria__contenido">
          <div class="tarjeta-cajon-categoria__informacion">
            <h3 class="tarjeta-cajon-categoria__nombre">{{ cajon.titulo }}</h3>
            <p class="tarjeta-cajon-categoria__descripcion">{{ cajon.descripcion }}</p>
          </div>

          <div class="tarjeta-cajon-categoria__pie">
            <span class="tarjeta-cajon-categoria__texto-accion">
              {{ cajon.nombre === selectedCategory && isDrawerOpen ? 'Categoría desplegada' : 'Desplegar Categoria' }}
            </span>
            <span class="tarjeta-cajon-categoria__flecha-accion" aria-hidden="true">
              {{ cajon.nombre === selectedCategory && isDrawerOpen ? '▲' : '▼' }}
            </span>
          </div>
        </div>
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

function manejarClicCajon(categoria) {
  if (categoria === props.selectedCategory) {
    emit('toggle-drawer')
  } else {
    emit('select-category', categoria)
  }
}
</script>

<style>
/* ── Sección de Cajones de Categorías ───────────────── */
.seccion-cajones-categorias {
  animation: animacion-entrada-cajones .35s ease-out both;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 1.25rem;
  box-shadow: 0 4px 20px rgba(44, 42, 40, .05);
  margin-bottom: 2rem;
  padding: 1.5rem;
}

.cajones-categorias__encabezado {
  display: flex;
  flex-direction: column;
  gap: .25rem;
  margin-bottom: 1.25rem;
}

.cajones-categorias__antetitulo {
  color: var(--accent);
  font-size: .75rem;
  font-weight: 800;
  letter-spacing: .08em;
  text-transform: uppercase;
}

.cajones-categorias__titulo {
  font-size: 1.35rem;
  font-weight: 800;
  line-height: 1.2;
  margin: .2rem 0;
  color: var(--ink);
}

.cajones-categorias__subtitulo {
  color: var(--muted);
  font-size: .92rem;
  margin: 0;
}

/* ── Cuadrícula de Tarjetas de Cajón ────────────────── */
.cajones-categorias__cuadricula {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

/* ── Tarjeta de Cajón ───────────────────────────────── */
.tarjeta-cajon-categoria {
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

@media (hover: hover) {
  .tarjeta-cajon-categoria:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 24px rgba(44, 42, 40, .1);
    border-color: color-mix(in srgb, var(--accent) 40%, transparent);
  }

  .tarjeta-cajon-categoria:hover .tarjeta-cajon-categoria__imagen {
    transform: scale(1.06);
  }
}

.tarjeta-cajon-categoria:active {
  transform: scale(.97);
}

/* Estado activo / abierto */
.tarjeta-cajon-categoria--activa {
  background: #fff;
  border-color: var(--accent) !important;
  box-shadow: 0 8px 24px rgba(138, 93, 73, .22);
}

.tarjeta-cajon-categoria--activa .tarjeta-cajon-categoria__pie {
  background: var(--accent);
  color: #fff;
}

.tarjeta-cajon-categoria--activa .tarjeta-cajon-categoria__texto-accion,
.tarjeta-cajon-categoria--activa .tarjeta-cajon-categoria__flecha-accion {
  color: #fff;
  font-weight: 800;
}

/* ── Imagen e Insignias ─────────────────────────────── */
.tarjeta-cajon-categoria__contenedor-imagen {
  aspect-ratio: 16 / 10;
  background: #e7e2db;
  overflow: hidden;
  position: relative;
  width: 100%;
}

.tarjeta-cajon-categoria__imagen {
  display: block;
  height: 100%;
  object-fit: cover;
  transition: transform .35s cubic-bezier(0.16, 1, 0.3, 1);
  width: 100%;
}

.tarjeta-cajon-categoria__insignia {
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

.tarjeta-cajon-categoria__pildora-abierto {
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

/* ── Contenido de la Tarjeta ────────────────────────── */
.tarjeta-cajon-categoria__contenido {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
}

.tarjeta-cajon-categoria__informacion {
  padding: .85rem 1rem .65rem;
}

.tarjeta-cajon-categoria__nombre {
  color: var(--ink);
  font-size: 1.05rem;
  font-weight: 800;
  line-height: 1.25;
  margin: 0 0 .25rem;
}

.tarjeta-cajon-categoria__descripcion {
  color: var(--muted);
  font-size: .82rem;
  line-height: 1.4;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* ── Pie de la Tarjeta ──────────────────────────────── */
.tarjeta-cajon-categoria__pie {
  align-items: center;
  background: color-mix(in srgb, var(--accent) 40%, transparent);
  border-top: 1px solid var(--line);
  display: flex;
  justify-content: space-between;
  min-height: 2.25rem;
  padding: .45rem 1rem;
  transition: background-color .2s ease, color .2s ease;
}

.tarjeta-cajon-categoria__texto-accion {
  color: var(--accent-strong);
  font-size: .8rem;
  font-weight: 700;
}

.tarjeta-cajon-categoria__flecha-accion {
  color: var(--accent-strong);
  font-size: .75rem;
  transition: transform .2s ease;
}

@keyframes animacion-entrada-cajones {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ── Tablet: 2 Columnas ──────────────────────────────── */
@media (max-width: 900px) {
  .seccion-cajones-categorias {
    padding: 1.25rem;
    margin-bottom: 1.5rem;
  }

  .cajones-categorias__cuadricula {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: .85rem;
  }
}

/* ── Móvil: 2 Columnas Compactas ─────────────────────── */
@media (max-width: 560px) {
  .seccion-cajones-categorias {
    border-radius: 1rem;
    padding: 1rem .85rem;
    margin-bottom: 1.25rem;
  }

  .cajones-categorias__titulo {
    font-size: 1.15rem;
  }

  .cajones-categorias__subtitulo {
    font-size: .82rem;
  }

  .cajones-categorias__cuadricula {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: .65rem;
  }

  .tarjeta-cajon-categoria__contenedor-imagen {
    aspect-ratio: 4 / 3;
  }

  .tarjeta-cajon-categoria__informacion {
    padding: .65rem .65rem .45rem;
  }

  .tarjeta-cajon-categoria__nombre {
    font-size: .88rem;
  }

  .tarjeta-cajon-categoria__descripcion {
    display: none;
  }

  .tarjeta-cajon-categoria__insignia {
    font-size: .62rem;
    left: .4rem;
    top: .4rem;
    padding: .15rem .4rem;
  }

  .tarjeta-cajon-categoria__pildora-abierto {
    font-size: .62rem;
    right: .4rem;
    top: .4rem;
    padding: .15rem .4rem;
  }

  .tarjeta-cajon-categoria__pie {
    min-height: 2rem;
    padding: .35rem .65rem;
  }

  .tarjeta-cajon-categoria__texto-accion {
    font-size: .72rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .seccion-cajones-categorias,
  .tarjeta-cajon-categoria,
  .tarjeta-cajon-categoria__imagen {
    transition: none !important;
    animation: none !important;
  }
}
</style>

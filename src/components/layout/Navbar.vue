<template>
  <aside class="navbar">
    <a class="navbar__brand" href="#" aria-label="Tienda Cositas Divinas">
      <img :src="logo" alt="Logo de la Parroquia de la Santa Cruz" class="navbar__logo" />
      <div class="navbar__brand-text">
        <span class="navbar__store">Tienda Cositas Divinas</span>
        <span class="navbar__parish">Parroquia de la Santa Cruz</span>
      </div>
    </a>

    <section class="navbar__cart" aria-label="Carrito de compras">
      <div class="navbar__cart-heading">
        <div>
          <span class="navbar__cart-kicker">Tu selección</span>
          <h2>Carrito <span class="navbar__cart-count">{{ cartCount }}</span></h2>
        </div>
        <button
          v-if="cart.length"
          class="navbar__clear-button"
          type="button"
          @click="emit('clear-cart')"
        >
          Vaciar
        </button>
      </div>

      <p v-if="!cart.length" class="navbar__cart-empty">
        Agrega productos para consultar su disponibilidad por WhatsApp.
      </p>

      <TransitionGroup v-else name="cart-list" tag="ul" class="navbar__cart-list">
        <li v-for="item in cart" :key="item.id" class="navbar__cart-item">
          <img :src="item.imagen" :alt="item.nombre" />
          <div class="navbar__cart-item-info">
            <strong>{{ item.nombre }}</strong>
            <span>{{ item.quantity }} x {{ formatPrice(item.precio) }}</span>
          </div>
          <button
            class="navbar__remove-button"
            type="button"
            :aria-label="`Quitar ${item.nombre} del carrito`"
            @click="emit('remove-from-cart', item.id)"
          >
            ×
          </button>
        </li>
      </TransitionGroup>

      <a
        class="navbar__whatsapp"
        :class="{ 'navbar__whatsapp--disabled': !cart.length }"
        :href="whatsappUrl"
        :aria-disabled="!cart.length"
        target="_blank"
        rel="noopener noreferrer"
        @click="handleWhatsAppClick"
      >
        Consultar disponibilidad <span aria-hidden="true">↗</span>
      </a>
    </section>
  </aside>
</template>

<script setup>
import { computed } from 'vue'
import logo from '../../assets/logo.JPG'

const props = defineProps({
  cart: { type: Array, default: () => [] },
  cartCount: { type: Number, default: 0 },
})

const emit = defineEmits(['remove-from-cart', 'clear-cart'])

const whatsappUrl = computed(() => {
  const lines = props.cart.map((item) => `- ${item.nombre} (cantidad: ${item.quantity})`)
  const message = [
    'Hola, quisiera consultar la disponibilidad de estos productos:',
    ...lines,
    '',
    'Gracias.',
  ].join('\n')

  return `https://wa.me/573017705554?text=${encodeURIComponent(message)}`
})

function handleWhatsAppClick(event) {
  if (!props.cart.length) event.preventDefault()
}

const formatPrice = (price) =>
  new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(price)
</script>

<style>
/* ── Desktop sidebar ────────────────────────────────── */
.navbar {
  align-items: stretch;
  animation: navbar-enter .3s ease-out both;
  background: #fff;
  box-shadow: 10px 0 24px rgba(44, 42, 40, .07);
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
  height: 100vh;
  padding: 2rem 1.5rem;
  position: sticky;
  top: 0;
  overflow-y: auto;
  will-change: transform, opacity;
  z-index: 10;
}

.navbar__brand {
  align-items: center;
  border-bottom: 1px solid var(--line);
  color: var(--accent-strong);
  display: flex;
  flex-direction: column;
  font-weight: 800;
  gap: .35rem;
  padding-bottom: 1.5rem;
  text-align: center;
  transition: opacity .2s ease;
}

.navbar__brand-text {
  display: flex;
  flex-direction: column;
  gap: .15rem;
}

.navbar__logo {
  background: var(--surface);
  border: 2px solid var(--accent);
  border-radius: .75rem;
  box-shadow: 0 6px 16px rgba(44, 42, 40, .1);
  height: 8.5rem;
  object-fit: contain;
  padding: .25rem;
  width: 8.5rem;
  transition: transform .25s ease;
}

.navbar__store { font-size: 1.1rem; line-height: 1.2; }
.navbar__parish { color: var(--muted); font-size: .78rem; font-weight: 600; line-height: 1.35; }

.navbar__cart {
  background: var(--canvas);
  border: 1px solid var(--line);
  border-radius: .9rem;
  display: grid;
  gap: .9rem;
  padding: 1rem;
}

.navbar__cart-heading { align-items: start; display: flex; justify-content: space-between; gap: .5rem; }
.navbar__cart-kicker { color: var(--accent); font-size: .68rem; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; }
.navbar__cart h2 { font-size: 1.05rem; line-height: 1.2; margin: .2rem 0 0; }
.navbar__cart-count { background: var(--accent); border-radius: 999px; color: #fff; font-size: .7rem; padding: .16rem .42rem; vertical-align: .12rem; }
.navbar__clear-button, .navbar__remove-button { background: transparent; border: 0; color: var(--muted); cursor: pointer; font: inherit; font-size: .74rem; padding: .2rem; }
.navbar__clear-button:hover, .navbar__remove-button:hover { color: var(--accent-strong); }
.navbar__cart-empty { color: var(--muted); font-size: .8rem; line-height: 1.45; margin: 0; }
.navbar__cart-list { display: grid; gap: .65rem; list-style: none; margin: 0; max-height: 15rem; overflow-y: auto; padding: 0; }
.cart-list-enter-active,
.cart-list-leave-active,
.cart-list-move { transition: opacity .24s ease, transform .24s cubic-bezier(0.16, 1, 0.3, 1); }
.cart-list-enter-from { opacity: 0; transform: translateX(-10px); }
.cart-list-leave-to { opacity: 0; transform: translateX(10px); }
.cart-list-leave-active { position: absolute; width: calc(100% - 2rem); }
.navbar__cart-item { align-items: center; display: grid; gap: .5rem; grid-template-columns: 2.5rem minmax(0, 1fr) auto; }
.navbar__cart-item img { aspect-ratio: 1; border-radius: .4rem; object-fit: cover; width: 2.5rem; }
.navbar__cart-item-info { display: grid; gap: .15rem; min-width: 0; }
.navbar__cart-item-info strong { font-size: .76rem; line-height: 1.2; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.navbar__cart-item-info span { color: var(--muted); font-size: .7rem; }
.navbar__remove-button { font-size: 1.2rem; line-height: 1; }
.navbar__whatsapp { align-items: center; background: #168c4a; border-radius: .55rem; color: #fff; display: flex; font-size: .78rem; font-weight: 800; justify-content: space-between; min-height: 2.6rem; padding: .65rem .75rem; transition: background-color .2s ease, transform .15s ease; }
.navbar__whatsapp:hover { background: #11763d; }
.navbar__whatsapp:active { transform: scale(.98); }
.navbar__whatsapp--disabled { cursor: not-allowed; opacity: .5; }

.navbar__nav { display: grid; gap: .35rem; width: 100%; }

.navbar__nav a {
  border-radius: .55rem;
  color: var(--muted);
  font-size: .92rem;
  font-weight: 600;
  min-height: 2.75rem;
  display: flex;
  align-items: center;
  padding: .75rem 1rem;
  position: relative;
  transition: background-color .2s ease, color .2s ease, padding-left .2s ease, transform .15s ease;
}

@media (hover: hover) {
  .navbar__nav a:hover {
    background: var(--soft-accent);
    color: var(--accent-strong);
    padding-left: 1.2rem;
  }
}

.navbar__nav a:active {
  transform: scale(.98);
}

@keyframes navbar-enter {
  from { opacity: 0; transform: translateX(-12px); }
  to   { opacity: 1; transform: translateX(0); }
}

/* ── Mobile top bar ─────────────────────────────────── */
@media (max-width: 900px) {
  .navbar {
    animation: navbar-enter-mobile .3s ease-out both;
    box-shadow: 0 2px 14px rgba(44, 42, 40, .09);
    flex-direction: column;
    gap: .65rem;
    height: auto;
    padding: .85rem 1rem .65rem;
    position: sticky;
    top: 0;
    background: rgba(255, 255, 255, 0.96);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    z-index: 50;
  }

  .navbar__brand {
    align-items: center;
    border-bottom: none;
    flex-direction: row;
    gap: .85rem;
    padding-bottom: 0;
    text-align: left;
  }

  .navbar__brand-text {
    gap: .1rem;
  }

  /* Logo prominente en móvil */
  .navbar__logo {
    border: 2px solid var(--accent);
    border-radius: .7rem;
    box-shadow: 0 4px 12px rgba(44, 42, 40, .14);
    height: 4.2rem;
    width: 4.2rem;
    padding: .2rem;
    flex-shrink: 0;
  }

  .navbar__store {
    font-size: 1.05rem;
    font-weight: 800;
    line-height: 1.2;
  }

  .navbar__parish {
    font-size: .78rem;
    line-height: 1.25;
  }

  .navbar__cart {
    gap: .65rem;
    padding: .8rem;
  }

  .navbar__cart-list { max-height: 14rem; }
  .navbar__cart-item { grid-template-columns: 3rem minmax(0, 1fr) auto; }
  .navbar__cart-item img { width: 3rem; }
  .navbar__cart-item-info strong { font-size: .8rem; }
  .navbar__cart-item-info span { font-size: .74rem; }
  .navbar__whatsapp { min-height: 3rem; }

  .navbar__nav {
    display: flex;
    gap: .3rem;
    overflow-x: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;
    padding-bottom: .2rem;
  }
  .navbar__nav::-webkit-scrollbar { display: none; }

  .navbar__nav a {
    border-radius: 999px;
    flex-shrink: 0;
    font-size: .84rem;
    min-height: 2.5rem;
    padding: .5rem .95rem;
    text-align: center;
    white-space: nowrap;
    background: var(--canvas);
  }

  .navbar__nav a:active {
    background: var(--soft-accent);
    color: var(--accent-strong);
    transform: scale(.96);
  }
}

@keyframes navbar-enter-mobile {
  from { opacity: 0; transform: translateY(-8px); }
  to   { opacity: 1; transform: translateY(0); }
}

@media (prefers-reduced-motion: reduce) {
  .navbar { animation: none; }
}
</style>

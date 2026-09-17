<template>
  <aside class="navbar">
    <div class="navbar__top-bar">
      <!-- Marca con ambos logos -->
      <a class="navbar__brand" href="#" aria-label="Tienda Cositas Divinas">
        <div class="navbar__logos-container">
          <img :src="logo" alt="Logo Parroquia de la Santa Cruz" class="navbar__logo" />
          <img :src="logoEmaus" alt="Logo Emaús" class="navbar__logo navbar__logo--emaus" />
        </div>
        <div class="navbar__brand-text">
          <span class="navbar__store">Tienda Cositas Divinas</span>
          <span class="navbar__parish">Parroquia de la Santa Cruz</span>
        </div>
      </a>

      <button
        class="navbar__mobile-cart-btn"
        type="button"
        :aria-label="`Carrito de compras con ${cartCount} productos`"
        @click="openCart"
      >
        <svg
          class="navbar__mobile-cart-svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>

        <Transition name="badge-pop">
          <span
            v-if="cartCount > 0"
            :key="cartCount"
            class="navbar__mobile-cart-badge"
          >
            {{ cartCount }}
          </span>
        </Transition>
      </button>
    </div>

    <!-- Widget Carrito Desktop -->
    <div class="navbar__desktop-cart-widget" @click="openCart">
      <div class="navbar__desktop-cart-header">
        <div class="navbar__desktop-cart-icon-wrap">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          <span v-if="cartCount > 0" class="navbar__desktop-cart-badge">{{ cartCount }}</span>
        </div>
        <div class="navbar__desktop-cart-info">
          <span class="navbar__desktop-cart-title">Mi Carrito</span>
          <span class="navbar__desktop-cart-sub">
            {{ cartCount === 0 ? 'Vacío' : `${cartCount} artículos` }}
          </span>
        </div>
      </div>

      <div v-if="cartCount > 0" class="navbar__desktop-cart-total">
        <span>Total:</span>
        <strong>{{ formatPrice(cartTotal) }}</strong>
      </div>

      <button class="navbar__desktop-cart-btn" type="button" @click.stop="openCart">
        {{ cartCount > 0 ? 'Ver carrito / Comprar' : 'Abrir carrito' }}
      </button>
    </div>
  </aside>

  <CartDrawer />
</template>

<script setup>
import logo from '../../assets/logo.JPG'
import logoEmaus from '../../assets/EMAUS.jpeg'
import CartDrawer from '../cart/CartDrawer.vue'
import { useCart } from '../../composables/useCart'

const { cartCount, cartTotal, openCart, formatPrice } = useCart()
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
  gap: 1.5rem;
  height: 100vh;
  padding: 1.75rem 1.25rem;
  position: sticky;
  top: 0;
  overflow-y: auto;
  will-change: transform, opacity;
  z-index: 10;
}

.navbar__top-bar {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.navbar__brand {
  align-items: center;
  border-bottom: 1px solid var(--line);
  color: var(--accent-strong);
  display: flex;
  flex-direction: column;
  font-weight: 800;
  gap: .65rem;
  padding-bottom: 1.25rem;
  text-align: center;
  transition: opacity .2s ease;
}

/* Contenedor de doble logo */
.navbar__logos-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: .5rem;
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
  height: 7rem;
  object-fit: contain;
  padding: .25rem;
  width: 6rem;
  transition: transform .25s ease;
}

.navbar__logo--emaus {
  border-color: #b58a3a;
}

.navbar__store { font-size: 1.05rem; line-height: 1.2; }
.navbar__parish { color: var(--muted); font-size: .78rem; font-weight: 600; line-height: 1.35; }

/* Botón de carrito móvil: oculto en desktop */
.navbar__mobile-cart-btn {
  display: none;
}

/* ── Widget de Carrito para Desktop ─────────────────── */
.navbar__desktop-cart-widget {
  background: var(--canvas);
  border: 1px solid var(--line);
  border-radius: .85rem;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: .65rem;
  padding: .85rem;
  transition: border-color .2s ease, transform .2s ease, box-shadow .2s ease;
}

.navbar__desktop-cart-widget:hover {
  border-color: color-mix(in srgb, var(--accent) 50%, transparent);
  box-shadow: 0 4px 12px rgba(44, 42, 40, .06);
  transform: translateY(-2px);
}

.navbar__desktop-cart-header {
  align-items: center;
  display: flex;
  gap: .65rem;
}

.navbar__desktop-cart-icon-wrap {
  align-items: center;
  background: #fff;
  border: 1px solid var(--line);
  border-radius: 50%;
  color: var(--accent-strong);
  display: flex;
  height: 2.35rem;
  justify-content: center;
  position: relative;
  width: 2.35rem;
}

.navbar__desktop-cart-badge {
  background: var(--accent);
  border-radius: 999px;
  color: #fff;
  font-size: .65rem;
  font-weight: 800;
  padding: .1rem .35rem;
  position: absolute;
  right: -.25rem;
  top: -.25rem;
}

.navbar__desktop-cart-info {
  display: flex;
  flex-direction: column;
}

.navbar__desktop-cart-title {
  color: var(--ink);
  font-size: .88rem;
  font-weight: 800;
}

.navbar__desktop-cart-sub {
  color: var(--muted);
  font-size: .75rem;
}

.navbar__desktop-cart-total {
  align-items: center;
  border-top: 1px dashed var(--line);
  color: var(--ink);
  display: flex;
  font-size: .82rem;
  justify-content: space-between;
  padding-top: .45rem;
}

.navbar__desktop-cart-total strong {
  color: var(--accent-strong);
  font-size: .95rem;
}

.navbar__desktop-cart-btn {
  background: var(--accent);
  border: none;
  border-radius: .55rem;
  color: #fff;
  cursor: pointer;
  font: inherit;
  font-size: .78rem;
  font-weight: 700;
  min-height: 2.2rem;
  padding: .4rem;
  transition: background-color .2s ease;
  width: 100%;
}

.navbar__desktop-cart-btn:hover {
  background: var(--accent-strong);
}

/* ── Navegación ─────────────────────────────────────── */
.navbar__nav { display: grid; gap: .35rem; width: 100%; }

.navbar__nav a {
  border-radius: .55rem;
  color: var(--muted);
  font-size: .92rem;
  font-weight: 600;
  min-height: 2.6rem;
  display: flex;
  align-items: center;
  padding: .65rem 1rem;
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
    gap: .5rem;
    height: auto;
    padding: .65rem .85rem .5rem;
    position: sticky;
    top: 0;
    background: rgba(255, 255, 255, 0.96);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    z-index: 50;
  }

  .navbar__top-bar {
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
  }

  .navbar__brand {
    align-items: center;
    border-bottom: none;
    flex-direction: row;
    gap: .65rem;
    padding-bottom: 0;
    text-align: left;
  }

  .navbar__brand-text {
    gap: .05rem;
  }

  /* Logos más grandes y legibles en móviles (aumentado de 3.2rem a 4.2rem) */
  .navbar__logo {
    border: 2px solid var(--accent);
    border-radius: .6rem;
    box-shadow: 0 2px 8px rgba(44, 42, 40, .12);
    height: 4.2rem;
    width: 4.2rem;
    padding: .15rem;
    flex-shrink: 0;
  }

  .navbar__store {
    font-size: .95rem;
    font-weight: 800;
    line-height: 1.2;
  }

  .navbar__parish {
    font-size: .72rem;
    line-height: 1.2;
  }

  .navbar__desktop-cart-widget {
    display: none;
  }

  .navbar__mobile-cart-btn {
    align-items: center;
    background: var(--surface);
    border: 1.5px solid var(--line);
    border-radius: .75rem;
    box-shadow: 0 2px 8px rgba(44, 42, 40, .08);
    color: var(--accent-strong);
    cursor: pointer;
    display: flex;
    height: 3rem;
    justify-content: center;
    padding: 0;
    position: relative;
    width: 3rem;
    flex-shrink: 0;
    transition: transform .15s ease, background-color .15s ease, border-color .15s ease;
  }

  .navbar__mobile-cart-btn:active {
    background: var(--soft-accent);
    border-color: var(--accent);
    transform: scale(.92);
  }

  .navbar__mobile-cart-svg {
    stroke: var(--accent-strong);
  }

  .navbar__mobile-cart-badge {
    align-items: center;
    background: #d9534f;
    border: 2px solid #fff;
    border-radius: 999px;
    box-shadow: 0 2px 6px rgba(217, 83, 79, .4);
    color: #fff;
    display: flex;
    font-size: .68rem;
    font-weight: 900;
    height: 1.35rem;
    justify-content: center;
    min-width: 1.35rem;
    padding: 0 .25rem;
    position: absolute;
    right: -.35rem;
    top: -.35rem;
  }

  .badge-pop-enter-active {
    animation: badge-scale-in .25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }
  .badge-pop-leave-active {
    animation: badge-scale-out .15s ease-in;
  }

  @keyframes badge-scale-in {
    0% { transform: scale(0); opacity: 0; }
    80% { transform: scale(1.25); }
    100% { transform: scale(1); opacity: 1; }
  }

  @keyframes badge-scale-out {
    0% { transform: scale(1); opacity: 1; }
    100% { transform: scale(0); opacity: 0; }
  }

  .navbar__nav {
    display: flex;
    gap: .25rem;
    overflow-x: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;
    padding-bottom: .15rem;
    width: 100%;
  }
  .navbar__nav::-webkit-scrollbar { display: none; }

  .navbar__nav a {
    background: var(--canvas);
    border-radius: 999px;
    flex-shrink: 0;
    font-size: .78rem;
    min-height: 2.2rem;
    padding: .4rem .75rem;
    text-align: center;
    white-space: nowrap;
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
  .navbar,
  .badge-pop-enter-active,
  .badge-pop-leave-active {
    animation: none !important;
    transition: none !important;
  }
}
</style>
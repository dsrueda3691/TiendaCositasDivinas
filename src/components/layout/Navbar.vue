<template>
  <aside class="navbar">
    <div class="navbar__top-bar">
      <!-- Marca con ambos logos -->
      <a class="navbar__brand" href="#" aria-label="Tienda Todo con Amor">
        <div class="navbar__logos-container">
          <img :src="logo" alt="Logo Parroquia de la Santa Cruz" class="navbar__logo" />
          <img :src="logoEmaus" alt="Logo Emaús" class="navbar__logo navbar__logo--emaus" />
        </div>
        <div class="navbar__brand-text">
          <span class="navbar__store">Tienda Todo con Amor</span>
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

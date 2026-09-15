<script setup>
import { computed, ref } from 'vue'
import Navbar from './components/layout/Navbar.vue'
import CatalogView from './views/CatalogView.vue'


const cart = ref([])

const cartCount = computed(() =>
  cart.value.reduce((total, item) => total + item.quantity, 0),
)

function addToCart(product) {
  setCartQuantity({ product, quantity: 1 })
}

function setCartQuantity({ product, quantity }) {
  const existingItem = cart.value.find((item) => item.id === product.id)

  if (quantity <= 0) {
    removeFromCart(product.id)
    return
  }

  if (existingItem) {
    existingItem.quantity = quantity
    return
  }

  cart.value.push({ ...product, quantity })
}

function removeFromCart(productId) {
  cart.value = cart.value.filter((item) => item.id !== productId)
}

function clearCart() {
  cart.value = []
}
</script>

<template>
  <Navbar
    :cart="cart"
    :cart-count="cartCount"
    @remove-from-cart="removeFromCart"
    @clear-cart="clearCart"
  />
  <main class="app-content">
    <CatalogView
      @add-to-cart="addToCart"
      @set-cart-quantity="setCartQuantity"
    />
  </main>
</template>

<style>
#app {
  display: grid;
  grid-template-columns: 300px minmax(0, 1fr);
  min-height: 100vh;
  width: 100%;
}

.app-content {
  min-width: 0;
  width: 100%;
  overflow-y: visible;
}

@media (max-width: 900px) {
  #app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    height: auto;
  }

  .app-content {
    flex: 1;
    overflow-y: visible;
  }
}
</style>

<script setup>
import Navbar from './components/layout/Navbar.vue'
import CatalogView from './views/CatalogView.vue'
</script>

<template>
  <Navbar />
  <main class="app-content">
    <CatalogView />
  </main>
</template>

<style>
#app {
  display: grid;
  grid-template-columns: 250px minmax(0, 1fr);
  height: 100vh;
  overflow: hidden;
}

.app-content {
  min-width: 0;
  overflow: hidden;
}

@media (max-width: 900px) {
  #app {
    display: flex;
    flex-direction: column;
    height: auto;
    overflow: visible;
    overscroll-behavior-y: contain;
  }
  .app-content {
    overflow: visible;
    flex: 1;
  }
}
</style>

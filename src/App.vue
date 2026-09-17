<script setup>
import Navbar from './components/layout/Navbar.vue'
import CatalogView from './views/CatalogView.vue'
</script>

<template>
  <Navbar />
  <main class="contenido-aplicacion">
    <CatalogView />
  </main>
</template>

<style>
#app {
  display: grid;
  grid-template-columns: 280px minmax(0, 1fr);
  min-height: 100vh;
  width: 100%;
}

.contenido-aplicacion {
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

  .contenido-aplicacion {
    flex: 1;
    overflow-y: visible;
  }
}
</style>


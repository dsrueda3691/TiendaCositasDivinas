import { createApp } from 'vue'
import { inject } from '@vercel/analytics'
import { registerSW } from 'virtual:pwa-register'
import App from './App.vue'
import './assets/main.css'

// Registra el Service Worker para actualización automática offline
registerSW({ immediate: true })

inject()
createApp(App).mount('#app')
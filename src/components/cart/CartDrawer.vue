<template>
  <Teleport to="body">
    <Transition name="cart-drawer-anim">
      <div v-if="isCartOpen" class="cart-overlay" @click.self="closeCart">
        <aside
          class="cart-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Carrito de compras"
        >
          <!-- Barra de agarre para móvil -->
          <div class="cart-drawer__handle" aria-hidden="true"></div>

          <!-- Cabecera del carrito -->
          <div class="cart-drawer__header">
            <div class="cart-drawer__title-wrap">
              <span class="cart-drawer__eyebrow">Tu Selección</span>
              <h2 class="cart-drawer__title">
                Carrito
                <span v-if="cartCount > 0" class="cart-drawer__count-badge">{{ cartCount }}</span>
              </h2>
            </div>

            <div class="cart-drawer__header-actions">
              <button
                v-if="cart.length"
                class="cart-drawer__clear-btn"
                type="button"
                @click="clearCart"
              >
                Vaciar
              </button>
              <button
                class="cart-drawer__close-btn"
                type="button"
                aria-label="Cerrar carrito"
                @click="closeCart"
              >
                ✕
              </button>
            </div>
          </div>

          <!-- Contenido del carrito -->
          <div class="cart-drawer__body">
            <!-- Estado vacío -->
            <div v-if="!cart.length" class="cart-drawer__empty">
              <div class="cart-drawer__empty-icon" aria-hidden="true">🛒</div>
              <h3>Tu carrito está vacío</h3>
              <p>Agrega artículos del catálogo para consultar su disponibilidad y realizar tu pedido.</p>
              <button class="cart-drawer__explore-btn" type="button" @click="closeCart">
                Explorar catálogo
              </button>
            </div>

            <!-- Lista de productos -->
            <ul v-else class="cart-drawer__list">
              <li v-for="item in cart" :key="item.id" class="cart-drawer__item">
                <img :src="item.imagen" :alt="item.nombre" class="cart-drawer__item-img" />

                <div class="cart-drawer__item-details">
                  <div class="cart-drawer__item-top">
                    <span class="cart-drawer__item-cat">{{ item.categoria }}</span>
                    <button
                      class="cart-drawer__item-remove"
                      type="button"
                      :aria-label="`Eliminar ${item.nombre}`"
                      @click="removeFromCart(item.id)"
                    >
                      ✕
                    </button>
                  </div>

                  <strong class="cart-drawer__item-name">{{ item.nombre }}</strong>
                  <span class="cart-drawer__item-unit-price">
                    {{ formatPrice(item.precio) }} c/u
                  </span>

                  <div class="cart-drawer__item-bottom">
                    <!-- Controles de cantidad -->
                    <div class="cart-drawer__qty-control">
                      <button
                        type="button"
                        aria-label="Disminuir cantidad"
                        @click="updateQuantity(item.id, -1)"
                      >
                        −
                      </button>
                      <span class="cart-drawer__qty-value">{{ item.quantity }}</span>
                      <button
                        type="button"
                        aria-label="Aumentar cantidad"
                        @click="updateQuantity(item.id, 1)"
                      >
                        +
                      </button>
                    </div>

                    <!-- Subtotal del producto -->
                    <strong class="cart-drawer__item-subtotal">
                      {{ formatPrice(item.precio * item.quantity) }}
                    </strong>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <!-- Pie del carrito con resumen y botón de WhatsApp -->
          <div v-if="cart.length" class="cart-drawer__footer">
            <!-- Mensaje de apoyo a Emaús -->
            <div class="cart-drawer__mission-note">
              <span aria-hidden="true">✝</span>
              <span>
                Tu compra apoya al <strong>XII Retiro de Emaús Mujeres</strong>
              </span>
            </div>

            <!-- Total acumulado -->
            <div class="cart-drawer__total-row">
              <span class="cart-drawer__total-label">Total estimado:</span>
              <strong class="cart-drawer__total-price">{{ formatPrice(cartTotal) }}</strong>
            </div>

            <!-- Botón de WhatsApp -->
            <a
              class="cart-drawer__whatsapp-btn"
              :href="whatsappUrl"
              target="_blank"
              rel="noopener noreferrer"
              @click="handleWhatsAppOrder"
            >
              <!-- Icono oficial de WhatsApp -->
              <svg
                class="cart-drawer__whatsapp-icon"
                viewBox="0 0 24 24"
                width="22"
                height="22"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"
                />
              </svg>
              <span>Consultar disponibilidad / Comprar</span>
            </a>

            <!-- Botón para continuar viendo productos -->
            <button class="cart-drawer__keep-shopping-btn" type="button" @click="closeCart">
              Seguir explorando productos
            </button>
          </div>
        </aside>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { onBeforeUnmount, watch } from 'vue'
import { useCart } from '../../composables/useCart'

const {
  cart,
  cartCount,
  cartTotal,
  isCartOpen,
  updateQuantity,
  removeFromCart,
  clearCart,
  closeCart,
  formatPrice,
  whatsappUrl,
} = useCart()

// Bloquear scroll de fondo de forma limpia cuando el carrito está abierto
watch(isCartOpen, (open) => {
  if (open) {
    document.body.classList.add('details-open')
  } else {
    document.body.classList.remove('details-open')
  }
})

onBeforeUnmount(() => {
  document.body.classList.remove('details-open')
})

function handleWhatsAppOrder() {
  // Se mantiene el carrito o se puede consultar disponibilidad
}
</script>

<style>
/* ── Overlay del Carrito ────────────────────────────── */
.cart-overlay {
  position: fixed;
  inset: 0;
  background: rgba(44, 42, 40, .52);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  display: flex;
  justify-content: flex-end;
  align-items: stretch;
  z-index: 999;
}

/* ── Panel lateral en Desktop ───────────────────────── */
.cart-drawer {
  background: var(--surface);
  box-shadow: -10px 0 35px rgba(44, 42, 40, .22);
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-width: 440px;
  position: relative;
  width: 100%;
}

.cart-drawer__handle {
  display: none;
}

/* ── Cabecera ───────────────────────────────────────── */
.cart-drawer__header {
  align-items: center;
  border-bottom: 1px solid var(--line);
  display: flex;
  justify-content: space-between;
  padding: 1.25rem 1.5rem;
}

.cart-drawer__eyebrow {
  color: var(--accent);
  display: block;
  font-size: .7rem;
  font-weight: 800;
  letter-spacing: .08em;
  text-transform: uppercase;
}

.cart-drawer__title {
  align-items: center;
  color: var(--ink);
  display: flex;
  font-size: 1.35rem;
  font-weight: 800;
  gap: .5rem;
  margin: .15rem 0 0;
}

.cart-drawer__count-badge {
  background: var(--accent);
  border-radius: 999px;
  color: #fff;
  font-size: .75rem;
  font-weight: 800;
  padding: .15rem .55rem;
}

.cart-drawer__header-actions {
  align-items: center;
  display: flex;
  gap: .75rem;
}

.cart-drawer__clear-btn {
  background: transparent;
  border: none;
  color: var(--muted);
  cursor: pointer;
  font: inherit;
  font-size: .8rem;
  font-weight: 600;
  padding: .35rem .5rem;
  transition: color .2s ease;
}

.cart-drawer__clear-btn:hover {
  color: #d9534f;
}

.cart-drawer__close-btn {
  align-items: center;
  background: var(--canvas);
  border: 1px solid var(--line);
  border-radius: 50%;
  color: var(--ink);
  cursor: pointer;
  display: flex;
  font-size: 1.1rem;
  height: 2.25rem;
  justify-content: center;
  line-height: 1;
  width: 2.25rem;
  transition: all .15s ease;
}

.cart-drawer__close-btn:hover {
  background: var(--soft-accent);
}

.cart-drawer__close-btn:active {
  transform: scale(.9);
}

/* ── Cuerpo del Carrito ─────────────────────────────── */
.cart-drawer__body {
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding: 1.25rem 1.5rem;
}

/* Estado vacío */
.cart-drawer__empty {
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 4rem 1.5rem;
  text-align: center;
}

.cart-drawer__empty-icon {
  font-size: 3.5rem;
  margin-bottom: .75rem;
  opacity: .7;
}

.cart-drawer__empty h3 {
  color: var(--ink);
  font-size: 1.2rem;
  margin: 0 0 .5rem;
}

.cart-drawer__empty p {
  color: var(--muted);
  font-size: .88rem;
  line-height: 1.5;
  margin: 0 0 1.5rem;
  max-width: 280px;
}

.cart-drawer__explore-btn {
  background: var(--accent);
  border: none;
  border-radius: .6rem;
  color: #fff;
  cursor: pointer;
  font: inherit;
  font-size: .88rem;
  font-weight: 700;
  min-height: 2.6rem;
  padding: .6rem 1.25rem;
  transition: background-color .2s ease, transform .15s ease;
}

.cart-drawer__explore-btn:hover {
  background: var(--accent-strong);
}

.cart-drawer__explore-btn:active {
  transform: scale(.96);
}

/* ── Lista de Items ─────────────────────────────────── */
.cart-drawer__list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.cart-drawer__item {
  align-items: center;
  background: var(--canvas);
  border: 1px solid var(--line);
  border-radius: .85rem;
  display: flex;
  gap: .85rem;
  padding: .75rem;
  transition: transform .2s ease;
}

.cart-drawer__item-img {
  aspect-ratio: 1;
  border-radius: .6rem;
  height: 4.5rem;
  object-fit: cover;
  width: 4.5rem;
  flex-shrink: 0;
}

.cart-drawer__item-details {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: .2rem;
  min-width: 0;
}

.cart-drawer__item-top {
  align-items: center;
  display: flex;
  justify-content: space-between;
}

.cart-drawer__item-cat {
  color: var(--accent);
  font-size: .65rem;
  font-weight: 800;
  text-transform: uppercase;
}

.cart-drawer__item-remove {
  background: transparent;
  border: none;
  color: var(--muted);
  cursor: pointer;
  font-size: .95rem;
  line-height: 1;
  padding: .2rem;
  transition: color .2s ease;
}

.cart-drawer__item-remove:hover {
  color: #d9534f;
}

.cart-drawer__item-name {
  color: var(--ink);
  font-size: .88rem;
  font-weight: 700;
  line-height: 1.25;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.cart-drawer__item-unit-price {
  color: var(--muted);
  font-size: .75rem;
}

.cart-drawer__item-bottom {
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-top: .35rem;
}

/* Control de cantidad */
.cart-drawer__qty-control {
  align-items: center;
  background: #fff;
  border: 1px solid var(--line);
  border-radius: .45rem;
  display: flex;
}

.cart-drawer__qty-control button {
  align-items: center;
  background: transparent;
  border: none;
  color: var(--ink);
  cursor: pointer;
  display: flex;
  font-size: 1rem;
  font-weight: 700;
  height: 1.75rem;
  justify-content: center;
  line-height: 1;
  width: 1.75rem;
  transition: background-color .15s ease;
}

.cart-drawer__qty-control button:hover {
  background: var(--soft-accent);
}

.cart-drawer__qty-control button:active {
  transform: scale(.9);
}

.cart-drawer__qty-value {
  color: var(--ink);
  font-size: .85rem;
  font-weight: 800;
  min-width: 1.5rem;
  text-align: center;
}

.cart-drawer__item-subtotal {
  color: var(--accent-strong);
  font-size: .95rem;
  font-weight: 800;
}

/* ── Pie del Carrito ────────────────────────────────── */
.cart-drawer__footer {
  background: var(--surface);
  border-top: 1px solid var(--line);
  display: flex;
  flex-direction: column;
  gap: .85rem;
  padding: 1.25rem 1.5rem 1.5rem;
}

.cart-drawer__mission-note {
  align-items: center;
  background: var(--soft-accent);
  border-left: 3px solid var(--accent);
  border-radius: 0 .5rem .5rem 0;
  color: var(--ink);
  display: flex;
  font-size: .78rem;
  gap: .45rem;
  padding: .5rem .75rem;
}

.cart-drawer__total-row {
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding: .25rem 0;
}

.cart-drawer__total-label {
  color: var(--muted);
  font-size: 1rem;
  font-weight: 700;
}

.cart-drawer__total-price {
  color: var(--accent-strong);
  font-size: 1.45rem;
  font-weight: 800;
}

/* Botón destacado de WhatsApp */
.cart-drawer__whatsapp-btn {
  align-items: center;
  background: #25d366;
  border-radius: .75rem;
  box-shadow: 0 4px 14px rgba(37, 211, 102, .3);
  color: #fff;
  display: flex;
  font-size: .92rem;
  font-weight: 800;
  gap: .65rem;
  justify-content: center;
  min-height: 3.2rem;
  padding: .75rem 1.25rem;
  text-decoration: none;
  transition: background-color .2s ease, transform .15s ease, box-shadow .2s ease;
}

.cart-drawer__whatsapp-btn:hover {
  background: #1ea952;
  box-shadow: 0 6px 18px rgba(37, 211, 102, .4);
}

.cart-drawer__whatsapp-btn:active {
  transform: scale(.98);
}

.cart-drawer__whatsapp-icon {
  flex-shrink: 0;
}

.cart-drawer__keep-shopping-btn {
  background: transparent;
  border: 1px solid var(--line);
  border-radius: .6rem;
  color: var(--muted);
  cursor: pointer;
  font: inherit;
  font-size: .82rem;
  font-weight: 600;
  min-height: 2.4rem;
  padding: .5rem;
  transition: background-color .2s ease, color .2s ease;
}

.cart-drawer__keep-shopping-btn:hover {
  background: var(--canvas);
  color: var(--ink);
}

/* ── Animación de Entrada / Salida ──────────────────── */
.cart-drawer-anim-enter-active,
.cart-drawer-anim-leave-active {
  transition: opacity .3s cubic-bezier(0.16, 1, 0.3, 1),
              backdrop-filter .3s ease;
}

.cart-drawer-anim-enter-active .cart-drawer,
.cart-drawer-anim-leave-active .cart-drawer {
  transition: transform .35s cubic-bezier(0.16, 1, 0.3, 1);
}

/* Desktop: entra desde la derecha */
.cart-drawer-anim-enter-from,
.cart-drawer-anim-leave-to {
  opacity: 0;
  backdrop-filter: blur(0);
}

.cart-drawer-anim-enter-from .cart-drawer,
.cart-drawer-anim-leave-to .cart-drawer {
  transform: translateX(100%);
}

.cart-drawer-anim-enter-to .cart-drawer,
.cart-drawer-anim-leave-from .cart-drawer {
  transform: translateX(0);
}

/* ── Versión Móvil: Bottom Sheet ────────────────────── */
@media (max-width: 900px) {
  .cart-overlay {
    align-items: flex-end;
  }

  .cart-drawer {
    border-radius: 1.5rem 1.5rem 0 0;
    box-shadow: 0 -8px 32px rgba(44, 42, 40, .25);
    height: auto;
    max-height: 90vh;
    max-width: 100%;
  }

  .cart-drawer__handle {
    background: var(--line);
    border-radius: 999px;
    display: block;
    height: .32rem;
    margin: .75rem auto 0;
    width: 3rem;
  }

  .cart-drawer__header {
    padding: .85rem 1.25rem .75rem;
  }

  .cart-drawer__body {
    padding: 1rem 1.25rem;
  }

  .cart-drawer__footer {
    padding: 1rem 1.25rem 1.5rem;
  }

  /* Móvil: entra y sale deslizándose desde abajo */
  .cart-drawer-anim-enter-from .cart-drawer,
  .cart-drawer-anim-leave-to .cart-drawer {
    transform: translateY(100%) !important;
  }

  .cart-drawer-anim-enter-to .cart-drawer,
  .cart-drawer-anim-leave-from .cart-drawer {
    transform: translateY(0) !important;
  }
}

@media (prefers-reduced-motion: reduce) {
  .cart-drawer-anim-enter-active,
  .cart-drawer-anim-leave-active,
  .cart-drawer-anim-enter-active .cart-drawer,
  .cart-drawer-anim-leave-active .cart-drawer {
    transition: none !important;
  }
}
</style>


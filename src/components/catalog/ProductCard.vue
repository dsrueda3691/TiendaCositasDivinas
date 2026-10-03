<template>
  <article
    ref="cardElement"
    class="product-card"
    :class="{ 'product-card--revealed': isCardVisible }"
    @click="openDetails"
  >
    <div class="product-card__image-container">
      <img
        :src="product.imagen"
        :alt="product.nombre"
        class="product-card__image"
        loading="lazy"
        decoding="async"
      />
    </div>
    <div class="product-card__content">
      <div class="product-card__meta">
        <span class="product-card__category">{{ product.categoria }}</span>
        <span class="product-card__availability">Disponible</span>
      </div>
      <h2>{{ product.nombre }}</h2>
      <p>{{ product.descripcion }}</p>
      <div class="product-card__footer">
        <strong>{{ formatPrice(product.precio) }}</strong>
        <button
          class="product-card__details-button"
          type="button"
          aria-label="Ver detalles del producto"
          @click.stop="openDetails"
        >
          Detalles <span aria-hidden="true"></span>
        </button>
        <Transition name="quantity-control" mode="out-in">
          <button
            v-if="selectedQuantity === 0"
            key="add"
            class="product-card__cart-button"
            type="button"
            aria-label="Agregar producto al carrito"
            @click.stop="addToCart"
          >
            <span aria-hidden="true">+</span> Agregar
          </button>
          <div v-else key="quantity" class="product-card__quantity" @click.stop>
            <button type="button" aria-label="Disminuir cantidad" @click="decreaseQuantity">
              −
            </button>
            <input
              :value="selectedQuantity"
              type="number"
              min="1"
              readonly
              aria-label="Cantidad seleccionada"
            />
            <button type="button" aria-label="Aumentar cantidad" @click="increaseQuantity">
              +
            </button>
          </div>
        </Transition>
      </div>
    </div>
  </article>

  <Teleport to="body">
    <Transition name="details-sheet">
      <div v-if="isDetailsOpen" class="details-overlay" @click.self="closeDetails">
        <aside
          class="details-panel"
          role="dialog"
          aria-modal="true"
          :aria-labelledby="`details-title-${product.id}`"
        >
          <div class="details-panel__handle" aria-hidden="true"></div>

          <button
            class="details-panel__close"
            type="button"
            aria-label="Cerrar detalles"
            @click="closeDetails"
          >
            ×
          </button>

          <div class="details-panel__image-wrap">
            <img
              :src="product.imagen"
              :alt="product.nombre"
              class="details-panel__image"
              decoding="async"
            />
          </div>

          <div class="details-panel__content">
            <span class="product-card__category">{{ product.categoria }}</span>
            <h2 :id="`details-title-${product.id}`">{{ product.nombre }}</h2>
            <p>{{ product.descripcion }}</p>
            <strong class="details-panel__price">{{ formatPrice(product.precio) }}</strong>

            <dl class="details-panel__facts">
              <div>
                <dt>Referencia</dt>
                <dd>#CD-{{ String(product.id).padStart(3, '0') }}</dd>
              </div>
              <div>
                <dt>Categoría</dt>
                <dd>{{ product.categoria }}</dd>
              </div>
            </dl>

            <p class="details-panel__note">
              Consulta disponibilidad y pedidos directamente con la Parroquia de la Santa Cruz.
            </p>
            <Transition name="quantity-control" mode="out-in">
              <button
                v-if="selectedQuantity === 0"
                key="details-add"
                class="details-panel__cart-button"
                type="button"
                @click="addToCart(false)"
              >
                <span aria-hidden="true">+</span> Agregar al carrito
              </button>
              <div v-else key="details-quantity" class="details-panel__quantity-group">
                <div class="details-panel__quantity" aria-label="Cantidad seleccionada">
                  <span class="details-panel__quantity-label">Cantidad</span>
                  <div class="product-card__quantity">
                    <button type="button" aria-label="Disminuir cantidad" @click="decreaseQuantity">
                      −
                    </button>
                    <input
                      :value="selectedQuantity"
                      type="number"
                      min="1"
                      readonly
                      aria-label="Cantidad seleccionada"
                    />
                    <button type="button" aria-label="Aumentar cantidad" @click="increaseQuantity">
                      +
                    </button>
                  </div>
                </div>

                <button
                  class="details-panel__view-cart-btn"
                  type="button"
                  @click="openCartFromDetails"
                >
                  Ver en el carrito ({{ selectedQuantity }}) 🛒
                </button>
              </div>
            </Transition>
          </div>
        </aside>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useCart } from '../../composables/useCart'

const props = defineProps({
  product: { type: Object, required: true },
})

const emit = defineEmits(['add-to-cart', 'set-cart-quantity'])

const { getItemQuantity, setQuantity, addToCart: addCartItem, formatPrice, openCart } = useCart()

const isDetailsOpen = ref(false)
const selectedQuantity = computed(() => getItemQuantity(props.product.id))
const cardElement = ref(null)
const isCardVisible = ref(true)
let cardObserver

function openDetails() {
  isDetailsOpen.value = true
}

function closeDetails() {
  isDetailsOpen.value = false
}

function openCartFromDetails() {
  closeDetails()
  openCart()
}

function addToCart(closePanel = false) {
  addCartItem(props.product, 1)
  emit('add-to-cart', props.product)
  if (closePanel) closeDetails()
}

function increaseQuantity() {
  const newQty = selectedQuantity.value + 1
  setQuantity(props.product, newQty)
  emit('set-cart-quantity', { product: props.product, quantity: newQty })
}

function decreaseQuantity() {
  const newQty = selectedQuantity.value - 1
  setQuantity(props.product, newQty)
  emit('set-cart-quantity', { product: props.product, quantity: Math.max(0, newQty) })
}

onMounted(() => {
  if (!('IntersectionObserver' in window) || !cardElement.value) return

  isCardVisible.value = false
  cardObserver = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) return
      isCardVisible.value = true
      cardObserver?.disconnect()
    },
    { threshold: 0.08, rootMargin: '0px 0px -6% 0px' },
  )
  cardObserver.observe(cardElement.value)
})

watch(isDetailsOpen, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

onBeforeUnmount(() => {
  cardObserver?.disconnect()
  document.body.style.overflow = ''
})
</script>

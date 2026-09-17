import { computed, ref, watch } from 'vue'

const CART_STORAGE_KEY = 'cositas_divinas_cart'

// Leer carrito guardado en localStorage para persistencia
let initialCart = []
try {
  const saved = localStorage.getItem(CART_STORAGE_KEY)
  if (saved) {
    initialCart = JSON.parse(saved)
  }
} catch (e) {
  console.error('Error al cargar carrito desde localStorage', e)
}

const cart = ref(initialCart)
const isCartOpen = ref(false)

// Guardar en localStorage automáticamente ante cualquier cambio
watch(
  cart,
  (newCart) => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newCart))
    } catch (e) {
      console.error('Error al guardar carrito en localStorage', e)
    }
  },
  { deep: true },
)

export function useCart() {
  const cartCount = computed(() =>
    cart.value.reduce((total, item) => total + (item.quantity || 1), 0),
  )

  const cartTotal = computed(() =>
    cart.value.reduce((total, item) => total + item.precio * (item.quantity || 1), 0),
  )

  function getItemQuantity(productId) {
    const item = cart.value.find((i) => i.id === productId)
    return item ? item.quantity : 0
  }

  function addToCart(product, quantity = 1) {
    const existing = cart.value.find((i) => i.id === product.id)
    if (existing) {
      existing.quantity += quantity
    } else {
      cart.value.push({ ...product, quantity })
    }
  }

  function setQuantity(product, quantity) {
    if (quantity <= 0) {
      removeFromCart(product.id)
      return
    }
    const existing = cart.value.find((i) => i.id === product.id)
    if (existing) {
      existing.quantity = quantity
    } else {
      cart.value.push({ ...product, quantity })
    }
  }

  function updateQuantity(productId, delta) {
    const item = cart.value.find((i) => i.id === productId)
    if (!item) return
    const newQty = item.quantity + delta
    if (newQty <= 0) {
      removeFromCart(productId)
    } else {
      item.quantity = newQty
    }
  }

  function removeFromCart(productId) {
    cart.value = cart.value.filter((i) => i.id !== productId)
  }

  function clearCart() {
    cart.value = []
  }

  function openCart() {
    isCartOpen.value = true
  }

  function closeCart() {
    isCartOpen.value = false
  }

  function toggleCart() {
    isCartOpen.value = !isCartOpen.value
  }

  const formatPrice = (price) =>
    new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0,
    }).format(price)

  // Enlace oficial de WhatsApp con número +57 301 7705554 y mensaje estructurado
  const whatsappUrl = computed(() => {
    if (!cart.value.length) return ''

    const lines = cart.value.map(
      (item) =>
        `• ${item.quantity}x ${item.nombre} — ${formatPrice(item.precio * item.quantity)} (Ref: #CD-${String(item.id).padStart(3, '0')})`,
    )

    const message = [
      '¡Hola! Vengo de la página web de la Tienda Cositas Divinas (Parroquia de la Santa Cruz).',
      '',
      'Me gustaría consultar la disponibilidad y comprar los siguientes productos para apoyar al XII Retiro de Emaús Mujeres:',
      '',
      ...lines,
      '',
      `💰 Total estimado: ${formatPrice(cartTotal.value)}`,
      '',
      '¿Me podrían confirmar la disponibilidad y los medios de pago y entrega? ¡Muchas gracias y que Dios los bendiga!',
    ].join('\n')

    return `https://wa.me/573017705554?text=${encodeURIComponent(message)}`
  })

  return {
    cart,
    cartCount,
    cartTotal,
    isCartOpen,
    getItemQuantity,
    addToCart,
    setQuantity,
    updateQuantity,
    removeFromCart,
    clearCart,
    openCart,
    closeCart,
    toggleCart,
    formatPrice,
    whatsappUrl,
  }
}


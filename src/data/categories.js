

const productImages = import.meta.glob('../assets/Productos/*.*', { eager: true, import: 'default' })

function getProdImage(filename) {
  const path = `../assets/Productos/${filename}`
  return productImages[path] || ''
}

export const categories = [
 
  'Hogar y Decoración',
  'Pines y Llaveros',
  'Pastilleros e Imanes',
  'Bolsos y Fundas',
   'Librería y Devoción',
   'Todos',
]

export const categoryDrawers = [
 
  {
    id: 'hogar',
    nombre: 'Hogar y Decoración',
    titulo: 'Hogar y Decoración',
    descripcion: 'Cruces de puerta, placas de pared, adornos y delantales',
    imagen: getProdImage('ColgantePuertaCRUZ.jpeg'),
    total: 13,
    etiqueta: '13 productos',
  },
  {
    id: 'pines',
    nombre: 'Pines y Llaveros',
    titulo: 'Pines y Llaveros',
    descripcion: 'Pines esmaltados, medallas y llaveros de San Benito',
    imagen: getProdImage('pin.jpeg'),
    total: 16,
    etiqueta: '16 productos',
  },
  {
    id: 'pastilleros',
    nombre: 'Pastilleros e Imanes',
    titulo: 'Pastilleros e Imanes',
    descripcion: 'Pastilleros metálicos de bolsillo e imanes devocionales',
    imagen: getProdImage('Pastillero.jpeg'),
    total: 17,
    etiqueta: '17 productos',
  },
  {
    id: 'bolsos',
    nombre: 'Bolsos y Fundas',
    titulo: 'Bolsos y Fundas',
    descripcion: 'Bolsos de tela, tote bags, fundas de almohada y cargador',
    imagen: getProdImage('BolsoTote.jpeg'),
    total: 6,
    etiqueta: '6 productos',
  },
   {
    id: 'libreria',
    nombre: 'Librería y Devoción',
    titulo: 'Librería y Devoción',
    descripcion: 'Porta Biblias, pestañas de índice bíblico, separadores y stickers',
    imagen: getProdImage('PortaBiblia.jpeg'),
    total: 8,
    etiqueta: '8 productos',
  },
  {
    
    id: 'todos',
    nombre: 'Todos',
    titulo: 'Todos los Productos',
    descripcion: 'Colección completa de 60 artículos de la parroquia',
    imagen: getProdImage('articulos.jpg'),
    total: 60,
    etiqueta: '60 artículos',
  },
]

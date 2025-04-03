import { Product } from '../types/Product'

const API_URL = 'http://localhost:3001/grocery'

// 🔄 Obtener productos (todos, por página o favoritos)
export const fetchGroceries = async (
  options?: { page?: number; limit?: number; favoritesOnly?: boolean }
): Promise<Product[]> => {
  const { page = 1, limit = 10, favoritesOnly = false } = options || {}
  const url = new URL(API_URL)

  if (favoritesOnly) {
    url.searchParams.append('favorite', '1')
  } else {
    url.searchParams.append('_page', String(page))
    url.searchParams.append('_limit', String(limit))
  }

  const res = await fetch(url.toString())
  if (!res.ok) throw new Error('Error al cargar productos')
  return await res.json()
}

// 🌟 Marcar o desmarcar producto como favorito
export const toggleFavoriteAPI = async (
  id: string,
  favorite: boolean
): Promise<void> => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ favorite }),
  })

  if (!res.ok) throw new Error('Error al actualizar favorito')
}

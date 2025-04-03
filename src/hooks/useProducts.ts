import { useState, useEffect, useRef, useCallback } from 'react'
import { Product } from '../types'
import { fetchGroceries, toggleFavoriteAPI } from '../services/groceryService'
import { useFavorites } from '../context/FavoriteContext'

interface UseProductsOptions {
  onlyFavorites?: boolean
}

export function useProducts({ onlyFavorites = false }: UseProductsOptions) {
  const [products, setProducts] = useState<Product[]>([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  const { fetchFavorites } = useFavorites()
  const observer = useRef<IntersectionObserver | null>(null)

  const fetchProducts = useCallback(async () => {
    setLoading(true)
    try {
      const data = await fetchGroceries({
        page,
        limit: 10,
        favoritesOnly: onlyFavorites,
      })

      if (onlyFavorites) {
        setProducts(data)
      } else {
        if (data.length === 0) {
          setHasMore(false)
        } else {
          setProducts(prev => {
            const newProducts = data.filter(
              newProduct => !prev.some(p => p.id === newProduct.id)
            )
            return [...prev, ...newProducts]
          })
          setPage(prev => prev + 1)
        }
      }
    } catch (error) {
      console.error('Error al cargar productos:', error)
    }
    setLoading(false)
  }, [page, onlyFavorites])

  useEffect(() => {
    setProducts([])
    setPage(1)
    setHasMore(true)
    fetchProducts()
  }, [onlyFavorites])

  // ✅ callback ref (esto evita el error de tipos)
  const lastProductRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading || onlyFavorites) return
      if (observer.current) observer.current.disconnect()

      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          fetchProducts()
        }
      })

      if (node) observer.current.observe(node)
    },
    [loading, onlyFavorites, hasMore, fetchProducts]
  )

  const handleToggleFavorite = async (product: Product) => {
    try {
      await toggleFavoriteAPI(product.id, !product.favorite)

      if (onlyFavorites) {
        fetchProducts()
        fetchFavorites()
      } else {
        setProducts(prev =>
          prev.map(p =>
            p.id === product.id ? { ...p, favorite: !product.favorite } : p
          )
        )
      }
    } catch (err) {
      console.error('Error al marcar favorito:', err)
    }
  }

  return {
    products,
    loading,
    hasMore,
    lastProductRef, // ✅ callback ref
    handleToggleFavorite,
    refreshProducts: fetchProducts,
  }
}

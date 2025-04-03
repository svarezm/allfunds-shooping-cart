import React, { createContext, useContext, useEffect, useState } from 'react'
import { Product } from '../types'
import { fetchGroceries, toggleFavoriteAPI } from '../services/groceryService'

interface FavoriteContextType {
    favorites: Product[]
    toggleFavorite: (product: Product) => Promise<void>
    fetchFavorites: () => void
}

const FavoriteContext = createContext<FavoriteContextType | undefined>(undefined)

export const FavoriteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [favorites, setFavorites] = useState<Product[]>([])

    const fetchFavorites = async () => {
        try {
            const data = await fetchGroceries({ favoritesOnly: true })
            setFavorites(data)
        } catch (error) {
            console.error('Error al cargar favoritos:', error)
        }
    }

    const toggleFavorite = async (product: Product): Promise<void> => {
        try {
            await toggleFavoriteAPI(product.id, !product.favorite)
            fetchFavorites()
        } catch (error) {
            console.error('Error al actualizar favorito:', error)
        }
    }

    useEffect(() => {
        fetchFavorites()
    }, [])

    return (
        <FavoriteContext.Provider value={{ favorites, toggleFavorite, fetchFavorites }}>
            {children}
        </FavoriteContext.Provider>
    )
}

export const useFavorites = (): FavoriteContextType => {
    const context = useContext(FavoriteContext)
    if (!context) throw new Error('useFavorites must be used within a FavoriteProvider')
    return context
}

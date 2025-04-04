import React, { createContext, useContext, useState, useEffect } from 'react'
import { Product, CartItem } from '../types'

interface CartContextType {
    cart: CartItem[]
    addToCart: (product: Product) => void
    removeFromCart: (productId: string) => void
    updateQuantity: (productId: string, quantity: number) => void
    getCartTotal: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const LOCAL_STORAGE_KEY = 'shopping_cart'

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>([])
    const [isInitialized, setIsInitialized] = useState(false)

    // 🔄 Cargar carrito desde localStorage al inicio
    useEffect(() => {
        const stored = localStorage.getItem(LOCAL_STORAGE_KEY)
        if (stored) {
            try {
                setCart(JSON.parse(stored))
            } catch (e) {
                console.error('Error al leer el carrito del localStorage', e)
            }
        }
        setIsInitialized(true)
    }, [])

    // 💾 Guardar carrito cada vez que cambia
    useEffect(() => {
        if (isInitialized) {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cart))
        }
    }, [cart, isInitialized])

    const addToCart = (product: Product) => {
        setCart(prev => {
            const existing = prev.find(item => item.product.id === product.id)
            if (existing) {
                return prev.map(item =>
                    item.product.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            }
            return [...prev, { product, quantity: 1 }]
        })
    }

    const removeFromCart = (productId: string) => {
        setCart(prev => prev.filter(item => item.product.id !== productId))
    }

    const updateQuantity = (productId: string, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(productId)
        } else {
            setCart(prev =>
                prev.map(item =>
                    item.product.id === productId ? { ...item, quantity } : item
                )
            )
        }
    }

    const getCartTotal = () => {
        return cart.reduce((total, item) => total + item.product.price * item.quantity, 0)
    }

    // No mostrar los hijos hasta que esté inicializado
    if (!isInitialized) return null

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                updateQuantity,
                getCartTotal,
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

export const useCart = (): CartContextType => {
    const context = useContext(CartContext)
    if (!context) {
        throw new Error('useCart must be used within a CartProvider')
    }
    return context
}

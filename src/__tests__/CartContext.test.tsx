import { renderHook, act } from '@testing-library/react'
import { CartProvider, useCart } from '../context/CartContext'
import { Product } from '../types'
import { ReactNode } from 'react'

// Mock de producto
const mockProduct: Product = {
    id: '1',
    productName: 'Test Product',
    price: 10,
    image_url: '',
    favorite: false,
    stock: 1
}

// Tipado correcto del wrapper
const wrapper = ({ children }: { children: ReactNode }) => (
    <CartProvider>{children}</CartProvider>
)

test('añade un producto al carrito y calcula el total', () => {
    const { result } = renderHook(() => useCart(), { wrapper })

    // Añadir el producto
    act(() => {
        result.current.addToCart(mockProduct)
    })

    // Comprobaciones
    expect(result.current.cart).toHaveLength(1)
    expect(result.current.cart[0].product.id).toBe('1')
    expect(result.current.cart[0].quantity).toBe(1)
    expect(result.current.getCartTotal()).toBe(10)
})

test('modifica la cantidad de un producto en el carrito', () => {
    const { result } = renderHook(() => useCart(), { wrapper })

    act(() => {
        result.current.addToCart(mockProduct)
        result.current.updateQuantity(mockProduct.id, 3)
    })

    expect(result.current.cart[0].quantity).toBe(3)
    expect(result.current.getCartTotal()).toBe(30)
})

test('elimina un producto del carrito si la cantidad se reduce a 0', () => {
    const { result } = renderHook(() => useCart(), { wrapper })

    act(() => {
        result.current.addToCart(mockProduct)
        result.current.updateQuantity(mockProduct.id, 0)
    })

    expect(result.current.cart).toHaveLength(0)
    expect(result.current.getCartTotal()).toBe(0)
})

import { render, screen, fireEvent } from '@testing-library/react'
import { CartProvider, useCart } from '../context/CartContext'
import { Product } from '../types'

const mockProduct: Product = {
    id: '1',
    productName: 'Cerveza IPA',
    price: 2.5,
    image_url: '',
    favorite: false,
    stock: 1
}

// Un componente mínimo para probar añadir al carrito
function AddToCartButton({ product }: { product: Product }) {
    const { addToCart, cart } = useCart()

    return (
        <>
            <button onClick={() => addToCart(product)}>Añadir al carrito</button>
            <span data-testid="cart-count">{cart.length}</span>
        </>
    )
}

test('añade un producto al carrito', () => {
    render(
        <CartProvider>
            <AddToCartButton product={mockProduct} />
        </CartProvider>
    )

    const button = screen.getByText('Añadir al carrito')
    const cartCount = screen.getByTestId('cart-count')

    // Antes de hacer clic, el carrito debe estar vacío
    expect(cartCount.textContent).toBe('0')

    // Simulamos un clic en el botón
    fireEvent.click(button)

    // Ahora debería haber un producto en el carrito
    expect(cartCount.textContent).toBe('1')
})

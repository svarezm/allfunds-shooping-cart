import { render, screen, fireEvent } from '@testing-library/react'
import ProductCard from '../components/ProductCard'
import { Product } from '../types'
import { vi } from 'vitest'
import { CartProvider } from '../context/CartContext'

// Producto de prueba
const mockProduct: Product = {
    id: '1',
    productName: 'Cerveza IPA',
    price: 2.5,
    image_url: '',
    favorite: false,
    stock: 5
}

test('renderiza el producto y responde a eventos', () => {
    const mockToggleFavorite = vi.fn()
    const mockAddToCart = vi.fn()

    render(
        <CartProvider>
            <ProductCard
                product={mockProduct}
                onFavoriteToggle={mockToggleFavorite}
                onAddToCart={mockAddToCart}
            />
        </CartProvider>
    )

    expect(screen.getByText('Cerveza IPA')).toBeInTheDocument()

    const favButton = screen.getByLabelText('toggle-favorite')
    fireEvent.click(favButton)
    expect(mockToggleFavorite).toHaveBeenCalledWith(mockProduct)

    const addButton = screen.getByRole('button', { name: /Add to Cart/i }) // o usa getAllByRole si es necesario
    fireEvent.click(addButton)
    expect(mockAddToCart).toHaveBeenCalled()
})


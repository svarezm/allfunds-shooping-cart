import { render, screen } from '@testing-library/react'
import Cart from '../components/Cart'
import { CartProvider } from '../context/CartContext'
import { Product } from '../types'
import { ReactNode } from 'react'

// Mock producto
const mockProduct: Product = {
    id: '1',
    productName: 'Zumo de naranja',
    price: 3,
    image_url: '',
    favorite: false,
    stock: 10
}

// Mock provider que inyecta estado con un producto en el carrito
const CustomCartProvider = ({ children }: { children: ReactNode }) => {
    const localStorageMock = [
        {
            product: mockProduct,
            quantity: 2
        }
    ]

    // Simular localStorage con el contenido del carrito
    localStorage.setItem('shopping_cart', JSON.stringify(localStorageMock))

    return <CartProvider>{children}</CartProvider>
}

test('renderiza el carrito con productos y muestra el total', () => {
    render(
        <CustomCartProvider>
            <Cart />
        </CustomCartProvider>
    )

    expect(screen.getByText('Zumo de naranja')).toBeInTheDocument()
    expect(screen.getByText('Subtotal: 6,00 €')).toBeInTheDocument()
    expect(
        screen.getByText((_, element) =>
            element?.textContent === 'Total: 6,00 €'
        )
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /checkout/i })).toBeInTheDocument()
})

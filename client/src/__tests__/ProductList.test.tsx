import { render, screen } from '@testing-library/react'
import ProductList from '../components/ProductList'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { FavoriteProvider } from '../context/FavoriteContext'

const queryClient = new QueryClient()

test('renderiza la lista de productos', async () => {
    render(
        <QueryClientProvider client={queryClient}>
            <FavoriteProvider>
                <ProductList />
            </FavoriteProvider>
        </QueryClientProvider>
    )

    expect(await screen.findByRole('progressbar')).toBeInTheDocument()
})

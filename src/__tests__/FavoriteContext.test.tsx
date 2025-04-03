import { renderHook, waitFor } from '@testing-library/react'
import { FavoriteProvider, useFavorites } from '../context/FavoriteContext'
import { ReactNode } from 'react'
import * as groceryService from '../services/groceryService'
import { Product } from '../types'
import { vi } from 'vitest'

const mockProduct: Product = {
    id: '1',
    productName: 'Test Favorito',
    price: 5,
    image_url: '',
    favorite: true,
    stock: 1
}

const wrapper = ({ children }: { children: ReactNode }) => (
    <FavoriteProvider>{children}</FavoriteProvider>
)

vi.mock('../services/groceryService', async () => {
    return {
        fetchGroceries: vi.fn(),
        toggleFavoriteAPI: vi.fn()
    }
})

const mockFetchGroceries = groceryService.fetchGroceries as unknown as ReturnType<typeof vi.fn>

beforeEach(() => {
    vi.clearAllMocks()
})

test('carga la lista de productos favoritos', async () => {
    mockFetchGroceries.mockResolvedValueOnce([mockProduct])

    const { result } = renderHook(() => useFavorites(), { wrapper })

    await waitFor(() => {
        expect(result.current.favorites).toEqual([mockProduct])
    })

    expect(mockFetchGroceries).toHaveBeenCalledWith({ favoritesOnly: true })
})

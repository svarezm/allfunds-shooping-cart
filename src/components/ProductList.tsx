import { CircularProgress, Box } from '@mui/material'
import { useProducts } from '../hooks/useProducts'
import ProductGrid from './ProductGrid'

interface ProductListProps {
    readonly onAddToCart?: () => void
    readonly onlyFavorites?: boolean
}

export default function ProductList({ onAddToCart, onlyFavorites = false }: ProductListProps) {
    const {
        products,
        loading,
        lastProductRef,
        handleToggleFavorite
    } = useProducts({ onlyFavorites })

    return (
        <>
            <ProductGrid
                products={products}
                onToggleFavorite={handleToggleFavorite}
                onAddToCart={onAddToCart}
                lastRef={lastProductRef}
            />

            {loading && (
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', my: 2 }}>
                    <CircularProgress />
                </Box>
            )}
        </>
    )
}

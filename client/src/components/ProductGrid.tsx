// src/components/ProductGrid.tsx
import { Product } from '../types'
import { Box } from '@mui/material'
import ProductCard from './ProductCard'
import { RefCallback } from 'react'

interface Props {
    products: Product[]
    onToggleFavorite: (product: Product) => void
    onAddToCart?: () => void
    lastRef?: RefCallback<HTMLDivElement>
}

export default function ProductGrid({ products, onToggleFavorite, onAddToCart, lastRef }: Props) {
    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'flex-start', padding: 2 }}>
            {products.map((product, index) => (
                <Box
                    key={product.id}
                    ref={index === products.length - 1 ? lastRef : null}
                    sx={{
                        width: { xs: '100%', sm: 'calc(50% - 12px)', lg: 'calc(33% - 12px)' },
                        display: 'flex',
                        justifyContent: 'flex-start',
                    }}
                >
                    <ProductCard
                        product={product}
                        onFavoriteToggle={() => onToggleFavorite(product)}
                        onAddToCart={onAddToCart}
                    />
                </Box>
            ))}
        </Box>
    )
}

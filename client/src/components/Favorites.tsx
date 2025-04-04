import {
    Box,
    Typography,
    Grid,
    Snackbar,
    Alert,
} from '@mui/material'
import ProductCard from './ProductCard'
import { useFavorites } from '../context/FavoriteContext'
import { useState } from 'react'
import { Product } from '../types/Product'

export default function Favorites() {
    const { favorites, toggleFavorite } = useFavorites()
    const [snackbar, setSnackbar] = useState<{ message: string; open: boolean }>({
        message: '',
        open: false,
    })

    const handleToggleFavorite = (product: Product) => {
        toggleFavorite(product)
        setSnackbar({
            message: product.favorite
                ? `${product.productName} eliminado de favoritos`
                : `${product.productName} añadido a favoritos`,
            open: true,
        })
    }

    return (
        <Box p={2}>
            {favorites.length === 0 ? (
                <Typography>No hay productos favoritos.</Typography>
            ) : (
                <Grid container spacing={2}>
                    {favorites.map(product => (
                        <Box
                            key={product.id}
                            sx={{
                                width: {
                                    xs: '100%',
                                    sm: '50%',
                                    md: '32%',
                                },
                                flexGrow: 1,
                            }}
                        >
                            <ProductCard
                                product={product}
                                onFavoriteToggle={() => handleToggleFavorite(product)}
                            />
                        </Box>
                    ))}
                </Grid>
            )}

            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    onClose={() => setSnackbar({ ...snackbar, open: false })}
                    severity="info"
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    )
}

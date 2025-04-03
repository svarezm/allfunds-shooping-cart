import {
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Typography,
    Button,
    Snackbar,
    Alert,
    IconButton
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Product } from '../types/Product';
import { useCart } from '../context/CartContext';
import { useState, useEffect } from 'react';

interface Props {
    product: Product;
    onFavoriteToggle?: (product: Product) => void;
    onAddToCart?: () => void;
}

export default function ProductCard({ product, onFavoriteToggle, onAddToCart }: Props) {
    const { addToCart, cart } = useCart();
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [favoriteSnackbarOpen, setFavoriteSnackbarOpen] = useState(false);
    const [favoriteMessage, setFavoriteMessage] = useState('');
    const [stock, setStock] = useState(product.stock);

    useEffect(() => {
        const cartItem = cart.find(item => item.product.id === product.id);
        setStock(product.stock - (cartItem?.quantity || 0));
    }, [cart, product]);

    const handleAddToCart = () => {
        if (stock > 0) {
            addToCart(product);
            setSnackbarOpen(true);
            if (onAddToCart) {
                onAddToCart();
            }
        }
    };

    const handleFavoriteToggle = () => {
        if (onFavoriteToggle) {
            onFavoriteToggle(product);
            setFavoriteMessage(product.favorite ? 'Removed from favorites' : 'Added to favorites');
            setFavoriteSnackbarOpen(true);
        }
    };

    return (
        <>
            <Card
                sx={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    maxWidth: 345,
                    margin: 'auto',
                    boxSizing: 'border-box',
                    '@media (max-width:600px)': {
                        maxWidth: '100%',
                    }
                }}
            >
                <CardMedia
                    component="img"
                    height="140"
                    image={product.image_url}
                    alt={product.productName}
                />
                <CardContent sx={{ paddingBottom: 1 }}>
                    <Typography gutterBottom variant="h6" component="div">
                        {product.productName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Price: {product.price.toFixed(2).replace('.', ',')} €
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {stock > 0 ? `${stock} left` : 'Out of stock'}
                    </Typography>
                </CardContent>
                <CardActions
                    sx={{
                        justifyContent: 'space-between',
                        marginTop: 'auto',
                        padding: '8px',
                        '@media (max-width:600px)': {
                            flexDirection: 'column',
                            alignItems: 'stretch',
                        }
                    }}
                >
                    <Button
                        size="small"
                        variant="contained"
                        disabled={stock === 0}
                        onClick={handleAddToCart}
                        startIcon={<ShoppingCartIcon />}
                        sx={{
                            width: '100%',
                            '@media (min-width:600px)': {
                                width: 'auto',
                            },
                        }}
                    >
                        {stock > 0 ? 'Add to Cart' : 'Sold Out'}
                    </Button>
                    {onFavoriteToggle && (
                        <IconButton
                            color={product.favorite ? 'secondary' : 'default'}
                            onClick={handleFavoriteToggle}
                            aria-label="toggle-favorite"
                            sx={{
                                '@media (max-width:600px)': {
                                    marginTop: 1,
                                }
                            }}
                        >
                            {product.favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                        </IconButton>
                    )}
                </CardActions>
            </Card>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    onClose={() => setSnackbarOpen(false)}
                    severity="success"
                    sx={{ width: '100%' }}
                >
                    {product.productName} added to cart
                </Alert>
            </Snackbar>

            <Snackbar
                open={favoriteSnackbarOpen}
                autoHideDuration={3000}
                onClose={() => setFavoriteSnackbarOpen(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    onClose={() => setFavoriteSnackbarOpen(false)}
                    severity="info"
                    sx={{ width: '100%' }}
                >
                    {favoriteMessage}
                </Alert>
            </Snackbar>
        </>
    );
}

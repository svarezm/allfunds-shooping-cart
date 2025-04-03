import { useCart } from '../context/CartContext';
import {
    Box,
    Typography,
    Card,
    CardContent,
    CardMedia,
    CardActions,
    Stack,
    useMediaQuery,
    IconButton
} from '@mui/material';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export default function Cart() {
    const { cart, updateQuantity, removeFromCart, getCartTotal } = useCart();
    const isMobile = useMediaQuery('(max-width: 768px)');

    if (cart.length === 0) {
        return (
            <Box p={2} textAlign="center">
                <RemoveShoppingCartIcon sx={{ fontSize: 50, color: 'gray' }} />
                <Typography variant={isMobile ? 'h6' : 'h5'}>Your cart is empty</Typography>
            </Box>
        );
    }

    return (
        <Box p={2}>
            <Typography variant={isMobile ? 'h5' : 'h4'} gutterBottom>
                Your Cart
            </Typography>

            <Stack spacing={2}>
                {cart.map(({ product, quantity }) => (
                    <Card key={product.id} sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'stretch' }}>
                        <CardMedia
                            component="img"
                            sx={{
                                width: isMobile ? '100%' : 140,
                                height: isMobile ? 140 : 'auto',
                                objectFit: 'cover',
                                marginBottom: isMobile ? 2 : 0,
                            }}
                            image={product.image_url}
                            alt={product.productName}
                        />
                        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                            <CardContent sx={{ flex: '1 0 auto', padding: '8px' }}>
                                <Typography variant={isMobile ? 'body1' : 'h6'}>{product.productName}</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Price: {product.price.toFixed(2).replace('.', ',')} €
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Subtotal: {(product.price * quantity).toFixed(2).replace('.', ',')} €
                                </Typography>
                            </CardContent>
                            <CardActions sx={{ padding: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <IconButton size="small" onClick={() => updateQuantity(product.id, quantity - 1)} sx={{ marginRight: 1 }}>
                                        <RemoveIcon />
                                    </IconButton>
                                    <Typography>{quantity}</Typography>
                                    <IconButton size="small" onClick={() => updateQuantity(product.id, quantity + 1)} sx={{ marginLeft: 1 }}>
                                        <AddIcon />
                                    </IconButton>
                                </Box>
                                <IconButton size="small" color="error" onClick={() => removeFromCart(product.id)} sx={{ marginLeft: isMobile ? 'auto' : 0 }}>
                                    <RemoveShoppingCartIcon />
                                </IconButton>
                            </CardActions>
                        </Box>
                    </Card>
                ))}
            </Stack>

            <Box
                mt={4}
                mb={2}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                sx={{
                    backgroundColor: '#f0f0f0',
                    padding: '12px 20px',
                    borderRadius: '8px',
                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                }}
            >
                <Typography
                    variant={isMobile ? 'body1' : 'h5'}
                    sx={{
                        fontWeight: 'bold',
                        color: '#333',
                    }}
                >
                    Total: {getCartTotal().toFixed(2).replace('.', ',')} €
                </Typography>
            </Box>
        </Box>
    );
}

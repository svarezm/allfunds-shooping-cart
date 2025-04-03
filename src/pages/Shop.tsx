import { useState } from 'react';
import { Box, Paper, Typography, Drawer, useMediaQuery, IconButton, Tabs, Tab } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ProductList from '../components/ProductList';
import Cart from '../components/Cart';

export default function Shop() {
    const isMobile = useMediaQuery('(max-width: 768px)');
    const [cartOpen, setCartOpen] = useState(false);
    const [tabIndex, setTabIndex] = useState(0);

    const handleOpenCart = () => setCartOpen(true);
    const handleCloseCart = () => setCartOpen(false);
    const handleTabChange = (_event: React.SyntheticEvent, newIndex: number) => setTabIndex(newIndex);

    return (
        <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
            {/* Contenedor principal con tabs */}
            <Box sx={{ flex: 3, overflowY: 'auto', paddingRight: isMobile ? 0 : 2, width: '100%' }}>
                <Tabs value={tabIndex} onChange={handleTabChange} sx={{ marginBottom: 2 }}>
                    <Tab label="All Products" />
                    <Tab label="Favorites" />
                </Tabs>
                {tabIndex === 0 ? (
                    <ProductList onAddToCart={isMobile ? handleOpenCart : undefined} />
                ) : (
                    <ProductList onlyFavorites onAddToCart={isMobile ? handleOpenCart : undefined} />
                )}
            </Box>

            {/* Desktop Cart */}
            {!isMobile && (
                <Paper sx={{ flex: '0 0 25%', minWidth: 360, padding: 2, backgroundColor: '#f5f5f5', position: 'sticky', top: 0, height: '100vh', overflowY: 'auto' }}>
                    <Typography variant="h6" gutterBottom>
                        Cart
                    </Typography>
                    <Cart />
                </Paper>
            )}

            {/* Mobile Cart */}
            {isMobile && (
                <Drawer anchor="right" open={cartOpen} onClose={handleCloseCart}>
                    <Box sx={{ width: "100%", minWidth: 160, maxWidth: 800, padding: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginBottom: 2 }}>
                            <IconButton onClick={handleCloseCart}>
                                <ArrowBackIcon />
                            </IconButton>
                            <Typography variant="h6" gutterBottom>
                                Cart
                            </Typography>
                        </Box>
                        <Cart />
                    </Box>
                </Drawer>
            )}
        </Box>
    );
}

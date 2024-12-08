import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Container, Typography, Box, IconButton, styled, Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import CatList from './components/CatList';
import FoodList from './components/FoodList';
import FeedingScheduleList from './components/FeedingScheduleList';
import ProductDetailPage from './components/ProductDetailPage';
import Login from './components/Login';
import CartView from './components/CartView';
import { CartProvider, CartContext } from './contexts/CartContext';

const StyledButton = styled(Button)(({ theme }) => ({
  '&:hover': {
    backgroundColor: '#7b34d1',
  },
}));

const App = () => {
  return (
    <CartProvider>
      <Router>
        <AppBar position="static">
          <Toolbar sx={{ justifyContent: 'center' }}>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              FeedYourCat
            </Typography>
            {/* Using Box for the buttons */}
            <Box sx={{ display: 'flex', gap: 2, flexGrow: 1 }}>
              <StyledButton color="inherit" component={Link} to="/cats">
                Cats
              </StyledButton>
              <StyledButton color="inherit" component={Link} to="/foods">
                Foods
              </StyledButton>
              <StyledButton color="inherit" component={Link} to="/feeding-schedules">
                Feeding Schedules
              </StyledButton>
            </Box>
            <CartContext.Consumer>
              {({ getTotalItems }) => (
                <IconButton color="inherit" component={Link} to="/cart">
                  <Badge badgeContent={getTotalItems()} color="secondary">
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
             )}
            </CartContext.Consumer>
            <IconButton color="inherit" component={Link} to="/login">
              <LogoutIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Container sx={{ marginTop: 2 }}>
          <Routes>
            <Route path="/cats" element={<CatList />} />
            <Route path="/foods" element={<FoodList />} />
            <Route path="/feeding-schedules" element={<FeedingScheduleList />} />
            <Route path="/foods/:id" element={<ProductDetailPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cart" element={<CartView />} />
          </Routes>
        </Container>
      </Router>
    </CartProvider>
  );
};

export default App;

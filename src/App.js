import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Button, Container, Typography, Box, IconButton, styled, Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import CatList from './components/CatList';
import FoodList from './components/FoodList';
import FeedingScheduleList from './components/FeedingScheduleList';
import ProductDetailPage from './components/ProductDetailPage';
import Login from './components/Login';
import Register from './components/Register';
import CartView from './components/CartView';
import Notification from './components/Notification';
import { CartProvider, CartContext } from './contexts/CartContext';

const StyledButton = styled(Button)(({ theme }) => ({
  '&:hover': {
    backgroundColor: '#7b34d1',
  },
}));

const AppContent = ({ enableNavbar, isLoggedIn, disableNavbar }) => {
  const [notification, setNotification] = useState({ open: false, message: '' });
  const { emptyCart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleAddToCart = (item) => {
    setNotification({ open: true, message: `${item.quantity} x ${item.name} added to cart` });
  };

  const handleCloseNotification = () => {
    setNotification({ open: false, message: '' });
  };

  const handleLogout = () => {
    emptyCart();
    disableNavbar();
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };

  return (
    <>
      {isLoggedIn && (
        <AppBar position="static">
          <Toolbar sx={{ justifyContent: 'center' }}>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              FeedYourCat
            </Typography>
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
            <IconButton color="inherit" onClick={handleLogout}>
              <LogoutIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      )}
      <Container sx={{ marginTop: 2 }}>
        <Routes>
          {/* <Route path="/cats" element={<CatList />} /> */}
          <Route path="/foods" element={<FoodList onAddToCart={handleAddToCart} />} />
          <Route path="/feeding-schedules" element={<FeedingScheduleList />} />
          <Route path="/foods/:id" element={<ProductDetailPage onAddToCart={handleAddToCart} />} />
          <Route path="/login" element={<Login enableNavbar={enableNavbar} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<CartView />} />
        </Routes>
      </Container>
      <Notification
        open={notification.open}
        onClose={handleCloseNotification}
        message={notification.message}
      />
    </>
  );
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  const enableNavbar = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  const disableNavbar = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
  };

  return (
    <CartProvider>
      <Router>
        <AppContent enableNavbar={enableNavbar} isLoggedIn={isLoggedIn} disableNavbar={disableNavbar} />
      </Router>
    </CartProvider>
  );
};

export default App;

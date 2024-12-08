// src/components/CartView.js
import React, { useContext } from 'react';
import { Container, Typography, Card, CardContent, CardMedia, Grid, Box, Button } from '@mui/material';
import { CartContext } from '../contexts/CartContext';

const CartView = () => {
  const { cart, removeFromCart, emptyCart } = useContext(CartContext);

  return (
    <Container maxWidth="md">
      <Box sx={{ marginTop: 8 }}>
        <Typography variant="h4" gutterBottom>
          Cart
        </Typography>
        {cart.length === 0 ? (
          <Typography variant="body1">Your cart is empty.</Typography>
        ) : (
          <>
            {cart.map((item) => (
              <Card key={item.id} sx={{ marginBottom: 2 }}>
                <CardMedia
                  component="img"
                  sx={{ width: 150 }}
                  image={item.imageUrl}
                  alt={item.name}
                />
                <CardContent>
                  <Typography variant="h5" component="div">
                    {item.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.description}
                  </Typography>
                  <Grid container spacing={1} alignItems="center" sx={{ marginTop: 2 }}>
                    <Grid item xs={3}>
                      <Typography variant="body2">Quantity: {item.quantity}</Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography variant="body2">Price per product: ${item.price}</Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography variant="body2">Total Price: ${(item.price * item.quantity).toFixed(2)}</Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => removeFromCart(item.id)}
                        fullWidth
                      >
                        Remove
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            ))}
            <Box sx={{ marginTop: 4, display: 'flex', justifyContent: 'space-between' }}>
              <Button variant="contained" color="secondary" onClick={emptyCart}>
                Empty Cart
              </Button>
              <Button variant="contained" color="primary" onClick={() => console.log('Proceed to Payment')}>
                Proceed to Payment
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Container>
  );
};

export default CartView;

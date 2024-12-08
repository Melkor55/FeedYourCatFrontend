// src/components/ProductDetailPage.js
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Typography, Card, CardContent, CardMedia, Grid, Button, TextField } from '@mui/material';
import { CartContext } from '../contexts/CartContext';

const ProductDetailPage = ({ onAddToCart }) => {
  const { id } = useParams();
  const [food, setFood] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    axios.get(process.env.REACT_APP_BASE_LINK_TO_SERVER + `/api/foods/${id}`)
      .then(response => setFood(response.data))
      .catch(error => console.error('Error fetching food details:', error));
  }, [id]);

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleAddToCart = () => {
    if (food) {
      addToCart({ ...food, quantity: parseInt(quantity) });
      onAddToCart({ ...food, quantity: parseInt(quantity) });
    }
  };

  if (!food) return <div>Loading...</div>;

  return (
    <Container>
      <Card>
        <CardMedia
          component="img"
          height="500"
          image={food.imageUrl}
          alt={food.name}
        />
        <CardContent>
          <Typography variant="h4">{food.name}</Typography>
          <Typography variant="h6">{food.brand}</Typography>
          <Typography variant="body1">{food.description}</Typography>
          <Typography variant="body2">Ingredients: {food.ingredients}</Typography>
          <Typography variant="body2">Price: ${food.price}</Typography>
          <Typography variant="body2">Special Diet: {food.specialDiet}</Typography>
          <Typography variant="body2">Cat Age: {food.catAge}</Typography>
          <Typography variant="body2">Quantity: {food.quantity}</Typography>
          <Typography variant="body2">Food Type: {food.foodType}</Typography>
          <Typography variant="body2">Package Type: {food.packageType}</Typography>
          <Grid container spacing={1} alignItems="center" sx={{ marginTop: 2 }}>
            <Grid item xs={6}>
              <TextField
                label="Quantity"
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                inputProps={{ min: 1, max: 20 }}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="contained"
                color="success"
                onClick={handleAddToCart}
                fullWidth
              >
                Add to Cart
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ProductDetailPage;

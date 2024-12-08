// src/components/FoodListView.js
import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography, Grid, Button, TextField, Stack } from '@mui/material';
import { CartContext } from '../contexts/CartContext';

const FoodListView = ({ foods, onAddToCart }) => {
  const [quantities, setQuantities] = useState({});
  const { addToCart } = useContext(CartContext);

  const handleQuantityChange = (id, value) => {
    setQuantities({ ...quantities, [id]: value });
  };

  const handleAddToCart = (id) => {
    const quantity = quantities[id] || 1;
    const food = foods.find((food) => food.id === id);
    addToCart({ ...food, quantity });
    onAddToCart({ ...food, quantity });
  };

  return (
    <Stack spacing={2}>
      {foods.map((food) => (
        <Card key={food.id} sx={{ display: 'flex', flexDirection: 'row' }}>
          <Link to={`/foods/${food.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', width: '100%' }}>
            <CardMedia
              component="img"
              height="140"
              image={food.imageUrl}
              alt={food.name}
              sx={{ width: 150 }}
            />
            <CardContent sx={{ flex: 1 }}>
              <Typography variant="h5" component="div">
                {food.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" noWrap>
                {food.description}
              </Typography>
              <Typography variant="body2" color="text.primary">
                Price: ${food.price}
              </Typography>
              <Grid container spacing={1} alignItems="center" sx={{ marginTop: 2 }}>
                <Grid item xs={6}>
                  <TextField
                    label="Quantity"
                    type="number"
                    value={quantities[food.id] || 1}
                    onChange={(e) => {
                      let value = Math.max(1, Math.min(20, e.target.value));
                      handleQuantityChange(food.id, value);
                    }}
                    inputProps={{ min: 1, max: 20 }}
                    fullWidth
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={(e) => {
                      e.preventDefault();
                      handleAddToCart(food.id);
                    }}
                    fullWidth
                  >
                    Add to Cart
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Link>
        </Card>
      ))}
    </Stack>
  );
};

export default FoodListView;

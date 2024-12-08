// src/components/FoodGridView.js
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography, Grid, Button, TextField, MenuItem } from '@mui/material';
import FoodFilter from './FoodFilter';
import { CartContext } from '../contexts/CartContext';

const FoodGridView = ({foods}) => {
  const [quantities, setQuantities] = useState({});
  const { addToCart } = useContext(CartContext);

  const handleQuantityChange = (id, value) => {
    setQuantities({ ...quantities, [id]: value });
  };

  const handleAddToCart = (id) => {
    const quantity = quantities[id] || 1;
    console.log(`Added ${quantity} of food item ${id} to cart`);
    const food = foods.find((food) => food.id === id);
    addToCart({ ...food, quantity });
  };

  return (
    <Grid container spacing={2}>
        {foods.map(food => (
          <Grid item xs={12} sm={6} md={4} key={food.id}>
            <Card>
              <Link to={`/foods/${food.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <CardMedia
                  component="img"
                  height="250"
                  image={food.imageUrl}
                  alt={food.name}
                  sx={{ objectFit: 'contain', width: '100%' }}
                />
                <CardContent>
                  <Typography variant="h5" component="div">
                    {food.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" noWrap>
                    {food.description}
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
          </Grid>
        ))}
    </Grid>
  );
};

export default FoodGridView;

// src/components/FoodListView.js
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography, Grid, Button, TextField, Stack, ToggleButton, ToggleButtonGroup } from '@mui/material';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import FoodFilter from './FoodFilter';
import { CartContext } from '../contexts/CartContext';

const FoodListView = ({foods}) => {

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

  const preventLinkNavigation = (event) => {
    event.stopPropagation();
  };
  
  return (
    <Stack spacing={2}>
      <ul>
        {foods.map(food => (
            <Card key={food.id} sx={{ display: 'flex', flexDirection: 'row'}}>
            <Link to={`/foods/${food.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', width: '100%' }}>
            {/* Card Image on the Left */}
            <CardMedia
                component="img"
                height="140"
                image={food.imageUrl}
                alt={food.name}
                sx={{ width: 150 }}
            />
        
            {/* Card Content on the Right */}
            <CardContent sx={{ flex: 1 }}>
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
        ))}
      </ul>
    </Stack>
  );
};

export default FoodListView;

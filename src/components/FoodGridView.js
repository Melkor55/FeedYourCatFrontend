// src/components/FoodGridView.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography, Grid, Button, TextField, MenuItem } from '@mui/material';
import FoodFilter from './FoodFilter';

const FoodGridView = ({foods}) => {
  // const [foods, setFoods] = useState([]);
  const [quantities, setQuantities] = useState({});

  // const fetchFoods = (filters = {}) => {
  //   axios.get(process.env.REACT_APP_BASE_LINK_TO_SERVER+'/api/foods', { params: filters })
  //     .then(response => setFoods(response.data))
  //     .catch(error => console.error('Error fetching foods:', error));
  // };

  // useEffect(() => {
  //   fetchFoods();
  // }, []);

  const handleQuantityChange = (id, value) => {
    setQuantities({ ...quantities, [id]: value });
  };

  const handleAddToCart = (id) => {
    const quantity = quantities[id] || 1;
    console.log(`Added ${quantity} of food item ${id} to cart`);
    // Implement add to cart functionality here
  };

  return (
    <Grid container spacing={2}>
      {/* <FoodFilter onFilter={fetchFoods} /> */}
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
                        onChange={(e) => handleQuantityChange(food.id, e.target.value)}
                        inputProps={{ min: 1, max: 20 }}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => handleAddToCart(food.id)}
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

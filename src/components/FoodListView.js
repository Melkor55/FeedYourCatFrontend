// src/components/FoodListView.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography, Grid, Button, TextField, Stack, ToggleButton, ToggleButtonGroup } from '@mui/material';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import FoodFilter from './FoodFilter';

const FoodListView = ({foods}) => {
  // const [foods, setFoods] = useState(importedFoods);
  const [quantities, setQuantities] = useState({});
  // const [view, setView] = useState('list');

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

  // const handleViewChange = (event, nextView) => {
  //   if (nextView !== null) {
  //     setView(nextView);
  //   }
  // };
  
  return (
    <div>
        {/* <ToggleButtonGroup
            value={view}
            exclusive
            onChange={handleViewChange}
            aria-label="view toggle"
            sx={{ marginBottom: 2 }}
        >
            <ToggleButton value="list" aria-label="list view" disabled={view === 'list'}>
            <ViewListIcon />
            </ToggleButton>
            <ToggleButton value="grid" aria-label="grid view" component={Link} to="/FoodGridView">
            <ViewModuleIcon />
            </ToggleButton>
        </ToggleButtonGroup> */}
        <Stack spacing={2}>
            {/* <FoodFilter onFilter={fetchFoods} /> */}
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
                        onChange={(e) => handleQuantityChange(food.id, e.target.value)}
                        inputProps={{ min: 1, max: 20 }}
                        fullWidth
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
    </div>
  );
};

export default FoodListView;

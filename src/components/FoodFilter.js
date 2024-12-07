// src/components/FoodFilter.js
import React, { useState, useEffect } from 'react';
import { TextField, Button, MenuItem, Grid, Slider, Typography } from '@mui/material';
import axios from 'axios';

const FoodFilter = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    name: '',
    brand: '',
    catAge: '',
    foodType: '',
    packageType: '',
    specialDiet: '',
    minQuantity: 0,
    maxQuantity: 0,
    minPrice: 0,
    maxPrice: 100
  });

  const [quantityRange, setQuantityRange] = useState([0, 0]);
  const [priceRange, setPriceRange] = useState([0, 0]);

  useEffect(() => {
    axios.get(process.env.REACT_APP_BASE_LINK_TO_SERVER+'/api/food-ranges')
      .then(response => {
        setQuantityRange([response.data.minQuantity, response.data.maxQuantity]);
        setPriceRange([response.data.minPrice, response.data.maxPrice]);
        setFilters({
          ...filters,
          minQuantity: response.data.minQuantity,
          maxQuantity: response.data.maxQuantity,
          minPrice: response.data.minPrice,
          maxPrice: response.data.maxPrice
        });
      })
      .catch(error => console.error('Error fetching food ranges:', error));
  }, []);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSliderChange = (name) => (event, value) => {
    if (name === "quantity")
        setFilters({
            ...filters,
            minQuantity: value[0],
            maxQuantity: value[1],
        });
    else if (name === "price")
        setFilters({
            ...filters,
            minPrice: value[0],
            maxPrice: value[1],
        });
    // setFilters({
    //     ...filters,
    //     [`min${name.charAt(0).toUpperCase() + name.slice(1)}`]: value[0],
    //     [`max${name.charAt(0).toUpperCase() + name.slice(1)}`]: value[1],
    // });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter(filters);
  };

  const createMarks = (min, max) => {
    return [
      { value: min, label: min.toString() },
      { value: max, label: max.toString() }
    ];
  };

  return (
    <form onSubmit={handleSubmit}>
    <Grid container spacing={2} columnSpacing={8} sx={{ paddingX: 8 }} >
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Name"
            name="name"
            value={filters.name}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Brand"
            name="brand"
            value={filters.brand}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Cat Age"
            name="catAge"
            value={filters.catAge}
            onChange={handleChange}
            select
            fullWidth
          >
            <MenuItem value="kitten">Kitten</MenuItem>
            <MenuItem value="adult">Adult</MenuItem>
            <MenuItem value="senior">Senior</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Food Type"
            name="foodType"
            value={filters.foodType}
            onChange={handleChange}
            select
            fullWidth
          >
            <MenuItem value="dry">Dry</MenuItem>
            <MenuItem value="wet">Wet</MenuItem>
            <MenuItem value="liquid">Liquid</MenuItem>
            <MenuItem value="rewards">Rewards</MenuItem>
            <MenuItem value="supplements">Supplements</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Package Type"
            name="packageType"
            value={filters.packageType}
            onChange={handleChange}
            select
            fullWidth
          >
            <MenuItem value="bag">Bag</MenuItem>
            <MenuItem value="pouch">Pouch</MenuItem>
            <MenuItem value="can">Can</MenuItem>
            <MenuItem value="cup">Cup</MenuItem>
            <MenuItem value="pillow bag">Pillow Bag</MenuItem>
            <MenuItem value="box">Box</MenuItem>
            <MenuItem value="tube">Tube</MenuItem>
            <MenuItem value="stick packs">Stick Packs</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Special Diet"
            name="specialDiet"
            value={filters.specialDiet}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Typography gutterBottom>Quantity (kg)</Typography>
          <Slider
            value={[filters.minQuantity, filters.maxQuantity]}
            onChange={handleSliderChange('quantity')}
            valueLabelDisplay="on"
            min={quantityRange[0]}
            max={quantityRange[1]}
            step={0.01}
            marks={createMarks(quantityRange[0], quantityRange[1])}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Typography gutterBottom>Price ($)</Typography>
          <Slider
            value={[filters.minPrice, filters.maxPrice]}
            onChange={handleSliderChange('price')}
            valueLabelDisplay="on"
            min={priceRange[0]}
            max={priceRange[1]}
            step={0.01}
            marks={createMarks(priceRange[0], priceRange[1])}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Apply Filters
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default FoodFilter;

// src/components/FoodList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Stack, ToggleButton, ToggleButtonGroup } from '@mui/material';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import FoodFilter from './FoodFilter';
import FoodListView from './FoodListView';
import FoodGridView from './FoodGridView';

const FoodList = ({ onAddToCart }) => {
  const [foods, setFoods] = useState([]);
  const [view, setView] = useState('list');

  const fetchFoods = (filters = {}) => {
    axios.get(process.env.REACT_APP_BASE_LINK_TO_SERVER + '/api/foods', { params: filters })
      .then(response => setFoods(response.data))
      .catch(error => console.error('Error fetching foods:', error));
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  const handleViewChange = (event, nextView) => {
    if (nextView !== null) {
      setView(nextView);
    }
  };

  return (
    <Stack spacing={2}>
      <FoodFilter onFilter={fetchFoods} />
      <ToggleButtonGroup
        value={view}
        exclusive
        color='primary'
        onChange={handleViewChange}
        aria-label="view toggle"
        sx={{ marginBottom: 2 }}
      >
        <ToggleButton value="list" aria-label="list view" disabled={view === 'list'}>
          <ViewListIcon />
        </ToggleButton>
        <ToggleButton value="grid" aria-label="grid view" disabled={view === 'grid'}>
          <ViewModuleIcon />
        </ToggleButton>
      </ToggleButtonGroup>
      {view === 'list' ?
        <FoodListView foods={foods} onAddToCart={onAddToCart} />
        :
        <FoodGridView foods={foods} onAddToCart={onAddToCart} />
      }
    </Stack>
  );
};

export default FoodList;

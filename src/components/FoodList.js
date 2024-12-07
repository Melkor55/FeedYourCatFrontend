// src/components/FoodList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import FoodFilter from './FoodFilter';

const FoodList = () => {
  const [foods, setFoods] = useState([]);

  const fetchFoods = (filters = {}) => {
    axios.get(process.env.REACT_APP_BASE_LINK_TO_SERVER+'/api/foods', { params: filters })
        .then(response => setFoods(response.data))
        .catch(error => console.error('Error fetching foods:', error));
    };

    useEffect(() => {
      fetchFoods();
    }, []);

    return (
      <div>
        <h1>Food List</h1>
        <FoodFilter onFilter={fetchFoods} />
        <ul>
          {foods.map(food => (
            <li key={food.id}>
              <Link to={`/foods/${food.id}`}>{food.name} - {food.brand}</Link>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  export default FoodList;

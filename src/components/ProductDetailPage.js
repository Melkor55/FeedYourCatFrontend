// src/components/ProductDetailPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Typography, Card, CardContent, CardMedia, Grid } from '@mui/material';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [food, setFood] = useState(null);

  useEffect(() => {
    axios.get(process.env.REACT_APP_BASE_LINK_TO_SERVER+`/api/foods/${id}`)
      .then(response => setFood(response.data))
      .catch(error => console.error('Error fetching food details:', error));
  }, [id]);

  if (!food) return <div>Loading...</div>;

  return (
    <Container>
      <Card>
        <CardMedia
          component="img"
          height="300"
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
        </CardContent>
      </Card>
    </Container>
  );
};

export default ProductDetailPage;

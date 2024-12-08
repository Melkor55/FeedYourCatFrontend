// src/components/Login.js
import React from 'react';
import { Container, Typography, TextField, Button, Box } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';

const Login = ({ enableNavbar }) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    enableNavbar();
    navigate('/foods');
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ marginTop: 8 }}>
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <TextField label="Username" fullWidth margin="normal" />
        <TextField label="Password" type="password" fullWidth margin="normal" />
        <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
          Login
        </Button>
        <Button variant="text" color="secondary" fullWidth component={Link} to="/register">
          Don't have an account? Register
        </Button>
      </Box>
    </Container>
  );
};

export default Login;

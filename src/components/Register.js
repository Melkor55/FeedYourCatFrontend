// src/components/Register.js
import React from 'react';
import { Container, Typography, TextField, Button, Box } from '@mui/material';

const Register = () => {
  return (
    <Container maxWidth="sm">
      <Box sx={{ marginTop: 8 }}>
        <Typography variant="h4" gutterBottom>
          Register
        </Typography>
        <TextField label="Username" fullWidth margin="normal" />
        <TextField label="Password" type="password" fullWidth margin="normal" />
        <TextField label="Email" type="email" fullWidth margin="normal" />
        <TextField label="Country" fullWidth margin="normal" />
        <TextField label="County" fullWidth margin="normal" />
        <TextField label="City" fullWidth margin="normal" />
        <TextField label="Address" fullWidth margin="normal" />
        <Button variant="contained" color="primary" fullWidth>
          Register
        </Button>
      </Box>
    </Container>
  );
};

export default Register;

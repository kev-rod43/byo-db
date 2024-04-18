import React from 'react';
import { Box, Button } from '@mui/material';
import Typography from '@mui/material/Typography';

export default function WelcomeBox() {
  return (
    <Box
      height={300}
      width={400} 
      my={4}
      display="flex"
      flexDirection="column"  
      justifyContent="center"
      alignItems="center"
      gap={2} 
      p={2}
      sx={{
        border: '2px',
        borderRadius: '16px', 
        boxShadow: '0 2px 22px rgba(0, 0, 0, 0.1)', 
        margin: 'auto', 
        position: 'relative', 
        top: '50%',
        transform: 'translateY(-50%)' 
      }}
    >
      <Typography variant="h5" component="h1" gutterBottom>
        Welcome to Build Your own DB! 
      </Typography>
      <Button variant="contained" color="primary">Login</Button>
      <Button variant="outlined" color="primary" >Signup</Button>
    </Box>
  );
}
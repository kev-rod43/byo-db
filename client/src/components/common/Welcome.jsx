import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useEffect } from 'react';
import  LoginForm from '../forms/Login'; 
import SignupForm from '../forms/Signup'; 
import auth from '../../utils/auth';

function WelcomeBox() {
  const [view, setView] = useState('welcome'); // 'welcome', 'login', 'signup'
  useEffect(()=>{
    if(!auth.isTokenExpired()){
      
      setView('loggedIn')
    }
  })

  const handleLoginClick = () => {
    setView('login');
  };

  const handleSignupClick = () => {
    setView('signup');
  };

  // Backwards Navigation
  const handleBack = () => {
    setView('welcome'); // Set view back to welcome
  };

  return (
    <Box
      width={500}  // Maintain a consistent width
      my={4}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap={2}
      p={2}
      sx={{
        borderRadius: '16px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
        margin: 'auto',
        position: 'relative',
        top: '20vh',  // Lower positioning on the page
        transform: 'translateY(-50%)',
        bgcolor: 'background.paper',  // Ensure background color is set if border is removed
        transition: 'all 0.3s',  // Smooth transition for resizing
      }}
    >
      {view === "loggedIn" && (
         <>
         <Typography variant="h5" component="h1" gutterBottom>
           Welcome!
         </Typography>

       </>
      )}
      {view === 'welcome' && (
        <>
          <Typography variant="h5" component="h1" gutterBottom>
            Welcome!
          </Typography>
          <Button variant="contained" color="primary" onClick={handleLoginClick}>Login</Button>
          <Button variant="outlined" color="primary" onClick={handleSignupClick}>Signup</Button>
        </>
      )}
      {view === 'login' && (
        <LoginForm  onBack={handleBack}/>
      )}
      {view === 'signup' && (
        <SignupForm onBack={handleBack}/>
      )}
    </Box>
  );
}

export default WelcomeBox;

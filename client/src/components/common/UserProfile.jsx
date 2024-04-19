import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import AuthService from '../../utils/auth';

const UserProfile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = () => {
      try {
        const userProfile = AuthService.getProfile();
        if (userProfile) {
          setProfile(userProfile);
        } else {
          console.log("No profile found. User might not be logged in.");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <Container component="main" maxWidth="sm">
      <Box sx={{ my: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h4">
          User Profile
        </Typography>
        {profile ? (
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1"><strong>Username:</strong> {profile.username}</Typography>
            <Typography variant="body1"><strong>Email:</strong> {profile.email}</Typography>
            <Typography variant="body1"><strong>Expiration:</strong> {new Date(profile.exp * 1000).toLocaleString()}</Typography>
            {/* You can add more fields as needed */}
          </Box>
        ) : (
          <Typography variant="body2" color="error">
            No user data available. Please log in.
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default UserProfile;

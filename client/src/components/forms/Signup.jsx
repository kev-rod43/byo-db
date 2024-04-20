import * as React from 'react';
import { Box, TextField, IconButton, InputAdornment, Container, Button } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import useSignup from '../../hooks/useSignup';  // Adjust the import path as necessary

function SignupForm({ onBack }) {
  const [values, setValues] = React.useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    showPassword: false,
  });

  const { signup, loading, error } = useSignup();

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (values.password !== values.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    await signup(values.username, values.email, values.password);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        component="form"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          top: '20vh'
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <TextField
          fullWidth
          required
          id="username"
          label="Username"
          value={values.username}
          onChange={handleChange('username')}
          margin="normal"
        />
        <TextField
          fullWidth
          required
          id="email"
          label="Email"
          value={values.email}
          onChange={handleChange('email')}
          margin="normal"
        />
        <TextField
          fullWidth
          required
          id="password"
          label="Password"
          type={values.showPassword ? 'text' : 'password'}
          value={values.password}
          onChange={handleChange('password')}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          margin="normal"
        />
        <TextField
          fullWidth
          required
          id="confirmPassword"
          label="Confirm Password"
          type={values.showPassword ? 'text' : 'password'}
          value={values.confirmPassword}
          onChange={handleChange('confirmPassword')}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          margin="normal"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={loading}
        >
          Sign Up
        </Button>
        {error && (
          <p style={{ color: 'red' }}>
            {error.graphQLErrors.map((err, index) => <span key={index}>{err.message}</span>)}
            {error.networkError && <span>{error.networkError.message}</span>}
          </p>
        )}
        <Button
          onClick={onBack}
          fullWidth
          variant="text"
          sx={{ mt: 1, mb: 2 }}
        >
          Back
        </Button>
      </Box>
    </Container>
  );
}

export default SignupForm;
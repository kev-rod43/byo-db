import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { useMutation } from '@apollo/client'
import { ADD_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';


function SignupForm( { onBack }) {
  const [values, setValues] = React.useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    showPassword: false,
  });

  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(values)
    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await addUser({
        variables: {...values}
      });

      const { token, user } = data.addUser;
      console.log(user);
      Auth.login(token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setValues({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      showPassword: false,
    });
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
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
          onClick={handleFormSubmit}
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign Up
        </Button>
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

export default SignupForm
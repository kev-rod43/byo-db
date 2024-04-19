import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../utils/mutations'; // Ensure the path to your mutations file is correct
import AuthService from '../utils/auth';


function useLogin() {
    const [loginMutation, { loading, error }] = useMutation(LOGIN);
    const [apiError, setApiError] = useState(null);
  
    const login = async (email, password) => {
      try {
        const { data } = await loginMutation({
          variables: { email, password }
        });
        if (data.login.token) {
          AuthService.login(data.login.token);
        } else {
          setApiError('Login failed: No token received.');
        }
      } catch (err) {
        console.error("Login error:", err);
        setApiError(err.message || 'An error occurred during login.');
      }
    };
  
    return { login, loading, error: error || apiError };
  }
  
  export default useLogin;

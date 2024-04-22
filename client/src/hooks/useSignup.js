import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations'; 
import AuthService from '../utils/auth';

function useSignup() {
    const [signupMutation, { loading, error }] = useMutation(ADD_USER);
    const [apiError, setApiError] = useState(null);
  
    const signup = async (username, email, password) => {
      try {
        const { data } = await signupMutation({
          variables: { username, email, password }
        });
        if (data.addUser.token) {
          AuthService.login(data.addUser.token);  // Auto login after successful signup
        } else {
          setApiError('Signup failed: No token received.');
        }
      } catch (err) {
        console.error("Signup error:", err);
        setApiError(err.message || 'An error occurred during signup.');
      }
    };
  
    return { signup, loading, error: error || apiError };
  }
  
  export default useSignup;

import { createContext, useContext, useReducer, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import reducer from './reducers';
// Initialize new context for the user
const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
      // Initialize `useReducer` hook. Returns state and a dispatch function. Accepts arguments of our reducer and initial state
    const [state, dispatch] = useReducer(reducer, {});

  // The value prop expects an initial state object, here we give it the global state object and the dispatch function from `useReducer` hook
  return (
    <UserContext.Provider
      value={[state, dispatch]}
    >
      {/* We render children in our component so that any descendent can access the value from the provider */}
      {children}
    </UserContext.Provider>
  );
};

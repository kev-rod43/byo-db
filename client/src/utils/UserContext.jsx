import { createContext, useContext, useReducer, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import reducer from './reducers';
import { QUERY_ME } from '../utils/queries';

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const { loading, data, error } = useQuery(QUERY_ME);

    // Initialize state with null or an appropriate initial structure
    const initialState = {
        user: null,
        isLoading: true,
        error: null
    };

    // Initialize `useReducer` hook
    const [state, dispatch] = useReducer(reducer, initialState);

    // Effect to update state when data changes
    useEffect(() => {
        if (loading) {
            dispatch({ type: 'SET_LOADING' });
        } else if (error) {
            dispatch({ type: 'SET_ERROR', payload: error });
        } else if (data && data.me) {
            dispatch({ type: 'SET_USER', payload: data.me });
        }
    }, [loading, data, error]);

    // Handle loading state in UI
    if (loading) {
        return <h2>LOADING...</h2>;
    }

    return (
        <UserContext.Provider value={[state, dispatch]}>
            {children}
        </UserContext.Provider>
    );
};
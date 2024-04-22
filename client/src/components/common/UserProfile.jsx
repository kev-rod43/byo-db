import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../../utils/queries';
import { useUserContext } from '../../utils/UserContext';
import { SET_INITIAL_STATE } from '../../utils/actions';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const UserPage = () => {
  const { loading, data, error } = useQuery(QUERY_ME);
  const [state, dispatch] = useUserContext();

  useEffect(() => {
    if (!loading && data) {
      dispatch({
        type: SET_INITIAL_STATE,
        payload: data.me
      });
    }
  }, [loading, data, dispatch]);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">An error occurred while fetching user data!</Alert>;
  if (!state.username) return <h2>Loading user data...</h2>;

  return (
    <Box sx={{ padding: 4, borderRadius: '16px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', }}>
      <Typography variant="h2" gutterBottom>
        User Information
      </Typography>
      <Typography variant="h3">Username: {state.username}</Typography>
      <Typography variant="h3">Email: {state.email}</Typography>

      <TableContainer component={Paper} 
        sx={{ 
          marginTop: 4,
          borderRadius: '16px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)', 
          }}>
        <Table aria-label="collections table">
          <TableHead>
            <TableRow>
              <TableCell>Collection Name</TableCell>
              <TableCell align="right">Number of Products</TableCell>
              <TableCell align="right">Total Value ($)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state.collections.map((collection) => (
              <TableRow key={collection._id}>
                <TableCell component="th" scope="row">
                  {collection.collection_name}
                </TableCell>
                <TableCell align="right">{collection.products.length}</TableCell>
                <TableCell align="right">
                  {collection.products.reduce((acc, product) => acc + product.price, 0).toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UserPage;

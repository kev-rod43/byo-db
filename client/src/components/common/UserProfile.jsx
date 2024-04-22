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
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const UserPage = () => {
  const navigate = useNavigate();
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

  const handleNavigateToCollections = () => {
    navigate('/collections');
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        User Information
      </Typography>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6">
          Username: <strong>{state.username}</strong>
        </Typography>
        <Typography variant="h6">
          Email: <strong>{state.email}</strong>
        </Typography>
      </Box>

      <TableContainer component={Paper} sx={{ mt: 4 }}>
        <Table aria-label="collections table">
          <TableHead>
            <TableRow>
              <TableCell style={{ textDecoration: 'underline' }}>Collection Name</TableCell>
              <TableCell align="right" style={{ textDecoration: 'underline' }}>Number of Products</TableCell>
              <TableCell align="right" style={{ textDecoration: 'underline' }}>Total Value ($)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state.collections.map((collection, index) => (
              <TableRow key={`collection-${collection._id}`}>
                <TableCell>{collection.collection_name}</TableCell>
                <TableCell align="right">{collection.products.length}</TableCell>
                <TableCell align="right">
                  {collection.products.reduce((acc, product) => acc + product.price, 0).toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
            <TableRow key="manage-collections-row">
              <TableCell colSpan={3} align="center">
                <Button variant="contained" color="primary" onClick={handleNavigateToCollections}>
                  Manage Collections
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UserPage;

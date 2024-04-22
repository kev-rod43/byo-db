import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../../utils/queries';
import { useUserContext } from '../../utils/UserContext';
import { SET_INITIAL_STATE } from '../../utils/actions';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

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
  if (!state.username) return <h2>Loading user data...</h2>; // Ensure data is there before rendering

  const { username, email, collections } = state;

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        User Information
      </Typography>
      <Typography variant="h6">Username: {username}</Typography>
      <Typography variant="h6">Email: {email}</Typography>
      <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>
        Collections
      </Typography>
      {collections.map((collection) => (
        <Box key={collection._id} sx={{ mb: 2 }}>
          <Typography variant="subtitle1">{collection.collection_name}</Typography>
          {collection.products.map((product) => (
            <Box key={product._id} sx={{ ml: 2 }}>
              <Typography variant="body1">Product Name: {product.product_name}</Typography>
              <Typography variant="body2">Stock: {product.stock}</Typography>
              <Typography variant="body2">Description: {product.description}</Typography>
              <Typography variant="body2">Price: ${product.price}</Typography>
              <Typography variant="body2">Condition: {product.condition}</Typography>
              <Box sx={{ ml: 2, mt: 1 }}>
                <Typography variant="body2">Shipping Dimensions (HxWxD): {product.shipping_properties.height} x {product.shipping_properties.width} x {product.shipping_properties.depth} inches</Typography>
                <Typography variant="body2">Weight: {product.shipping_properties.weight} lbs</Typography>
              </Box>
              <Typography variant="body2">
                Tags: {product.tags.map(tag => tag.tag_name).join(', ')}
              </Typography>
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  );
};

export default UserPage;

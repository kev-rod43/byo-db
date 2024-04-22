import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InputAdornment from '@mui/material/InputAdornment';
import { useMutation } from '@apollo/client';
import { useUserContext } from '../../../utils/UserContext';
import { UPDATE_PRODUCT } from '../../../utils/mutations';

export default function UpdateProductForm({ updateProductModalState, collectionName, product }) {
  const [open, setOpen] = updateProductModalState;
  const [updateProduct, { data, error }] = useMutation(UPDATE_PRODUCT);
  const [state, dispatch] = useUserContext()
  const handleClose = () => {
    setOpen(false);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const productInput = {
      product_name: formJson.productName,
      stock: Number(formJson.stock),
      description: formJson.description,
      purchased: Number(formJson.acquisitionCost),
      price: Number(formJson.price),
      condition: formJson.condition,
      shipping_properties: {
        height: Number(formJson.height),
        width: Number(formJson.width),
        depth: Number(formJson.depth),
        weight: Number(formJson.weight),
      }
    }
    try {
      const { data, error } = await updateProduct({
        variables: { collectionName: collectionName, updatedProductObject: productInput, productId: product._id }
      })
      if (!error) {
        dispatch({
          type: "SET_INITIAL_STATE",
          payload: data.updateProduct
        })
      }
      handleClose();
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: 'form',
        onSubmit: submitHandler
      }}
    >
      <DialogTitle>Edit Product</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To edit a product, simply fill/modify the at least the minimum required fields, then click "Sumbit"
        </DialogContentText>
        <TextField
          autoFocus
          required
          margin="dense"
          id="name"
          name="productName"
          label="Product Name"
          type="text"
          fullWidth
          variant="standard"
          defaultValue={product.product_name}
        />
        <TextField
          required
          margin="dense"
          id="stock"
          name="stock"
          label="Stock Count"
          type="number"
          fullWidth
          variant="standard"
          defaultValue={product.stock}
        />
        <TextField
          margin="dense"
          id="description"
          name="description"
          label="Product Description"
          type="text"
          fullWidth
          variant="standard"
          defaultValue={product.description}
        />
        <TextField
          margin="dense"
          id="acquisitionCost"
          name="acquisitionCost"
          label="Acquisition Cost"
          type="number"
          variant="standard"
          defaultValue={product.purchased}
          sx={{
            width: "49%",
            marginRight: "2%"
          }}
          InputProps={{
            endAdornment: <InputAdornment position="end">$</InputAdornment>,
          }}

        />
        <TextField
          margin="dense"
          id="price"
          name="price"
          label="Selling Price"
          type="number"
          variant="standard"
          sx={{ width: "49%" }}
          defaultValue={product.price}
          InputProps={{
            endAdornment: <InputAdornment position="end">$</InputAdornment>,
          }}
        />
        <TextField
          margin="dense"
          id="condition"
          name="condition"
          label="Product Condition"
          type="text"
          fullWidth
          variant="standard"
          defaultValue={product.condition}
        />
        <TextField
          margin="dense"
          id="height"
          name="height"
          label="Product Height"
          type="number"
          variant="standard"
          defaultValue={product.shipping_properties?.height}
          sx={{
            width: "49%",
            marginRight: "2%"
          }}
          InputProps={{
            endAdornment: <InputAdornment position="end">cm</InputAdornment>,
          }}

        />
        <TextField
          margin="dense"
          id="price"
          name="width"
          label="Product Width"
          type="number"
          variant="standard"
          defaultValue={product.shipping_properties?.width}
          sx={{ width: "49%" }}
          InputProps={{
            endAdornment: <InputAdornment position="end">cm</InputAdornment>,
          }}
        />
        <TextField
          margin="dense"
          id="depth"
          name="depth"
          label="Product Depth"
          type="number"
          variant="standard"
          defaultValue={product.shipping_properties?.depth}
          sx={{
            width: "49%",
            marginRight: "2%"
          }}
          InputProps={{
            endAdornment: <InputAdornment position="end">cm</InputAdornment>,
          }}
        />
        <TextField
          margin="dense"
          id="weight"
          name="weight"
          label="Product Weight"
          type="number"
          variant="standard"
          defaultValue={product.shipping_properties?.weight}
          sx={{ width: "49%" }}
          InputProps={{
            endAdornment: <InputAdornment position="end">g</InputAdornment>,
          }}
        />


      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit">Submit</Button>
      </DialogActions>
    </Dialog>
  );
}
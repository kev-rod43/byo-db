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
import { CREATE_PRODUCT } from '../../../utils/mutations';

export default function CreateProductForm({ createProductModalState, collectionName }) {
  const [open, setOpen] = createProductModalState;
  const [createProduct, { data, error }] = useMutation(CREATE_PRODUCT);
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
      const { data, error } = await createProduct({
        variables: { collectionName: collectionName, productInput: productInput }
      })
      if (!error) {
        dispatch({
          type: "SET_INITIAL_STATE",
          payload: data.createProduct
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
      <DialogTitle>Create a Product</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To create a product, simply fill the at least the minimum required fields, then click "Sumbit"
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
        />
        <TextField
          margin="dense"
          id="description"
          name="description"
          label="Product Description"
          type="text"
          fullWidth
          variant="standard"
        />
        <TextField
          margin="dense"
          id="acquisitionCost"
          name="acquisitionCost"
          label="Acquisition Cost"
          type="number"
          inputProps={{step: "0.01"}}
          variant="standard"
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
          inputProps={{step: "0.01"}}
          variant="standard"
          sx={{ width: "49%" }}
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
        />
        <TextField
          margin="dense"
          id="height"
          name="height"
          label="Product Height"
          type="number"
          inputProps={{step: "0.01"}}
          variant="standard"
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
          inputProps={{step: "0.01"}}
          variant="standard"
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
          inputProps={{step: "0.01"}}
          variant="standard"
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
          inputProps={{step: "0.01"}}
          variant="standard"
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
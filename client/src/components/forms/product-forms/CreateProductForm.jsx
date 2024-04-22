import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InputAdornment from '@mui/material/InputAdornment';

export default function CreateProductForm() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            console.log(formData);
            handleClose();
          },
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
            name="product name"
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
            name="acquisition cost"
            label="Acquisition Cost"
            type="number"
            variant="standard"
            sx={{
                width: "49%",
                marginRight: "2%"
            }}
            endAdornment={<InputAdornment position="end">$</InputAdornment>}
          />
          <TextField
            margin="dense"
            id="price"
            name="price"
            label="Selling Price"
            type="number"
            variant="standard"
            sx={{width: "49%"}}
            endAdornment={<InputAdornment position="end">$</InputAdornment>}
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
            variant="standard"
            sx={{
                width: "49%",
                marginRight: "2%"
            }}
            endAdornment={<InputAdornment position="end">cm</InputAdornment>}
          />
          <TextField
            margin="dense"
            id="price"
            name="width"
            label="Product Width"
            type="number"
            variant="standard"
            sx={{width: "49%"}}
            endAdornment={<InputAdornment position="end">cm</InputAdornment>}
          />
          <TextField
            margin="dense"
            id="depth"
            name="depth"
            label="Product Depth"
            type="number"
            variant="standard"
            sx={{
                width: "49%",
                marginRight: "2%"
            }}
            endAdornment={<InputAdornment position="end">cm</InputAdornment>}
          />
          <TextField
            margin="dense"
            id="weight"
            name="weight"
            label="Product Weight"
            type="number"
            variant="standard"
            sx={{width: "49%"}}
            endAdornment={<InputAdornment position="end">g</InputAdornment>}
          />
          
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </Dialog>
  );
}
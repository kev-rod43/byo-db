import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useMutation } from '@apollo/client';


import { DELETE_PRODUCT } from '../../utils/mutations';

export default function AlertDialog({ modalState, productToDelete, collectionName }) {
    const [deleteProduct, { data, error }] = useMutation(DELETE_PRODUCT);

    const handleClose = () => {
        setOpen(false);
    };

    const handleYes = async () => {
        // we grab the product's id and delete from database and then use reducer to change local state
        try {
            const { data } = await deleteProduct({
                variables: { collectionName: collectionName, productId: productToDelete }
            })
        } catch {

        }
        handleClose();
    }

    const [open, setOpen] = modalState;

    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Are you sure you want to delete the product?
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose}>No</Button>
                    <Button onClick={handleClose} autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
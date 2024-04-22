import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { useMutation } from '@apollo/client';
import { useUserContext } from '../../../utils/UserContext';
import { DELETE_PRODUCT } from '../../../utils/mutations';

export default function ProductDeleteConfirm({ deleteProductModalState, productToDelete, collectionName }) {
    const [deleteProduct, { data, error }] = useMutation(DELETE_PRODUCT);
    const [state, dispatch] = useUserContext()
    const handleClose = () => {
        setOpen(false);
    };

    const handleYes = async () => {
        // we grab the product's id and delete from database and then use reducer to change local state
        try {
            const { data } = await deleteProduct({
                variables: { collectionName: collectionName, productId: productToDelete }
            })
            if(!error){
                dispatch({
                    type: "SET_INITIAL_STATE",
                    payload:  data.deleteProduct 
                })
            }
        } catch (err){
            console.log(err)

        }
        handleClose();
    }

    const [open, setOpen] = deleteProductModalState;

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
                    <Button onClick={handleYes} autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
import * as React from "react";
import { Dialog, DialogTitle, DialogActions, Button } from "@mui/material";
import { useMutation } from "@apollo/client";
import { useUserContext } from "../../utils/UserContext";
import { DELETE_COLLECTION } from "../../utils/mutations";

export default function DeleteCollectionForm({ modalState, collectionName }) {
  const [open, setOpen] = modalState;
  const [state, dispatch] = useUserContext();
  const [deleteCollection, { data, error }] = useMutation(DELETE_COLLECTION);

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    console.log(collectionName)
    try {
        const { data } = await deleteCollection({
            variables: { collectionName: collectionName }
        });
        if (!error) {
            dispatch({
                type: 'SET_INITIAL_STATE',
                payload: data.deleteCollection
            })
        }
        handleClose();
    } catch (err) {
        console.log(err);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Are you sure you want to delete this collection?
      </DialogTitle>
      <DialogActions>
        <Button onClick={handleClose}>No</Button>
        <Button onClick={handleDelete} autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}

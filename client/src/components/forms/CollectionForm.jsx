import * as React from "react";
import { TextField, Button, Dialog, DialogActions, DialogTitle, DialogContent } from "@mui/material";
import { useMutation } from "@apollo/client";
import { CREATE_COLLECTION, UPDATE_COLLECTION } from "../../utils/mutations";
import { useUserContext } from "../../utils/UserContext";

export default function CollectionForm({ modalState, mode, collectionName }) {
  const [formData, setFormData] = React.useState({ name: "" });
  const [addCollection, { data : creationData, error : creationError }] = useMutation(CREATE_COLLECTION);
  const [updateCollection, { data : updateData, error : updateError }] = useMutation(UPDATE_COLLECTION);
  const handleChange = (e) => setFormData({ name: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    mode === "add"
      ? modeAdd() // replace with addCollection mutation
      : modeUpdate(); // replace with updateCollectin mutation
  };

  const [open, setOpen] = modalState;
  const handleClose = () => setOpen(false);

  const [state, dispatch] = useUserContext();

  const modeAdd = async () => {
    console.log(`Collection added.`);
    try {
      const { data } = await addCollection({
        variables: { collectionName: formData.name },
      });
      dispatch({
        type: "SET_INITIAL_STATE",
        payload: data.createCollection,
      });
      handleClose();
    } catch (err) {
      console.log(err);
    }
  };

  const modeUpdate = async () => {
    try {
      const { data } = await updateCollection({
        variables: { currentName: collectionName, newName: formData.name },
      });
      dispatch({
        type: "SET_INITIAL_STATE",
        payload: data.updateCollection,
      });
      handleClose();
    } catch (err) {
      console.log(err);
    }
  };

  const styles = {
    container: {
      border: "2px solid black",
      width: 500,
    },
    formElements: {
      marginTop: "10px",
      marginBottom: "10px",
    },
  };

  return (
      <Dialog
        sx={{ padding: '30px'}}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {mode === "add"
            ? `Enter a name for the collection`
            : `What would you like to rename the database to?`}
        </DialogTitle>
        <DialogContent>
          <TextField
            sx={styles.formElements}
            onChange={handleChange}
            placeholder="Books"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit}>
            {mode === "add" ? `Create` : `Update`}
          </Button>
        </DialogActions>
      </Dialog>
  );
}

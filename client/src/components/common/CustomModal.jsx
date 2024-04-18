import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

function CustomModal({ open, handleClose, title, children }) {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-title" variant="h6" component="h2">
          {title}
        </Typography>
        <div id="modal-description" style={{ marginTop: 20 }}>
          {children}
        </div>
        <Button onClick={handleClose} style={{ marginTop: 20 }}>Close</Button>
      </Box>
    </Modal>
  );
}

export default CustomModal;
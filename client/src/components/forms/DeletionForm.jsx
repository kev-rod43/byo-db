import * as React from "react";
import { Container, Box, Typography, Button } from "@mui/material";


/*
    This delete form can either be used for deletion of products
    or collections by using the correct mode prop.

    name = product or collection name
    mode = use 'product' for product deletion and 'collection' for collection deletion
    id   = the id of the product or collection to delete.

*/

export default function DeleteCollection({ name, mode, id }) {
  const [elapsed, setElapsedTime] = React.useState(0);

  React.useEffect(() => {
    if (elapsed <= 2) {
      const interval = setInterval(() => {
        setElapsedTime(elapsed + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [elapsed]);

  const handleDelete = () => {
    switch (mode) {
        case 'product':
            // TODO: implement product deletion
            break;
        case 'collection':
            // TODO: implement collection deletion
            break;
    }
  }

  return (
    <Container sx={{ border: "2px black solid" }}>
      <Box>
        <Typography>{`Are you sure you want to delete ${name}`}</Typography>
        <Button disabled={!(elapsed > 2)}>Yes</Button>
        <Button>No</Button>
      </Box>
    </Container>
  );
}
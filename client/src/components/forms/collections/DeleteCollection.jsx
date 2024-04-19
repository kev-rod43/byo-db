import * as React from 'react';
import { Container, Box, Typography, Button } from '@mui/material';

export default function DeleteCollection ({ name }) {
    const [elapsed, setElapsedTime] = React.useState(0);

    React.useEffect(() => {
        if (elapsed <= 2) {
            const interval = setInterval(() => {
                setElapsedTime(elapsed  + 1);
            }, 1000);
             return () => clearInterval(interval);
        } 
    }, [elapsed]);

    return (
        <Container sx={{border: '2px black solid'}}>
            <Box>
                <Typography>{`Are you sure you want to delete ${name}`}</Typography>
                <Button disabled={!(elapsed > 2)}>Yes</Button>
                <Button>No</Button>
            </Box>
        </Container>
    );
}
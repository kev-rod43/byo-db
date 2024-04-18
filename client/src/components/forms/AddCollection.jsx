import * as React from 'react';
import { Container, Box, TextField, Button, Typography } from '@mui/material';

export default function AddCollectionForm () {
    const [formData, setFormData] = React.useState({ name: '' });

    const handleChange = (e) => setFormData({ name: e.target.value});

    const handleSubmit = () => {
        console.log(formData);
        return setFormData({ name: '' });
    }

    const styles = {
        container: {
            border: '2px solid black',
            width: 500
        },
        formElements: {
            marginTop: '10px',
            marginBottom: '10px'
        }
    }

    return (
        <Container sx={styles.container} >
            <Box>
                <form style={styles} onSubmit={handleSubmit}>
                    <Typography sx={styles.formElements}>Enter collection name:</Typography>
                    <TextField sx={styles.formElements} onChange={handleChange} placeholder='Books'/><br/>
                    <Button sx={styles.formElements} type='submit' disabled={formData.name.trim() == ''}>Create</Button>
                </form>
            </Box>
        </Container>
    )
}
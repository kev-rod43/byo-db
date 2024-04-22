import * as React from 'react';
import { Container, Box, TextField, Button, Typography } from '@mui/material';
import { useMutation } from '@apollo/client';
import { CREATE_COLLECTION } from "../../utils/mutations"
import { useUserContext } from '../../utils/UserContext';


export default function CollectionForm({ mode }) {
    const [formData, setFormData] = React.useState({ name: '' });
    const [addCollection, { data, error }] = useMutation(CREATE_COLLECTION);
    const handleChange = (e) => setFormData({ name: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        mode === 'add'
            ? modeAdd()     // replace with addCollection mutation 
            : modeUpdate()  // replace with updateCollectin mutation

    }

    const [state, dispatch] = useUserContext();

    const modeAdd = async () => {
        console.log(`Collection added.`);
        try {
            const { data } = await addCollection({
                variables: { collectionName: formData.name }
            });
            dispatch({
                type: "SET_INITIAL_STATE",
                payload: data.createCollection
            });
        } catch (err) {
            console.log(err);
        }
    };

    const modeUpdate = () => {
        console.log(`Collection updated.`);
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
                    <Typography sx={styles.formElements}>
                        {
                            (mode === 'add')
                                ? `Enter a name for the collection`
                                : `What would you like to rename the database to?`
                        }
                    </Typography>
                    <TextField sx={styles.formElements} onChange={handleChange} placeholder='Books' /><br />
                    <Button sx={styles.formElements} type='submit' disabled={formData.name.trim() == ''}>Create</Button>
                </form>
            </Box>
        </Container>
    )
}
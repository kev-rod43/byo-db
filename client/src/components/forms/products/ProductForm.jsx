import * as React from 'react';
import { 
    Container,
    Box,
    Typography,
    FormGroup,
    FormControlLabel,
    Checkbox,
    TextField,
    Select,
    MenuItem,
    Button
} from '@mui/material';

export default function ProductForm () {
    const styles = {
        header: {
            fontSize: '2rem'
        },
        container: {
            border: '2px black solid'
        },
        formFields: {
            marginTop: '10px',
            marginBottom: '10px'
        },
        shipping_details: {
            display: 'flex',
            justifyContent: 'space-around'
        }
    }

    const [formData, setFormData] = React.useState({
        product_name: '',
        stock: 0,
        description: '',
        purchased: 0,
        price: 0.00,
        condition: '',
        height: 0,
        width: 0,
        depth: 0,
        weight: 0
    });

    const [checks, setCheckState] = React.useState({
        description: false,
        purchased: false,
        price: false,
        condition: false,
        shipping_properties: false
    });

    const {
        description,
        purchased,
        price,
        condition,
        shipping_properties
    } = checks;

    const handleInputChange = (prop) => (event) => {
        return setFormData({ ...formData, [prop]: event.target.value });
    }

    const handleCheckChange = (prop) => (event) => {
        return setCheckState({ ...checks, [prop]: event.target.checked });
    }

    // TODO: implement database functionality
    const handleSubmit = () => {
        console.log(formData);
        setFormData({
            product_name: '',
            stock: 0,
            description: '',
            purchased: 0,
            price: 0.00,
            condition: '',
            height: 0,
            width: 0,
            depth: 0,
            weight: 0
        })
    }

    return (
        <Container style={styles.container}>
            <Box>
                <Typography sx={styles.header}>Enter Product details below: </Typography>
                <FormGroup>
                    <TextField
                        id='outlined-basic'
                        variant='outlined'
                        label='Product Name'
                        onChange={handleInputChange('product_name')}
                        required
                        style={styles.formFields}
                    />
                    <TextField
                        id='outlined-basic'
                        variant='outlined'
                        label='Stock'
                        onChange={handleInputChange('stock')}
                        required
                        style={styles.formFields}
                    />
                    <FormControlLabel
                        label='Add a Description?'
                        control={
                            <Checkbox checked={description} onChange={handleCheckChange('description')}/>
                        }
                    >
                    </FormControlLabel>
                    {
                        (checks.description === true)
                        ? (
                            <TextField
                            id='outlined-basic'
                            variant='outlined'
                            label='Description'
                            onChange={handleInputChange('description')}
                            style={styles.formFields}
                          />
                        )
                        : <></>
                    }
                    <FormControlLabel
                        label='Add a Purchase Price?'
                        control={
                            <Checkbox checked={purchased} onChange={handleCheckChange('purchased')}/>
                        }
                    >
                    </FormControlLabel>
                    {
                        (checks.purchased === true)
                        ? (
                            <TextField
                            id='outlined-basic'
                            variant='outlined'
                            label='Purchase Price'
                            onChange={handleInputChange('purchased')}
                            style={styles.formFields}
                          />
                        )
                        : <></>
                    }
                    <FormControlLabel
                        label='Add a Price?'
                        control={
                            <Checkbox checked={price} onChange={handleCheckChange('price')}/>
                        }
                    >
                    </FormControlLabel>
                    {
                        (checks.price === true)
                        ? (
                            <TextField
                            id='outlined-basic'
                            variant='outlined'
                            label='Price'
                            onChange={handleInputChange('price')}
                            style={styles.formFields}
                          />
                        )
                        : <></>
                    }
                    <FormControlLabel
                        label='Add a Condition?'
                        control={
                            <Checkbox checked={condition} onChange={handleCheckChange('condition')}/>
                        }
                    >
                    </FormControlLabel>
                    {
                        (checks.condition === true)
                        ? (
                            <Select
                            value={formData.condition}
                            label="Condition"
                            onChange={handleInputChange('condition')}
                            style={styles.formFields}
                          >
                            <MenuItem value={"Bad"}>Bad</MenuItem>
                            <MenuItem value={"Good"}>Good</MenuItem>
                            <MenuItem value={"Very Good"}>Very Good</MenuItem>
                            <MenuItem value={"Excellent"}>Excellent</MenuItem>
                          </Select>
                        )
                        : <></>
                    }
                    <FormControlLabel
                        label='Add Shipping Details?'
                        control={
                            <Checkbox checked={shipping_properties} onChange={handleCheckChange('shipping_properties')}/>
                        }
                    >
                    </FormControlLabel>
                    {
                        (checks.shipping_properties === true)
                        ? (
                            <div style={styles.shipping_details}>
                                <TextField
                                    id='outlined-basic'
                                    variant='outlined'
                                    label='Height'
                                    onChange={handleInputChange('height')}
                                    style={styles.formFields}
                                />
                                <TextField
                                    id='outlined-basic'
                                    variant='outlined'
                                    label='Width'
                                    onChange={handleInputChange('width')}
                                    style={styles.formFields}
                                />
                                <TextField
                                    id='outlined-basic'
                                    variant='outlined'
                                    label='Depth'
                                    onChange={handleInputChange('depth')}
                                    style={styles.formFields}
                                />
                                <TextField
                                    id='outlined-basic'
                                    variant='outlined'
                                    label='Weight'
                                    onChange={handleInputChange('weight')}
                                    style={styles.formFields}
                                />
                            </div>
                        )
                        : <></>
                    }
                    <Button sx={styles.formFields} onClick={handleSubmit} variant='outlined'>Add Product</Button>
                </FormGroup>
            </Box>
        </Container>
    )
}
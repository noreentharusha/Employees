import React, { useState, useEffect } from 'react'
import {
    CardContent,
    Card,
    CardMedia,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Grid,
    Typography,
    IconButton,
    Box,
    AppBar,
    Stack,
    Toolbar,
    CardActionArea,
    CardActions,
    Alert,
    Snackbar
} from '@mui/material';
import { useNavigate } from "react-router-dom";
import { handleAddEmployee } from '../../../apiRequests/serverRequests.js'

function AddEmployeeForm() {
    let navigate = useNavigate();
    const [validations, setValidations] = useState({})
    const [errorOpen, setErrorOpen] = useState(false);
    const [successOpen, setSuccessOpen] = useState(false);
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        number: '',
        gender: '',
    })

    const handleList = () => {
        navigate('/employee/list');
    };

    const validateNames = (name) => {
        return (/^[A-Za-z]{6,10}$/.test(name))
    }

    const validateEmail = (email) => {
        return (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email));
    }

    const validatePhone = (number) => {
        return (/^(\+94|0)(7\d{8}|[1-5]\d{7})$/.test(number))
    }

    const handleAdd = async (e) => {
        e.preventDefault();
        const validations = {};
        if (!formData.first_name || !validateNames(formData.first_name)) {
            validations.first_name = 'First name should consist of 6-10 alphabets.';
        }
        if (!formData.last_name || !validateNames(formData.last_name)) {
            validations.last_name = 'Last name should consist of 6-10 alphabets.';
        }
        if (!formData.email || !validateEmail(formData.email)) {
            validations.email = 'Invalid email address.';
        }
        if (!formData.number || !validatePhone(formData.number)) {
            validations.number = 'Invalid phone number.';
        }

        if (Object.keys(validations).length === 0) {
            const result = await handleAddEmployee({
                first_name: formData.first_name,
                last_name: formData.last_name,
                email: formData.email,
                number: formData.number,
                gender: formData.gender,
            });
            if (result === "Employee added successfully!") {
                setSuccessOpen(true);
                setValidations({});
            } else {
                setErrorOpen(true);
            }
        } else {
            setErrorOpen(true);
            setValidations(validations);
        }
    }

    const handleChangeFormData = async (e, fieldName) => {
        let updatedFormData = {
            ...formData,
            [fieldName]: e.target.value
        }
        setFormData(updatedFormData)

    }

    return (
        <div>
            <Box >
                <AppBar position="static" color="primary">
                    <Toolbar>
                        <Typography variant="h6" component="div" >
                            Employee Manager
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box >
            <Box marginTop={2} marginRight={10} >
                <Stack spacing={2} direction="row" justifyContent='flex-end'>
                    <Button variant="contained" color="primary" onClick={handleList}
                    >LIST VIEW</Button>
                </Stack>
            </Box>
            <Box marginTop={2} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Card sx={{ width: 600 }}>
                    <form onSubmit={handleAdd}>
                        <CardContent marginTop={5}>
                            <Grid container marginTop={2} spacing={2}>
                                <Grid item xs={4}>
                                    <InputLabel>First Name</InputLabel>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        label="First Name"
                                        name="first_name"
                                        value={formData.first_name}
                                        onChange={(e) => handleChangeFormData(e, "first_name")}
                                        error={!!validations.first_name}
                                        helperText={validations.first_name}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <InputLabel>Last Name</InputLabel>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        label="Last Name"
                                        name="last_name"
                                        value={formData.last_name}
                                        onChange={(e) => handleChangeFormData(e, "last_name")}
                                        error={!!validations.last_name}
                                        helperText={validations.last_name}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <InputLabel>Email</InputLabel>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        label="Email"
                                        name="email"
                                        value={formData.email}
                                        onChange={(e) => handleChangeFormData(e, "email")}
                                        error={!!validations.email}
                                        helperText={validations.email}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <InputLabel>Phone</InputLabel>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        label="Phone"
                                        name="number"
                                        value={formData.number}
                                        onChange={(e) => handleChangeFormData(e, "number")}
                                        error={!!validations.number}
                                        helperText={validations.number}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <InputLabel>Gender</InputLabel>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl fullWidth>
                                        <InputLabel>Gender</InputLabel>
                                        <Select
                                            name="gender"
                                            value={formData.gender}
                                            onChange={(e) => handleChangeFormData(e, "gender")}
                                        >
                                            <MenuItem value="M">Male</MenuItem>
                                            <MenuItem value="F">Female</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </CardContent>
                        <CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Grid m={2} item xs={3}  >
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                >
                                    ADD
                                </Button>
                            </Grid>
                        </CardActions>
                        <Snackbar open={successOpen} autoHideDuration={6000} onClose={() => { setSuccessOpen(false) }} >
                            <Alert onClose={() => { setSuccessOpen(false) }} severity="success" sx={{ width: '100%' }}>
                                Successfully Added!
                            </Alert>
                        </Snackbar>
                        <Snackbar open={errorOpen} autoHideDuration={6000} onClose={() => { setErrorOpen(false) }}>
                            <Alert onClose={() => { setErrorOpen(false) }} severity="error" sx={{ width: '100%' }}>
                                Error occured. Please check the fields again!
                            </Alert>
                        </Snackbar>
                    </form>
                </Card>
            </Box>
        </div >
    )
}

export default AddEmployeeForm
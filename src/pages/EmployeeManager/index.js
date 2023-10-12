import React, { useState, useEffect } from 'react'
import ViewListIcon from '@mui/icons-material/ViewList';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeIcon from '@mui/icons-material/Mode';
import AppsIcon from '@mui/icons-material/Apps';
import { CardActionArea } from '@mui/material';
import { handlegetEmployees, handleDeleteEmployee } from '../../apiRequests/serverRequests'
import { useStateValue } from '../../redux/StateProvider';
import {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
    Avatar,
    IconButton,
    Box,
    Button,
    Stack,
    Typography,
    Toolbar,
    AppBar,
    CardContent,
    Card,
    CardMedia,
    Alert,
    Snackbar
} from '@mui/material';
import { useNavigate } from "react-router-dom";


function EmployeeManager() {
    let navigate = useNavigate();
    const [employee, dispatch] = useStateValue()
    const [boardMode, setBoardMode] = useState('grid')
    const [successOpen, setSuccessOpen] = useState(false);
    const [errorOpen, setErrorOpen] = useState(false);
    const [employeeList, setEmployeeList] = useState([])

    useEffect(() => {
        handlefetchingEmployees()
    }, [])

    const handlefetchingEmployees = async () => {
        const result = await handlegetEmployees()
        if (result) {
            setEmployeeList(result)
        } else {
            setEmployeeList([])
        }
    }

    const handleEdit = (employeeDetails) => {
        navigate('/employee/edit/001');
        dispatch(
            {
                type: "UPDATE_EMPLOYEE",
                item: {
                    employeeDetails
                }
            }
        )
    };

    const handleAdd = () => {
        navigate('/employee/add');
    };

    const handleDelete = async (id) => {
        const result = await handleDeleteEmployee(id);
        if (result) {
            setSuccessOpen(true);
            handlefetchingEmployees()
        } else {
            setErrorOpen(true);
        }

    }
    const handleDashboardMode = () => {
        setBoardMode(boardMode === 'grid' ? 'table' : 'grid');
    }

    return (
        boardMode === 'grid' ? <div>
            <Box>
                <AppBar position="static" color="primary">
                    <Toolbar>
                        <Typography variant="h6" component="div" >
                            Employee Manager
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box >
            <Box marginTop={2} marginRight={2} >
                <Stack spacing={2} direction="row" justifyContent='flex-end'>
                    <Button variant="contained" color="primary"
                        onClick={handleAdd} >ADD EMPLOYEE</Button>
                    <IconButton size="large" color="primary" edge="start" aria-label="menu" sx={{ mr: 2, backgroundColor: '#680ff1', '& .MuiSvgIcon-root': { color: '#fff' }, }}
                        onClick={() => { handleDashboardMode() }}
                    > <ViewListIcon />
                    </IconButton>
                </Stack>
            </Box>
            <Box marginTop={2} marginRight={8} marginLeft={8} sx={{ display: 'flex', flexWrap: 'wrap' }}>
                {employeeList.map((employee, index) => (
                    <Card sx={{ width: 300, m: 2 }} key={employee.id}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="120"
                                image={employee.photo ? employee.photo : "https://centerformsc.org/wp-content/uploads/defaultpic.png"}
                                alt="persona"
                                sx={{ width: '100%', height: '50%', borderRadius: '100', borderRadius: '10px' }}
                            />
                            <CardContent sx={{ display: 'flex' }}>
                                <Box sx={{ width: '70%' }}>
                                    <Typography gutterBottom variant="h7" component="div" sx={{ textAlign: 'left' }}>
                                        {`${employee.first_name} ${employee.last_name} `}
                                    </Typography>
                                    <Typography gutterBottom variant="h7" component="div" sx={{ textAlign: 'left' }}>
                                        {employee.email}
                                    </Typography>
                                    <Typography gutterBottom variant="h7" component="div" sx={{ textAlign: 'left' }}>
                                        {employee.number}
                                    </Typography>
                                    <Typography gutterBottom variant="h7" component="div" sx={{ textAlign: 'left' }}>
                                        {employee.gender === "M" ? "Male" : "Female"}
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'flex-end', width: '30%' }}>
                                    <IconButton onClick={() => { handleDelete(employee._id) }} size="small" color="primary" edge="start" aria-label="menu" sx={{
                                        mr: 2, backgroundColor: '#dc1f0d', '& .MuiSvgIcon-root': { color: '#fff' },
                                    }}> <DeleteIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleEdit(employee)} size="small" color="primary" edge="start" aria-label="menu" sx={{
                                        mr: 2, backgroundColor: '#56df7b', '& .MuiSvgIcon-root': { color: '#fff' },
                                    }}> <ModeIcon />
                                    </IconButton>
                                </Box>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                ))}
            </Box>
            <Snackbar open={successOpen} autoHideDuration={6000} onClose={() => { setSuccessOpen(false) }} >
                <Alert onClose={() => { setSuccessOpen(false) }} severity="success" sx={{ width: '100%' }}>
                    Successfully Deleted!
                </Alert>
            </Snackbar>
        </div > :
            <div>
                <Box>
                    <AppBar position="static" color="primary">
                        <Toolbar>
                            <Typography variant="h6" component="div" >
                                Employee Manager
                            </Typography>
                        </Toolbar>
                    </AppBar>
                </Box >
                <Box marginTop={2} marginRight={2} >
                    <Stack spacing={2} direction="row" justifyContent='flex-end'>
                        <Button variant="contained" color="primary" onClick={() => {
                            handleDashboardMode()
                        }}>ADD EMPLOYEE</Button>
                        <IconButton size="large" color="primary" edge="start" aria-label="menu" sx={{
                            mr: 2, backgroundColor: '#680ff1', '& .MuiSvgIcon-root': { color: '#fff' },
                        }}
                            onClick={() => {
                                handleDashboardMode()
                            }}
                        > <AppsIcon />
                        </IconButton>
                    </Stack>
                </Box>
                <Box marginTop={2} marginRight={8} marginLeft={8} sx={{ display: 'flex', flexWrap: 'wrap' }}>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow sx={{ border: '3px solid #ace07a', backgroundColor: '#ace07a' }}>
                                    <TableCell sx={{ border: '3px solid #ace07a' }}>Image</TableCell>
                                    <TableCell sx={{ border: '3px solid #ace07a' }}>First Name</TableCell>
                                    <TableCell sx={{ border: '3px solid #ace07a' }}>Last Name</TableCell>
                                    <TableCell sx={{ border: '3px solid #ace07a' }}>Email</TableCell>
                                    <TableCell sx={{ border: '3px solid #ace07a' }}>Phone</TableCell>
                                    <TableCell sx={{ border: '3px solid #ace07a' }}>Gender</TableCell>
                                    <TableCell sx={{ border: '3px solid #ace07a' }}>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {employeeList.map((employee) => {
                                    return (<TableRow key={employee.id} sx={{ border: '1px solid #ace07a' }}>
                                        <TableCell sx={{ border: '3px solid #ace07a' }}>
                                            <Avatar src={employee.photo} alt={`${employee?.first_name} ${employee?.last_name}`} />
                                        </TableCell>
                                        <TableCell sx={{ border: '3px solid #ace07a' }}>{employee?.first_name}</TableCell>
                                        <TableCell sx={{ border: '3px solid #ace07a' }}>{employee.last_name}</TableCell>
                                        <TableCell sx={{ border: '3px solid #ace07a' }}>{employee.email}</TableCell>
                                        <TableCell sx={{ border: '3px solid #ace07a' }}>{employee.number}</TableCell>
                                        <TableCell sx={{ border: '3px solid #ace07a' }}>{employee.gender === "M" ? "Male" : "Female"}</TableCell>
                                        <TableCell sx={{ border: '3px solid #ace07a' }}>
                                            <Button size="small" variant="contained" color="greish" onClick={() => handleEdit(employee)}>Edit</Button>
                                            <IconButton onClick={() => { handleDelete(employee._id) }} size="small" color="primary" edge="start" aria-label="menu" sx={{
                                                mr: 2, '& .MuiSvgIcon-root': { color: '#dc1f0d' },
                                            }}> <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>)
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
                <Snackbar open={successOpen} autoHideDuration={6000} onClose={() => { setSuccessOpen(false) }} >
                    <Alert onClose={() => { setSuccessOpen(false) }} severity="success" sx={{ width: '100%' }}>
                        Successfully Deleted!
                    </Alert>
                </Snackbar>
            </div >
    )
}

export default EmployeeManager
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EmployeeManager from '../../pages/EmployeeManager';
import AddEmployeeForm from '../../pages/EmployeeManager/Forms/AddEmployeeForm';
import EditEmployeeForm from '../../pages/EmployeeManager/Forms/EditEmployeeForm';

function MainRoutes() {
    return (
        <Router>
            <Routes>
                <Route path={"/employee/list"} element={<EmployeeManager />} />
            </Routes>
            <Routes>
                <Route path={"/employee/add"} element={<AddEmployeeForm />} />
            </Routes>
            <Routes>
                <Route path={"/employee/edit/001"} element={<EditEmployeeForm />} />
            </Routes>
        </Router>
    )
}

export default MainRoutes




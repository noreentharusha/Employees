const baseURL = 'https://employeeap-cf3c622db415.herokuapp.com'
const apiEndPoints = {
    appServer: {
        addEmployee: `${baseURL}/add/employee`, // ---> POST
        getEmployees: `${baseURL}/get/employees`, // ---> GET
        updateEmployee: `${baseURL}/update`, // ---> PUT
        deleteEmployee: `${baseURL}/delete`, // ---> DELETE
    }
}
export default apiEndPoints;
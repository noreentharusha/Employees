const { REACT_APP_API_BASE_URL } = process.env;
const apiEndPoints = {
    appServer: {
        addEmployee: `${REACT_APP_API_BASE_URL}/add/employee`, // ---> POST
        getEmployees: `${REACT_APP_API_BASE_URL}/get/employees`, // ---> GET
        updateEmployee: `${REACT_APP_API_BASE_URL}/update`, // ---> PUT
        deleteEmployee: `${REACT_APP_API_BASE_URL}/delete`, // ---> DELETE
    }
}
export default apiEndPoints;
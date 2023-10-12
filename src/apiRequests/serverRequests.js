import axios from 'axios';
import apiEndPoints from './apiEndPoints';

//addEmployee
export async function handleAddEmployee(reqBody = {}) {
    try {
        const data = {
            ...reqBody
        };

        const apiReqUrl = apiEndPoints.appServer.addEmployee;

        const resObj = await axios.post(apiReqUrl, data);

        return resObj.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

//getEmployees
export async function handlegetEmployees(reqBody = {}) {
    try {
        const apiReqUrl = apiEndPoints.appServer.getEmployees;

        const resObj = await axios.get(apiReqUrl);

        return resObj.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export default apiEndPoints;

//updateEmployee
export async function handleUpdateEmployee(reqBody = {}) {
    try {
        const data = {
            ...reqBody
        };

        const apiReqUrl = apiEndPoints.appServer.updateEmployee;

        const resObj = await axios.put(`${apiReqUrl}/${data.id}`, data);

        return resObj.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

//deleteEmployee
export async function handleDeleteEmployee(id) {
    try {
        debugger
        const apiReqUrl = apiEndPoints.appServer.deleteEmployee;

        const resObj = await axios.delete(`${apiReqUrl}/${id}`);

        return resObj.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}
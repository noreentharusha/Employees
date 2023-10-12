export const initialState = {
    employee: null
};

function reducer(state, action) {
    console.log("action", action);
    debugger
    switch (action.type) {
        case "UPDATE_EMPLOYEE":
            return {
                ...state,
                employee: action.item.employeeDetails
            }
        default:
            return state;
    }
};

export default reducer;
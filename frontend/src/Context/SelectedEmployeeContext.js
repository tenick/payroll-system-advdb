import { createContext, useReducer } from "react";

export const SelectedEmployeeContext = createContext();

export const selectedEmployeeReducer = (state, action) => {
    switch (action.type) {
        case 'SELECT_EMPLOYEE':
            return {employeeID: action.payload.id, action: action.payload.action}; 
        case 'UNSELECT_EMPLOYEE':
            return {employeeID: null};
        default:
            return state;
    }
}

export const SelectedEmployeeContextProvider = ({children}) => {
    const [selectedEmployeeState, selectedEmployeeDispatch] = useReducer(selectedEmployeeReducer, {employeeID: null});

    return (
        <SelectedEmployeeContext.Provider value={{selectedEmployeeState, selectedEmployeeDispatch}}>
            { children }
        </SelectedEmployeeContext.Provider>
    )
}


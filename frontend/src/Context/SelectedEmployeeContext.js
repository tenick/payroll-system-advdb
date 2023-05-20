import { createContext, useReducer, useEffect } from "react";
import { useAuthStatus } from '../Hooks/useAuthStatus';

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
    const { userState } = useAuthStatus();

    useEffect(() => {
        if (userState.user.role === 'employee'){
		    selectedEmployeeDispatch({type: "SELECT_EMPLOYEE", payload: {id: userState.user.id, action: 'view'}})
        }
    }, []);

    return (
        <SelectedEmployeeContext.Provider value={{selectedEmployeeState, selectedEmployeeDispatch}}>
            { children }
        </SelectedEmployeeContext.Provider>
    )
}


import { createContext, useReducer } from "react";

export const SearchEmployeeContext = createContext();

export const searchEmployeeReducer = (state, action) => {
    switch (action.type) {
        case 'SET_SEARCHED_EMPLOYEE':
            return action.payload; 
        case 'UNSET_SEARCHED_EMPLOYEE':
            return [];
        case 'REMOVE_SEARCHED_EMPLOYEE':
            return state.filter(employee => employee.emp_id !== action.payload.id);
        case 'EDIT_SEARCHED_EMPLOYEE_BY_ID':
            return state.map(employee => employee.emp_id == action.payload.id ? action.payload.newEmp : employee );
        default:
            return state;
    }
}

export const SearchEmployeeContextProvider = ({children}) => {
    const [searchEmployeeState, searchEmployeeDispatch] = useReducer(searchEmployeeReducer, []);

    return (
        <SearchEmployeeContext.Provider value={{searchEmployeeState, searchEmployeeDispatch}}>
            { children }
        </SearchEmployeeContext.Provider>
    )
}


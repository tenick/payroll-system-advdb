import { createContext, useReducer } from "react";

export const NavbarContext = createContext();

export const navbarReducer = (state, action) => {
    switch (action.type) {
        case 'SET_SELECTED_LINK':
            return action.payload;
        default:
            return state;
    }
}

export const NavbarContextProvider = ({children}) => {
    const [navState, navDispatch] = useReducer(navbarReducer, {path: null});

    return (
        <NavbarContext.Provider value={{navState, navDispatch}}>
            { children }
        </NavbarContext.Provider>
    )
}


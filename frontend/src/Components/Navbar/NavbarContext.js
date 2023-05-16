import { createContext, useReducer } from "react";

export const NavbarContext = createContext();

export const navbarReducer = (state, action) => {
    switch (action.type) {
        case 'PUSH':
            return [
                ...state, action
            ];
        case 'POP':
            return state.length == 0 ? [] : state.slice(0, -1);
        default:
            return state;
    }
}

export const NavbarContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(navbarReducer, []);

    // usage: dispatch({type: "PUSH", payload: []})

    return (
        <NavbarContext.Provider value={{state, dispatch}}>
            { children }
        </NavbarContext.Provider>
    )
}


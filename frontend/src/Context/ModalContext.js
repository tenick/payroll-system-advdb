import { createContext, useReducer } from "react";

export const ModalContext = createContext();

export const modalReducer = (state, action) => {
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

export const ModalContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(modalReducer, []);

    // usage: dispatch({type: "PUSH", payload: []})

    return (
        <ModalContext.Provider value={{state, dispatch}}>
            { children }
        </ModalContext.Provider>
    )
}


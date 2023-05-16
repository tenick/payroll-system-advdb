import { createContext, useReducer } from "react";

export const WorkspaceHeaderContext = createContext();

export const workspaceHeaderReducer = (state, action) => {
    switch (action.type) {
        case 'SET_HEADER':
            return action.payload;
        default:
            return state;
    }
}

export const WorkspaceHeaderContextProvider = ({children}) => {
    const [workspaceHeaderState, dispatch] = useReducer(workspaceHeaderReducer, {header: 'Employee', searchEnabled: true});

    console.log("teststesfrsdtsetse", workspaceHeaderState)

    return (
        <WorkspaceHeaderContext.Provider value={{workspaceHeaderState, dispatch}}>
            { children }
        </WorkspaceHeaderContext.Provider>
    )
}


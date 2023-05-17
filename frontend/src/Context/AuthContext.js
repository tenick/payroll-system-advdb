import { createContext, useEffect, useReducer } from "react";
import { useAuthStatus } from '../Hooks/useAuthStatus';

export const AuthContext = createContext();

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'AUTHORIZE_USER':
            return action.payload;
        case 'LOGOUT_USER':
            return action.payload;
        default:
            return state;
    }
}

export const AuthContextProvider = ({children}) => {
    const [ userState, dispatch ] = useReducer(authReducer, { user: null });

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/api/auth/authorize', {
                method: 'GET'
            });
            let result = {user: null};
            if (response.ok) {
                let found = await response.json();
                result.user = found;
                console.log("able to login! user: ", result);
            }
            else {
                console.log("no authhghhhh!!");
            }
    
            dispatch({type: 'AUTHORIZE_USER', payload: result});
        };

        fetchData();
    }, []);

    return (
        <AuthContext.Provider value={{userState, dispatch}}>
            { children }
        </AuthContext.Provider>
    )
}


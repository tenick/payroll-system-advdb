import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';

export const useLogout = () => {
    const { dispatch } = useContext(AuthContext);

    const logout = async (email, password) => {
        await fetch('/api/auth/logout', {
            method: 'POST'
        });
    
        await dispatch({type: "LOGOUT_USER", payload: {user: null}});
    }

    return logout;
}
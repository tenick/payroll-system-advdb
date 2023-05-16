import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';

export const useAuthStatus = () => {
    const {userState, dispatch } = useContext(AuthContext);

    const authorize = async () => {
        const response = await fetch('/api/auth/authorize', {
            method: 'GET'
        });
        let result = {user: null};
        if (response.ok) {
            result = await response.json();
            console.log("able to login! user: ", result);
        }
        else {
            console.log("no authhghhhh!!");
            result = {user: result}
        }

        dispatch({type: "AUTHORIZE_USER", payload: result});
    }

    return { userState, authorize };
}
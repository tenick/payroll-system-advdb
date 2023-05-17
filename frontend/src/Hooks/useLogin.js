import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';

export const useLogin = () => {
    const { dispatch } = useContext(AuthContext);

    const login = async (email, password) => {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email_address: email, user_password: password})
        });
    
        if (!response.ok){
            console.log('wrong email/password!');
            return await response.json();
        }
        if (response.ok){
            let userData = await response.json();

            dispatch({type: "AUTHORIZE_USER", payload: {user: userData}});
        }
    }

    return login;
}
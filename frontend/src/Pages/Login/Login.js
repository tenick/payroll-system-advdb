import './Login.css';

import { useState } from 'react';
import { useLogin } from '../../Hooks/useLogin';
import { useAuthStatus } from '../../Hooks/useAuthStatus';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const login = useLogin();
    const { userState } = useAuthStatus();
    console.log(userState);

    const handleSubmit = async e => {
        e.preventDefault();
        await login(email, password);
        console.log("user: ", userState);
    };

    return (
        <div id='login'>
            <section>
                <h1>PAYROLL SYSTEM</h1>
            </section>
            <section>
                <form method="post" onSubmit={handleSubmit}>
                    <i class="fa-solid fa-user"></i>
                    <label for="in_email">Email:</label>
                    <input required type="email" placeholder="Email" id="in_email" name="email_address" onChange={e => setEmail(e.target.value)} class="login-input" />
                    <i class="fa-solid fa-key"></i>
                    <label for="in_password">Password:</label>
                    <input required type="password" placeholder="Password" id="in_password" name="user_password" onChange={e => setPassword(e.target.value)} class="login-input"/>
                    <button class="login-input submit-btn">Login</button>
                </form>
            </section>
        </div>
    );
}

export default Login;
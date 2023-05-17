import './App.css'
import Login from './Pages/Login/Login';
import PayrollSystem from './Pages/PayrollSystem/PayrollSystem';
import ModalStack from './Components/ModalStack/ModalStack';
import { ModalContextProvider }  from './Context/ModalContext';
import { useAuthStatus } from './Hooks/useAuthStatus';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => {
    const { userState } = useAuthStatus();

    return (
        <div id='app'>
            <ModalContextProvider>
                <BrowserRouter>
                    <Routes>
                        <Route
                            path='/*'
                            element={userState.user === null ? <Login /> : <PayrollSystem /> }
                        />
                    </Routes>
                    <ModalStack />
                </BrowserRouter>
            </ModalContextProvider>
        </div>
    );
}

export default App;

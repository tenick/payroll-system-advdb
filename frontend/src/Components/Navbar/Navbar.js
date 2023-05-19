import './Navbar.css';
import { useState } from 'react';
import Backdrop from "../Backdrop/Backdrop";
import Navlink from "./Navlink";
import { Link } from 'react-router-dom';
import { useLogout } from '../../Hooks/useLogout';
import { useAuthStatus } from '../../Hooks/useAuthStatus';

const NavBar = () => {
    const [navState, setNavState] = useState({hide: true, navState: 'navHide', backdropState: 'backdrop-nav-hide'});
    const logout = useLogout();
    const { userState } = useAuthStatus();

    const navToggle = () => {
        console.log(navState);
        if (navState.hide) setNavState({hide: false, navState: '', backdropState: 'backdrop-nav'});
        else setNavState({hide: true, navState: 'navHide', backdropState: 'backdrop-nav-hide'});
    }

    const navbarClick = e => {
        e.stopPropagation();
    };

    return (
        <div>
            <Backdrop className={ navState.backdropState } onClick={ navToggle }>
                <nav id="nav-container" className={ navState.navState } onClick={ navbarClick }>
                    <div className="navMain">
                        <header>
                            <i className="fa-solid fa-file-invoice-dollar"></i>
                            <span>Payroll System</span>
                        </header>
                        <ul>
                            <Navlink className={'fa-solid fa-duotone fa-users'} path='/employee' innerText='Employee'></Navlink>
                            {userState.user.role === 'admin' && 
                                <>
                                    <Navlink className={'fa-solid fa-user-plus'} path='/add_employee' innerText='Add Employee'></Navlink>
                                    <Navlink className={'fa-solid fa-pencil'} path='/edit_employee' innerText='Edit Employee'></Navlink>
                                </>
                            }
                            <Navlink className={'fa-solid fa-money-check-dollar'} path='/payroll' innerText='Payroll'></Navlink>
                            <Navlink className={'fa-solid fa-user-clock'} path='/timesheet' innerText='Time Sheet'></Navlink>
                            <Navlink className={'fa-solid fa-house-user'} path='/leave_requests' innerText='Leave Requests'></Navlink>
                        </ul>
                        <ul>
                            <li>{userState.user.role}</li>
                            <li>
                                <Link to='/' onClick={logout}>Logout</Link>
                            </li>
                        </ul>

                    </div>
                    <div className="navToggle" onClick={ navToggle }>
                        <i id="navIcon" className="fa-solid fa-bars"></i>
                    </div>
                </nav>
            </Backdrop>
        </div>
    );
};

export default NavBar;
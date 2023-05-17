import './Navbar.css';
import { useState } from 'react';
import Backdrop from "../Backdrop/Backdrop";
import { Link } from 'react-router-dom';
import { useLogout } from '../../Hooks/useLogout';
import { useAuthStatus } from '../../Hooks/useAuthStatus';
import { useWorkspaceHeader } from '../../Hooks/useWorkspaceHeader';

const NavBar = () => {
    const [navState, setNavState] = useState({hide: true, navState: 'navHide', backdropState: 'backdrop-nav-hide'});
    const logout = useLogout();
    const { userState } = useAuthStatus();
    const { dispatch } = useWorkspaceHeader();

    const navToggle = () => {
        console.log(navState);
        if (navState.hide) setNavState({hide: false, navState: '', backdropState: 'backdrop-nav'});
        else setNavState({hide: true, navState: 'navHide', backdropState: 'backdrop-nav-hide'});
    }

    const navbarClick = e => {
        e.stopPropagation();
    };

    const setSelectedNav = e => {
        console.log(e.target.innerText);
        let header = e.target.innerText;
        let searchEnabled = false;
        switch (header) {
            case 'Employee':
                searchEnabled = true;
            case 'Leave Requests':
                searchEnabled = true;
            default:;
        }

        if (userState.user.role == 'employee') searchEnabled = false;
        
        dispatch({type: "SET_HEADER", payload: {header, searchEnabled}});
        e.stopPropagation();
    }

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
                            {userState.user.role === 'admin' && 
                                <>
                                    <li onClick={setSelectedNav} ><i className="fa-solid fa-duotone fa-users"></i><Link to='/employee'>Employee</Link></li>
                                    <li onClick={setSelectedNav} ><i className="fa-solid fa-user-plus"></i><Link to='/add_employee'>Add Employee</Link></li>
                                    <li onClick={setSelectedNav} ><i className="fa-solid fa-money-check-dollar"></i><Link to='/payroll'>Payroll</Link></li>
                                    <li onClick={setSelectedNav} ><i className="fa-solid fa-user-clock"></i><Link to='/timesheet'>Time Sheet</Link></li>
                                    <li onClick={setSelectedNav} ><i className="fa-solid fa-house-user"></i><Link to='/leave_requests'>Leave Requests</Link></li>
                                </>
                            }
                            {userState.user.role === 'employee' && 
                                <>
                                    <li onClick={setSelectedNav} ><i className="fa-solid fa-money-check-dollar"></i><Link to='/payroll'>Payroll</Link></li>
                                    <li onClick={setSelectedNav} ><i className="fa-solid fa-user-clock"></i><Link to='/timesheet'>Time Sheet</Link></li>
                                    <li onClick={setSelectedNav} ><i className="fa-solid fa-house-user"></i><Link to='/leave_requests'>Leave Requests</Link></li>
                                </>
                            }
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
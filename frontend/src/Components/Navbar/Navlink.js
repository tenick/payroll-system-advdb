import { Link } from 'react-router-dom';
import { useNav } from '../../Hooks/useNav';


const Navlink = ({className, path, innerText}) => {
    const {navState, navDispatch } = useNav();

    const handleNavlinkClick = () => {
        navDispatch({type: 'SET_SELECTED_LINK', payload: {path}});
    }

    return (
        <li onClick={handleNavlinkClick} className={navState.path !== null && navState.path === path ? 'active-link' : ''}>
            <i className={navState.path !== null && navState.path === path ? className + ' active-link' : className}></i>
            <Link to={path} className={navState.path !== null && navState.path === path ? 'active-link' : ''}>{innerText}</Link>
        </li>
    );
}

export default Navlink;
import { Link } from 'react-router-dom';
import { useNav } from '../../Hooks/useNav';


const Navlink = ({className, path, innerText, isGenericLink, children, runBefore}) => {
    const {navState, navDispatch } = useNav();

    const handleNavlinkClick = () => {
        if (typeof runBefore === 'function')
            runBefore();
        
        navDispatch({type: 'SET_SELECTED_LINK', payload: {path}});
    }

    const test = false;

    return (
        <>
            { isGenericLink ?
                <Link className={className} to={path} onClick={handleNavlinkClick}>
                    {children}
                </Link>
                :
                <li onClick={handleNavlinkClick} className={navState.path !== null && navState.path === path ? 'active-link' : ''}>
                    <i className={navState.path !== null && navState.path === path ? className + ' active-link' : className}></i>
                    <Link to={path} className={navState.path !== null && navState.path === path ? ' active-link navLink' : 'navLink'}>{innerText}</Link>
                </li>
            }
        </>
    );
}

export default Navlink;
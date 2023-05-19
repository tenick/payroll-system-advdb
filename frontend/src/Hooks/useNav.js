import { useContext } from 'react';
import { NavbarContext } from '../Components/Navbar/NavbarContext';

export const useNav = () => {
    const { navState, navDispatch } = useContext(NavbarContext);
    
    if (navState.path === null)
        navDispatch({type: 'SET_SELECTED_LINK', payload: {path: window.location.pathname}});

    return { navState, navDispatch };
}
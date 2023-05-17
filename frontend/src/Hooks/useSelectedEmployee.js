import { useContext } from 'react';
import { SelectedEmployeeContext } from '../Context/SelectedEmployeeContext';

export const useSelectedEmployee = () => {
    return useContext(SelectedEmployeeContext);
}
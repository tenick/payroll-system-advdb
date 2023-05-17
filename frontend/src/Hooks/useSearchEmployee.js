import { useContext } from 'react';
import { SearchEmployeeContext } from '../Context/SearchEmployeeContext';

export const useSearchEmployee = () => {
    return useContext(SearchEmployeeContext);
}
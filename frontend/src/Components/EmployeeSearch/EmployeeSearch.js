import './EmployeeSearch.css';

import { useSelectedEmployee } from '../../Hooks/useSelectedEmployee';
import { useSearchEmployee } from '../../Hooks/useSearchEmployee';
import EmployeeCard from '../EmployeeCard/EmployeeCard';

const EmployeeSearch = () => {
    const { selectedEmployeeState, selectedEmployeeDispatch} = useSelectedEmployee();
	const { searchEmployeeState, searchEmployeeDispatch } = useSearchEmployee();

	const handleEditEmp = emp_id => {
		selectedEmployeeDispatch({type: "SELECT_EMPLOYEE", payload: {id: emp_id, action: 'edit'}})
	}

    const handleDeleteEmp = emp_id => {
		selectedEmployeeDispatch({type: "SELECT_EMPLOYEE", payload: {id: emp_id, action: 'delete'}})
	}

    return (
		<div className='employee-search'>
            <h1>Employee:</h1>
            <hr />
            {
                searchEmployeeState.length === 0 ? 
                <div className='no-employees-search'>
                    No employees...<br />
                </div> 
                : 
                <>
                    <div className='employee-list'>
                    { 
                        searchEmployeeState.map(employee => 
                            <EmployeeCard key={employee.emp_id} emp_id={employee.emp_id} emp_name={employee.emp_name} emp_position={employee.emp_position} handleEditEmp={handleEditEmp} handleDeleteEmp={handleDeleteEmp} />
                        ) 
                    }
                    </div>
                    <hr />
                    <div className='employee-search-result-count'>
                        Found {searchEmployeeState.length} Employee{searchEmployeeState.length > 1 && 's'}
                    </div>
                </>
            }
            
        </div>
  	);
};

export default EmployeeSearch;
import './EmployeeDelete.css';
import { useState } from 'react';
import { useSelectedEmployee } from '../../Hooks/useSelectedEmployee';
import { useSearchEmployee } from '../../Hooks/useSearchEmployee';
import { useAuthStatus } from '../../Hooks/useAuthStatus';

const EmployeeDelete = () => {
    const { selectedEmployeeState, selectedEmployeeDispatch } = useSelectedEmployee();
    const { searchEmployeeDispatch } = useSearchEmployee();
	
	// user states
    const { userState, authorize } = useAuthStatus();

	const handleSubmit = async () => {
		const response = await fetch('/api/employee/' + selectedEmployeeState.employeeID, {
            method: 'DELETE'
        });

        if (response.ok){
            searchEmployeeDispatch({type: 'REMOVE_SEARCHED_EMPLOYEE', payload: { id: selectedEmployeeState.employeeID }});
        }

        selectedEmployeeDispatch({type: 'UNSELECT_EMPLOYEE'});
    }
	const handleCancel = () => {
        selectedEmployeeDispatch({type: 'UNSELECT_EMPLOYEE'});
    }

  	return (
		<section id="employeeDelete">
			<h1>Remove Employee:</h1>
            <hr />
            <span className='choice-list-msg'>
				Are you sure? (this action cannot be undone)
			</span>
			<div className='choice-list'>
				<button className='proceedDelete' onClick={handleSubmit}>YES</button>
				<button className='cancelDelete' onClick={handleCancel}>NO</button>
			</div>
		</section>
  	);
}

export default EmployeeDelete;

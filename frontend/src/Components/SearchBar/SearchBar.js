import './SearchBar.css';
import { useState } from 'react';
import { useAuthStatus } from '../../Hooks/useAuthStatus';
import { useSearchEmployee } from '../../Hooks/useSearchEmployee';
import { useSelectedEmployee } from '../../Hooks/useSelectedEmployee';

const SearchBar = () => {
	const [searchQueryState, setSearchQueryState] = useState('');
	const { searchEmployeeState, searchEmployeeDispatch } = useSearchEmployee();
    const { selectedEmployeeDispatch} = useSelectedEmployee();

	// user states
    const { userState, authorize } = useAuthStatus();

	const handleSearch = async e => {
		if (e.key !== 'Enter') return;
		if (!authorize()) return;
		else {
			selectedEmployeeDispatch({type: "UNSELECT_EMPLOYEE"})


			console.log('searching... ' + searchQueryState);
			console.log('authorized to search employee by name');

			const response = await fetch('/api/employee/name/' + searchQueryState, {
				method: 'GET'
			});

			if (!response.ok) {
				console.log("error during getting all employee with name");
				searchEmployeeDispatch({type: 'UNSET_SEARCHED_EMPLOYEE', payload: null});
				return;
			}
			
			let responseJson = await response.json();
			console.log("employees found with name: " + searchQueryState, responseJson);

			const empsResult = Array.from(responseJson.map(employee => {
				return {
					emp_id: employee.employee_id,
					emp_name: employee.first_name + ' ' + employee.last_name,
					emp_position: employee.employee_position
				};
			}));
			
			searchEmployeeDispatch({type: 'SET_SEARCHED_EMPLOYEE', payload: empsResult});
		}
	}

    return (
		<>
			<div id="searchBar">
				<i className="fa-solid fa-search"></i> 
				<input type='text' onKeyDown={handleSearch} onChange={e => setSearchQueryState(e.target.value)}></input>
			</div>
		</>
  	);
}

export default SearchBar;

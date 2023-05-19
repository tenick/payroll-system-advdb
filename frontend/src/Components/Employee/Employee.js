import './Employee.css';

import { useSelectedEmployee } from '../../Hooks/useSelectedEmployee';
import { useSearchEmployee } from '../../Hooks/useSearchEmployee';
import EmployeeCard from '../EmployeeCard/EmployeeCard';
import { useNav } from '../../Hooks/useNav';

const Employee = () => {
	const { navState, navDispatch } = useNav();


	const { searchEmployeeState, searchEmployeeDispatch } = useSearchEmployee();

	return (
		<section id='employee'>
			<h1>Employee:</h1>
			<hr />
			{
				searchEmployeeState.length === 0 ? 
				<div className='empty-section-msg'>
					No employees...
				</div> 
				: 
				<>
					<div className='employee-list'>
					{ 
						searchEmployeeState.map(employee => 
							<EmployeeCard key={employee.emp_id} emp_id={employee.emp_id} emp_name={employee.emp_name} emp_position={employee.emp_position} />
						) 
					}
					</div>
					<hr />
					<div className='employee-search-result-count'>
						Found {searchEmployeeState.length} Employee{searchEmployeeState.length > 1 && 's'}
					</div>
				</>
			}
			
		</section>
	);
}

export default Employee;

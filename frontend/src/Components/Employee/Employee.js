import './Employee.css';

import { useAuthStatus } from '../../Hooks/useAuthStatus';
import { useSelectedEmployee } from '../../Hooks/useSelectedEmployee';
import { useSearchEmployee } from '../../Hooks/useSearchEmployee';
import EmployeeCard from '../EmployeeCard/EmployeeCard';
import EmployeeDelete from '../EmployeeDelete/EmployeeDelete';
import EmployeeView from '../EmployeeView/EmployeeView';

const Employee = () => {
    const { userState } = useAuthStatus();
	const { selectedEmployeeState } = useSelectedEmployee();
	const { searchEmployeeState } = useSearchEmployee();


	return (
		<section id='employee'>
			{
				selectedEmployeeState.action === 'delete' && <EmployeeDelete />
			}
			{
				selectedEmployeeState.action !== 'delete' &&
				<>
					{
						userState.user.role === 'employee' ?
						<>
							<EmployeeView />
						</>
						:
						<>
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
						</>
					}
				</>
			}
		</section>
	);
}

export default Employee;

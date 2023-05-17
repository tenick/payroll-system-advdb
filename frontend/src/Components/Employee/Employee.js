import './Employee.css';

import { useSelectedEmployee } from '../../Hooks/useSelectedEmployee';
import EmployeeSearch from '../EmployeeSearch/EmployeeSearch';
import EmployeeView from '../EmployeeView/EmployeeView';
import EmployeeDelete from '../EmployeeDelete/EmployeeDelete';

const Employee = () => {
    const { selectedEmployeeState } = useSelectedEmployee();

  	return (
		<section id="employee">
			{selectedEmployeeState.employeeID === null && <EmployeeSearch />}
			{selectedEmployeeState.employeeID !== null && selectedEmployeeState.action === 'edit' && <EmployeeView />}
			{selectedEmployeeState.employeeID !== null && selectedEmployeeState.action === 'delete' && <EmployeeDelete />}
		</section>
  	);
}

export default Employee;

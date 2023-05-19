import './EmployeeCard.css';
import { useSelectedEmployee } from '../../Hooks/useSelectedEmployee';
import { useNavigate } from 'react-router-dom';

const EmployeeCard = ({emp_id, emp_name, emp_position}) => {
	const navigate = useNavigate();
    const { selectedEmployeeState, selectedEmployeeDispatch} = useSelectedEmployee();
	
	const handleEditEmp = emp_id => {
		selectedEmployeeDispatch({type: "SELECT_EMPLOYEE", payload: {id: emp_id, action: 'edit'}})
		navigate("/edit_employee");
	}

    const handleDeleteEmp = emp_id => {
		selectedEmployeeDispatch({type: "SELECT_EMPLOYEE", payload: {id: emp_id, action: 'delete'}})
	}

	const handleViewEmpPayroll = emp_id => {
		selectedEmployeeDispatch({type: "SELECT_EMPLOYEE", payload: {id: emp_id, action: 'edit'}})
	}

    const handleViewEmpTimeSheet = emp_id => {
		selectedEmployeeDispatch({type: "SELECT_EMPLOYEE", payload: {id: emp_id, action: 'delete'}})
	}

  	return (
		<div className='employee-card'>
			<input type="hidden" value={emp_id} />
			<div className='employee-field'>
				{emp_name}
			</div>
			<div className='employee-field'>
				{emp_position}
			</div>
			<div className='employee-actions'>
				<div className='employee-action payroll-action' onClick={handleViewEmpPayroll}>
					<i className='fa-solid fa-money-check-dollar'></i>
					<span>Payroll</span>
				</div>
				<div className='employee-action timesheet-action' onClick={handleViewEmpTimeSheet}>
					<i className='fa-solid fa-user-clock'></i>
					<span>Time Sheet</span>
				</div>
				<div className='employee-action edit-action' onClick={() => handleEditEmp(emp_id)}>
					<i className='fa-solid fa-pencil'></i>
					<span>Edit</span>
				</div>
				<div className='employee-action delete-action' onClick={() => handleDeleteEmp(emp_id)}>
					<i className='fa-solid fa-trash'></i>
					<span>Delete</span>
				</div>
			</div>
		</div>
  	);
}

export default EmployeeCard;

import './EmployeeCard.css';
import { useSelectedEmployee } from '../../Hooks/useSelectedEmployee';
import Navlink from "../Navbar/Navlink";

const EmployeeCard = ({emp_id, emp_name, emp_position}) => {
    const { selectedEmployeeDispatch} = useSelectedEmployee();
	
	const handleEditEmp = emp_id => {
		selectedEmployeeDispatch({type: "SELECT_EMPLOYEE", payload: {id: emp_id, action: 'edit'}})
	}

    const handleDeleteEmp = emp_id => {
		selectedEmployeeDispatch({type: "SELECT_EMPLOYEE", payload: {id: emp_id, action: 'delete'}})
	}

	const handleViewEmpPayroll = emp_id => {
		selectedEmployeeDispatch({type: "SELECT_EMPLOYEE", payload: {id: emp_id, action: 'view'}})
	}
	
    const handleViewEmpTimeSheet = emp_id => {
		selectedEmployeeDispatch({type: "SELECT_EMPLOYEE", payload: {id: emp_id, action: 'view'}})
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
				<Navlink runBefore={() => handleViewEmpPayroll(emp_id)} className={'employee-action payroll-action'} path='/payroll' isGenericLink >
					<i className='fa-solid fa-money-check-dollar'></i>
					<span>Payroll</span>
				</Navlink>
				<Navlink runBefore={() => handleViewEmpTimeSheet(emp_id)} className={'employee-action timesheet-action'} path='/timesheet' isGenericLink >
					<i className='fa-solid fa-user-clock'></i>
					<span>Time sheet</span>
				</Navlink>
				<Navlink runBefore={() => handleEditEmp(emp_id)} className={'employee-action edit-action'} path='/edit_employee' isGenericLink >
					<i className='fa-solid fa-pencil'></i>
					<span>Edit</span>
				</Navlink>
				<div className='employee-action delete-action' onClick={() => handleDeleteEmp(emp_id)}>
					<i className='fa-solid fa-trash'></i>
					<span>Delete</span>
				</div>
			</div>
		</div>
  	);
}

export default EmployeeCard;

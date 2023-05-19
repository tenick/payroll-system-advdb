import './EmployeeView.css';

import { useSelectedEmployee } from '../../Hooks/useSelectedEmployee';
import { useSearchEmployee } from '../../Hooks/useSearchEmployee';
import { useEmployeeDetails } from '../../Hooks/useEmployeeDetails';
import EmployeeForm from '../EmplopyeeForm/EmployeeForm';
import MessageBox from '../MessageBox/MessageBox';
import { useState, useEffect } from 'react';
import { useAuthStatus } from '../../Hooks/useAuthStatus';
import { Link, useNavigate } from 'react-router-dom';

const EmployeeView = () => {
    const { employeeDetails, employeeDetailInputs } = useEmployeeDetails();
    const { selectedEmployeeState, selectedEmployeeDispatch } = useSelectedEmployee();
    const { searchEmployeeDispatch } = useSearchEmployee();
	const navigate = useNavigate();
    
    const [employeeData, setEmployeeData] = useState(null);

    // user states
    const { userState, authorize } = useAuthStatus();

    // message box states
    const [messageBoxText, setMessageBoxText] = useState('');
    const [messageBoxIsError, setMessageBoxIsError] = useState(false);

    const handleCancel = () => {
        selectedEmployeeDispatch({type: 'UNSELECT_EMPLOYEE'});
        navigate('/');
    }

    const handleSubmit = async e => {
        e.preventDefault();

        const updatedEmployeeDetails = {
            first_name: employeeDetails.first_name === '' ? employeeData.first_name : employeeDetails.first_name,
            last_name: employeeDetails.last_name === '' ? employeeData.last_name : employeeDetails.last_name,
            sex: employeeDetails.sex === '' ? employeeData.sex : employeeDetails.sex,
            contact_number: employeeDetails.contact_number === '' ? employeeData.contact_number : employeeDetails.contact_number,

            gross_salary: employeeDetails.gross_salary === '' ? employeeData.gross_salary : employeeDetails.gross_salary,
            employee_position: employeeDetails.employee_position === '' ? employeeData.employee_position : employeeDetails.employee_position,
            probation_end_date: employeeDetails.probation_end_date === '' ? employeeData.probation_end_date : employeeDetails.probation_end_date,

            sss: employeeDetails.sss === '' ? employeeData.sss : employeeDetails.sss,
            pagibig: employeeDetails.pagibig === '' ? employeeData.pagibig : employeeDetails.pagibig,
            philhealth: employeeDetails.philhealth === '' ? employeeData.philhealth : employeeDetails.philhealth,
            
            vacation_leave: employeeDetails.vacation_leave === '' ? employeeData.vacation_leave : employeeDetails.vacation_leave,
            sick_leave: employeeDetails.sick_leave === '' ? employeeData.sick_leave : employeeDetails.sick_leave,
            emergency_leave: employeeDetails.emergency_leave === '' ? employeeData.emergency_leave : employeeDetails.emergency_leave
        }
        // reformat so that input type='Data' can be set with default value of this new format
        let myDate = new Date(updatedEmployeeDetails.probation_end_date);
        updatedEmployeeDetails.probation_end_date = `${String(myDate.getFullYear()).padStart(4, '0')}-${String(myDate.getMonth()).padStart(2, '0')}-${String(myDate.getDate()).padStart(2, '0')}`;
        
        const response = await fetch('/api/employee/' + selectedEmployeeState.employeeID, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(updatedEmployeeDetails)
        });

        if (!response.ok){
            let resp = await response.json();
            setMessageBoxText(resp.error);
            setMessageBoxIsError(true);
        }
        if (response.ok){
            const responseJson = await response.json();

            setMessageBoxText('Successfully edited employee!');
            setMessageBoxIsError(false);

            searchEmployeeDispatch({type: 'EDIT_SEARCHED_EMPLOYEE_BY_ID', payload: {
                id: selectedEmployeeState.employeeID, 
                newEmp: {
                    emp_id: selectedEmployeeState.employeeID,
                    emp_name: updatedEmployeeDetails.first_name + ' ' + updatedEmployeeDetails.last_name,
                    emp_position: updatedEmployeeDetails.employee_position
                }
            }});
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            if (!authorize()) return;

            console.log('authorized to fetch employee');

            const response = await fetch('/api/employee/id/' + selectedEmployeeState.employeeID, {
                method: 'GET'
            });

            let responseJson = await response.json();
            
            if (typeof responseJson.error !== 'undefined'){
                console.log("id " + selectedEmployeeState.employeeID + " doesn't exist!");
                return;
            }
            
            delete responseJson.user_password;
            let myDate = new Date(responseJson.probation_end_date);
            // reformat so that input type='Data' can be set with default value of this new format
            responseJson.probation_end_date = `${String(myDate.getFullYear()).padStart(4, '0')}-${String(myDate.getMonth()).padStart(2, '0')}-${String(myDate.getDate()).padStart(2, '0')}`;
            setEmployeeData(responseJson);
        };

        fetchData();
    }, []);

    return (
        <section id="employeeView">
            <h1>Employee details:</h1>
            <hr />
            {
                employeeData === null ?
                <div className='empty-section-msg'>
                    Select an employee first <Link to='/employee'>here...</Link>
                </div>
                :
                <>
                    <EmployeeForm handleSubmit={handleSubmit} submitAction={'Edit'} defaultEmployeeDetails={ employeeData } setEmployeeDetails={ employeeDetailInputs } isSubmitDisabled={''} isInputDisabled={''} />
                    <button className='employee-form-cancel' onClick={ handleCancel } >Cancel</button> 
                </> 
            }
            <MessageBox text={messageBoxText} setText={setMessageBoxText} isError={messageBoxIsError} />
        </section>
    );
};

export default EmployeeView;
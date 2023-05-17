import './AddEmployee.css';

import { useState } from 'react';
import { useAuthStatus } from '../../Hooks/useAuthStatus';
import { useEmployeeDetails } from '../../Hooks/useEmployeeDetails';
import MessageBox from '../MessageBox/MessageBox';
import EmployeeForm from '../EmplopyeeForm/EmployeeForm';

const AddEmployee = () => {
    const { employeeDetails, employeeDetailInputs } = useEmployeeDetails();
    
    // message box states
    const [messageBoxText, setMessageBoxText] = useState('');
    const [messageBoxIsError, setMessageBoxIsError] = useState(false);

    // user states
    const { userState, authorize } = useAuthStatus();

    const handleSubmit = async e => {
        e.preventDefault();
        
        if (!authorize()) return;

        const response = await fetch('/api/employee', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(employeeDetails)
        });

    
        if (!response.ok){
            let resp = await response.json();
            setMessageBoxText(resp.error);
            setMessageBoxIsError(true);
        }
        if (response.ok){
            setMessageBoxText('Successfully added employee')
            setMessageBoxIsError(false);
        }
    }

    return (
        <section id="addEmployee">
            <h1>Add employee:</h1>
            <hr />
            <EmployeeForm handleSubmit={handleSubmit} submitAction={'Submit'} isSubmitDisabled={''} setEmployeeDetails={employeeDetailInputs} isInputDisabled={''} />
            <MessageBox text={messageBoxText} setText={setMessageBoxText} isError={messageBoxIsError} />
        </section>
    );
}

export default AddEmployee;

import './EmployeeForm.css';

const EmployeeForm = ({handleSubmit, submitAction, defaultEmployeeDetails, setEmployeeDetails, isInputDisabled, isSubmitDisabled}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div class='add-emp-inputs'>
                <div class='add-emp-userdetails'>
                    <h1>User Details:</h1>
                    <label for="in_email">First Name:</label>
                    <input required type="text" defaultValue={defaultEmployeeDetails?.first_name} disabled={isInputDisabled} name="first_name" onChange={e => setEmployeeDetails.setFirst_name(e.target.value)} />

                    <label for="in_email">Last Name:</label>
                    <input required type="text" defaultValue={defaultEmployeeDetails?.last_name} disabled={isInputDisabled} name="last_name" onChange={e => setEmployeeDetails.setLast_name(e.target.value)} />

                    <label for="in_email">Sex:</label>
                    <input required type="text" defaultValue={defaultEmployeeDetails?.sex} disabled={isInputDisabled} name="sex" onChange={e => setEmployeeDetails.setSex(e.target.value)} />

                    <label for="in_email">Contact Number:</label>
                    <input required type="text" defaultValue={defaultEmployeeDetails?.contact_number} disabled={isInputDisabled} name="contact_number" onChange={e => setEmployeeDetails.setContact_number(e.target.value)} />
                </div>
                
                { submitAction?.toLowerCase() !== 'edit' && false &&
                    <div class='add-emp-usercredentials'>
                        <h1>User Credentials:</h1>
                        <label for="in_email">Email Address:</label>
                        <input required type="email" defaultValue={defaultEmployeeDetails?.email_address} disabled={isInputDisabled} name="email_address" onChange={e => setEmployeeDetails.setEmail_address(e.target.value)} />

                        <label for="in_email">Password:</label>
                        <input required type="password" defaultValue={defaultEmployeeDetails?.user_password} disabled={isInputDisabled} name="user_password" onChange={e => setEmployeeDetails.setUser_password(e.target.value)} />
                    </div>
                }
                

                <div class='add-emp-details'>
                    <h1>Employee Details:</h1>
                    <label for="in_email">Gross Salary:</label>
                    <input required type="number" defaultValue={defaultEmployeeDetails?.gross_salary} disabled={isInputDisabled} name="gross_salary" onChange={e => setEmployeeDetails.setGross_salary(e.target.value)} />

                    <label for="in_email">Employee Position:</label>
                    <input required type="text" defaultValue={defaultEmployeeDetails?.employee_position} disabled={isInputDisabled} name="employee_position" onChange={e => setEmployeeDetails.setEmployee_position(e.target.value)} />

                    <label for="in_email">Probation End Date:</label>
                    <input required type="date" defaultValue={defaultEmployeeDetails?.probation_end_date} disabled={isInputDisabled} name="probation_end_date" onChange={e => setEmployeeDetails.setProbation_end_date(e.target.value)} />
                </div>
      
                <div class='add-emp-contribution'>
                    <h1>Contribution Details:</h1>
                    <label for="in_email">SSS:</label>
                    <input required type="text" defaultValue={defaultEmployeeDetails?.sss} disabled={isInputDisabled} name="sss" onChange={e => setEmployeeDetails.setSss(e.target.value)} />

                    <label for="in_email">PAGIBIG:</label>
                    <input required type="text" defaultValue={defaultEmployeeDetails?.pagibig} disabled={isInputDisabled} name="pagibig" onChange={e => setEmployeeDetails.setPagibig(e.target.value)} />

                    <label for="in_email">Philhealth:</label>
                    <input required type="text" defaultValue={defaultEmployeeDetails?.philhealth} disabled={isInputDisabled} name="philhealth" onChange={e => setEmployeeDetails.setPhilhealth(e.target.value)} />
                </div>

                <div class='add-emp-leave'>
                    <h1>Leaves:</h1>
                    <label for="in_email">Vacation Leave:</label>
                    <input required type="number" defaultValue={defaultEmployeeDetails?.vacation_leave} disabled={isInputDisabled} name="vacation_leave" onChange={e => setEmployeeDetails.setVacation_leave(e.target.value)} />

                    <label for="in_email">Sick Leave:</label>
                    <input required type="number" defaultValue={defaultEmployeeDetails?.sick_leave} disabled={isInputDisabled} name="sick_leave" onChange={e => setEmployeeDetails.setSick_leave(e.target.value)} />

                    <label for="in_email">Emergency Leave:</label>
                    <input required type="number" defaultValue={defaultEmployeeDetails?.emergency_leave} disabled={isInputDisabled} name="emergency_leave" onChange={e => setEmployeeDetails.setEmergency_leave(e.target.value)} />
                </div>
            </div>
            {!isSubmitDisabled && <button className='employee-form-submit'>{submitAction}</button>}
        </form>
    )
}

export default EmployeeForm;
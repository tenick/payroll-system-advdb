import { useState } from 'react'
import { useSelectedEmployee } from '../../Hooks/useSelectedEmployee';
import { reformatDateObjectToHTMLInputDateTypeString, reformatDateStringToHTMLInputDateTypeString } from '../../Utils/Utility'
import MessageBox from '../MessageBox/MessageBox';

const TimesheetsView = ({employeeTimesheetsData, setEmployeeTimesheetsData, isForPayrollGeneration}) => {
    const [ selectedTimesheetIDs, setSelectedTimesheetIDs ] = useState([]);
    const { selectedEmployeeState, selectedEmployeeDispatch } = useSelectedEmployee();
    
    // message box states
    const [messageBoxText, setMessageBoxText] = useState('');
    const [messageBoxIsError, setMessageBoxIsError] = useState(false);

    const handleSubmit = async () => {
        let employeeID = selectedEmployeeState.employeeID;
        if (employeeID === null) return;

        if (selectedTimesheetIDs === null || selectedTimesheetIDs.length === 0){
            setMessageBoxText("Select a timesheet first");
            setMessageBoxIsError(true);
            return;
        }
        
        // step1: update selected timesheet ids property: payroll_generated to true
        for (const timesheet_id of selectedTimesheetIDs){
            const response = await fetch('/api/timesheet/' + employeeID, {
                method: 'PATCH',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    timesheet_id,
                    payroll_generated: 1
                })
            });

            if (!response.ok){
                let resp = await response.json();
                setMessageBoxText(resp.error);
                setMessageBoxIsError(true);

                return;
            }
        }

        // step2: generate payroll, save to db
        for (const timesheet_id of selectedTimesheetIDs){
            const timesheetResponse = await fetch('/api/timesheet/timesheet_id/' + timesheet_id, {
                method: 'GET'
            });
            const timesheetData = await timesheetResponse.json();
            const employeeResponse = await fetch('/api/employee/id/' + employeeID, {
                method: 'GET'
            });
            const employeeData = await employeeResponse.json();
            console.log("time sheet data: ", timesheetData, " start date: ", timesheetData.start_date, " | end date: ", timesheetData.end_date);
            
            const payroll_description = 'Payroll for ' + reformatDateStringToHTMLInputDateTypeString(timesheetData.start_date) + ' - ' + reformatDateStringToHTMLInputDateTypeString(timesheetData.end_date);
            const creation_date = reformatDateObjectToHTMLInputDateTypeString(new Date());
            const gross_salary = employeeData.gross_salary;
            const employee_id = employeeID;

            const response = await fetch('/api/payroll', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    payroll_description,
                    creation_date,
                    gross_salary,
                    timesheet_id,
                    employee_id
                })
            });

            if (!response.ok){
                let resp = await response.json();
                setMessageBoxText(resp.error);
                setMessageBoxIsError(true);

                return;
            }
        }

        // step3: update local states
        setEmployeeTimesheetsData(employeeTimesheetsData.map(timesheet => {
            if (!selectedTimesheetIDs.includes(timesheet.timesheet_id)) return timesheet;

            timesheet.payroll_generated = true;
            return timesheet;
        }));
        setSelectedTimesheetIDs([]);

        setMessageBoxText('Successfully generated payroll!')
        setMessageBoxIsError(false);
    }

    const handleCheckbox = e => {
        const addTimesheet = e.target.checked;
        const timesheetID = parseInt(e.target.nextSibling.value);

        if (addTimesheet){
            if (!selectedTimesheetIDs.includes(timesheetID)){
                setSelectedTimesheetIDs(selectedTimesheetIDs.concat([timesheetID]));
            }
        }
        else setSelectedTimesheetIDs(selectedTimesheetIDs.filter(timesheetid => timesheetid !== timesheetID));
        

        console.log(selectedTimesheetIDs);
    }

    return (
        <>
            <div className='table'>
                <div className='tableRow tableHeader'>
                    <div className='tableCell'>
                        Start Date
                    </div>
                    <div className='tableCell'>
                        End Date
                    </div>
                    <div className='tableCell'>
                        Worked Hours
                    </div>
                    <div className='tableCell'>
                        {isForPayrollGeneration ? 'Add Timesheet' : "Payroll Generated?"}
                    </div>
                </div>
                {
                    employeeTimesheetsData
                        .filter(timesheet => isForPayrollGeneration ? !timesheet.payroll_generated : true )
                        .map(timesheet => 
                        <div className='tableRow' key={timesheet.timesheet_id}>
                            <div className='tableCell'>
                                {reformatDateStringToHTMLInputDateTypeString(timesheet.start_date)}
                            </div>
                            <div className='tableCell'>
                                {reformatDateStringToHTMLInputDateTypeString(timesheet.end_date)}
                            </div>
                            <div className='tableCell'>
                                {timesheet.worked_hours} hours
                            </div>
                            {
                                isForPayrollGeneration ?
                                <div className='tableCell'>
                                    <input type='checkbox' defaultChecked={timesheet.payroll_generated} onChange={handleCheckbox} />
                                    <input type='hidden' value={timesheet.timesheet_id} />
                                </div>
                                :
                                <div className={'tableCell ' + (timesheet.payroll_generated ? 'is_payroll_generated' : 'is_payroll_not_generated')}>
                                    {timesheet.payroll_generated ? "Yes" : "No"}
                                </div>
                            }
                        </div>
                    )
                }
            </div>
            {
                isForPayrollGeneration &&
                <>
                    <button onClick={handleSubmit} className='form-submit'>Generate Payroll</button>
                    <MessageBox text={messageBoxText} setText={setMessageBoxText} isError={messageBoxIsError} />
                </>
            }
        </>
    )
}

export default TimesheetsView;
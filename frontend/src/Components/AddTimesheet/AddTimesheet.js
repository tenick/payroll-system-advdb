import './AddTimesheet.css';

import { useState } from 'react';
import { useAuthStatus } from '../../Hooks/useAuthStatus';
import { useEmployeeDetails } from '../../Hooks/useEmployeeDetails';
import MessageBox from '../MessageBox/MessageBox';
import EmployeeForm from '../EmplopyeeForm/EmployeeForm';

const AddTimesheet = () => {
    const { employeeDetails, employeeDetailInputs } = useEmployeeDetails();
    const [ timesheetCsvDataState, setTimesheetCsvDataState ] = useState(null);
    console.log('state..? ', timesheetCsvDataState);

    // message box states
    const [messageBoxText, setMessageBoxText] = useState('');
    const [messageBoxIsError, setMessageBoxIsError] = useState(false);

    // user states
    const { userState, authorize } = useAuthStatus();

    const handleSubmit = async e => {
        e.preventDefault();
        console.log('submit is working');
        return;
        
        if (!authorize()) return;

        const response = await fetch('/api/timesheet', {
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

    const handleFile = file => {
        console.log('upload file: ', file);
        var reader = new FileReader();
        reader.onload = e => parseTimesheetCsv(e.target.result);
        reader.readAsText(file.target.files[0]);
    }

    const parseTimesheetCsv = timesheetCsvString => {
        // reformat timesheet
        let rows = timesheetCsvString
                    .split('\n')
                    .map(row => row
                        .replace('\r', '')
                        .split(',')
                        .slice(0, 4))
                    .filter(row => row.length == 4);

        
        setTimesheetCsvDataState(rows);
        console.log(rows);
    }

    const validateTimesheet = timeSheetData => {
        try {
            if (!timeSheetData || !Array.isArray(timeSheetData) || timeSheetData.length != 6) throw new Error('invalid timesheet format!');
            // better if you add here validation of unchanging cells (the header e.g. Day, Monday, Tuesday, Time-In, etc...)
        }
        catch (err){
            return false;
        }
        return true;
    }

    return (
        <section id="addTimesheet">
            <h1>Add timesheet:</h1>
            <hr />
            <form onSubmit={handleSubmit}>
                <input required type="file"  name="timesheet_csv" onChange={handleFile} onClick={e => {e.target.value = null; setTimesheetCsvDataState(null)}}  />

                { validateTimesheet(timesheetCsvDataState) ?
                    <>
                        <div className='timesheetPreview'>
                            {
                                timesheetCsvDataState.map(row => 
                                    <div className='timesheetPreviewRow'>
                                        {
                                            row.map(cell => 
                                                <div className='timesheetPreviewCell'>
                                                    {cell}
                                                </div>
                                            )
                                        }
                                    </div>
                                )
                            }
                        </div>

                        <button className='employee-form-submit'>Upload timesheet</button>
                    </>
                    :
                    timesheetCsvDataState &&
                    <>
                        <div className={'messageBox messageBoxError'}>
                            <span>{'Invalid timesheet format!'}</span>
                        </div>
                    </>
                }
                
            </form>
            <MessageBox text={messageBoxText} setText={setMessageBoxText} isError={messageBoxIsError} />
        </section>
    );
}

export default AddTimesheet;

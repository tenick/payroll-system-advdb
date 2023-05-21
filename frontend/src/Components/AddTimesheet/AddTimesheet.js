import './AddTimesheet.css';

import { useState, useRef } from 'react';
import { useAuthStatus } from '../../Hooks/useAuthStatus';
import { useEmployeeDetails } from '../../Hooks/useEmployeeDetails';
import MessageBox from '../MessageBox/MessageBox';
import EmployeeForm from '../EmplopyeeForm/EmployeeForm';
import TimesheetPreview from './TimesheetPreview';
import TimesheetSummary from './TimesheetSummary';
import { reformatDateObjectToHTMLInputDateTypeString } from '../../Utils/Utility'

const AddTimesheet = () => {
    // timesheet states
    const [ timesheet_csv_string, setTimesheet_csv_string ] = useState(null);
    const [ timesheetCsvDataState, setTimesheetCsvDataState ] = useState(null);
    const [ timesheetSummaryDataState, setTimesheetSummaryDataState ] = useState(null);

    // message box states
    const [messageBoxText, setMessageBoxText] = useState('');
    const [messageBoxIsError, setMessageBoxIsError] = useState(false);

    // user states
    const { userState, authorize } = useAuthStatus();

    const handleSubmit = async e => {
        e.preventDefault();

        if (!authorize()) return;

        const start_date = reformatDateObjectToHTMLInputDateTypeString(new Date(Math.min(...timesheetSummaryDataState.map(row => row[0]))));
        const end_date = reformatDateObjectToHTMLInputDateTypeString(new Date(Math.max(...timesheetSummaryDataState.map(row => row[0]))));
        const worked_hours = Math.floor(timesheetSummaryDataState.map(row => Math.abs(row[2] - row[1])/1000/60).reduce((a, b) => a + b) / 60);
        const upload_date = reformatDateObjectToHTMLInputDateTypeString(new Date());
        const response = await fetch('/api/timesheet/' + userState.user.id, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                timesheet_csv_string,
                start_date,
                end_date,
                worked_hours,
                payroll_generated: 0, // false default
                upload_date
            })
        });

        resetFile(fileInputElement.current);
        
        if (!response.ok){
            let resp = await response.json();
            setMessageBoxText(resp.error);
            setMessageBoxIsError(true);
        }
        if (response.ok){
            setMessageBoxText('Successfully added timesheet!')
            setMessageBoxIsError(false);
        }
    }

    const handleFile = file => {
        var reader = new FileReader();
        reader.onload = e => parseTimesheetCsv(e.target.result);
        reader.readAsText(file.target.files[0]);
    }

    const parseTimesheetCsv = timesheetCsvString => {
        setTimesheet_csv_string(timesheetCsvString);
        
        // reformat timesheet
        let rows = timesheetCsvString
                    .split('\n')
                    .map(row => row
                        .replace('\r', '')
                        .split(',')
                        .slice(0, 4))
                    .filter(row => row.length == 4);

        let datesByTime = rows.slice(1, 6).map(row => row.slice(1, 4)).map(row => [new Date(row[0]), new Date('01-01-0101 ' + row[1]), new Date('01-01-0101 ' + row[2])]);
        
        setTimesheetCsvDataState(rows);
        setTimesheetSummaryDataState(datesByTime);
    }

    const validateTimesheet = (timeSheetData, timeSheetSummaryData) => {
        try {
            // check if timesheet csv is not followed
            if (!timeSheetData || !Array.isArray(timeSheetData) || timeSheetData.length != 6) throw new Error('invalid timesheet format!');
            
            // check if any invalid date conversions
            timeSheetSummaryData.forEach(row => row.forEach(cell => {
                if (cell == 'Invalid Date') throw new Error('invalid timesheet format!');
            }))
        }
        catch (err){
            return false;
        }
        return true;
    }

    const fileInputElement = useRef();
    const resetFile = e =>  {
        e.value = null;
        setTimesheetCsvDataState(null);
    }

    return (
        <section id="addTimesheet">
            <h1>Add timesheet:</h1>
            <hr />
            <form onSubmit={handleSubmit}>
                <input required type="file" ref={fileInputElement} name="timesheet_csv" onChange={handleFile} onClick={e => resetFile(e.target)}  />

                { validateTimesheet(timesheetCsvDataState, timesheetSummaryDataState) ?
                    <>
                        <h1 className='tableLabel'>Timesheet Preview:</h1>
                        <TimesheetPreview timesheetCsvDataState={timesheetCsvDataState} />

                        <h1 className='tableLabel'>Summary:</h1>
                        <TimesheetSummary timesheetSummaryDataState={timesheetSummaryDataState} />

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

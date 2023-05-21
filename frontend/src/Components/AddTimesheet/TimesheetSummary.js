//import './TimesheetSummary.css';
import { reformatDateObjectToHTMLInputDateTypeString } from '../../Utils/Utility'

const TimesheetSummary = ({timesheetSummaryDataState}) => {
    const minDate = reformatDateObjectToHTMLInputDateTypeString(new Date(Math.min(...timesheetSummaryDataState.map(row => row[0]))));
    const maxDate = reformatDateObjectToHTMLInputDateTypeString(new Date(Math.max(...timesheetSummaryDataState.map(row => row[0]))));
    const totalMins = timesheetSummaryDataState.map(row => Math.abs(row[2] - row[1])/1000/60).reduce((a, b) => a + b);
    const totalHours = Math.floor(totalMins / 60);

    return (
        <div className='table'>
            <div className='tableRow'>
                <div className='tableCell'>
                    Start date:
                </div>
                <div className='tableCell'>
                    { minDate }
                </div>
            </div>
            <div className='tableRow'>
                <div className='tableCell'>
                    End date:
                </div>
                <div className='tableCell'>
                    { maxDate }
                </div>
            </div>
            <div className='tableRow'>
                <div className='tableCell'>
                    Total worked minutes:
                </div>
                <div className='tableCell'>
                    { totalMins }
                </div>
            </div>
            <div className='tableRow'>
                <div className='tableCell'>
                    Total worked hours:
                </div>
                <div className='tableCell'>
                    { totalHours }
                </div>
            </div>
        </div>
    );
}

export default TimesheetSummary;
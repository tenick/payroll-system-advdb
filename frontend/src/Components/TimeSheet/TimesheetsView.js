import { reformatDateStringToHTMLInputDateTypeString } from '../../Utils/Utility'

const TimesheetsView = ({employeeTimesheetsData}) => {
    return (
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
            </div>
            {
                employeeTimesheetsData.map(timesheet => 
                    <div className='tableRow'>
                        <div className='tableCell'>
                            {reformatDateStringToHTMLInputDateTypeString(timesheet.start_date)}
                        </div>
                        <div className='tableCell'>
                            {reformatDateStringToHTMLInputDateTypeString(timesheet.end_date)}
                        </div>
                        <div className='tableCell'>
                            {timesheet.worked_hours} hours
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default TimesheetsView;
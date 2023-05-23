import { reformatDateStringToHTMLInputDateTypeString, calculateNetSalary } from '../../Utils/Utility'

const PayrollsView = ({employeePayrollsData}) => {
    return (
        <div className='table'>
            <div className='tableRow tableHeader'>
                <div className='tableCell'>
                    Creation Date
                </div>
                <div className='tableCell'>
                    Payroll Description
                </div>
                <div className='tableCell'>
                    Worked Hours
                </div>
                <div className='tableCell'>
                    Gross Salary
                </div>
                <div className='tableCell'>
                    Net Salary
                </div>
                <div className='tableCell'>
                    Download
                </div>
            </div>
            {
                employeePayrollsData.map(payroll => 
                    <div className='tableRow' key={ payroll.payroll_id }>
                        <div className='tableCell'>
                            {reformatDateStringToHTMLInputDateTypeString(payroll.creation_date)}
                        </div>
                        <div className='tableCell'>
                            {payroll.payroll_description}
                        </div>
                        <div className='tableCell'>
                            {payroll.timesheetData.worked_hours}
                        </div>
                        <div className='tableCell'>
                            {parseFloat(payroll.gross_salary).toFixed(2)}
                        </div>
                        <div className='tableCell'>
                            {calculateNetSalary(payroll.gross_salary, payroll.timesheetData.worked_hours)}
                        </div>
                        <div className='tableCell'>
                            <button>.pdf</button>
                            <button>.xsls</button>
                        </div>
                    </div>
                )
            }
        </div>
    );
}

export default PayrollsView;
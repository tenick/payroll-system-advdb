import './Payroll.css';

import { useState, useEffect } from 'react';
import { useAuthStatus } from '../../Hooks/useAuthStatus';
import { useSelectedEmployee } from '../../Hooks/useSelectedEmployee';
import { reformatDateStringToHTMLInputDateTypeString, calculateNetSalary } from '../../Utils/Utility'
import Navlink from '../Navbar/Navlink';

const Payroll = () => {
    const { userState, authorize } = useAuthStatus();
    const { selectedEmployeeState, selectedEmployeeDispatch } = useSelectedEmployee();
    const [ employeePayrollsData, setEmployeePayrollsData ] = useState([]);
    
    useEffect(() => {
        const fetchData = async () => {
            if (!authorize()) return;

            let employeeID = selectedEmployeeState.employeeID;
            if (employeeID === null && userState.user.role === 'employee') employeeID = userState.user.id;
			
			if (employeeID === null) return;
			
            const response = await fetch('/api/payroll/' + employeeID, {
                method: 'GET'
            });

            let responseJson = await response.json();
            
            if (typeof responseJson.error !== 'undefined'){
                console.log("id " + employeeID + " doesn't exist!");
                return;
            }
            
            for (const payroll of responseJson){
                const timesheetResponse = await fetch('/api/timesheet/timesheet_id/' + payroll.timesheet_id, {
                    method: 'GET'
                });
                const timesheetData = await timesheetResponse.json();

                payroll.timesheetData = timesheetData;
            }
            
            console.log('employee payroll data: ', responseJson);

			setEmployeePayrollsData(responseJson);
        };

        fetchData();
    }, []);

    return (
        <section id="payroll">
            <h1>Payroll:</h1>
            <hr />

            {
				employeePayrollsData !== null && employeePayrollsData.length !== 0 ?
				<>
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
				</>
				:
				<>
				{
					userState.user.role === 'employee' ?
					<>
						<div className='empty-section-msg'>
							No timesheet found, create one <Navlink className={'genericLink'} path='/add_timesheet' isGenericLink >here...</Navlink>
						</div>
					</>
					:
					<>
						<div className='empty-section-msg'>
							Select an employee first <Navlink className={'genericLink'} path='/employee' isGenericLink >here...</Navlink>
						</div>
					</>	
				}
				</>
			}
        </section>
    );
}

export default Payroll;

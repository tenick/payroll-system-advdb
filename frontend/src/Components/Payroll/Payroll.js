import './Payroll.css';

import { useState, useEffect } from 'react';
import { useAuthStatus } from '../../Hooks/useAuthStatus';
import { useSelectedEmployee } from '../../Hooks/useSelectedEmployee';
import Navlink from '../Navbar/Navlink';
import PayrollsView from './PayrollsView';

const Payroll = () => {
    const { userState, authorize } = useAuthStatus();
    const { selectedEmployeeState } = useSelectedEmployee();
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
                userState.user.role === 'employee' ?
                <>
                    {
                        employeePayrollsData !== null && employeePayrollsData.length !== 0 ?
                        <PayrollsView employeePayrollsData={employeePayrollsData} />
                        :
                        <div className='empty-section-msg'>
							No payroll found
						</div>
                    }
                </>
				:
				<>
				{
                    selectedEmployeeState.employeeID === null ?
                    <div className='empty-section-msg'>
                        Select an employee first <Navlink className={'genericLink'} path='/employee' isGenericLink >here...</Navlink>
                    </div>
					:
					<>
                        {
                            employeePayrollsData !== null && employeePayrollsData.length !== 0 ?
                            <PayrollsView employeePayrollsData={employeePayrollsData} />
                            :
                            <div className='empty-section-msg'>
                                No payroll found, generate one <Navlink className={'genericLink'} path='/generate_payroll' isGenericLink >here...</Navlink>
                            </div>
                        }
					</>	
				}
				</>
			}
        </section>
    );
}

export default Payroll;

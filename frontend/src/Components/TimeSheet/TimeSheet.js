import './TimeSheet.css';

import Navlink from '../Navbar/Navlink';
import { useAuthStatus } from '../../Hooks/useAuthStatus';
import { useState, useEffect } from 'react';
import { useSelectedEmployee } from '../../Hooks/useSelectedEmployee';
import TimesheetsView from './TimesheetsView';

const TimeSheet = () => {
    const { userState, authorize } = useAuthStatus();
    const { selectedEmployeeState, selectedEmployeeDispatch } = useSelectedEmployee();

    const [employeeTimesheetsData, setEmployeeTimesheetsData] = useState(null);


	useEffect(() => {
        const fetchData = async () => {
            if (!authorize()) return;

            console.log('authorized to fetch employee ', userState, "employee state: ", selectedEmployeeState);
            let employeeID = selectedEmployeeState.employeeID;
            if (employeeID === null && userState.user.role === 'employee') employeeID = userState.user.id;
			
			if (employeeID === null) return;
			
            const response = await fetch('/api/timesheet/' + employeeID, {
                method: 'GET'
            });

            let responseJson = await response.json();
            
            if (typeof responseJson.error !== 'undefined'){
                console.log("id " + employeeID + " doesn't exist!");
                return;
            }
            
			setEmployeeTimesheetsData(responseJson);
			console.log(responseJson);
        };

        fetchData();
    }, []);

  	return (
		<section id="timesheet">
			<h1>Timesheet:</h1>
            <hr />
			{
				employeeTimesheetsData !== null  ?
				<>
					<TimesheetsView employeeTimesheetsData={employeeTimesheetsData}/>
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

export default TimeSheet;

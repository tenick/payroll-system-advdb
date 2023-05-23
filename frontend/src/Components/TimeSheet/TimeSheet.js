import './TimeSheet.css';

import Navlink from '../Navbar/Navlink';
import { useAuthStatus } from '../../Hooks/useAuthStatus';
import TimesheetsView from './TimesheetsView';
import { useTimesheet } from '../../Hooks/useTimesheet';
import { useSelectedEmployee } from '../../Hooks/useSelectedEmployee';

const TimeSheet = () => {
    const { userState } = useAuthStatus();
	const { employeeTimesheetsData, setEmployeeTimesheetsData } = useTimesheet();
	const { selectedEmployeeState } = useSelectedEmployee();

  	return (
		<section id="timesheet">
			<h1>Timesheet:</h1>
            <hr />
			{
				userState.user.role === 'employee' ?
				<>
					{
						employeeTimesheetsData !== null && employeeTimesheetsData.length !== 0 ?
						<TimesheetsView employeeTimesheetsData={employeeTimesheetsData} setEmployeeTimesheetsData={setEmployeeTimesheetsData} />
						:
						<div className='empty-section-msg'>
							No timesheet found, create one <Navlink className={'genericLink'} path='/add_timesheet' isGenericLink >here...</Navlink>
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
								employeeTimesheetsData !== null && employeeTimesheetsData.length !== 0 ?
								<TimesheetsView employeeTimesheetsData={employeeTimesheetsData} setEmployeeTimesheetsData={setEmployeeTimesheetsData} />
								:
								<div className='empty-section-msg'>
									No timesheet found
								</div>
							}
						</>
					}
				</>
			}
		</section>
  	);
}

export default TimeSheet;

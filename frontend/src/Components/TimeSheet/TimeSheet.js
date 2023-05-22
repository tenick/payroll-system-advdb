import './TimeSheet.css';

import Navlink from '../Navbar/Navlink';
import { useAuthStatus } from '../../Hooks/useAuthStatus';
import TimesheetsView from './TimesheetsView';
import { useTimesheet } from '../../Hooks/useTimesheet';

const TimeSheet = () => {
    const { userState } = useAuthStatus();
	const { employeeTimesheetsData, setEmployeeTimesheetsData } = useTimesheet();

  	return (
		<section id="timesheet">
			<h1>Timesheet:</h1>
            <hr />
			{
				employeeTimesheetsData !== null  ?
				<>
					<TimesheetsView employeeTimesheetsData={employeeTimesheetsData} setEmployeeTimesheetsData={setEmployeeTimesheetsData} />
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

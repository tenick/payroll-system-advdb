import { useAuthStatus } from '../../Hooks/useAuthStatus';
import { useTimesheet } from '../../Hooks/useTimesheet';
import TimesheetsView from '../TimeSheet/TimesheetsView';
import Navlink from '../Navbar/Navlink';

const GeneratePayroll = () => {
    const { userState } = useAuthStatus();
	const { employeeTimesheetsData, setEmployeeTimesheetsData } = useTimesheet();

    return (
        <section id="timesheet">
			<h1>Generate Payroll:</h1>
            <hr />
			{
				employeeTimesheetsData !== null  ?
				<>
					<TimesheetsView employeeTimesheetsData={employeeTimesheetsData} setEmployeeTimesheetsData={setEmployeeTimesheetsData} isForPayrollGeneration />
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
    )
}

export default GeneratePayroll;
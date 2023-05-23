import { useTimesheet } from '../../Hooks/useTimesheet';
import { useSelectedEmployee } from '../../Hooks/useSelectedEmployee';
import TimesheetsView from '../TimeSheet/TimesheetsView';
import Navlink from '../Navbar/Navlink';

const GeneratePayroll = () => {
	const { employeeTimesheetsData, setEmployeeTimesheetsData } = useTimesheet();
	const { selectedEmployeeState } = useSelectedEmployee();

    return (
        <section id="timesheet">
			<h1>Generate Payroll:</h1>
            <hr />
			{
				selectedEmployeeState.employeeID === null ?
				<div className='empty-section-msg'>
					Select an employee first <Navlink className={'genericLink'} path='/employee' isGenericLink >here...</Navlink>
				</div>
				:
				<>
					{
						employeeTimesheetsData !== null && employeeTimesheetsData.length !== 0 ?
						<TimesheetsView employeeTimesheetsData={employeeTimesheetsData} setEmployeeTimesheetsData={setEmployeeTimesheetsData} isForPayrollGeneration />
						:
						<div className='empty-section-msg'>
							No timesheet found
						</div>
					}
				</>
			}
			
		</section>
    )
}

export default GeneratePayroll;
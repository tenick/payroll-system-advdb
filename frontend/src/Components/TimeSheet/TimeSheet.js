import './TimeSheet.css';

import Navlink from '../Navbar/Navlink';
import { useAuthStatus } from '../../Hooks/useAuthStatus';
import { useEffect } from 'react';

const TimeSheet = () => {
    const { userState } = useAuthStatus();

  	return (
		<section id="timesheet">
			<h1>Timesheet:</h1>
            <hr />
			{
				userState.user.role === 'employee' ?
				<div className='empty-section-msg'>
					No timesheet found, create one <Navlink className={'genericLink'} path='/add_timesheet' isGenericLink >here...</Navlink>
				</div>
				:
				<>
					<div className='empty-section-msg'>
						Select an employee first <Navlink className={'genericLink'} path='/employee' isGenericLink >here...</Navlink>
					</div>
				</>
			}
			
		</section>
  	);
}

export default TimeSheet;

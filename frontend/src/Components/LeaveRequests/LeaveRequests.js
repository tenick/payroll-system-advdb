import './LeaveRequests.css';

import Navlink from '../Navbar/Navlink';

const LeaveRequests = () => {
  
    return (
        <section id="leaveRequests">
            <h1>Leave Requests:</h1>
            <hr />
            <div className='empty-section-msg'>
                Select an employee first <Navlink className={'genericLink'} path='/employee' innerText={'here...'} isGenericLink >here...</Navlink>
            </div>
        </section>
    );
}

export default LeaveRequests;

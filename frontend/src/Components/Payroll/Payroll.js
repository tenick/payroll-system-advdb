import './Payroll.css';

import Navlink from '../Navbar/Navlink';

const Payroll = () => {
  
    return (
        <section id="payroll">
            <h1>Payroll:</h1>
            <hr />
            <div className='empty-section-msg'>
                Select an employee first <Navlink className={'genericLink'} path='/employee' innerText={'here...'} isGenericLink >here...</Navlink>
            </div>
        </section>
    );
}

export default Payroll;

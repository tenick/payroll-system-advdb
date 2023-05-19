import Navbar from '../../Components/Navbar/Navbar';
import { NavbarContextProvider } from '../../Components/Navbar/NavbarContext';
import Workspace from '../../Components/Workspace/Workspace';

const PayrollSystem = () => {
    
    return (
        <div id='payroll-system'>
            <NavbarContextProvider>
                <Navbar />
                <Workspace />
            </NavbarContextProvider>
        </div>
    );
}

export default PayrollSystem;
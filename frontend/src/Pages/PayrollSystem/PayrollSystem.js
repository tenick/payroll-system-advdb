import Navbar from '../../Components/Navbar/Navbar';
import Workspace from '../../Components/Workspace/Workspace';
import { WorkspaceHeaderContextProvider } from '../../Context/WorkspaceHeaderContext';

const PayrollSystem = () => {
    
    return (
        <div id='payroll-system'>
            <WorkspaceHeaderContextProvider>
                <Navbar />
                <Workspace />
            </WorkspaceHeaderContextProvider>
        </div>
    );
}

export default PayrollSystem;
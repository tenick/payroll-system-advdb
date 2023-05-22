import './Workspace.css';

import { useAuthStatus } from '../../Hooks/useAuthStatus';

import Employee from '../Employee/Employee';
import AddEmployee from '../AddEmployee/AddEmployee';
import EmployeeView from '../EmployeeView/EmployeeView';
import WorkspaceHeader from '../WorkspaceHeader/WorkspaceHeader';
import Payroll from '../Payroll/Payroll';
import TimeSheet from '../TimeSheet/TimeSheet';
import LeaveRequests from '../LeaveRequests/LeaveRequests';
import { SelectedEmployeeContextProvider } from '../../Context/SelectedEmployeeContext';
import { useNav } from '../../Hooks/useNav';

import { Routes, Route, Navigate } from 'react-router-dom';
import { SearchEmployeeContextProvider } from '../../Context/SearchEmployeeContext';
import AddTimesheet from '../AddTimesheet/AddTimesheet';
import GeneratePayroll from '../GeneratePayroll/GeneratePayroll';

const Workspace = () => {
    const { userState } = useAuthStatus();
    const { navState, navDispatch } = useNav();

    return (
        <SearchEmployeeContextProvider>
        <SelectedEmployeeContextProvider>
            <section id="workspace">
                <WorkspaceHeader />
                <Routes>
                    <Route
                        path='/'
                        element={ userState.user === null ? <Navigate to='/' /> : <Navigate to='/employee' />}
                    />
                    <Route
                        path='employee'
                        element={ userState.user === null ? <Navigate to='/' /> : <Employee />}
                    />
                    {userState.user.role === 'admin' && 
                        <>
                            <Route
                                path='add_employee'
                                element={ userState.user === null ? <Navigate to='/' /> : <AddEmployee />}
                            />
                            <Route
                                path='edit_employee'
                                element={ userState.user === null ? <Navigate to='/' /> : <EmployeeView />}
                            />
                        </>
                    }
                    <Route
                        path='payroll'
                        element={ userState.user === null ? <Navigate to='/' /> : <Payroll />}
                    />
                    {userState.user.role === 'admin' && 
                        <Route
                            path='generate_payroll'
                            element={ userState.user === null ? <Navigate to='/' /> : <GeneratePayroll />}
                        />
                    }
                    <Route
                        path='timesheet'
                        element={ userState.user === null ? <Navigate to='/' /> : <TimeSheet />}
                    />
                    {userState.user.role === 'employee' && 
                        <>
                            <Route
                                path='add_timesheet'
                                element={ userState.user === null ? <Navigate to='/' /> : <AddTimesheet />}
                            />
                        </>
                    }
                    <Route
                        path='leave_requests'
                        element={ userState.user === null ? <Navigate to='/' /> : <LeaveRequests />}
                    />
                    <Route
                        path='*'
                        element={ <Navigate to='/' /> }
                    />
                </Routes>
            </section>
        </SelectedEmployeeContextProvider>
        </SearchEmployeeContextProvider>
    );
}

export default Workspace;
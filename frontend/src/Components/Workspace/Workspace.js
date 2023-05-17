import './Workspace.css';

import { useContext, useState } from 'react';
import { ModalContext } from '../../Context/ModalContext';
import { useAuthStatus } from '../../Hooks/useAuthStatus';

import Employee from '../Employee/Employee';
import AddEmployee from '../AddEmployee/AddEmployee';
import WorkspaceHeader from '../WorkspaceHeader/WorkspaceHeader';
import Payroll from '../Payroll/Payroll';
import TimeSheet from '../TimeSheet/TimeSheet';
import { SelectedEmployeeContextProvider } from '../../Context/SelectedEmployeeContext';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { SearchEmployeeContextProvider } from '../../Context/SearchEmployeeContext';

const Workspace = () => {
    const { userState } = useAuthStatus();

    return (
        <SearchEmployeeContextProvider>
            <SelectedEmployeeContextProvider>
                <section id="workspace">
                    <WorkspaceHeader />
                    <Routes>
                        {userState.user.role === 'admin' && 
                            <>
                                <Route
                                    path='/'
                                    element={ userState.user === null ? <Navigate to='/' /> : <Navigate to='/employee' />}
                                />
                                <Route
                                    path='employee'
                                    element={ userState.user === null ? <Navigate to='/' /> : <Employee />}
                                />
                                <Route
                                    path='add_employee'
                                    element={ userState.user === null ? <Navigate to='/' /> : <AddEmployee />}
                                />
                                <Route
                                    path='payroll'
                                    element={ userState.user === null ? <Navigate to='/' /> : <Payroll />}
                                />
                                <Route
                                    path='timesheet'
                                    element={ userState.user === null ? <Navigate to='/' /> : <TimeSheet />}
                                />
                            </>
                        }

                        {userState.user.role === 'admin' && 
                            <>
                                <Route
                                    path='/'
                                    element={ userState.user === null ? <Navigate to='/' /> : <Navigate to='/payroll' />}
                                />
                                <Route
                                    path='timesheet'
                                    element={ userState.user === null ? <Navigate to='/' /> : <TimeSheet />}
                                />
                                <Route
                                    path='payroll'
                                    element={ userState.user === null ? <Navigate to='/' /> : <Payroll />}
                                />
                            </>
                        }
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
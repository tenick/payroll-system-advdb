import { useState, useEffect } from 'react';
import { useSelectedEmployee } from './useSelectedEmployee';
import { useAuthStatus } from './useAuthStatus';

export const useTimesheet = () => {
    const { selectedEmployeeState, selectedEmployeeDispatch } = useSelectedEmployee();
    const { userState, authorize } = useAuthStatus();
    const [employeeTimesheetsData, setEmployeeTimesheetsData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            if (!authorize()) return;

            let employeeID = selectedEmployeeState.employeeID;
            if (employeeID === null && userState.user.role === 'employee') employeeID = userState.user.id;
			
			if (employeeID === null) return;
			
            const response = await fetch('/api/timesheet/employee_id/' + employeeID, {
                method: 'GET'
            });

            let responseJson = await response.json();
            
            if (typeof responseJson.error !== 'undefined'){
                console.log("id " + employeeID + " doesn't exist!");
                return;
            }
            
			setEmployeeTimesheetsData(responseJson);
        };

        fetchData();
    }, []);

    return { employeeTimesheetsData, setEmployeeTimesheetsData };
}
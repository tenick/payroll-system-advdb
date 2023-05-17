import { useState } from 'react';

export const useEmployeeDetails = () => {
    const [first_name, setFirst_name] = useState('');
    const [last_name, setLast_name] = useState('');
    const [sex, setSex] = useState('');
    const [contact_number, setContact_number] = useState('');

    const [email_address, setEmail_address] = useState('');
    const [user_password, setUser_password] = useState('');

    const [gross_salary, setGross_salary] = useState('');
    const [employee_position, setEmployee_position] = useState('');
    const [probation_end_date, setProbation_end_date] = useState('');

    const [sss, setSss] = useState('');
    const [pagibig, setPagibig] = useState('');
    const [philhealth, setPhilhealth] = useState('');

    const [vacation_leave, setVacation_leave] = useState('');
    const [sick_leave, setSick_leave] = useState('');
    const [emergency_leave, setEmergency_leave] = useState('');

    return {
        employeeDetails: {
            first_name, last_name, sex, contact_number,
            email_address, user_password,
            gross_salary, employee_position, probation_end_date,
            sss, pagibig, philhealth,
            vacation_leave, sick_leave, emergency_leave
        },
        employeeDetailInputs: {
            setFirst_name, setLast_name, setSex,  setContact_number,
            setEmail_address,  setUser_password,
            setGross_salary,  setEmployee_position,  setProbation_end_date,
            setSss,  setPagibig,  setPhilhealth,
            setVacation_leave,  setSick_leave,  setEmergency_leave
        }
    };
}
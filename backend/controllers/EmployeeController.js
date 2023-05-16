const Employee = require('../models/Employee');

const getEmployeeByName = async (req, res) => {
    const foundEmployees = await Employee.findByName(req.params.name);

    res.json({msg: 'GET employee by name: '+ req.params.name, result: foundEmployees});
}

const addEmployee = async (req, res) => {
    const { first_name, 
            last_name, 
            sex, 
            contact_number, 
            email_address, 
            user_password,
            gross_salary,
            employee_position,
            probation_end_date,
            sss,
            pagibig,
            philhealth,
            vacation_leave,
            sick_leave,
            emergency_leave } = req.body;
    
    const newEmployeeID = await Employee.save(gross_salary, employee_position, probation_end_date,
        first_name, last_name, sex, contact_number, 
        email_address, user_password,
        sss, pagibig, philhealth,
        vacation_leave, sick_leave, emergency_leave);

    console.log('added new employee! ID: ', newEmployeeID);

    res.json({msg: 'POST new employee ID: '+newEmployeeID});
}

const updateEmployee = async (req, res) => {
    const { first_name, 
        last_name, 
        sex, 
        contact_number, 
        email_address, 
        user_password,
        gross_salary,
        employee_position,
        probation_end_date,
        employee_status,
        sss,
        pagibig,
        philhealth,
        vacation_leave,
        sick_leave,
        emergency_leave } = req.body;

    await Employee.updateById(req.params.id, gross_salary, employee_position, probation_end_date, employee_status,
        first_name, last_name, sex, contact_number, 
        email_address, user_password,
        sss, pagibig, philhealth,
        vacation_leave, sick_leave, emergency_leave);

    res.json({msg: 'UPDATE employee by ID: ' + req.params.id});
}

const deleteEmployee = async (req, res) => {
    const isDeleted = await Employee.deleteById(req.params.id);

    res.json({msg: 'DELETE employee ID: ' + req.params.id + " | " + isDeleted});
}

module.exports = {
    getEmployeeByName,
    addEmployee,
    updateEmployee,
    deleteEmployee
};
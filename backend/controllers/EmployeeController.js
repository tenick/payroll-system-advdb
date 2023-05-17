const Employee = require('../models/Employee');

const getEmployeeByName = async (req, res) => {
    try {
        const foundEmployees = await Employee.findByName(req.params.name);
        res.json(foundEmployees);
    }
    catch(err) {
        res.status(400);
        res.json({error: err.message});
    }
}

const getEmployeeByEmail = async (req, res) => {
    try {
        const foundEmployees = await Employee.findByEmail(req.params.email);
        res.json(foundEmployees);
    }
    catch(err) {
        console.log('herefsdfsdee?');
        res.status(400);
        res.json({error: err.message});
    }
}


const getEmployeeByID = async (req, res) => {
    console.log('watreached here.. right', req.params.id);
    try {
        const foundEmployees = await Employee.findById(req.params.id);
        res.json(foundEmployees);
    }
    catch(err) {
        res.status(400);
        res.json({error: err.message});
    }
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
    
    try {
        const newEmployeeID = await Employee.save(gross_salary, employee_position, probation_end_date,
            first_name, last_name, sex, contact_number, 
            email_address, user_password,
            sss, pagibig, philhealth,
            vacation_leave, sick_leave, emergency_leave);

        console.log('added new employee! ID: ', newEmployeeID);

        res.json({msg: 'POST new employee ID: '+newEmployeeID});
    }
    catch (err){
        res.status(400);
        res.json({error: err.message})
    }
}

const updateEmployee = async (req, res) => {
    const { first_name, 
        last_name, 
        sex, 
        contact_number, 
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
    
    try {
        await Employee.updateById(req.params.id, gross_salary, employee_position, probation_end_date, employee_status,
            first_name, last_name, sex, contact_number,
            sss, pagibig, philhealth,
            vacation_leave, sick_leave, emergency_leave);

        res.json({msg: 'Successful UPDATE employee by ID: ' + req.params.id});
    }
    catch (err) {
        res.status(400);
        res.json({error: err.message})
    }
}

const deleteEmployee = async (req, res) => {
    const isDeleted = await Employee.deleteById(req.params.id);

    res.json({msg: 'DELETE employee ID: ' + req.params.id + " | " + isDeleted});
}

module.exports = {
    getEmployeeByName,
    getEmployeeByEmail,
    getEmployeeByID,
    addEmployee,
    updateEmployee,
    deleteEmployee
};
const db = require('../config/db');

const UserDetail = require('../models/UserDetail');
const UserCredential = require('../models/UserCredential');
const Leave = require('../models/Leave');
const Contribution = require('../models/Contribution');

class Employee {
    static async save(gross_salary, employee_position, probation_end_date,
        first_name, last_name, sex, contact_number, 
        email_address, user_password,
        sss, pagibig, philhealth,
        vacation_leave, sick_leave, emergency_leave) {
        
        // defaults
        const employee_status = 'probation';
        
        // check if email already exists
        const foundEmail = await Employee.findByEmail(email_address.trim());
        console.log(foundEmail);
        if (typeof foundEmail === 'undefined' || foundEmail.length != 0)
            throw new Error('Email already exists!');
        
        // save userdetails tb
        const user_detail_id = await UserDetail.save(first_name, last_name, sex, contact_number);
        console.log('added userdetail');
        const user_credential_id = await UserCredential.save(email_address, user_password);
        console.log('added user_credential');
        const leave_id = await Contribution.save(sss, pagibig, philhealth);
        console.log('added leave');
        const contribution_id = await Leave.save(vacation_leave, sick_leave, emergency_leave);
        console.log('added contribution');
        
        let sql = `
            INSERT INTO Employee_tb(
                gross_salary,
                employee_position,
                probation_end_date,
                employee_status,
                user_detail_id,
                user_credential_id,
                leave_id,
                contribution_id
            )
            VALUES(
                '${gross_salary}',
                '${employee_position}',
                '${probation_end_date}',
                '${employee_status}',
                '${user_detail_id}',
                '${user_credential_id}',
                '${leave_id}',
                '${contribution_id}'
            )
        `;

        const [newEmployee, _] = await db.execute(sql);
        
        return newEmployee.insertId;
    }

    static async updateById(id, gross_salary, employee_position, probation_end_date, employee_status,
        first_name, last_name, sex, contact_number,
        sss, pagibig, philhealth,
        vacation_leave, sick_leave, emergency_leave) {
        
        
        const employeeData = await Employee.findById(id);

        // update related tables
        await UserDetail.updateById(employeeData.user_detail_id, first_name, last_name, sex, contact_number);
        await Contribution.updateById(employeeData.contribution_id, sss, pagibig, philhealth);
        await Leave.updateById(employeeData.leave_id, vacation_leave, sick_leave, emergency_leave);
        
        let sql = `
            UPDATE Employee_tb
            SET gross_salary = '${gross_salary}',
                employee_position = '${employee_position}',
                probation_end_date = '${probation_end_date}',
                employee_status = '${employee_status}'
            WHERE employee_id  = ${id};
        `;

        await db.execute(sql);
        
        return true;
    }


    static async deleteById(id) {
        // 1st must delete employee first, can't delete other tables with Foreign Keys because it's referencing employee table
        const employeeData = await Employee.findById(id);
        console.log('employee with id ' + id + " found!: ");
        console.log(employeeData);
        let sql = `
            DELETE FROM Employee_tb WHERE employee_id='${id}'
        `;
        await db.execute(sql);

        // 2nd delete related records in other table via all its foreign key
        await UserDetail.deleteById(employeeData.user_detail_id);
        await UserCredential.deleteById(employeeData.user_credential_id);
        await Contribution.deleteById(employeeData.leave_id);
        await Leave.deleteById(employeeData.contribution_id);

        return true;
    }

    static async findByName(name) {
        let sql = `
            SELECT *
            FROM Employee_tb
            WHERE user_detail_id
            IN (SELECT user_detail_id
            FROM UserDetail_tb 
            WHERE first_name LIKE '%${name}%'
            OR last_name LIKE '%${name}%'
            AND user_detail_id IN (SELECT user_detail_id FROM Employee_tb));
        `;

        const [foundEmployees, _] = await db.execute(sql);
        console.log(foundEmployees);
        
        let employees = [];
        for (const employee of foundEmployees){
            const user_detail = await UserDetail.findById(employee.user_detail_id);
            const user_credential = await UserCredential.findById(employee.user_credential_id);
            const leave = await Contribution.findById(employee.leave_id);
            const contribution = await Leave.findById(employee.contribution_id);
            let fullDetailEmployee = {...employee, ...user_detail, ...user_credential, ...leave, ...contribution };

            employees.push(fullDetailEmployee);
        }

        return employees;
    }

    static async findByEmail(email) {
        let sql = `
            SELECT *
            FROM Employee_tb
            WHERE user_credential_id
            IN (SELECT user_credential_id
            FROM UserCredential_tb 
            WHERE email_address='${email}'
            AND user_credential_id IN (SELECT user_credential_id FROM Employee_tb));
        `;

        const [foundEmployees, _] = await db.execute(sql);
        let foundEmployee = foundEmployees[0];

        if (typeof foundEmployee === 'undefined') foundEmployee = [];

        return foundEmployee;
    }

    static async findById(id) {
        let sql = `
            SELECT * FROM Employee_tb WHERE employee_id='${id}'
        `;

        const [foundEmployees, _] = await db.execute(sql);
        const foundEmployee = foundEmployees[0];

        // get all related data as well
        const user_detail = await UserDetail.findById(foundEmployee.user_detail_id);
        const user_credential = await UserCredential.findById(foundEmployee.user_credential_id);
        const leave = await Contribution.findById(foundEmployee.leave_id);
        const contribution = await Leave.findById(foundEmployee.contribution_id);

        return {...foundEmployee, ...user_detail, ...user_credential, ...leave, ...contribution };
    }
}

module.exports = Employee;
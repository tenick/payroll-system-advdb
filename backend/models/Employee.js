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
        
        // save userdetails tb
        const user_detail_id = await UserDetail.save(first_name, last_name, sex, contact_number);
        const user_credential_id = await UserCredential.save(email_address, user_password);
        const leave_id = await Contribution.save(sss, pagibig, philhealth);
        const contribution_id = await Leave.save(vacation_leave, sick_leave, emergency_leave);
        
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
        email_address, user_password,
        sss, pagibig, philhealth,
        vacation_leave, sick_leave, emergency_leave) {
        
        
        const employeeData = await Employee.findById(id);

        // update related tables
        await UserDetail.updateById(employeeData.user_detail_id, first_name, last_name, sex, contact_number);
        await UserCredential.updateById(employeeData.user_credential_id, email_address, user_password);
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
        return foundEmployees;
    }

    static async findById(id) {
        let sql = `
            SELECT * FROM Employee_tb WHERE employee_id='${id}'
        `;

        const [foundEmployees, _] = await db.execute(sql);
        const foundEmployee = foundEmployees[0];

        return foundEmployee;
    }
}

module.exports = Employee;
const db = require('../config/db');

class Payroll {
    static async save(payroll_description, creation_date, gross_salary, timesheet_id, employee_id) {
        let sql = `
            INSERT INTO Payroll_tb(
                payroll_description,
                creation_date,
                gross_salary,
                timesheet_id,
                employee_id
            )
            VALUES(
                '${payroll_description}',
                '${creation_date}',
                '${gross_salary}',
                '${timesheet_id}',
                '${employee_id}'
            )
        `;

        const [newPayroll, _] = await db.execute(sql);
        
        return newPayroll.insertId;
    }

    static async findByEmpId(employee_id) {
        let sql = `
            SELECT * FROM Payroll_tb WHERE employee_id='${employee_id}'
        `;
        
        const [foundPayrolls, _] = await db.execute(sql);
        console.log("payrolls, ", foundPayrolls);

        return foundPayrolls;
    }
}

module.exports = Payroll;
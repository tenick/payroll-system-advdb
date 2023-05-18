const db = require('../config/db');

class Payroll {
    static async save(creation_date, net_salary, employee_id) {
        let sql = `
            INSERT INTO Payroll_tb(
                creation_date,
                net_salary,
                employee_id
            )
            VALUES(
                '${creation_date}',
                '${net_salary}',
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
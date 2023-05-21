const db = require('../config/db');

class Timesheet {
    static async save(timesheet_csv_string, start_date, end_date, worked_hours, payroll_generated, upload_date, employee_id) {
        let sql = `
            INSERT INTO Timesheet_tb(
                timesheet_csv_string,
                start_date,
                end_date,
                worked_hours,
                payroll_generated,
                upload_date,
                employee_id
            )
            VALUES(
                '${timesheet_csv_string}',
                '${start_date}',
                '${end_date}',
                '${worked_hours}',
                '${payroll_generated}',
                '${upload_date}',
                '${employee_id}'
            )
        `;

        const [newTimesheet, _] = await db.execute(sql);
        
        return newTimesheet.insertId;
    }

    static async findByEmpId(employee_id) {
        let sql = `
            SELECT * FROM Timesheet_tb WHERE employee_id='${employee_id}'
        `;

        const [foundTimesheets, _] = await db.execute(sql);
        console.log("timesheets, ", foundTimesheets);

        return foundTimesheets;
    }
}

module.exports = Timesheet;
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

    static async updateByEmpAndTimesheetId(employee_id, timesheet_id, payroll_generated) {
        console.log('updating timesheet with id: ', timesheet_id, ' for employee with id: ', employee_id);
        let sql = `
            UPDATE Timesheet_tb
            SET payroll_generated = '${payroll_generated}'
            WHERE employee_id  = ${employee_id} AND timesheet_id = ${timesheet_id};
        `;

        await db.execute(sql);
        
        return true;
    }

    static async findById(timesheet_id) {
        let sql = `
            SELECT * FROM Timesheet_tb WHERE timesheet_id='${timesheet_id}'
        `;

        const [foundTimesheets, _] = await db.execute(sql);
        const foundTimesheet = foundTimesheets[0];

        return foundTimesheet;
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
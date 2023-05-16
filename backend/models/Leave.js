const db = require('../config/db');

class Leave {
    static async save(vacation_leave, sick_leave, emergency_leave) {
        let sql = `
            INSERT INTO Leave_tb(
                vacation_leave,
                sick_leave,
                emergency_leave
            )
            VALUES(
                '${vacation_leave}',
                '${sick_leave}',
                '${emergency_leave}'
            )
        `;

        const [newLeave, _] = await db.execute(sql);

        return newLeave.insertId;
    }

    static async updateById(id, vacation_leave, sick_leave, emergency_leave) {
        let sql = `
            UPDATE Leave_tb
            SET vacation_leave = '${vacation_leave}',
                sick_leave = '${sick_leave}',
                emergency_leave = '${emergency_leave}'
            WHERE leave_id  = ${id};
        `;

        await db.execute(sql);
        
        return true;
    }

    static async deleteById(id) {
        let sql = `
            DELETE FROM Leave_tb WHERE leave_id='${id}'
        `;
        await db.execute(sql);

        return true;
    }

    static async findById(id) {
        let sql = `
            SELECT * FROM Leave_tb WHERE leave_id='${id}'
        `;

        const [foundLeaves, _] = await db.execute(sql);
        const foundLeave = foundLeaves[0];
        
        return foundLeave;
    }
}

module.exports = Leave;

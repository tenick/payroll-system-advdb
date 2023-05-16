const db = require('../config/db');

class Contribution {
    static async save(sss, pagibig, philhealth) {
        let sql = `
            INSERT INTO Contribution_tb(
                sss,
                pagibig,
                philhealth
            )
            VALUES(
                '${sss}',
                '${pagibig}',
                '${philhealth}'
            )
        `;

        const [foundContribution, _] = await db.execute(sql);

        return foundContribution.insertId;
    }

    static async updateById(id, sss, pagibig, philhealth) {
        let sql = `
            UPDATE Contribution_tb
            SET sss = '${sss}',
                pagibig = '${pagibig}',
                philhealth = '${philhealth}'
            WHERE contribution_id  = ${id};
        `;

        await db.execute(sql);
        
        return true;
    }

    static async deleteById(id) {
        let sql = `
            DELETE FROM Contribution_tb WHERE contribution_id='${id}'
        `;
        await db.execute(sql);

        return true;
    }

    static async findById(id) {
        let sql = `
            SELECT * FROM Contribution_tb WHERE contribution_id='${id}'
        `;

        const [foundContributions, _] = await db.execute(sql);
        const foundContribution = foundContributions[0];
        
        return foundContribution;
    }
}

module.exports = Contribution;

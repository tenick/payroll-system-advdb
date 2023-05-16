const db = require('../config/db');

class UserDetail {
    static async save(first_name, last_name, sex, contact_number) {
        let sql = `
            INSERT INTO UserDetail_tb(
                first_name,
                last_name,
                sex,
                contact_number
            )
            VALUES(
                '${first_name}',
                '${last_name}',
                '${sex}',
                '${contact_number}'
            )
        `;

        const [newUserDetail, _] = await db.execute(sql);

        return newUserDetail.insertId;
    }

    static async updateById(id, first_name, last_name, sex, contact_number) {
        let sql = `
            UPDATE UserDetail_tb
            SET first_name = '${first_name}',
                last_name = '${last_name}',
                sex = '${sex}',
                contact_number = '${contact_number}'
            WHERE user_detail_id  = ${id};
        `;

        await db.execute(sql);
        
        return true;
    }

    static async deleteById(id) {
        let sql = `
            DELETE FROM UserDetail_tb WHERE user_detail_id='${id}'
        `;
        await db.execute(sql);

        return true;
    }

    static async findByName(name) {
        let sql = `
            SELECT * FROM UserDetail_tb
            WHERE first_name LIKE '%${name}%'
            OR last_name LIKE '%${name}%';
        `;

        const [foundUsers, _] = await db.execute(sql);

        return foundUsers;
    }

    static async findById(id) {
        let sql = `
            SELECT * FROM UserDetail_tb WHERE user_detail_id='${id}'
        `;

        const [foundUserDetails, _] = await db.execute(sql);
        const foundUserDetail = foundUserDetails[0];

        return foundUserDetail;
    }
}

module.exports = UserDetail;

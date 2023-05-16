const db = require('../config/db');
const bcrypt = require('bcrypt');

class UserCredential {
    static async save(email_address, user_password) {
        let hashedPw = await bcrypt.hash(user_password, 10);
        
        let sql = `
            INSERT INTO UserCredential_tb(
                email_address,
                user_password
            )
            VALUES(
                '${email_address}',
                '${hashedPw}'
            )
        `;

        const [foundUserCredential, _] = await db.execute(sql);

        return foundUserCredential.insertId;
    }

    static async updateById(id, email_address, user_password) {
        let sql = `
            UPDATE UserCredential_tb
            SET email_address = '${email_address}',
                user_password = '${user_password}'
            WHERE user_credential_id  = ${id};
        `;

        await db.execute(sql);
        
        return true;
    }

    static async deleteById(id) {
        let sql = `
            DELETE FROM UserCredential_tb WHERE user_credential_id='${id}'
        `;
        await db.execute(sql);

        return true;
    }

    static async findById(id) {
        let sql = `
            SELECT * FROM UserCredential_tb WHERE user_credential_id='${id}'
        `;

        const [foundUserCredentials, _] = await db.execute(sql);
        const foundUserCredential = foundUserCredentials[0];
        
        return foundUserCredential;
    }

    static async findByEmail(email) {
        let sql = `
            SELECT * FROM UserCredential_tb WHERE email_address='${email}'
        `;

        const [foundUserCredentials, _] = await db.execute(sql);
        const foundUserCredential = foundUserCredentials[0];
        
        return foundUserCredential;
    }
}

module.exports = UserCredential;

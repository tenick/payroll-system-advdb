INSERT INTO UserDetail_tb(
                first_name,
                last_name,
                sex,
                contact_number
            )
            VALUES(
                'admin1',
                'test1',
                'm',
                '954325235'
            );
SELECT * FROM UserDetail_tb WHERE user_detail_id=LAST_INSERT_ID();

INSERT INTO UserCredential_tb(
                email_address,
                user_password
            )
            VALUES(
                'admin1@gmail.com',
                '$2b$10$TWfnJzeksVcrEljgHaOm8elhgdpXy.JggZ9/yZazv9GrbuYTefUzK' # must be bcrypt hashed
            );
SELECT * FROM UserCredential_tb WHERE user_credential_id=LAST_INSERT_ID();

INSERT INTO Admin_tb(
                user_detail_id,
                user_credential_id
            )
            VALUES(
				'2', # use last insert id in UserDetail_tb to find id
                '2' # use last insert id in UserCredentials_tb to find id
            );
SELECT * FROM Admin_tb WHERE admin_id=LAST_INSERT_ID();
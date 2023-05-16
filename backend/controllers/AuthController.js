const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserCredential = require('../models/UserCredential');
const pool = require('../config/db');
const { createToken } = require('../Utils/AuthUtils');

const loginUser = async (req, res) => {
    console.log("logging in: ", req.body);

    const userCred = await UserCredential.findByEmail(req.body.email_address);
    
    if (userCred && await bcrypt.compare(req.body.user_password, userCred.user_password)) {
        const [adminsFound, _ ] = await pool.execute('SELECT * FROM Admin_tb WHERE user_credential_id="' + userCred.user_credential_id +'"');
        const admin = adminsFound[0];
        let role = 'admin';
        let id = admin?.id;
        
        if (typeof admin === 'undefined'){
            const [employeesFound, _ ] = await pool.execute('SELECT * FROM Employee_tb WHERE user_credential_id="' + userCred.user_credential_id +'"');
            const employee = employeesFound[0];
            
            role = 'employee';
            id = employee.id;
        }
        
        const userData = {id, 'email_address': userCred.email_address, role};
        const accessToken = createToken(userData);
        res.cookie("accessToken", accessToken, {httpOnly: true});
        res.status(200);
        res.json(userData);
        console.log('logged in!');
        return;
    }
    
    res.status(401);
    res.send("Wrong username and/or password.");
}

const authorizeUser = async (req, res) => {
    const accessToken = req.cookies['accessToken'];

    if (typeof accessToken !== 'undefined'){
        jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, authData) => {
            if (!err){
                res.status(200);
                res.json(authData.user);
            }
            else {
                console.log('Session invalid/expired, need to login again');
                res.clearCookie('accessToken');
                res.sendStatus(401);
            }
        });
    }
    else {
        console.log("Need to login first.");
        res.sendStatus(401);
    } 
}

const logoutUser = async (req, res) => {
    res.clearCookie('accessToken');
    res.sendStatus('200');
}

module.exports = {
    loginUser,
    authorizeUser,
    logoutUser
}
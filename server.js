require('dotenv').config();
const path = require('path')
const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const pool = require('./config/db');

const app = express();
app.listen(process.env.PORT, () => console.log("started at port " + process.env.PORT));

// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')))

// routes
app.get('/', (req, res) => {
    res.redirect('/login');
});

app.get('/login', (req, res) => {
    console.log('@login page');
    const accessToken = req.cookies['accessToken'];

    if (typeof accessToken === 'undefined'){
        res.sendFile(path.join(__dirname, 'public/index.html'));
    }
    else res.redirect('/dashboard');
});

app.post('/login', (req, res) => {

    pool.execute('SELECT * FROM admin WHERE username="' + req.body.username+'"', async (err, result) => {
        if (err) throw err;
        if (result.length == 1 && await bcrypt.compare(req.body.password, result[0].password)) {
            console.log("logged in!");
            
            const accessToken = createToken({'id': result[0].id, 'username': result[0].username, 'role': 'admin'});
            res.cookie("accessToken", accessToken, {httpOnly: true});
            res.redirect('/dashboard');
        }
        else {
            console.log("Wrong username and/or password.");
            res.redirect('/login');
        }
    });
});

app.post('/logout', (req, res) => {
    res.clearCookie('accessToken');
    res.redirect('/login');
});

app.get('/dashboard', verifyToken, authRole('admin'), (req, res) => {
    res.sendFile(path.join(__dirname, 'public/dashboard.html'));
});

function createToken(user){
    const accessToken = jwt.sign({user}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15s'});
    return accessToken;
}

function authRole(role){
    return (req, res, next) => {
        var userRole = typeof req.user?.role === 'undefined' ? '' : req.user.role;
        console.log('current user role: ' + userRole);
        
        if (userRole != role){
            console.log("You don't have acces in this page");
            res.redirect('/dashboard');
        }
        else next();
    };
}

function verifyToken(req, res, next) {
    const accessToken = req.cookies['accessToken'];

    if (typeof accessToken !== 'undefined'){
        jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, authData) => {
            if (!err){
                console.log('token verified!');
                req.user = authData.user;
                console.log("user: ");
                console.log(req.user);
                next();
            }
            else {
                console.log('Session invalid/expired, need to login again');
                res.clearCookie('accessToken');
                res.redirect('/login');
            }
        });
    }
    else {
        console.log("Need to login first.");
        res.redirect('/login');
    } 
}


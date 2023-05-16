require('dotenv').config();
const path = require('path')
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const authRoute = require('./routes/AuthRoute');
const employeeRoute = require('./routes/EmployeeRoute');

const app = express();

// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use('/api/auth', authRoute);
app.use('/api/employee', employeeRoute);

// sample route with token verification and role authorization
// app.get('/dashboard', verifyToken, authRole('admin'), (req, res) => {
//     res.sendFile(path.join(__dirname, 'public/dashboard.html'));
// });


app.listen(process.env.PORT, () => console.log("started at port " + process.env.PORT));

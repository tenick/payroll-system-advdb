const express = require('express');
const { loginUser, authorizeUser, logoutUser } = require('../controllers/AuthController');

const router = express.Router()

// Login an admin/employee
router.post('/login', loginUser);

// check if user authorized
router.get('/authorize', authorizeUser);

// Logout an admin/employee
router.post('/logout', logoutUser);

module.exports = router;
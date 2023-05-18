const express = require('express');
const { addPayroll, getPayrollsByEmpId } = require('../controllers/PayrollController');

const router = express.Router();

// Login an admin/employee
router.post('/', addPayroll);

// check if user authorized
router.get('/:id', getPayrollsByEmpId);

module.exports = router;
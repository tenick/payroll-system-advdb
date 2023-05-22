const express = require('express');
const { addPayroll, getPayrollsByEmpId } = require('../controllers/PayrollController');

const router = express.Router();

// add a payroll
router.post('/', addPayroll);

// get all payrolls by employee id
router.get('/:employee_id', getPayrollsByEmpId);

module.exports = router;
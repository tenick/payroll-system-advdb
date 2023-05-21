const express = require('express');
const { addTimesheet, getTimesheetsByEmpId } = require('../controllers/TimesheetController');

const router = express.Router()

// Login an admin/employee
router.post('/:employee_id', addTimesheet);

// check if user authorized
router.get('/:employee_id', getTimesheetsByEmpId);

module.exports = router;
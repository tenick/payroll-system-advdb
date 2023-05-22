const express = require('express');
const { addTimesheet, updateTimesheetByEmpAndTimesheetId, getTimesheetById, getTimesheetsByEmpId } = require('../controllers/TimesheetController');

const router = express.Router()

// add timesheet for employee
router.post('/:employee_id', addTimesheet);

// update timesheet payroll generated value
router.patch('/:employee_id', updateTimesheetByEmpAndTimesheetId);

// get timesheet by ID
router.get('/timesheet_id/:timesheet_id', getTimesheetById);

// get timesheets of employee
router.get('/employee_id/:employee_id', getTimesheetsByEmpId);

module.exports = router;
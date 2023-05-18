const express = require('express');
const { addTimesheet, getTimesheetsByEmpId } = require('../controllers/TimesheetController');

const router = express.Router()

// Login an admin/employee
router.post('/', addTimesheet);

// check if user authorized
router.get('/:id', getTimesheetsByEmpId);

module.exports = router;
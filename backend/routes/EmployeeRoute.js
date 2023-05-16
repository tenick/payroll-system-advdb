const express = require('express');
const { getEmployeeByName, addEmployee, updateEmployee, deleteEmployee } = require('../controllers/EmployeeController');

const router = express.Router()

// GET all employee that first/last name contains 'name'
router.get('/:name', getEmployeeByName);

// POST a new employee
router.post('/', addEmployee);

// UPDATE an employee
router.patch('/:id', updateEmployee);

// DELETE an employee
router.delete('/:id', deleteEmployee);

module.exports = router;
const express = require('express');
const { getEmployeeByName, getEmployeeByEmail, getEmployeeByID, addEmployee, updateEmployee, deleteEmployee } = require('../controllers/EmployeeController');

const router = express.Router()

// GET all employee that first/last name contains 'name'
router.get('/name/:name', getEmployeeByName);

// GET all employee by email
router.get('/email/:email', getEmployeeByEmail);

// GET all employee by id
router.get('/id/:id', getEmployeeByID);

// POST a new employee
router.post('/', addEmployee);

// UPDATE an employee
router.patch('/:id', updateEmployee);

// DELETE an employee
router.delete('/:id', deleteEmployee);

module.exports = router;
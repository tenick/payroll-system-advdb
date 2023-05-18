const Payroll = require('../models/Payroll');

const addPayroll = async (req, res) => {
    try {
        const {
            creation_date,
            net_salary,
            employee_id } = req.body;
    
        const newPayrollID = await Payroll.addPayroll(creation_date, net_salary, employee_id);
        res.json({msg: 'POST new payroll ID', id: newPayrollID});
    }
    catch (err){
        res.status(400);
        res.json({error: err.message})
    }
}

const getPayrollsByEmpId = async (req, res) => {
    try {
        const foundPayrolls = await Payroll.findByEmpId(req.params.employee_id);
        res.json(foundPayrolls);
    }
    catch(err) {
        res.status(400);
        res.json({error: err.message});
    }
}

module.exports = {
    addPayroll,
    getPayrollsByEmpId
}
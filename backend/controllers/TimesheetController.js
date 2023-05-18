const Timesheet = require('../models/Timesheet');

const addTimesheet = async (req, res) => {
    try {
        const {
            start_date,
            end_date,
            worked_hours,
            payroll_generated,
            upload_date,
            employee_id } = req.body;
    
        const newTimesheetID = await Timesheet.addTimesheet(start_date, end_date, worked_hours, payroll_generated, upload_date, employee_id);
        res.json({msg: 'POST new timesheet ID', id: newTimesheetID});
    }
    catch (err){
        res.status(400);
        res.json({error: err.message})
    }
}

const getTimesheetsByEmpId = async (req, res) => {
    try {
        const foundTimesheets = await Timesheet.findByEmpId(req.params.employee_id);
        res.json(foundTimesheets);
    }
    catch(err) {
        res.status(400);
        res.json({error: err.message});
    }
}

module.exports = {
    addTimesheet,
    getTimesheetsByEmpId
}
const Timesheet = require('../models/Timesheet');

const addTimesheet = async (req, res) => {
    try {
        const {
            timesheet_csv_string,
            start_date,
            end_date,
            worked_hours,
            payroll_generated,
            upload_date } = req.body;
    
        const newTimesheetID = await Timesheet.save(timesheet_csv_string, start_date, end_date, worked_hours, payroll_generated, upload_date, req.params.employee_id);
        res.json({msg: 'POST new timesheet ID', id: newTimesheetID});
    }
    catch (err){
        res.status(400);
        res.json({error: err.message})
    }
}

const updateTimesheetByEmpAndTimesheetId = async (req, res) => {
    try {
        const foundTimesheets = await Timesheet.updateByEmpAndTimesheetId(req.params.employee_id, req.body.timesheet_id, req.body.payroll_generated);
        res.status(200);
        res.json(foundTimesheets);
    }
    catch(err) {
        res.status(400);
        res.json({error: err.message});
    }
}

const getTimesheetById = async (req, res) => {
    try {
        const foundTimesheet = await Timesheet.findById(req.params.timesheet_id);
        res.json(foundTimesheet);
    }
    catch(err) {
        res.status(400);
        res.json({error: err.message});
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
    updateTimesheetByEmpAndTimesheetId,
    getTimesheetById,
    getTimesheetsByEmpId
}
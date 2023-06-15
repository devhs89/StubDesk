const EmployeeModel = require("../models/EmployeeModel");
const validators = require("../helpers/validators");

const createEmployee = async (req, res, next) => {
  const errorsList = [];
  try {
    const payload = req.body;
    if (!validators.validName(payload.firstName)) errorsList.push('Invalid first name.');
    if (!validators.validName(payload.lastName)) errorsList.push('Invalid last name.');
    if (!validators.validAge(payload.age)) errorsList.push('Invalid age.');
    if (!validators.validJobTitle(payload.jobTitle)) errorsList.push('Invalid job title.');
    if (!validators.validDepartment(payload.department)) errorsList.push('Invalid department.');
    if (!validators.validEmployeeType(payload.employeeType)) errorsList.push('Invalid employee type.');
    if (!validators.validHireDate(payload.hireDate)) errorsList.push('Invalid hire date.');
    if (!validators.validCurrentStatus(payload.currentStatus)) errorsList.push('Invalid current status.');
    if (errorsList.length > 0) return res.status(400).send(errorsList);

    const dc = await EmployeeModel.create(payload);
    dc instanceof EmployeeModel ? res.sendStatus(200) : res.sendStatus(500);
  } catch (e) {
    next(e.message);
  }
};

const showEmployees = async (req, res) => {
  const employees = await EmployeeModel.find({}).exec();
  try {
    res.send(employees);
  } catch (e) {
    res.status(500).send(e);
  }
};

module.exports = {createEmployee, showEmployees};
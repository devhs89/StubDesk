const employeeModel = require("../models/employeeModel");

const createEmployee = async (req, res) => {
  console.log(req.body);
  const result = await employeeModel.create(req.body);
  res.send(result._id);
};

const showEmployees = async (req, res) => {
  const employees = await employeeModel.find({}).exec();
  try {
    res.send(employees);
  } catch (e) {
    res.status(500).send(e);
  }
};

module.exports = {createEmployee, showEmployees};
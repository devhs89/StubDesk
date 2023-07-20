const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// employee schema
const EmployeeSchema = new Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  age: {type: String, required: true},
  hireDate: {type: String, required: true},
  jobTitle: {type: String, required: true},
  department: {type: String, required: true},
  employeeType: {type: String, required: true, default: "seasonal"},
  currentStatus: {type: String, required: true, default: 'working'}
});
const EmployeeModel = mongoose.model("employee", EmployeeSchema);
module.exports = EmployeeModel;
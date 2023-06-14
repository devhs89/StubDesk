const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const EmployeeSchema = new Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  age: {type: Number, required: true},
  hireDate: {type: Date, required: true},
  jobTitle: {type: String, required: true},
  department: {type: String, required: true},
  employeeType: {type: String, required: true, default: "casual"},
  currentStatus: {type: String, required: true, default: 'off'}
});
const EmployeeModel = mongoose.model("employee", EmployeeSchema);
module.exports = EmployeeModel;
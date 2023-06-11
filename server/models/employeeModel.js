const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const EmployeeSchema = new Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  age: {type: Number, required: true},
  hireDate: {type: Date, required: true},
  title: {type: String, required: true},
  department: {type: String, required: true},
  employeeType: {type: String, required: true, default: "casual"},
  currentStatus: {type: Boolean, required: true, default: true}
});
const employeeModel = mongoose.model("employee", EmployeeSchema);
module.exports = employeeModel;
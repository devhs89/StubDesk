const EmployeeModel = require("../models/EmployeeModel");
const {
  validName, validAge, validHireDate, validJobTitle, validDepartment, validEmployeeType, validCurrentStatus
} = require("../helpers/validators");
const path = require("path");
const fs = require("fs");

const customError = ({sCode = 500, msgs = ['Internal Server Error']}) => new Error(JSON.stringify({
  code: sCode, message: msgs
}));

// get employee graph schema from file and define type and queries
const empGraphPath = path.resolve(__dirname, 'employee.graphql');
const typeDefs = fs.readFileSync(empGraphPath, 'utf-8');

// define resolvers for queries and mutations
const resolvers = {
  Query: {
    allEmployees: async (_, {conditions}) => {
      // parse conditions
      const parsedConditions = JSON.parse(conditions);
      const filters = {};
      // get valid filters
      if (parsedConditions) {
        if (validName(parsedConditions.firstName)) filters.firstName = parsedConditions.firstName;
        if (validName(parsedConditions.lastName)) filters.lastName = parsedConditions.lastName;
        if (validAge(parsedConditions.age)) filters.age = parsedConditions.age;
        if (validHireDate(parsedConditions.hireDate)) filters.hireDate = parsedConditions.hireDate;
        if (validJobTitle(parsedConditions.jobTitle)) filters.jobTitle = parsedConditions.jobTitle;
        if (validDepartment(parsedConditions.department)) filters.department = parsedConditions.department;
        if (validEmployeeType(parsedConditions.employeeType)) filters.employeeType = parsedConditions.employeeType;
        if (validCurrentStatus(parsedConditions.currentStatus)) filters.currentStatus = parsedConditions.currentStatus;
      }
      // get all or filtered employees
      return await EmployeeModel.find(filters).exec();
    }, employeeById: async (_, {id}) => {
      // find employee by provided id
      return await EmployeeModel.findById(id).exec();
    }
  }, Mutation: {
    addEmployee: async (_, {payload}) => {
      const errsList = [];
      // validate inputs before creating new employee
      try {
        const params = JSON.parse(payload);
        if (!validName(params.firstName)) errsList.push('Invalid first name');
        if (!validName(params.lastName)) errsList.push('Invalid last name');
        if (!validAge(params.age)) errsList.push('Invalid age');
        if (!validHireDate(params.hireDate)) errsList.push('Invalid hire date');
        if (!validJobTitle(params.jobTitle)) errsList.push('Invalid job title');
        if (!validDepartment(params.department)) errsList.push('Invalid department');
        if (!validEmployeeType(params.employeeType)) errsList.push('Invalid employee type');
        if (!validCurrentStatus(params.currentStatus)) errsList.push('Invalid current status');
        if (errsList.length > 0) return customError({sCode: 400, msgs: errsList});

        // create new employee
        return await EmployeeModel.create(params);
      } catch (e) {
        return e.message;
      }
    }, updateEmployee: async (_, {payload}) => {
      const errsList = [];
      const updateFields = {};

      // validate updated fields
      try {
        const parsedPayload = JSON.parse(payload);
        if (parsedPayload.jobTitle) validJobTitle(parsedPayload.jobTitle) ? updateFields.jobTitle = parsedPayload.jobTitle : errsList.push('Invalid job title');
        if (parsedPayload.department) validDepartment(parsedPayload.department) ? updateFields.department = parsedPayload.department : errsList.push('Invalid department');
        if (parsedPayload.currentStatus) validCurrentStatus(parsedPayload.currentStatus) ? updateFields.currentStatus = parsedPayload.currentStatus : errsList.push('Invalid current status');
        if (errsList.length > 0) return customError({sCode: 400, msgs: errsList});

        // update employee using provided id
        return await EmployeeModel.findByIdAndUpdate(parsedPayload.id, updateFields, {new: true});
      } catch (e) {
        return e.message;
      }
    }, deleteEmployee: async (_, {id}) => {
      const employee = await EmployeeModel.findById(id).exec();
      // if employee's current working status is active, return error
      if (employee?.currentStatus === 'working') return customError({
        sCode: 403, msgs: ['CAN’T DELETE EMPLOYEE – STATUS ACTIVE']
      });
      return await EmployeeModel.findByIdAndDelete(id).exec();
    }
  }
};

module.exports = {typeDefs, resolvers};
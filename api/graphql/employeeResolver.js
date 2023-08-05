const EmployeeModel = require("../models/EmployeeModel");
const {
  validName, validDobDate, validHireDate, validJobTitle, validDepartment, validEmployeeType, validCurrentStatus
} = require("../helpers/validators");
const path = require("path");
const fs = require("fs");
const {ExtractDateParams, CalculateRetirementDate} = require("../helpers/date-parser");

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
        if (validDobDate(parsedConditions.dob)) filters.dob = parsedConditions.dob;
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
    }, nearRetirement: async () => {
      // get all working employees
      const activeEmployees = await EmployeeModel.find({currentStatus: 'working'}).exec();
      // sort employees according to closest retirement date
      return activeEmployees.sort((emp1, emp2) => {
        const emp1ExtractedDate = ExtractDateParams(emp1.retirementDate);
        const emp2ExtractedDate = ExtractDateParams(emp2.retirementDate);
        const emp1ParsedDob = new Date(emp1ExtractedDate.fullYear, emp1ExtractedDate.monDex, emp1ExtractedDate.dt);
        const emp2ParsedDob = new Date(emp2ExtractedDate.fullYear, emp2ExtractedDate.monDex, emp2ExtractedDate.dt);
        return emp1ParsedDob - emp2ParsedDob;
      });
    }
  }, Mutation: {
    addEmployee: async (_, {payload}) => {
      const errsList = [];
      // validate inputs before creating new employee
      try {
        const params = JSON.parse(payload);
        if (!validName(params.firstName)) errsList.push('Invalid first name');
        if (!validName(params.lastName)) errsList.push('Invalid last name');
        if (!validDobDate(params.dob)) errsList.push('Employee age must be between 20 and 70 inclusively');
        if (!validHireDate(params.hireDate)) errsList.push('Invalid hire date');
        if (!validJobTitle(params.jobTitle)) errsList.push('Invalid job title');
        if (!validDepartment(params.department)) errsList.push('Invalid department');
        if (!validEmployeeType(params.employeeType)) errsList.push('Invalid employee type');
        if (!validCurrentStatus(params.currentStatus)) errsList.push('Invalid current status');
        if (errsList.length > 0) return customError({sCode: 400, msgs: errsList});

        // calculate retirement date
        const extractedDate = ExtractDateParams(params.dob);
        const parsedDob = new Date(extractedDate.fullYear, extractedDate.monDex, extractedDate.dt);
        params.retirementDate = CalculateRetirementDate(parsedDob).toISOString().substring(0, 10);

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
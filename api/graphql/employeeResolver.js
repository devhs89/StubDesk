const EmployeeModel = require("../models/EmployeeModel");
const {
  validName, validAge, validHireDate, validJobTitle, validDepartment, validEmployeeType, validCurrentStatus
} = require("../helpers/validators");
const path = require("path");
const fs = require("fs");

const empGraphPath = path.resolve(__dirname, 'employee.graphql');
const typeDefs = fs.readFileSync(empGraphPath, 'utf-8');

const resolvers = {
  Query: {
    allEmployees: async (_, {employeeType}) => {
      const filter = ['full-time', 'part-time', 'contract', 'seasonal'].includes(employeeType);
      return await EmployeeModel.find(filter ? {employeeType: employeeType} : {}).exec();
    }, employeeById: async (_, {id}) => {
      return await EmployeeModel.findById(id).exec();
    }
  }, Mutation: {
    addEmployee: async (_, {payload}) => {
      const errsList = [];
      const customError = ({sCode = 500, msgs = ['Internal Server Error']}) => new Error(JSON.stringify({
        code: sCode, message: msgs
      }));

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

        return await EmployeeModel.create(params);
      } catch (e) {
        return e.message;
      }
    }, updateEmployee: async (_, {payload}) => {
      const errsList = [];
      const customError = ({sCode = 500, msgs = ['Internal Server Error']}) => new Error(JSON.stringify({
        code: sCode, message: msgs
      }));

      const updateFields = {};

      try {
        const parsedPayload = JSON.parse(payload);
        if (parsedPayload.jobTitle) validJobTitle(parsedPayload.jobTitle) ? updateFields.jobTitle = parsedPayload.jobTitle : errsList.push('Invalid job title');
        if (parsedPayload.department) validDepartment(parsedPayload.department) ? updateFields.department = parsedPayload.department : errsList.push('Invalid department');
        if (parsedPayload.currentStatus) validCurrentStatus(parsedPayload.currentStatus) ? updateFields.currentStatus = parsedPayload.currentStatus : errsList.push('Invalid current status');
        if (errsList.length > 0) return customError({sCode: 400, msgs: errsList});
        return await EmployeeModel.findByIdAndUpdate(parsedPayload.id, updateFields, {new: true});
      } catch (e) {
        return e.message;
      }
    }
  }
};

module.exports = {typeDefs, resolvers};
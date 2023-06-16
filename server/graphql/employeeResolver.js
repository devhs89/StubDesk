const EmployeeModel = require("../models/EmployeeModel");
const {
  validName, validAge, validHireDate, validJobTitle, validDepartment, validEmployeeType, validCurrentStatus
} = require("../helpers/validators");
// language=GraphQL
const typeDefs = `
    type Employee {
        firstName: String
        lastName: String
        age: String
        hireDate: String
        jobTitle: String
        department: String
        employeeType: String
        currentStatus: String
    }
    
    type EmployeeId {
        _id: ID
    }
    
    type Query {
        getEmployees: [Employee]
    }
    
    type Mutation {
        addEmployee(payload: String): Employee
    }
`;

const resolvers = {
  Query: {
    getEmployees: async () => await EmployeeModel.find({}).exec()
  }, Mutation: {
    addEmployee: async (_, payload) => {
      const errsList = [];
      const customError = ({sCode = 500, msgs = ['Internal Server Error']}) => new Error(JSON.stringify({
        code: sCode, message: msgs
      }));

      try {
        const params = JSON.parse(payload?.payload);
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
    }
  }
};

module.exports = {typeDefs, resolvers};
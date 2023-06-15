const EmployeeModel = require("../models/EmployeeModel");
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
    type Query {
        getEmployees: [Employee]
    }
    type Mutation {
        addEmployee(firstName: String,lastName: String, age: String, hireDate:String, jobTitle: String, department: String, employeeType: String, currentStatus: String): Employee
    }
`;

const resolvers = {
  Query: {
    getEmployees: async () => await EmployeeModel.find({}).exec()
  }, Mutation: {
    addEmployee: async (_, payload) => {
      try {
        return await EmployeeModel.create(payload);
      } catch (e) {
        return e.message;
      }
    }
  }
};

module.exports = {typeDefs, resolvers};
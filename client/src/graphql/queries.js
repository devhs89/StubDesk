import {gql} from "@apollo/client";

export const getEmployeesQuery = gql('query GetEmployeesQuery {getEmployees {firstName lastName age hireDate jobTitle department employeeType currentStatus}}');
export const createEmployeeMutation = gql('mutation CreateEmployeeMutation($payload: String) {addEmployee(payload: $payload) {firstName}}');
import {allEmployeesQuery, createEmployeeMutation, employeeByIdQuery, updateEmployeeMutation} from "../graphql/queries";

export const fetchEmployees = async (empType = null) => {
  const payload = empType ? {query: allEmployeesQuery, variables: {employeeType: empType}} : {query: allEmployeesQuery};

  return await fetch('/graphql', {
    method: 'POST', headers: {
      'Content-Type': 'application/json',
    }, body: JSON.stringify(payload)
  }).then(resp => resp.json());
};

export const fetchEmployeeById = async (id) => {
  if (!id) return null;
  return await fetch('/graphql', {
    method: 'POST', headers: {
      'Content-Type': 'application/json',
    }, body: JSON.stringify({query: employeeByIdQuery, variables: {id: id}})
  }).then(resp => resp.json());
};

export const fetchCreateEmployee = async (payload) => {
  return await fetch('/graphql', {
    method: 'POST', headers: {
      'Content-Type': 'application/json',
    }, body: JSON.stringify({mutation: createEmployeeMutation, variables: {payload: payload}})
  }).then(resp => resp.json());
};

export const fetchUpdateEmployeeById = async (payload) => {
  if (!payload.id) return null;
  return await fetch('/graphql', {
    method: 'POST', headers: {
      'Content-Type': 'application/json',
    }, body: JSON.stringify({query: updateEmployeeMutation, variables: {payload: JSON.stringify(payload)}})
  }).then(resp => resp.json());
};
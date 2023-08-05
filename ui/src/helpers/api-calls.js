import {
  allEmployeesQuery,
  createEmployeeMutation,
  deleteEmployeeMutation,
  employeeByIdQuery,
  nearRetirementQuery,
  updateEmployeeMutation
} from "../graphql/queries";

// all API calls

export const fetchEmployees = async (filters = {}) => {
  const payload = filters ? {
    query: allEmployeesQuery,
    variables: {conditions: JSON.stringify(filters)}
  } : {query: allEmployeesQuery};

  return await fetch('/graphql', {
    method: 'POST', headers: {
      'Content-Type': 'application/json',
    }, body: JSON.stringify(payload)
  }).then(resp => resp.json());
};

export const fetchNearRetirements = async () => {
  const payload = {query: nearRetirementQuery};

  return await fetch('/graphql', {
    method: 'POST', headers: {
      'Content-Type': 'application/json',
    }, body: JSON.stringify(payload)
  }).then(resp => resp.json());
};

export const fetchEmployeeById = async (id) => {
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
    }, body: JSON.stringify({query: createEmployeeMutation, variables: {payload: JSON.stringify(payload)}})
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

export const fetchDeleteEmployeeById = async (id) => {
  return await fetch('/graphql', {
    method: 'POST', headers: {
      'Content-Type': 'application/json',
    }, body: JSON.stringify({query: deleteEmployeeMutation, variables: {id: id}})
  }).then(resp => resp.json());
};
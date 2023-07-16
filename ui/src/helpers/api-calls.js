import {allEmployeesQuery} from "../graphql/queries";

export const fetchEmployees = async (empType = null) => {
  return await fetch('/graphql', {
    method: 'POST', headers: {
      'Content-Type': 'application/json',
    }, body: JSON.stringify({query: allEmployeesQuery, variables: {employeeType: empType}}),
  }).then(resp => resp.json());
};
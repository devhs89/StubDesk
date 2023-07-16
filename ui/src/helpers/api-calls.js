import {allEmployeesQuery} from "../graphql/queries";

export const fetchEmployees = async (empType = null) => {
  const payload = empType ? {query: allEmployeesQuery, variables: {employeeType: empType}} : {query: allEmployeesQuery};

  return await fetch('/graphql', {
    method: 'POST', headers: {
      'Content-Type': 'application/json',
    }, body: JSON.stringify(payload)
  }).then(resp => resp.json());
};
import {ApolloClient, gql, InMemoryCache} from "@apollo/client";

const urlBase = "http://localhost:33001";

export const getEmployees = async () => {
  const empUrl = `${urlBase}`;
  const client = new ApolloClient({uri: empUrl, cache: new InMemoryCache()});
  return await client.query({query: gql`query GetEmployeesQuery {getEmployees {firstName lastName age hireDate jobTitle department employeeType currentStatus}}`});
};

export const createEmployee = async (payload) => {
  const empUrl = `${urlBase}/admin/employee/create`;
  return await fetch(empUrl, {
    method: "POST", body: JSON.stringify(payload), headers: {"Content-Type": "application/json"}
  });
};
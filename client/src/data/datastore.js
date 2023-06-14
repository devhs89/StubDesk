const urlBase = "http://localhost:33001";

export const getEmployees = async () => {
  const empUrl = `${urlBase}/admin/employees`;
  return await fetch(empUrl, {method: "POST"});
};

export const createEmployee = async (payload) => {
  const empUrl = `${urlBase}/admin/employee/create`;
  return await fetch(empUrl, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {"Content-Type": "application/json"}
  });
};
const urlBase = "http://localhost:33001";

export const getEmployees = async () => {
  const empUrl = `${urlBase}/admin/employees`;
  return await fetch(empUrl, {method: "POST"});
};
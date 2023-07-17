export const allEmployeesQuery = 'query AllEmployeesQuery($employeeType: String) {allEmployees(employeeType: $employeeType) {_id firstName lastName age hireDate jobTitle department employeeType currentStatus}}';
export const createEmployeeMutation = 'mutation CreateEmployeeMutation($payload: String) {addEmployee(payload: $payload) {firstName}}';
// graphql queries
export const allEmployeesQuery = 'query AllEmployeesQuery($conditions: String) {allEmployees(conditions: $conditions) {_id firstName lastName dob hireDate jobTitle department employeeType currentStatus}}';
export const nearRetirementQuery = 'query NearRetirementQuery {nearRetirement {_id firstName lastName dob hireDate jobTitle department employeeType retirementDate}}';
export const employeeByIdQuery = 'query EmployeeById($id: ID!) {employeeById(id: $id) {_id firstName lastName dob hireDate jobTitle department employeeType currentStatus}}';
export const createEmployeeMutation = 'mutation CreateEmployeeMutation($payload: String!) {addEmployee(payload: $payload) {_id firstName lastName dob hireDate jobTitle department employeeType currentStatus}}';
export const updateEmployeeMutation = 'mutation UpdateEmployeeMutation($payload: String!) {updateEmployee(payload: $payload){_id firstName lastName dob hireDate jobTitle department employeeType currentStatus}}';
export const deleteEmployeeMutation = 'mutation DeleteEmployeeMutation($id: ID!) {deleteEmployee(id: $id){firstName lastName}}';
export const Employee = (props) => {
  return (<tr role={"button"}>
    <th scope={"row"}>{props.emp.firstName} {props.emp.lastName}</th>
    <td>{props.emp.age}</td>
    <td>{props.emp.jobTitle}</td>
    <td>{props.emp.department}</td>
    <td>{props.emp.employeeType}</td>
    <td>{(props.emp.currentStatus === true || props.emp.currentStatus === "on") ? 'Working' : 'Retired'}</td>
    <td>{new Date(props.emp.hireDate).toLocaleDateString()}</td>
  </tr>);
};
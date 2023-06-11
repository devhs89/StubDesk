export const Employee = (props) => {
  return (<tr role={"button"}>
    <th scope={"row"}>{props.emp._id}</th>
    <td>{props.emp.firstName} {props.emp.lastName}</td>
    <td>{props.emp.age}</td>
    <td>{props.emp.title}</td>
    <td>{props.emp.department}</td>
    <td>{props.emp.employeeType}</td>
    <td>{props.emp.currentStatus ? 'Working' : 'Retired'}</td>
    <td>{new Date(props.emp.hireDate).toLocaleDateString()}</td>
  </tr>);
};
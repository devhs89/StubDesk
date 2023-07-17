import {Component} from "react";
import {Table} from 'react-bootstrap';
import {Navigate, useNavigate} from "react-router-dom";

export class EmployeeTable extends Component {
  constructor(props) {
    super(props);
  }

  showEmployeeDetail() {
    useNavigate();
  }

  render() {
    return (<>
      <div className={"table-responsive"}>
        <Table className={"table-dark table-striped table-hover align-middle mx-auto"}>
          <thead>
          <tr>
            <th scope={"col"}>Full Name</th>
            <th scope={"col"}>Age</th>
            <th scope={"col"}>Title</th>
            <th scope={"col"}>Department</th>
            <th scope={"col"}>Type</th>
            <th scope={"col"}>Status</th>
            <th scope={"col"}>Hire Date</th>
          </tr>
          </thead>
          <tbody className={"table-group-divider"}>
          {this.props.employees.map((emp, dex) => (
            <tr key={dex} role={"button"} onClick={() => <Navigate to={`employees/${emp._id}`} />}>
              <th scope={"row"}>{emp.firstName} {emp.lastName}</th>
              <td>{emp.age}</td>
              <td className={emp.jobTitle === 'vp' ? "text-uppercase" : "text-capitalize"}>{emp.jobTitle}</td>
              <td
                className={(emp.department === 'it' || emp.department === 'hr') ? "text-uppercase" : "text-capitalize"}>{emp.department}</td>
              <td className={"text-capitalize"}>{emp.employeeType}</td>
              <td className={"text-capitalize"}>{emp.currentStatus}</td>
              <td>{new Date(emp.hireDate).toLocaleDateString()}</td>
            </tr>))}
          </tbody>
        </Table>
      </div>
    </>);
  }
}
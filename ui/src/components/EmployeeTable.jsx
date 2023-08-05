import {Component} from "react";
import {Table} from 'react-bootstrap';
import {appNavigator} from "../helpers/app-navigator";

class EmployeeTable extends Component {
  constructor(props) {
    super(props);
    this.toEmployeeDetail = this.toEmployeeDetail.bind(this);
  }

  toEmployeeDetail(empId) {
    // navigate to employee detail page when clicked on a row
    this.props.navigate(`/employee/${empId}`);
  }

  render() {
    return (<>
      <div className={"table-responsive"}>
        <Table className={"table-dark table-striped table-hover align-middle mx-auto"}>
          <thead>
          <tr>
            <th scope={"col"}>Full Name</th>
            <th scope={"col"}>Dob</th>
            <th scope={"col"}>Title</th>
            <th scope={"col"}>Department</th>
            <th scope={"col"}>Type</th>
            <th scope={"col"}>Status</th>
            <th scope={"col"}>Hire Date</th>
          </tr>
          </thead>
          <tbody className={"table-group-divider"}>
          {this.props.employees.map((emp, dex) => (
            <tr key={dex} role="button" onClick={() => this.toEmployeeDetail(emp._id)}>
              <th scope={"row"} className="text-capitalize">{emp.firstName} {emp.lastName}</th>
              <td>{emp.dob}</td>
              <td className={emp.jobTitle === 'vp' ? "text-uppercase" : "text-capitalize"}>{emp.jobTitle}</td>
              <td
                className={(emp.department === 'it' || emp.department === 'hr') ? "text-uppercase" : "text-capitalize"}>{emp.department}</td>
              <td className={"text-capitalize"}>{emp.employeeType}</td>
              <td className={"text-capitalize"}>{emp.currentStatus}</td>
              <td>{emp.hireDate}</td>
            </tr>))}
          </tbody>
        </Table>
      </div>
    </>);
  }
}

export default appNavigator(EmployeeTable);
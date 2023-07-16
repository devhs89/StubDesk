import {Employee} from "./Employee.jsx";
import {Component} from "react";
import {Form, InputGroup, Table} from 'react-bootstrap';

export class EmployeeTable extends Component {
  constructor(props) {
    super(props);
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
          {this.props.employees.map((emp, dex) => (<Employee key={dex} emp={emp}></Employee>))}
          </tbody>
        </Table>
      </div>
    </>);
  }
}
import {Component} from "react";

export class Employee extends Component {
  render() {
    return (<tr role={"button"}>
      <th scope={"row"}>{this.props.emp.firstName} {this.props.emp.lastName}</th>
      <td>{this.props.emp.age}</td>
      <td
        className={this.props.emp.jobTitle === 'vp' ? "text-uppercase" : "text-capitalize"}>{this.props.emp.jobTitle}</td>
      <td
        className={(this.props.emp.department === 'it' || this.props.emp.department === 'hr') ? "text-uppercase" : "text-capitalize"}>{this.props.emp.department}</td>
      <td className={"text-capitalize"}>{this.props.emp.employeeType}</td>
      <td className={"text-capitalize"}>{this.props.emp.currentStatus}</td>
      <td>{new Date(this.props.emp.hireDate).toLocaleDateString()}</td>
    </tr>);
  }
}
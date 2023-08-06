import {Component} from "react";
import {Table} from 'react-bootstrap';
import {appNavigator} from "../helpers/app-navigator";
import {CalculateTimeDifference} from "../helpers/date-time-parser";

class EmployeeTable extends Component {
  constructor(props) {
    super(props);
    this.toEmployeeDetail = this.toEmployeeDetail.bind(this);
    this.calculateRetirementTime = this.calculateRetirementTime.bind(this);
  }

  toEmployeeDetail(empId) {
    // navigate to employee detail page when clicked on a row
    this.props.navigate(`/employee/${empId}`);
  }

  calculateRetirementTime = (retirementDateStr) => {
    try {
      const splitDate = retirementDateStr.split(new RegExp('[-/]'));
      const parsedRetirementDate = new Date(splitDate[0], splitDate[1] - 1, splitDate[2]);
      // calculate time to retirement
      const timeDiff = CalculateTimeDifference(parsedRetirementDate);
      // if retirement time in negative, display retired
      if (timeDiff.days < 0 || timeDiff.months < 0 || timeDiff.years < 0) return 'Retired';
      return `${timeDiff.days} days, ${timeDiff.months} months, ${timeDiff.years} years`;
    } catch (e) {
      return retirementDateStr;
    }
  };

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
            <th scope={"col"}>Retiring In</th>
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
              <td>{this.calculateRetirementTime(emp.retirementDate)}</td>
            </tr>))}
          </tbody>
        </Table>
      </div>
    </>);
  }
}

export default appNavigator(EmployeeTable);
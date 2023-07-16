import {Component} from "react";
import {fetchEmployees} from "../helpers/api-calls";
import {EmployeeTable} from "./EmployeeTable.jsx";
import {Form, InputGroup} from "react-bootstrap";

export class EmployeeDirectory extends Component {
  empTypes = ['full-time', 'part-time', 'contract', 'seasonal'];

  constructor(props) {
    super(props);
    this.state = {employees: []};
  }

  getEmployees(filter = null) {
    const dataPromise = fetchEmployees(filter);
    dataPromise.then(obj => this.setState({employees: obj.data.allEmployees}));
  }

  componentDidMount() {
    this.getEmployees();
  }

  render() {
    return (<>
      <h1 className={"mb-3"}>Employee Directory</h1>
      <InputGroup className="mb-3 w-md-50 w-lg-25">
        <InputGroup.Text id="employeeTable_empTypesSelect">Filter by</InputGroup.Text>
        <Form.Select aria-label="Select Employee Type" className="text-capitalize"
                     onChange={this.getEmployees}>
          <option value="">All</option>
          {this.empTypes.map((et, dex) => (
            <option key={dex} value={et} className="text-capitalize">{et}</option>))}
        </Form.Select>
      </InputGroup>
      <EmployeeTable employees={this.state.employees}></EmployeeTable></>);
  }
}
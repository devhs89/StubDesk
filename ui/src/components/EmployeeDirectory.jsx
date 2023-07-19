import {Component} from "react";
import {fetchEmployees} from "../helpers/api-calls";
import {Col, Form, InputGroup, Row} from "react-bootstrap";
import EmployeeTable from "./EmployeeTable.jsx";
import {Link} from "react-router-dom";

export class EmployeeDirectory extends Component {
  empTypes = ['full-time', 'part-time', 'contract', 'seasonal'];

  constructor(props) {
    super(props);
    this.state = {employees: []};
  }

  getEmployees(filter = null) {
    const dataPromise = fetchEmployees(filter?.target.value);
    dataPromise.then(obj => this.setState({employees: obj.data.allEmployees}));
  }

  componentDidMount() {
    this.getEmployees();
    this.getUrlParams();
  }

  getUrlParams() {
    const firstAndLast = window.location.href.split('?').pop().split('&');
    if (firstAndLast.length === 2) {
      const fName = firstAndLast[0].split('=').pop();
      this.setState({firstName: fName});
      const lName = firstAndLast[1].split('=').pop();
      this.setState({lastName: lName});
    }
  }

  render() {
    return (<div>
      <h1 className="mb-3 text-center">Employee Directory</h1>
      <Row>
        <Col md="auto" className="mb-3">
          <Link className="btn btn-primary" to="../create" relative="path">Create Employee</Link>
        </Col>
        <Col className="text-md-end mb-3">
          <InputGroup className="w-md-50 w-lg-25 ms-auto">
            <InputGroup.Text id=" employeeTable_empTypesSelect">Filter by</InputGroup.Text>
            <Form.Select aria-label=" Select Employee Type" className="text-capitalize" defaultValue=" all"
                         onChange={(evt) => this.getEmployees(evt)}>
              <option value="all">All</option>
              {this.empTypes.map((et, dex) => (<option key={dex} value={et} className="text-capitalize">{et}</option>))}
            </Form.Select>
          </InputGroup>
        </Col>
      </Row>
      {this.state.firstName && this.state.lastName &&
        <div className={"bg-secondary-subtle py-2 px-3 rounded border mb-3 text-danger"}>
          ! {`${this.state.firstName} ${this.state.lastName}`} deleted successfully
        </div>}
      <EmployeeTable employees={this.state.employees} /></div>);
  }
}
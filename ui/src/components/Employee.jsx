import {Component} from "react";
import {fetchEmployeeById} from "../helpers/api-calls";
import {Form} from "react-bootstrap";

export class Employee extends Component {
  constructor(props) {
    super(props);
    this.state = {empDetails: {}};
  }

  componentDidMount() {
    const id = window.location.href.split('/').pop();
    fetchEmployeeById(id).then(resp => {
      this.setState({empDetails: resp.data.employeeById});
    });
  }

  render() {
    return (<>
      <h1 className={"mb-3"}>Employee Details</h1>
      <Form className="row text-start">
        <Form.Group className="col-md-6 mb-3" controlId="employeeDetail_firstName">
          <Form.Label>Firstname</Form.Label>
          <Form.Control type="text" placeholder="Your first name" value={this.state.empDetails.firstName} disabled
                        readOnly />
        </Form.Group>
        <Form.Group className="col-md-6 mb-3" controlId="employeeDetail_lastName">
          <Form.Label>Lastname</Form.Label>
          <Form.Control type="text" placeholder="Your last name" value={this.state.empDetails.lastName} disabled
                        readOnly />
        </Form.Group>
        <Form.Group className="col-md-6 mb-3" controlId="employeeDetail_age">
          <Form.Label>Age</Form.Label>
          <Form.Control type="text" placeholder="Your age" value={this.state.empDetails.age} disabled readOnly />
        </Form.Group>
        <Form.Group className="col-md-6 mb-3" controlId="employeeDetail_age">
          <Form.Label>Hire Date</Form.Label>
          <Form.Control type="text" placeholder="Hired on" value={this.state.empDetails.hireDate} disabled readOnly />
        </Form.Group>
        <Form.Group className="col-md-6 mb-3" controlId="employeeDetail_employeeType">
          <Form.Label>Employee Type</Form.Label>
          <Form.Control type="text" placeholder="Your employment type" value={this.state.empDetails.employeeType}
                        disabled readOnly />
        </Form.Group>
        <Form.Group className="col-md-6 mb-3" controlId="employeeDetail_jobTitle">
          <Form.Label>Job Title</Form.Label>
          <Form.Control type="text" placeholder="Your job title" value={this.state.empDetails.jobTitle} />
        </Form.Group>
        <Form.Group className="col-md-6 mb-3" controlId="employeeDetail_department">
          <Form.Label>Department</Form.Label>
          <Form.Control type="text" placeholder="Your department" value={this.state.empDetails.department} />
        </Form.Group>
        <Form.Group className="col-md-6 mb-3" controlId="employeeDetail_currentStatus">
          <Form.Label>Employment Status</Form.Label>
          <Form.Control type="text" placeholder="Your employment status" value={this.state.empDetails.currentStatus} />
        </Form.Group>
      </Form>
    </>);
  }
}
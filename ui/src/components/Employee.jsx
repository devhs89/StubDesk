import {Component} from "react";
import {fetchEmployeeById, fetchUpdateEmployeeById} from "../helpers/api-calls";
import {Button, Col, Form, Row} from "react-bootstrap";

export class Employee extends Component {
  constructor(props) {
    super(props);
    this.state = {empDetails: {}, jobTitle: undefined, department: undefined, currentStatus: undefined};
  }

  componentDidMount() {
    const id = window.location.href.split('/').pop();
    fetchEmployeeById(id).then(resp => {
      this.setState({empDetails: resp.data.employeeById});
    });
  }

  updateEmployeeHandler(evt) {
    evt.preventDefault();
    const payload = {};
    payload.jobTitle = this.state.jobTitle ?? this.state.jobTitle;
    payload.department = this.state.department ?? this.state.department;
    payload.currentStatus = this.state.currentStatus ?? this.state.currentStatus;
    payload.id = this.state.empDetails._id;
    fetchUpdateEmployeeById(payload).then(resp => {
      if (resp?.data?.updateEmployee?._id) this.setState({empDetails: resp.data.updateEmployee});
    });
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return (nextState.empDetails.jobTitle !== this.state.empDetails.jobTitle) || (nextState.empDetails.department !== this.state.empDetails.department) || (nextState.empDetails.currentStatus !== this.state.empDetails.currentStatus);
  }

  updateFieldHandler(evt) {
    if (evt.target.id === 'employeeDetail_jobTitle' && this.state.empDetails.jobTitle !== evt.target.value) {
      this.setState({jobTitle: evt.target.value});
    }
    if (evt.target.id === 'employeeDetail_department' && this.state.empDetails.department !== evt.target.value) {
      this.setState({department: evt.target.value});
    }
    if (evt.target.id === 'employeeDetail_currentStatus' && this.state.empDetails.currentStatus !== evt.target.value) {
      this.setState({currentStatus: evt.target.value});
    }
  }

  render() {
    return (<>
      <h1 className={"mb-3"}>Employee Details</h1>
      <Form className="row text-start" onSubmit={this.updateEmployeeHandler.bind(this)}>
        <Form.Group className="col-md-6 mb-3" controlId="employeeDetail_firstName">
          <Form.Label>Firstname</Form.Label>
          <Form.Control type="text" placeholder="Your first name" defaultValue={this.state.empDetails.firstName}
                        disabled
                        readOnly />
        </Form.Group>
        <Form.Group className="col-md-6 mb-3" controlId="employeeDetail_lastName">
          <Form.Label>Lastname</Form.Label>
          <Form.Control type="text" placeholder="Your last name" defaultValue={this.state.empDetails.lastName} disabled
                        readOnly />
        </Form.Group>
        <Form.Group className="col-md-6 mb-3" controlId="employeeDetail_age">
          <Form.Label>Age</Form.Label>
          <Form.Control type="text" placeholder="Your age" defaultValue={this.state.empDetails.age} disabled readOnly />
        </Form.Group>
        <Form.Group className="col-md-6 mb-3" controlId="employeeDetail_age">
          <Form.Label>Hire Date</Form.Label>
          <Form.Control type="text" placeholder="Hired on" defaultValue={this.state.empDetails.hireDate} disabled
                        readOnly />
        </Form.Group>
        <Form.Group className="col-md-6 mb-3" controlId="employeeDetail_employeeType">
          <Form.Label>Employee Type</Form.Label>
          <Form.Control type="text" placeholder="Your employment type" defaultValue={this.state.empDetails.employeeType}
                        disabled readOnly />
        </Form.Group>
        <Form.Group className="col-md-6 mb-3" controlId="employeeDetail_jobTitle">
          <Form.Label>Job Title</Form.Label>
          <Form.Control type="text" placeholder="Your job title" defaultValue={this.state.empDetails.jobTitle}
                        onChange={this.updateFieldHandler.bind(this)} />
        </Form.Group>
        <Form.Group className="col-md-6 mb-3" controlId="employeeDetail_department">
          <Form.Label>Department</Form.Label>
          <Form.Control type="text" placeholder="Your department" defaultValue={this.state.empDetails.department}
                        onChange={this.updateFieldHandler.bind(this)} />
        </Form.Group>
        <Form.Group className="col-md-6 mb-3" controlId="employeeDetail_currentStatus">
          <Form.Label>Employment Status</Form.Label>
          <Form.Control type="text" placeholder="Your employment status"
                        defaultValue={this.state.empDetails.currentStatus}
                        onChange={this.updateFieldHandler.bind(this)} />
        </Form.Group>
        <Row>
          <Col>
            <Button className="btn btn-primary" type="submit">Update</Button>
          </Col>
        </Row>
      </Form>
    </>);
  }
}
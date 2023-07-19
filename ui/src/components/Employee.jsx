import {Component} from "react";
import {fetchDeleteEmployeeById, fetchEmployeeById, fetchUpdateEmployeeById} from "../helpers/api-calls";
import {Button, Col, Form, Row} from "react-bootstrap";
import {appNavigator} from "../helpers/app-navigator";
import {apiErrorHandler} from "../helpers/error-handler";

class Employee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formErrors: [],
      formSuccess: false,
      empDetails: {},
      jobTitle: undefined,
      department: undefined,
      currentStatus: undefined
    };
    this.toEmployeeDirectory = this.toEmployeeDirectory.bind(this);
  }

  componentDidMount() {
    const id = window.location.href.split('/').pop();
    fetchEmployeeById(id).then(resp => {
      this.setState({empDetails: resp.data.employeeById});
    });
  }

  scrollToTop = () => window.scrollTo(0, 0);

  updateEmployeeHandler(evt) {
    evt.preventDefault();

    if (!this.state.jobTitle && !this.state.department && !this.state.currentStatus) {
      this.setState({formErrors: ['No field updated. Change at least one field to update employee information.']});
      return;
    }

    const payload = {};
    payload.jobTitle = this.state.jobTitle ?? this.state.jobTitle;
    payload.department = this.state.department ?? this.state.department;
    payload.currentStatus = this.state.currentStatus ?? this.state.currentStatus;
    payload.id = this.state.empDetails._id;
    fetchUpdateEmployeeById(payload).then(resp => {
      if (resp?.data?.updateEmployee?._id) {
        this.setState({empDetails: resp.data.updateEmployee, formErrors: [], formSuccess: true});
        setTimeout(() => this.setState({formSuccess: false}), 5000);
      } else {
        const {formErrors, formSuccess} = apiErrorHandler(resp?.errors);
        this.setState({formErrors: formErrors});
        this.setState({formSuccess: formSuccess});
      }
      this.scrollToTop();
    }).catch(err => {
      const {formErrors, formSuccess} = apiErrorHandler(err);
      this.setState({formErrors: formErrors});
      this.setState({formSuccess: formSuccess});
      this.scrollToTop();
    });
    this.setState({jobTitle: undefined, department: undefined, currentStatus: undefined});
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

  toEmployeeDirectory(firstName = 'employee', lastName = 'employee') {
    this.props.navigate(`/employee/directory?firstname=${firstName}&lastname=${lastName}`);
  };

  deleteBtnHandler() {
    fetchDeleteEmployeeById(this.state.empDetails._id ?? window.location.href.split('/').pop()).then(resp => {
      if (resp?.data?.deleteEmployee?.firstName) this.toEmployeeDirectory(resp.data.deleteEmployee.firstName, resp.data.deleteEmployee.lastName);
    });
  }

  render() {
    return (<>
      <h1 className={"mb-3 text-center"}>Employee Details</h1>
      <Row>
        <Col className="mb-3">
          <Button type="button" className="btn btn-danger" onClick={this.deleteBtnHandler.bind(this)}>Delete
            Employee</Button>
        </Col>
      </Row>
      {this.state.formErrors?.length > 0 &&
        <div className={"bg-secondary-subtle py-2 px-3 rounded border mb-3 text-danger"}>
          {this.state.formErrors.map((msg, dex) => (
            <div className={"w-100"} key={dex}><span className={"me-2"}>&#33;</span>{msg}</div>))}
        </div>}
      {this.state.formSuccess && <div className={"bg-success-subtle py-2 px-3 rounded border mb-3 text-success"}>
        <div className={"w-100"}><span className={"me-2"}>&#10003; </span>Employee updated successfully</div>
      </div>}
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
          <Form.Select placeholder="Your job title" value={this.state.jobTitle ?? this.state.empDetails.jobTitle}
                       onChange={this.updateFieldHandler.bind(this)}>
            <option value="employee">Employee</option>
            <option value="manager">Manager</option>
            <option value="director">Director</option>
            <option value="vp">Vice President</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="col-md-6 mb-3" controlId="employeeDetail_department">
          <Form.Label>Department</Form.Label>
          <Form.Select placeholder="Your department" value={this.state.department ?? this.state.empDetails.department}
                       onChange={this.updateFieldHandler.bind(this)}>
            <option value="it">IT</option>
            <option value="marketing">Marketing</option>
            <option value="engineering">Engineering</option>
            <option value="hr">Human Resources</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="col-md-6 mb-3" controlId="employeeDetail_currentStatus">
          <Form.Label>Employment Status</Form.Label>
          <Form.Select placeholder="Your employment status"
                       value={this.state.currentStatus ?? this.state.empDetails.currentStatus}
                       onChange={this.updateFieldHandler.bind(this)}>
            <option value="working">Working</option>
            <option value="retired">Retired</option>
          </Form.Select>
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

export default appNavigator(Employee);
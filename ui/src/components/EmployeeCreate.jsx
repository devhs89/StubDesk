import Button from "react-bootstrap/Button";
import {Component} from "react";
import {employee} from "../dtos/employee";
import {fetchCreateEmployee} from "../helpers/api-calls";
import {apiErrorHandler} from "../helpers/error-handler";

export class EmployeeCreate extends Component {

  constructor(props) {
    super(props);

    this.state = {
      formErrors: [],
      formSuccess: false,
      firstName: '',
      lastName: '',
      age: '',
      jobTitle: 'employee',
      department: 'it',
      employeeType: 'seasonal',
      hireDate: new Date().toISOString().slice(0, 10),
      currentStatus: 'working'
    };

    this.changeHandler = this.changeHandler.bind(this);
    this.createEmployeeRequest = this.createEmployeeRequest.bind(this);
  }

  scrollToTop = () => window.scrollTo(0, 0);

  changeHandler = (evt) => {
    const id = evt.target.id;
    const val = evt.target.id === 'currentStatus' ? evt.target.checked : evt.target.value;
    switch (id) {
      case "firstName":
        this.setState({firstName: val});
        break;
      case "lastName":
        this.setState({lastName: val});
        break;
      case "age":
        this.setState({age: val});
        break;
      case "jobTitle":
        this.setState({jobTitle: val});
        break;
      case "department":
        this.setState({department: val});
        break;
      case "employeeType":
        this.setState({employeeType: val});
        break;
      case "hireDate":
        this.setState({hireDate: new Date(val).toISOString().slice(0, 10)});
        break;
      case "currentStatus":
        this.setState({currentStatus: val ? 'retired' : 'working'});
        break;
      default:
        this.setState({currentStatus: val ? 'retired' : 'working'});
    }
  };

  createEmployeeRequest = (evt) => {
    // crete employee with provied fields
    evt.preventDefault();
    const payload = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      age: this.state.age,
      jobTitle: this.state.jobTitle,
      department: this.state.department,
      employeeType: this.state.employeeType,
      hireDate: this.state.hireDate,
      currentStatus: this.state.currentStatus
    };

    // create employee API call
    fetchCreateEmployee(payload).then(resp => {
      if (resp?.data?.addEmployee?._id) {
        this.setState({
          formErrors: [],
          formSuccess: true,
          firstName: '',
          lastName: '',
          age: '',
          jobTitle: 'employee',
          department: 'it',
          employeeType: 'seasonal',
          hireDate: new Date().toISOString().slice(0, 10),
          currentStatus: 'working'
        });
        evt.target.reset();
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
  };

  render() {
    return (<div className={"mb-3"}>
      <h1 className={"mb-3 text-center"}>Add Employee</h1>
      {this.state.formErrors?.length > 0 &&
        <div className={"bg-secondary-subtle py-2 px-3 rounded border mb-3 text-danger"}>
          {this.state.formErrors.map((msg, dex) => (
            <div className={"w-100"} key={dex}><span className={"me-2"}>&#33;</span>{msg}</div>))}
        </div>}
      {this.state.formSuccess && <div className={"bg-success-subtle py-2 px-3 rounded border mb-3 text-success"}>
        <div className={"w-100"}><span className={"me-2"}>&#10003;</span>Employee created successfully
        </div>
      </div>}
      <form className={"row"} onSubmit={this.createEmployeeRequest}>
        <div className="col-12 col-md-6 mb-3">
          <label htmlFor="firstName" className="form-label">Firstname</label>
          <input type="text" className="form-control" id="firstName" placeholder="e.g. Mark"
                 defaultValue={this.state.firstName}
                 onChange={this.changeHandler} />
        </div>
        <div className="col-12 col-md-6 mb-3">
          <label htmlFor="lastName" className="form-label">Lastname</label>
          <input type="text" className="form-control" id="lastName" placeholder="e.g. Smith"
                 defaultValue={this.state.lastName}
                 onChange={this.changeHandler} />
        </div>
        <div className="col-12 col-md-2 mb-3">
          <label htmlFor="age" className="form-label">Age</label>
          <input type="number" className="form-control" id="age" placeholder="e.g. 23"
                 defaultValue={this.state.age}
                 onChange={this.changeHandler} />
        </div>
        <div className="col-12 col-md-5 mb-3">
          <label htmlFor="jobTitle" className="form-label">Title</label>
          <select id="jobTitle" className="form-select" defaultValue={this.state.jobTitle}
                  onChange={this.changeHandler}>
            <option value="employee">Employee</option>
            <option value="manager">Manager</option>
            <option value="director">Director</option>
            <option value="vp">Vice President</option>
          </select>
        </div>
        <div className="col-12 col-md-5 mb-3">
          <label htmlFor="department" className="form-label">Department</label>
          <select id="department" className="form-select" defaultValue={this.state.department}
                  onChange={this.changeHandler}>
            <option value="it">IT</option>
            <option value="marketing">Marketing</option>
            <option value="engineering">Engineering</option>
            <option value="hr">Human Resources</option>
          </select>
        </div>
        <div className="col-12 col-md-6 mb-3">
          <label htmlFor="employeeType" className="form-label">EmployeeType</label>
          <select id="employeeType" className="form-select" defaultValue={this.state.employeeType}
                  onChange={this.changeHandler}>
            <option value="seasonal">Seasonal</option>
            <option value="contract">Contract</option>
            <option value="part-time">Part Time</option>
            <option value="full-time">Full Time</option>
          </select>
        </div>
        <div className="col-12 col-md-6 mb-3">
          <label htmlFor="hireDate" className="form-label">Hire Date</label>
          <input type="date" className="form-control" id="hireDate" placeholder="e.g. yyyy/mm/dd"
                 defaultValue={this.state.hireDate}
                 onChange={this.changeHandler} />
        </div>
        <div className="col-12 mb-3">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="currentStatus" defaultChecked={false}
                   onChange={this.changeHandler} />
            <label className="form-check-label" htmlFor="currentStatus">Retired?</label>
          </div>
        </div>
        <div className={"col-12 mb-3"}>
          <Button className="btn btn-primary" type="submit">Create</Button>
        </div>
      </form>
    </div>);
  }
}
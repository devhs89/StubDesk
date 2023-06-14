import Button from "react-bootstrap/Button";
import {useCallback, useState} from "react";
import {employee} from "../../dtos/employee";
import {createEmployee} from "../../data/datastore";

export const EmployeeCreate = () => {
  const [formEle, setFormEle] = useState(null);
  const [formErrors, setFormErrors] = useState([]);
  const [formSuccess, setFormSuccess] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [jobTitle, setJobTitle] = useState("employee");
  const [department, setDepartment] = useState("it");
  const [employeeType, setEmployeeType] = useState("seasonal");
  const [hireDate, setHireDate] = useState(new Date());
  const [currentStatus, setCurrentStatus] = useState(false);

  const changeHandler = (id, val) => {
    switch (id) {
      case "firstName":
        setFirstName(val);
        break;
      case "lastName":
        setLastName(val);
        break;
      case "age":
        setAge(val);
        break;
      case "jobTitle":
        setJobTitle(val);
        break;
      case "department":
        setDepartment(val);
        break;
      case "employeeType":
        setEmployeeType(val);
        break;
      case "hireDate":
        setHireDate(val);
        break;
      case "currentStatus":
        setCurrentStatus(val);
        break;
      default:
        setCurrentStatus(false);
    }
  };

  const createEmployeeRequest = useCallback(() => {
    employee.firstName = firstName;
    employee.lastName = lastName;
    employee.age = age;
    employee.jobTitle = jobTitle;
    employee.department = department;
    employee.employeeType = employeeType;
    employee.hireDate = hireDate;
    employee.currentStatus = (currentStatus === true || currentStatus.toString() === 'on') ? 'on' : 'off';

    createEmployee(employee).then(resp => {
      if (resp.status >= 400 && resp.status <= 499) {
        setFormSuccess("");
        resp.json().then(dt => setFormErrors(dt));
      } else if (resp.status >= 500) {
        setFormSuccess("");
        setFormErrors([resp.statusText]);
      } else {
        setFormErrors([]);
        setFormSuccess("Employee created");
        setFirstName("");
        setLastName("");
        setAge("");
        setJobTitle("employee");
        setDepartment("it");
        setEmployeeType("seasonal");
        setHireDate(new Date());
        setCurrentStatus(false);
        clearForm(formEle);
      }
    });
  }, [age, currentStatus, department, employeeType, firstName, formEle, hireDate, jobTitle, lastName]);

  const clearForm = (ele) => {
    ele.reset();
  };

  return (<div className={"mb-3"}>
    {formErrors.length > 0 && <div className={"bg-secondary-subtle py-2 px-3 rounded border mb-3 text-danger"}>
      {formErrors.map((msg, dex) => (
        <div className={"w-100"} key={dex}><span className={"me-2"}>&#33;</span>{msg}</div>))}
    </div>}
    {formSuccess.length > 0 && <div className={"bg-success-subtle py-2 px-3 rounded border mb-3 text-success"}>
      <div className={"w-100"}><span className={"me-2"}>&#10003;</span>{formSuccess}</div>
    </div>}
    <form className={"row"} ref={(e) => setFormEle(e)}>
      <div className="col-12 col-md-6 mb-3">
        <label htmlFor="firstName" className="form-label">Firstname</label>
        <input type="text" className="form-control" id="firstName" placeholder="e.g. Mark" defaultValue={firstName}
               onChange={(e) => changeHandler(e.target.id, e.target.value)} />
      </div>
      <div className="col-12 col-md-6 mb-3">
        <label htmlFor="lastName" className="form-label">Lastname</label>
        <input type="text" className="form-control" id="lastName" placeholder="e.g. Smith" defaultValue={lastName}
               onChange={(e) => changeHandler(e.target.id, e.target.value)} />
      </div>
      <div className="col-12 col-md-2 mb-3">
        <label htmlFor="age" className="form-label">Age</label>
        <input type="number" className="form-control" id="age" placeholder="e.g. 23" defaultValue={age}
               onChange={(e) => changeHandler(e.target.id, e.target.value)} />
      </div>
      <div className="col-12 col-md-5 mb-3">
        <label htmlFor="jobTitle" className="form-label">Title</label>
        <select id="jobTitle" className="form-select" defaultValue={jobTitle}
                onChange={(e) => changeHandler(e.target.id, e.target.value)}>
          <option value="employee">Employee</option>
          <option value="manager">Manager</option>
          <option value="director">Director</option>
          <option value="vp">Vice President</option>
        </select>
      </div>
      <div className="col-12 col-md-5 mb-3">
        <label htmlFor="department" className="form-label">Department</label>
        <select id="department" className="form-select" defaultValue={department}
                onChange={(e) => changeHandler(e.target.id, e.target.value)}>
          <option value="it">IT</option>
          <option value="marketing">Marketing</option>
          <option value="engineering">Engineering</option>
          <option value="hr">Human Resources</option>
        </select>
      </div>
      <div className="col-12 col-md-6 mb-3">
        <label htmlFor="employeeType" className="form-label">EmployeeType</label>
        <select id="employeeType" className="form-select" defaultValue={employeeType}
                onChange={(e) => changeHandler(e.target.id, e.target.value)}>
          <option value="seasonal">Seasonal</option>
          <option value="contract">Contract</option>
          <option value="part-time">Part Time</option>
          <option value="full-time">Full Time</option>
        </select>
      </div>
      <div className="col-12 col-md-6 mb-3">
        <label htmlFor="hireDate" className="form-label">Hire Date</label>
        <input type="date" className="form-control" id="hireDate" placeholder="e.g. yyyy/mm/dd"
               defaultValue={new Date(hireDate).toISOString().slice(0, 10)}
               onChange={(e) => changeHandler(e.target.id, e.target.value)} />
      </div>
      <div className="col-12 mb-3">
        <div className="form-check form-switch">
          <input className="form-check-input" type="checkbox" id="currentStatus" placeholder="false"
                 defaultChecked={currentStatus} onChange={(e) => changeHandler(e.target.id, e.target.value)} />
          <label className="form-check-label" htmlFor="currentStatus">Retired?</label>
        </div>
      </div>
      <div className={"col-12 mb-3"}>
        <Button className={"btn btn-primary px-5"} type={"button"} onClick={createEmployeeRequest}>Submit</Button>
      </div>
    </form>
  </div>);
};
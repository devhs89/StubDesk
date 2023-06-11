import Button from "react-bootstrap/Button";

export const EmployeeCreate = () => {
  return (<div className={"mb-3"}>
    <form className={"row"}>
      <div className="col-12 col-md-6 mb-3">
        <label htmlFor="firstName" className="form-label">Firstname</label>
        <input type="text" className="form-control" id="firstName" placeholder="e.g. Mark" />
      </div>
      <div className="col-12 col-md-6 mb-3">
        <label htmlFor="lastName" className="form-label">Lastname</label>
        <input type="text" className="form-control" id="lastName" placeholder="e.g. Smith" />
      </div>
      <div className="col-12 col-md-2 mb-3">
        <label htmlFor="age" className="form-label">Age</label>
        <input type="number" className="form-control" id="age" placeholder="e.g. 23" />
      </div>
      <div className="col-12 col-md-5 mb-3">
        <label htmlFor="title" className="form-label">Title</label>
        <input type="text" className="form-control" id="title" placeholder="e.g. Manager" />
      </div>
      <div className="col-12 col-md-5 mb-3">
        <label htmlFor="department" className="form-label">Department</label>
        <input type="text" className="form-control" id="department" placeholder="e.g. HR" />
      </div>
      <div className="col-12 col-md-6 mb-3">
        <label htmlFor="employeeType" className="form-label">EmployeeType</label>
        <input type="text" className="form-control" id="employeeType" placeholder="e.g. full-time" />
      </div>
      <div className="col-12 col-md-6 mb-3">
        <label htmlFor="hireDate" className="form-label">Hire Date</label>
        <input type="date" className="form-control" id="hireDate" placeholder="e.g. yyyy/mm/dd" />
      </div>
      <div className="col-12 mb-3">
        <div className="form-check form-switch">
          <input className="form-check-input" type="checkbox" id="currentStatus" placeholder="false" />
          <label className="form-check-label" htmlFor="currentStatus">Retired</label>
        </div>
      </div>
      <div className={"col-12 mb-3"}>
        <Button className={"btn btn-primary px-5"}>Submit</Button>
      </div>
    </form>
  </div>);
};
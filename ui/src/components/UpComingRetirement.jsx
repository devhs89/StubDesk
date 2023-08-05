import React, {useEffect, useState} from "react";
import {Table} from "react-bootstrap";
import {fetchNearRetirements} from "../helpers/api-calls";
import {useNavigate} from "react-router-dom";

export function UpComingRetirement() {
  const [employees, setEmployees] = useState([]);
  const navigator = useNavigate();

  const toEmployeeDetail = (empId) => {
    // navigate to employee detail page when clicked on a row
    navigator(`/employee/${empId}`);
  };

  const getNearRetirementEmployees = () => {
    // all or filtered employees API call
    const dataPromise = fetchNearRetirements();
    dataPromise.then(obj => obj.data?.nearRetirement && setEmployees(obj.data.nearRetirement));
  };

  useEffect(() => {
    getNearRetirementEmployees();
  }, []);

  return (<>
    <div className={"table-responsive"}>
      <Table className={"table-light table-striped table-hover align-middle mx-auto"}>
        <thead>
        <tr>
          <th scope={"col"}>Full Name</th>
          <th scope={"col"}>Dob</th>
          <th scope={"col"}>Title</th>
          <th scope={"col"}>Department</th>
          <th scope={"col"}>Type</th>
          <th scope={"col"}>Hire Date</th>
          <th scope={"col"}>Retirement</th>
        </tr>
        </thead>
        <tbody className={"table-group-divider"}>
        {employees.map((emp, dex) => (<tr key={dex} role="button" onClick={() => toEmployeeDetail(emp._id)}>
          <th scope={"row"} className="text-capitalize">{emp.firstName} {emp.lastName}</th>
          <td>{emp.dob}</td>
          <td className={emp.jobTitle === 'vp' ? "text-uppercase" : "text-capitalize"}>{emp.jobTitle}</td>
          <td
            className={(emp.department === 'it' || emp.department === 'hr') ? "text-uppercase" : "text-capitalize"}>{emp.department}</td>
          <td className="text-capitalize">{emp.employeeType}</td>
          <td>{emp.hireDate}</td>
          <td className="fw-semibold">{emp.retirementDate}</td>
        </tr>))}
        </tbody>
      </Table>
    </div>
  </>);
}
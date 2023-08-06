import React, {useEffect, useState} from "react";
import {Col, FormCheck, Row, Table} from "react-bootstrap";
import {fetchUpComingRetirements} from "../helpers/api-calls";
import {useNavigate} from "react-router-dom";

export function UpComingRetirement() {
  const [employees, setEmployees] = useState([]);
  const navigator = useNavigate();
  const [empTypeFilters, setEmpTypeFilters] = useState({});

  const toEmployeeDetail = (empId) => {
    // navigate to employee detail page when clicked on a row
    navigator(`/employee/${empId}`);
  };

  const setFilters = (evt) => {
    const ctrl = evt.target;
    if (!ctrl) return;
    let allFilters = {...empTypeFilters};
    switch (ctrl.id) {
      case 'full-time':
        ctrl.checked ? allFilters.fullTime = 'full-time' : delete allFilters.fullTime;
        break;
      case 'part-time':
        ctrl.checked ? allFilters.partTime = 'part-time' : delete allFilters.partTime;
        break;
      case 'contract':
        ctrl.checked ? allFilters.contract = 'contract' : delete allFilters.contract;
        break;
      case 'seasonal':
        ctrl.checked ? allFilters.seasonal = 'seasonal' : delete allFilters.seasonal;
        break;
      default:
        allFilters = {};
    }
    setEmpTypeFilters(allFilters);
    getUpComingRetirees(allFilters);
  };

  const getUpComingRetirees = (typeFilter = {}) => {
    // all or filtered employees API call
    const dataPromise = fetchUpComingRetirements(typeFilter);
    dataPromise.then(obj => obj.data?.upComingRetirement && setEmployees(obj.data.upComingRetirement));
  };

  useEffect(() => {
    getUpComingRetirees();
  }, []);

  return <>
    <Row className="mb-3 align-items-center">
      <Col xs="12" md="auto" className="mb-2 mb-md-0 fw-semibold">Filters</Col>
      <Col md="auto" className="mb-2 mb-md-0">
        <FormCheck type="checkbox" inline id="full-time" label="Full-time" defaultChecked={false}
                   onClick={setFilters}></FormCheck>
        <FormCheck type="checkbox" inline id="part-time" label="Part-time" defaultChecked={false}
                   onClick={setFilters}></FormCheck>
        <FormCheck type="checkbox" inline id="contract" label="Contract" defaultChecked={false}
                   onClick={setFilters}></FormCheck>
        <FormCheck type="checkbox" inline id="seasonal" label="Seasonal" defaultChecked={false}
                   onClick={setFilters}></FormCheck>
      </Col>
    </Row>
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
        {employees.map((emp, dex) => <tr key={dex} role="button" onClick={() => toEmployeeDetail(emp._id)}>
          <th scope={"row"} className="text-capitalize">{emp.firstName} {emp.lastName}</th>
          <td>{emp.dob}</td>
          <td className={emp.jobTitle === 'vp' ? "text-uppercase" : "text-capitalize"}>{emp.jobTitle}</td>
          <td
            className={(emp.department === 'it' || emp.department === 'hr') ? "text-uppercase" : "text-capitalize"}>{emp.department}</td>
          <td className="text-capitalize">{emp.employeeType}</td>
          <td>{emp.hireDate}</td>
          <td className="fw-semibold">{emp.retirementDate}</td>
        </tr>)}
        </tbody>
      </Table>
    </div>
  </>;
}
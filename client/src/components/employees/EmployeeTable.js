import Table from "react-bootstrap/Table";
import {Employee} from "./Employee";

export const EmployeeTable = (props) => {
  return (    <div className={"table-responsive w-100"}>
    <Table className={"table-dark table-striped table-hover align-middle mx-auto"}>
      <thead>
      <tr>
        <th scope={"col"} className={"w-25"}>ID</th>
        <th scope={"col"}>Full Name</th>
        <th scope={"col"}>Age</th>
        <th scope={"col"}>Title</th>
        <th scope={"col"}>Department</th>
        <th scope={"col"}>Type</th>
        <th scope={"col"}>Status</th>
        <th scope={"col"}>Hire Date</th>
      </tr>
      </thead>
      <tbody className={"table-group-divider"}>
      {props.employees.map((emp, dex) => (<Employee key={dex} emp={emp}></Employee>))}
      </tbody>
    </Table>
  </div>)
}
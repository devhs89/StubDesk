import Button from "react-bootstrap/Button";
import {useState} from "react";
import {EmployeeCreate} from "./EmployeeCreate";
import {EmployeeTable} from "./EmployeeTable";
import {EmployeeSearch} from "./EmployeeSearch";

export const EmployeeDirectory = (props) => {
  let [addEmpState, setAddEmpState] = useState(false);
  let [searchEmpState, setSearchEmpState] = useState(false);

  const searchEmpClickHandler = () => {
    searchEmpState ? setSearchEmpState(false) : setSearchEmpState(true);
    addEmpState && setAddEmpState(false);
  };

  const addEmpClickHandler = () => {
    addEmpState ? setAddEmpState(false) : setAddEmpState(true);
    searchEmpState && setSearchEmpState(false);
  };

  return (<div>
    <h1 className={"mb-3"}>Employee Directory</h1>
    <div className="row mb-3">
      <div className="col-auto">
        <Button className={"btn px-5 " + (searchEmpState ? 'btn-danger' : 'btn-primary')}
                onClick={searchEmpClickHandler}>{searchEmpState ? 'Cancel' : 'Search'}</Button>
      </div>
      <div className="col-auto">
        <Button className={"btn px-5 " + (addEmpState ? 'btn-danger' : 'btn-primary')}
                onClick={addEmpClickHandler}>{addEmpState ? 'Cancel' : 'Add'}</Button>
      </div>
    </div>
    {searchEmpState && <EmployeeSearch />}
    {addEmpState && <EmployeeCreate />}
    {!searchEmpState && !addEmpState && <EmployeeTable employees={props.employees} />}
  </div>);
};
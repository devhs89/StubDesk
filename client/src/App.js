import './App.css';
import {AppNavbar} from "./components/common/AppNavbar";
import {EmployeeDirectory} from "./components/employees/EmployeeDirectory";
import {useEffect, useState} from "react";
import {getEmployees} from "./data/datastore";

function App() {
  let [result, setResult] = useState([]);
  useEffect(() => {
    getEmployees().then(resp => {
      resp.json().then(data => {
        setResult(data);
      });
    });
  }, []);
  return (<>
    <AppNavbar />
    <div className="container py-5">
      <EmployeeDirectory employees={result} />
    </div>
  </>);
}

export default App;

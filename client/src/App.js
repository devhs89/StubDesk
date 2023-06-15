import './App.css';
import {AppNavbar} from "./components/common/AppNavbar";
import {EmployeeDirectory} from "./components/employees/EmployeeDirectory";
import {useEffect, useState} from "react";
import {getEmployees} from "./data/datastore";
import Button from "react-bootstrap/Button";

function App() {
  const [showHomePage, setShowHomePage] = useState(true);
  let [result, setResult] = useState([]);
  useEffect(() => {
    getEmployees().then(resp => setResult(resp.data.getEmployees));
  }, []);
  return (<>
    <AppNavbar />
    <div className="container py-5">
      {showHomePage && <div className="d-flex flex-column align-items-center justify-content-center">
        <div className={"flex-grow-1 m-auto text-center"}>
          <h1>Welcome</h1>
          <p>Click the button below to navigate to employee directory.</p>
          <Button className={"btn btn-lg btn-primary px-5"}
                  onClick={() => setShowHomePage(false)}>View Employees</Button>
        </div>
      </div>}
      {!showHomePage && <EmployeeDirectory employees={result} />}
    </div>
  </>);
}

export default App;

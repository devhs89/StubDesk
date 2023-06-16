import './App.css';
import {AppNavbar} from "./components/common/AppNavbar";
import {EmployeeDirectory} from "./components/employees/EmployeeDirectory";
import {useState} from "react";
import {getEmployeesQuery} from "./graphql/queries";
import Button from "react-bootstrap/Button";
import {useQuery} from "@apollo/client";

function App() {
  const [showHomePage, setShowHomePage] = useState(true);
  const {qLoading, error, data} = useQuery(getEmployeesQuery);
  return (<>
    <AppNavbar />
    <div className="container py-5">
      {showHomePage && <div className="d-flex flex-column align-items-center justify-content-center">
        <div className={"flex-grow-1 m-auto text-center"}>
          <h1>Welcome</h1>
          <p>Click the button below to navigate to employee directory.</p>
          {qLoading && <p>Loading...</p>}
          {error && <p>Error : {error.message}</p>}
          <Button className={`btn btn-lg btn-primary px-5 ${qLoading ? 'disabled' : ''}`} disabled={qLoading}
                  onClick={() => setShowHomePage(false)}>View Employees</Button>
        </div>
      </div>}
      {!showHomePage && <EmployeeDirectory employees={data.getEmployees} />}
    </div>
  </>);
}

export default App;

import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import {Home} from "./Home.jsx";
import {EmployeeDirectory} from "./EmployeeDirectory.jsx";
import {Employee} from "./Employee.jsx";
import {EmployeeCreate} from "./EmployeeCreate.jsx";

class Page404 extends React.Component {
  render() {
    return <>
      <div className="w-100 display-4 mb-3 text-danger">Error 404</div>
      <div className="fw-semibold">Page not Found</div>
    </>;
  }
}

export class AppRouter extends React.Component {
  render() {
    return (<Routes>
      <Route path={'home'} Component={Home}></Route>
      <Route path={'employee'}>
        <Route path={'directory'} Component={EmployeeDirectory}></Route>
        <Route path={'create'} Component={EmployeeCreate}></Route>
        <Route path={':id'} Component={Employee}></Route>
      </Route>
      <Route path="/" element={<Navigate replace to={'/home'} />}></Route>
      <Route path="*" Component={Page404}></Route>
    </Routes>);
  }
}
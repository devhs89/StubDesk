import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import {Home} from "./Home.jsx";
import {EmployeeDirectory} from "./EmployeeDirectory.jsx";

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
      <Route path={'employees'} Component={EmployeeDirectory}></Route>
      <Route path="/" element={<Navigate replace to={'/home'} />}></Route>
      <Route path="*" element={<Page404 />}></Route>
    </Routes>);
  }
}
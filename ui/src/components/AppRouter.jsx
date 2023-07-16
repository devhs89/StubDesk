import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import {Home} from "./Home.jsx";
import {EmployeeDirectory} from "./EmployeeDirectory.jsx";

export class AppRouter extends React.Component {
  render() {
    return (<Routes>
      <Route path={'/home'} Component={Home}></Route>
      <Route path={'/employees'} Component={EmployeeDirectory}></Route>
      <Route path="/" element={<Navigate replace to={'/home'} />}></Route>
    </Routes>);
  }
}
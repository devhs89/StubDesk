import {Component} from "react";
import {NavLink} from "react-router-dom";

export class AppNavbar extends Component {
  render() {
    return (<nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow sticky-top">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">StubDesk</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navMenuConntent" aria-controls="navMenuConntent" aria-expanded="false"
                aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navMenuConntent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className={({isActive}) => isActive ? 'nav-link active' : 'nav-link inactive'}
                       aria-current="page"
                       to="/home">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/employees"
                       className={({isActive}) => isActive ? 'nav-link active' : 'nav-link inactive'}>Employees</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>);
  }
}
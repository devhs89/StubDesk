import {Component} from "react";
import {NavLink} from "react-router-dom";
import {Container, Nav, Navbar} from "react-bootstrap";

export class AppNavbar extends Component {
  // client app navigation bar
  // use isActive property to display active routes in nav bar (source: https://react.dev/reference/react)
  render() {
    return (<Navbar expand="lg" className="navbar-dark bg-dark shadow" fixed="top">
      <Container fluid={true}>
        <Navbar.Brand href="/">StubDesk</Navbar.Brand>
        <Navbar.Toggle aria-controls="stub-desk-navbar-menu" />
        <Navbar.Collapse id="stub-desk-navbar-menu">
          <Nav className="ms-auto">
            <NavLink className={({isActive}) => isActive ? 'nav-link active' : 'nav-link inactive'} aria-current="page"
                     to="/home">Home</NavLink>
            <NavLink to="/employee/directory"
                     className={({isActive}) => isActive ? 'nav-link active' : 'nav-link inactive'}>Employees</NavLink>
            <NavLink to="/retirements"
                     className={({isActive}) => isActive ? 'nav-link active' : 'nav-link inactive'}>Retirements</NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>);
  }
}
import NavLink from "react-bootstrap/NavLink";
import NavbarBrand from "react-bootstrap/NavbarBrand";

export const AppNavbar = () => {
  return (<nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow sticky-top">
    <div className="container-fluid">
      <NavbarBrand href="/">Navbar</NavbarBrand>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
              aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <NavLink aria-current="page" href="/home">Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink>Directory</NavLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>);
};
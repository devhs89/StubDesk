import NavbarBrand from "react-bootstrap/NavbarBrand";

export const AppNavbar = () => {
  return (<nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow sticky-top">
    <div className="container-fluid">
      <NavbarBrand href="/">StubDesk</NavbarBrand>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
              aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
    </div>
  </nav>);
};
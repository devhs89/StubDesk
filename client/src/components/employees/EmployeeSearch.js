export const EmployeeSearch = () => {
  return (<form className="d-md-flex justify-content-md-center align-items-md-center">
    <input className="form-control me-2 mb-2 mb-md-3 w-lg-50" type="search" placeholder="Search"
           aria-label="Search" />
    <button className="btn btn-outline-dark mb-2 mb-md-3 px-5" type="submit">Search</button>
  </form>);
};
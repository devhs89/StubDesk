import {Component} from "react";

export class AppFooter extends Component {
  render() {
    return (<footer className="w-100 bg-dark text-light p-5 text-center">
      <div className="row">
        <div className="col">
          <div className="small font-monospace">
            &copy; {new Date().getFullYear()} Harpreet Singh (8870943)
          </div>
        </div>
      </div>
    </footer>);
  }
}
import {Component} from "react";

export class AppFooter extends Component {
  render() {
    return (<footer className="w-100 bg-dark text-light p-5 text-center small">
      <div className="row">
        <div className="col-12">
          <div>
            &copy; {new Date().getFullYear()} StubDesk, All Rights Reserved
          </div>
        </div>
        <div className="col-12">
          <div>
            Advanced Full-Stack Programming (Group 5)
          </div>
        </div>
      </div>
      <div className="row row-cols-1 row-cols-md-2 row-cols-xl-4">
        <div className="ool">
          Bhavna, Bhavna (8864264)
        </div>
        <div className="ool">
          Deepak, Mikkilneni Jeevarathnam (8850079)
        </div>
        <div className="ool">
          Harpreet Singh (8870943)
        </div>
        <div className="ool">
          Pratharan Sai Rupak Reddy, Gondi (8876529)
        </div>
      </div>
    </footer>);
  }
}
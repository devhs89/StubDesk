import './App.css';
import {AppNavbar} from "./components/AppNavbar.jsx";
import {HashRouter} from "react-router-dom";
import {AppRouter} from "./components/AppRouter.jsx";
import {Component} from "react";

class App extends Component {
  render() {
    return (<HashRouter>
      <AppNavbar />
      <div className="container py-5">
        <div className="d-flex flex-column align-items-center justify-content-center">
          <div className={"flex-grow-1 m-auto w-100 text-center"}>
            <AppRouter />
          </div>
        </div>
      </div>
    </HashRouter>);
  }
}

export default App;

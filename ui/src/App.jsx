import './App.css';
import {AppNavbar} from "./components/AppNavbar.jsx";
import {HashRouter} from "react-router-dom";
import {AppRouter} from "./components/AppRouter.jsx";
import {Component} from "react";
import {AppFooter} from "./components/AppFooter.jsx";

class App extends Component {
  // all content wrapped in hash router to provide routing
  render() {
    return (<HashRouter>
      <AppNavbar />
      <div className="d-flex flex-column align-items-center justify-content-start mx-auto min-vh-100">
        <div className={"flex-grow-1 m-auto w-100"}>
          <div className="container mt-5 py-5">
            <AppRouter />
          </div>
        </div>
        <AppFooter />
      </div>
    </HashRouter>);
  }
}

export default App;

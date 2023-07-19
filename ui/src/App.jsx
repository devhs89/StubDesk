import './App.css';
import {AppNavbar} from "./components/AppNavbar.jsx";
import {HashRouter} from "react-router-dom";
import {AppRouter} from "./components/AppRouter.jsx";
import {Component} from "react";

class App extends Component {
  // all content wrapped in hash router to provide routing
  render() {
    return (<HashRouter>
      <AppNavbar />
      <div className="container mt-5 py-5">
        <div className="d-flex flex-column align-items-center justify-content-start mx-auto">
          <div className={"flex-grow-1 m-auto w-100"}>
            <AppRouter />
          </div>
        </div>
      </div>
    </HashRouter>);
  }
}

export default App;

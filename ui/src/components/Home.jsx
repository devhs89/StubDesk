import {Component} from "react";
import {Col, Row} from "react-bootstrap";
import {Link} from "react-router-dom";

export class Home extends Component {
  render() {
    return (<>
      <h1>Welcome</h1>
      <p>Click the button below to navigate to employee directory.</p>
      <Row>
        <Col className="mb-3">
          <Link className="btn btn-primary" to="/employee/directory">Employee Directory</Link>
        </Col>
      </Row>
    </>);
  }
}
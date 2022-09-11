import React from "react";
import "./Error.css";
import { Link } from "react-router-dom";
import ErrorImg from "../../assets/oops.png"


class Error extends React.Component {
  render() {
    return (
    <div className="Error-main">
      <div className="Error-text">
        <img src={ErrorImg} className="Error-image" />
        <p>Oops, Something went wrong</p>
        <br />
        <p>
          Return to
          <Link to="/"> Home</Link>
        </p>
      </div>
    </div>
    );
  }
}

export default Error;

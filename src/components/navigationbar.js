import React, { Component } from "react";
import Logo from "../images/Logo.JPG";
import { Link } from "react-router-dom";
class NavigationBar extends Component {
  state = {};
  render() {
    const { loginFlag } = this.props;
    return (
      <div className="row navbar">
        <div className="col-3 col-sm-3">
          <img src={Logo} alt="knackseek" height="80px" />
        </div>
        <div className="col-2 col-sm-3">
          <Link to="/">Home</Link>
        </div>
        {loginFlag === "true" ? (
          <div className="col-4 col-sm-3">
            <Link to="/profile">Candidates</Link>
          </div>
        ) : (
          <></>
        )}
        {loginFlag === "true" ? (
          <div className="col-3 col-sm-3">
            <Link to="/" onClick={() => this.props.onLogOut()}>
              LogOut
            </Link>
          </div>
        ) : (
          <div className="col-4 col-sm-3">
            <Link to="/login">Login</Link>
          </div>
        )}
      </div>
    );
  }
}

export default NavigationBar;

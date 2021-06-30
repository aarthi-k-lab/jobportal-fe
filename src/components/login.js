import React, { Component } from "react";
class Login extends Component {
  state = { email: "", password: "" };

  onTrigger = (event) => {
    this.props.onLoggin(this.state.email, this.state.password);
    event.preventDefault();
  };
  render() {
    return (
      <div className="row LoginPage">
        <div className="row Login">
          <div className="col-1 col-md-3"></div>
          <div
            className="col-10 col-md-6 loginformdiv"
            style={{ height: "400px", marginTop: "100px" }}
          >
            <div className="signInform">
              <h3>Sign In</h3>
              <br></br>
              <form
                id="loginForm"
                className="signInForm"
                onSubmit={this.onTrigger}
              >
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 pl-0 pr-0">
                  <label htmlFor="email">Email ID*</label>
                  <input
                    type="email"
                    className="form-control req"
                    id="email"
                    name="email"
                    placeholder="Enter Email ID"
                    onChange={(event) =>
                      this.setState({ email: event.target.value })
                    }
                    required
                  />
                </div>
                <br></br>

                <div className="form-group" style={{ marginBottom: "10px" }}>
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 pl-0 pr-0">
                    <label htmlFor="password">Password*</label>
                    <input
                      type="password"
                      className="form-control req"
                      id="password"
                      name="password"
                      placeholder="Enter Password"
                      required
                      onChange={(event) =>
                        this.setState({ password: event.target.value })
                      }
                    />
                  </div>
                </div>
                <div
                  className="col-lg-12 col-md-12 col-sm-12 col-xs-12 pl-0 pr-0"
                  style={{ color: "red" }}
                >
                  {this.props.error}
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 pl-0 pr-0">
                  {this.props.error}
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 pl-0 pr-0">
                  <button
                    type="submit"
                    data-toggle="button"
                    aria-pressed="false"
                    autoComplete="off"
                    className=" btn btn-warning btn-md"
                    style={{ margin: "5px" }}
                  >
                    Login
                  </button>
                </div>
              </form>
              <br></br>
            </div>
          </div>
          <div className="col-1 col-md-3"></div>
        </div>
      </div>
    );
  }
}

export default Login;

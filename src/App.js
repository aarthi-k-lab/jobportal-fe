import React, { Component } from "react";
import Dashboard from "./components/dashboard";
import Login from "./components/login";
import View from "./components/view";
import NavigationBar from "./components/navigationbar.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
class App extends Component {
  state = {
    loginFlag: localStorage.getItem("loginFlag"),
    token: "",
    error: "",
  };

  handleLogin = async (email, password) => {
    try {
      const user = { email: email, password: password };

      const mockapiurl = "http://knackseek.herokuapp.com/login";
      const tokenResponse = await fetch(mockapiurl, {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-type": "application/json;characterset=UTF-8",
        },
      });
      let token = await tokenResponse.json();
      if (token.error === undefined) {
        this.setState({ token });
        this.setState({ error: "" });
        localStorage.setItem("token", token.token);
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
        localStorage.setItem("loginFlag", "true");
        this.setState({ loginFlag: localStorage.getItem("loginFlag") });
        window.location.href = "/profile";
      } else {
        this.setState({ error: token.error });
      }
    } catch (err) {
      console.log(err);
    }
  };

  handleLogOut = () => {
    localStorage.setItem("token", "");
    localStorage.setItem("email", "");
    localStorage.setItem("password", "");
    localStorage.setItem("loginFlag", "false");
    this.setState({
      loginFlag: localStorage.getItem("loginFlag"),
    });
    window.location.href = "/";
  };

  render() {
    return (
      <div className="container App">
        <Router>
          <NavigationBar
            loginFlag={this.state.loginFlag}
            onLogOut={this.handleLogOut}
          />
          <br></br>
          <Switch>
            <Route path="/" exact>
              <Dashboard />
            </Route>
            <Route path="/login">
              <Login onLoggin={this.handleLogin} error={this.state.error} />
            </Route>
            <Route path="/profile">
              {this.state.loginFlag === "true" ? (
                <View />
              ) : (
                <>401-Un Authorized</>
              )}
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;

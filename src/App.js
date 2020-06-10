import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Redirect } from "react-router-dom";
import axios from "axios";

import "./App.css";
import Home from "./pages/home";
import Signup from "./pages/signup";
import User from "./pages/user";
import Navbar from "./components/Navbar";

axios.defaults.baseURL =
  "https://us-central1-fruitful-convos.cloudfunctions.net/api";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: false,
      handle: null,
    };
    this.onLogin = this.onLogin.bind(this);
    this.onLogout = this.onLogout.bind(this);
    this.setHandle = this.setHandle.bind(this);
  }

  onLogin() {
    this.setState({
      auth: true,
    });
    axios
      .get("/user")
      .then((res) => {
        console.log(res);
        this.setState({
          handle: res.data.handle,
        });
      })
      .catch((err) => {
        console.log(err.response.data);
        if (err.response.status !== 404) {
          console.log("Login Failed");
        }
      });
  }

  onLogout() {
    this.setState({
      auth: false,
      handle: null,
    });
    delete axios.defaults.headers.common["Authorization"];
  }

  setHandle(handle) {
    this.setState({
      handle: handle,
    });
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Navbar
            auth={this.state.auth}
            onLogin={this.onLogin}
            onLogout={this.onLogout}
            handle={this.state.handle}
          />
          <div className="container">
            <Switch>
              <Route exact path="/">
                {this.state.auth && !this.state.handle ? (
                  <Redirect to="/signup" />
                ) : (
                  <Home />
                )}
              </Route>
              <Route exact path="/signup">
                {this.state.handle ? (
                  <Redirect to="/" />
                ) : (
                  <Signup auth={this.state.auth} setHandle={this.setHandle} />
                )}
              </Route>
              />
              <Route
                exact
                path="/users/:handle"
                render={(props) => (
                  <User
                    {...props}
                    auth={this.state.auth}
                    handle={this.state.handle}
                  />
                )}
              />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;

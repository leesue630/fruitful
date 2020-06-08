import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from 'axios';

import "./App.css";
import home from "./pages/home";
import login from "./pages/login";
import signup from "./pages/signup";
import user from "./pages/user";
import Navbar from "./components/Navbar";

axios.defaults.baseURL = "https://us-central1-fruitful-convos.cloudfunctions.net/api";

class App extends Component {
  constructor(props) {
    super(props);
    this.auth = true;
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Navbar auth={this.auth} />
          <div className="container">
            <Switch>
              <Route exact path="/" component={home} />
              <Route exact path="/login" component={login} />
              <Route exact path="/signup" component={signup} />
              <Route exact path="/users/:handle" component={user} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;

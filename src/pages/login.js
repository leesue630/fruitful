import React, { Component } from "react";
import { GoogleLogin } from "react-google-login";
import { Redirect } from "react-router-dom";

class login extends Component {
  constructor(props) {
    super(props);
    this.state = { loginFailed: false };
    this.onLoginSuccess = this.onLoginSuccess.bind(this);
    this.onFailure = this.onFailure.bind(this);
  }

  onLoginSuccess() {
    return <Redirect to="/" />;
  }

  onFailure() {
    console.error("Login failed");
    this.setState({ loginFailed: true });
  }

  render() {
    return (
      <div>
        {!this.state.loginFailed ? (
          <GoogleLogin
            clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={this.onLoginSuccess}
            onFailure={this.onFailure}
            cookiePolicy={"single_host_origin"}
            isSignedIn={true}
          />
        ) : <p>Login Failed</p>}
      </div>
    );
  }
}

export default login;

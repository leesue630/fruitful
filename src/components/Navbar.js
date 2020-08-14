import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import firebase from "firebase/app";
import "firebase/auth";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import config from "../util/config";
import logo from "../images/logo.png";
import RequestModal from "./RequestModal";

// MUI stuff
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

// Icon
import AccountCircle from "@material-ui/icons/AccountCircle";

firebase.initializeApp(config);

const useStyles = () => ({
  title: {
    margin: 20,
    flexGrow: 1,
  },
});

class Navbar extends Component {
  /*
  props = {
    auth: bool,
    handle: string,
    onLogin: fxn,
    onLogout: fxn
  }
  */

  uiConfig = {
    signInFlow: "popup",
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    callbacks: {
      signInSuccessWithAuthResult: () => false,
    },
  };

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        user
          .getIdToken()
          .then((token) => {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            return `Bearer ${token}`;
          })
          .then((header) => {
            this.props.onLogin();
          });
      } else {
        console.log("No user logged in.");
      }
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <AppBar position="sticky">
        <Toolbar>
          <Link to="/">
            <img src={logo} alt="logo" style={{ width: 40, height: 40 }} />
          </Link>
          <Typography variant="h5" align="left" className={classes.title}>
            Fruitful
          </Typography>
          {this.props.auth ? (
            <span>
              <RequestModal auth={this.props.auth} />
              <Link to={`/users/${this.props.handle}`}>
                <IconButton>
                  <AccountCircle />
                </IconButton>
              </Link>
              <Button
                color="primary"
                variant="contained"
                onClick={this.props.onLogout}
              >
                Logout
              </Button>
            </span>
          ) : (
            <StyledFirebaseAuth
              uiConfig={this.uiConfig}
              firebaseAuth={firebase.auth()}
            />
          )}
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(useStyles)(Navbar);

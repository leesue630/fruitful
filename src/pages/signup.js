import React, { Component } from "react";
import axios from "axios";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

const useStyles = (theme) => ({
  textField: {
    margin: 20,
  },
});

class signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      handle: "",
    };
  }

  onSubmit(event) {
    event.preventDefault();
    if (!this.state.error) {
      axios
        .pick("/createUser", { handle: this.state.handle })
        .then((res) => {
          console.log("created user", res);
          this.props.setHandle(this.state.handle);
        })
        .catch((err) => {
          console.error(err);
          if (err.response.status === 400) {
            this.setState({
              error: "This handle is already taken",
            });
          } else {
            console.log("Something went wrong");
          }
        });
    }
  }

  handleChange(event) {
    this.setState({
      handle: event.target.value,
    });
    if (event.target.value === "") {
      this.setState({
        error: "Handle cannot be empty",
      });
    } else {
      this.setState({
        error: null,
      });
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        {this.props.auth ? (
          <form noValidate onSubmit={this.onSubmit.bind(this)}>
            <TextField
              id="handle"
              name="handle"
              type="text"
              helperText={this.state.error}
              error={!!this.state.error}
              value={this.state.handle}
              onChange={this.handleChange.bind(this)}
              className={classes.textField}
            />
            <br />
            <Button type="submit" variant="contained" color="primary">
              Set Handle
            </Button>
          </form>
        ) : (
          <h3>Login first!</h3>
        )}
      </div>
    );
  }
}

export default withStyles(useStyles)(signup);

import React, { Component } from "react";
import axios from "axios";
import PickView from "../components/PickView";
import PickModal from "../components/PickModal";

// MUI
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/styles";

const styles = (theme) => ({
  handle: {
    margin: 20,
  },
});

class user extends Component {
  constructor(props) {
    super(props);
    this.state = {
      picks: null,
      error: "",
    };

    this.handleError = this.handleError.bind(this);
  }

  handleError(err) {
    console.error(err);
    if (err.message === "Network Error") {
      this.setState({
        error: "Sorry, quota exceeded :(. Try again in ~100 secs!",
      });
    } else {
      this.setState({
        error: "Something went wrong. :(",
      });
    }
  }

  componentDidMount() {
    axios
      .get(`/user/${this.props.match.params.handle}`)
      .then((res) => {
        console.log("user details", res);
        this.setState({
          picks: res.data.picks,
          currentPick: res.data.user.currentPick,
        });
      })
      .catch(this.handleError);
  }
  render() {
    const { classes } = this.props;
    let handle = `@${this.props.match.params.handle}`;
    let isPersonalPage =
      this.props.auth && this.props.handle === this.props.match.params.handle;
    let handleDisplay = isPersonalPage ? `${handle} (You)` : handle;
    return (
      <div>
        <Typography variant="h5" align="left" className={classes.handle}>
          {handleDisplay}
        </Typography>
        {isPersonalPage && <PickModal auth={this.props.auth} />}
        <Typography variant="h5">
          {isPersonalPage && "Your"} Current Pick: {this.state.currentPick}
        </Typography>
        <br />
        {this.state.error !== "" ? (
          this.state.error
        ) : (
          <PickView picks={this.state.picks} showFruitName={true} />
        )}
      </div>
    );
  }
}

export default withStyles(styles)(user);

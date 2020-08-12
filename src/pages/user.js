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
      error: false,
    };
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
      .catch((err) => {
        console.error(err);
        this.setState({
          error: true,
        });
      });
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
        {this.state.error ? (
          "Something went wrong..."
        ) : (
          <PickView picks={this.state.picks} showFruitName={true} />
        )}
      </div>
    );
  }
}

export default withStyles(styles)(user);

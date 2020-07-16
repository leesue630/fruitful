import React, { Component } from "react";
import axios from "axios";
import PickView from "../components/PickView";
import Typography from "@material-ui/core/Typography";

class home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      picks: null,
    };
  }
  componentDidMount() {
    axios
      .get(`/user/${this.props.match.params.handle}`)
      .then((res) => {
        console.log("user details", res);
        this.setState({
          picks: res.data.picks,
          currentPick: res.data.currentPick,
        });
      })
      .catch(console.error);
  }
  render() {
    let handle = `@${this.props.match.params.handle}`;
    let isPersonalPage =
      this.props.auth && this.props.handle === this.props.match.params.handle;
    let handleDisplay = isPersonalPage ? `${handle} (You)` : handle;
    return (
      <div>
        <Typography variant="h5" align="left">
          {handleDisplay}
        </Typography>
        <Typography variant="h5">
          {isPersonalPage && "Your"} Current Pick: {this.state.currentPick}
        </Typography>
        <PickView picks={this.state.picks} />
      </div>
    );
  }
}

export default home;

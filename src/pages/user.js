import React, { Component } from "react";
import axios from "axios";
import PostView from "../components/PostView";
import Typography from "@material-ui/core/Typography";

class home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: null,
    };
  }
  componentDidMount() {
    axios
      .get(`/user/${this.props.match.params.handle}`)
      .then((res) => {
        console.log(res);
        this.setState({
          posts: res.data.posts,
          handle: res.data.user.handle,
        });
      })
      .catch(console.log);
  }
  render() {
    let handle = `@${this.props.match.params.handle}`;
    let handleDisplay =
      (this.props.auth && this.props.handle === this.props.match.params.handle)
        ? `${handle} (You)`
        : handle;
    return (
      <div>
        <Typography variant="h5" align="left">
          {handleDisplay}
        </Typography>
        <PostView posts={this.state.posts} />
      </div>
    );
  }
}

export default home;

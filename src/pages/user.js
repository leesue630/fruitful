import React, { Component } from "react";
import axios from "axios";
import Post from "../components/Post";
import Typography from "@material-ui/core/Typography";

class home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      handle: null,
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
    let recentPostsMarkup = this.state.posts ? (
      this.state.posts.length === 0 ? (
        <p>No posts</p>
      ) : (
        this.state.posts.map((post) => (
          <Post
            key={post.postId}
            userHandle={post.userHandle}
            fruit={post.fruit}
            createdAt={post.createdAt}
          />
        ))
      )
    ) : (
      <p>Loading...</p>
    );
    return (
      <div>
        <Typography variant="h3" align="left">
          @{this.state.handle}
        </Typography>
        {recentPostsMarkup}
      </div>
    );
  }
}

export default home;

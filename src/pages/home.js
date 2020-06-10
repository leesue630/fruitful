import React, { Component } from "react";
import axios from "axios";
import Post from "../components/Post";

class home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: null,
    };
  }
  componentDidMount() {
    axios
      .get("/posts")
      .then((res) => {
        console.log(res);
        this.setState({
          posts: res.data,
        });
      })
      .catch(console.log);
  }
  render() {
    let recentPostsMarkup = this.state.posts ? (
      this.state.posts.map((post) => (
        <Post
          key={post.postId}
          userHandle={post.userHandle}
          fruit={post.fruit}
          createdAt={post.createdAt}
        />
      ))
    ) : (
      <p>Loading...</p>
    );
    return <div className="centered">{recentPostsMarkup}</div>;
  }
}

export default home;

import React, { Component } from "react";
import axios from "axios";
import PostView from "../components/PostView";

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
    return <PostView posts={this.state.posts} />;
  }
}

export default home;

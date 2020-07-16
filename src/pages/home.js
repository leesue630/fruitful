import React, { Component } from "react";
import axios from "axios";
import Fruits from "../components/Fruits";
class home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }
  componentDidMount() {
    axios
      .get("/fruits")
      .then((res) => {
        console.log("fruits", res);
        this.setState({
          fruits: res.data,
          loading: false,
        });
      })
      .catch(console.log);
  }
  render() {
    return this.state.loading ? (
      <div>Loading...</div>
    ) : (
      <Fruits fruits={this.state.fruits} />
    );
  }
}

export default home;

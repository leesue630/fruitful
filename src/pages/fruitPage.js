import React, { Component } from "react";
import axios from "axios";
import PickView from "../components/PickView";
import Fruit from "../components/Fruit";
class fruitPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }
  componentDidMount() {
    axios
      .get(`/fruits/${this.props.match.params.fruitId}`)
      .then((res) => {
        console.log("specified fruit", res);
        this.setState({
          fruitId: res.data.id,
          name: res.data.name,
          pickCount: res.data.pickCount,
          loading: false,
        });
      })
      .catch(console.error);
    axios
      .get(`/picks/${this.props.match.params.fruitId}`)
      .then((res) => {
        console.log("picks by fruit", res);
        this.setState({
          picks: res.data,
        });
      })
      .catch(console.error);
  }
  render() {
    return this.state.loading ? (
      <div>Loading...</div>
    ) : (
      <div>
        <Fruit
          fruitId={this.state.fruitId}
          name={this.state.name}
          pickCount={this.state.pickCount}
        />
        <PickView picks={this.state.picks} />
      </div>
    );
  }
}

export default fruitPage;

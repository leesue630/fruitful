import React, { Component } from "react";
import axios from "axios";
import PickView from "../components/PickView";
import Fruit from "../components/Fruit";
import PickModal from "../components/PickModal";

//MUI
import Typography from "@material-ui/core/Typography";

class fruitPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: "",
    };
    this.handleError = this.handleError.bind(this);
  }

  handleError(err) {
    console.error(err);
    if (err.message === "Network Error") {
      this.setState({
        loading: false,
        error: "Sorry, quota exceeded :(. Try again in ~100 secs!",
      });
    } else {
      this.setState({
        loading: false,
        error: "Something went wrong. :(",
      });
    }
  }

  componentDidMount() {
    this.setState({
      loading: true,
    });
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
      .catch(this.handleError);
    axios
      .get(`/picks/${this.props.match.params.fruitId}`)
      .then((res) => {
        console.log("picks by fruit", res);
        this.setState({
          picks: res.data,
        });
      })
      .catch(this.handleError);
    axios
      .get("/fruits")
      .then((res) => {
        this.setState({
          ranking: res.data.filter(
            (fruit) => fruit.id === this.props.match.params.fruitId
          )[0].ranking,
        });
      })
      .catch(this.handleError);
  }
  render() {
    return this.state.loading ? (
      <div>Loading fruit page...</div>
    ) : this.state.error !== "" ? (
      this.state.error
    ) : (
      <div>
        <Typography variant="h3" component="h2">
          {this.state.name}
        </Typography>
        <Fruit
          fruitId={this.state.fruitId}
          name={this.state.name}
          pickCount={this.state.pickCount}
          ranking={this.state.ranking}
        />
        <PickModal
          auth={this.props.auth}
          fruit={{ id: this.props.match.params.fruitId, name: this.state.name }}
        />
        <PickView picks={this.state.picks} showFruitName={false} />
      </div>
    );
  }
}

export default fruitPage;

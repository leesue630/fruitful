import React, { Component } from "react";
import axios from "axios";
import Fruits from "../components/Fruits";
import PickModal from "../components/PickModal";
import PickView from "../components/PickView";
import DayJs from "dayjs";

// MUI
import Typography from "@material-ui/core/Typography";

class home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: false,
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
      .catch((err) => {
        console.log(err);
        this.setState({
          loading: false,
          error: true,
        });
      });
    axios
      .get("/picks")
      .then((res) => {
        console.log("all picks", res);
        this.setState({
          todaysPicks: res.data.filter((pick) =>
            DayJs(pick.createdAt).isSame(DayJs(), "day")
          ),
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          error: true,
        });
      });
  }
  render() {
    return this.state.loading ? (
      <div>Loading...</div>
    ) : this.state.error ? (
      "Something went wrong..."
    ) : (
      <div>
        <Fruits fruits={this.state.fruits} />
        <PickModal auth={this.props.auth} />
        <Typography variant="h4">Today's picks:</Typography>
        <PickView picks={this.state.todaysPicks} showFruitName={true} />
      </div>
    );
  }
}

export default home;

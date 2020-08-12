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
    if (!this.state.fruits) {
      axios
        .get("/fruits")
        .then((res) => {
          console.log("fruits", res);
          this.setState({
            fruits: res.data,
            loading: false,
          });
        })
        .catch(this.handleError);
    }
    if (!this.state.todaysPicks) {
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
        .catch(this.handleError);
    }
  }
  render() {
    return this.state.loading ? (
      <div>Loading...</div>
    ) : this.state.error !== "" ? (
      this.state.error
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

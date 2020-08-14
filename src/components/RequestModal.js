import React from "react";
import axios from "axios";
import Modal from "react-modal";

// MUI
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles({
  margin10: {
    margin: 5,
  },
});

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("body");

export default function RequestModal(props) {
  const classes = useStyles();
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [error, setError] = React.useState("");
  const [fruitRequest, setFruitRequest] = React.useState("");
  const [uploadStatus, setUploadStatus] = React.useState("Unsent");

  function openModal() {
    setIsOpen(true);
    setError("");
    setFruitRequest("");
    setUploadStatus("Unsent");
  }

  function closeModal() {
    setIsOpen(false);
  }

  function handleError(err) {
    console.error(err);
    if (err.message === "Network Error") {
      this.setState({
        error: "Quota exceeded :(. Your request will be made in ~10 secs!",
      });
    } else {
      this.setState({
        error: "Something went wrong. :(",
      });
    }
  }

  function handleRequest() {
    setUploadStatus("Sending");
    axios
      .post("/request", { fruit: fruitRequest })
      .then((res) => {
        console.log("made request", res);
        setUploadStatus("Email Sent!");
      })
      .catch(handleError);
  }

  function handleFruitRequestChange(event) {
    setFruitRequest(event.target.value);
    setUploadStatus("Unsent");
  }

  if (!props.auth) {
    return null;
  }
  return (
    <span>
      <Button variant="contained" color="primary" onClick={openModal}>
        Request a Fruit!
      </Button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Request Modal"
      >
        {error !== "" ? (
          error
        ) : (
          <div>
            <h2>Request a new fruit!</h2>
            <TextField
              id="fruit"
              name="fruit"
              type="text"
              label="Fruit Name"
              value={fruitRequest}
              onChange={handleFruitRequestChange}
              className={classes.margin10}
              variant="outlined"
              disabled={uploadStatus === "Sending"}
            />
            <br />
            <Button
              variant="contained"
              color="primary"
              onClick={handleRequest}
              disabled={fruitRequest === "" || uploadStatus !== "Unsent"}
              className={classes.margin10}
            >
              {uploadStatus === "Unsent" ? "Send Email!" : uploadStatus}
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={closeModal}
              className={classes.margin10}
            >
              Close
            </Button>
          </div>
        )}
      </Modal>
    </span>
  );
}

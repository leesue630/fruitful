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

  function handleRequest() {
    setUploadStatus("Uploading");
    axios
      .post("/request", { fruit: fruitRequest })
      .then((res) => {
        console.log("made pick", res);
        setUploadStatus("Uploaded");
      })
      .catch((err) => {
        console.error("Something went wrong", err);
        setError("Something went wrong...");
      });
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
        contentLabel="Pick Modal"
      >
        {error !== "" ? (
          "Something went wrong..."
        ) : (
          <div>
            <h2>Request a Fruit!</h2>
            <TextField
              id="fruit"
              name="fruit"
              type="text"
              label="Fruit Name"
              value={fruitRequest}
              onChange={handleFruitRequestChange}
              className={classes.margin10}
              variant="outlined"
              disabled={uploadStatus === "Uploading"}
            />
            <br />
            <Button
              variant="contained"
              color="primary"
              onClick={handleRequest}
              disabled={fruitRequest === "" || uploadStatus !== "Unsent"}
              className={classes.margin10}
            >
              {uploadStatus === "Unsent" ? "Make request!" : uploadStatus}
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

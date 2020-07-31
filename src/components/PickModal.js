import React from "react";
import axios from "axios";
import Modal from "react-modal";

// MUI
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";

const useStyles = makeStyles({
  formControl: {
    minWidth: 150,
    margin: 20,
  },
  margin10: {
    margin: 10,
  },
  margin20: {
    margin: 20,
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

export default function PickModal(props) {
  const classes = useStyles();
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [error, setError] = React.useState("");
  const [fruits, setFruits] = React.useState([]);
  const [fruitPick, setFruitPick] = React.useState("");
  const [comment, setComment] = React.useState("");
  const [uploading, setUploading] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    axios
      .get("/fruits")
      .then((res) => {
        setFruits(
          Object.assign(
            {},
            ...res.data.map((fruit) => ({ [fruit.name]: fruit.id }))
          )
        );
      })
      .catch((err) => {
        console.error("Something went wrong", err);
        setError("Something went wrong...");
      });
  }

  function closeModal() {
    setIsOpen(false);
  }

  function handlePick() {
    setUploading(true);
    axios
      .post("/pick", { fruit: fruits[fruitPick], comment: comment })
      .then((res) => {
        console.log("made pick", res);
        closeModal();
        setUploading(false);
        window.location.reload();
      })
      .catch((err) => {
        console.error("Something went wrong", err);
        setError("Something went wrong...");
      });
  }

  function handleFruitPickChange(event) {
    setFruitPick(event.target.value);
  }

  function handleCommentChange(event) {
    setComment(event.target.value);
  }
  if (!props.auth) {
    return (
      <div className="margin20">
        <i>Login in to make a pick!</i>
      </div>
    );
  }
  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={openModal}
        className={classes.margin20}
      >
        Make a pick!
      </Button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Pick Modal"
      >
        {error !== "" ? (
          "Something went wrong..."
        ) : (
          <div>
            <h2>Choose a fruit!</h2>
            {fruits.length === 0 ? (
              "Loading..."
            ) : (
              <div>
                <FormControl className={classes.formControl}>
                  <InputLabel shrink id="fruit-select-helper-label">
                    Fruit
                  </InputLabel>
                  <Select
                    labelId="fruit-label"
                    id="fruit-select"
                    value={fruitPick}
                    onChange={handleFruitPickChange}
                  >
                    {Object.keys(fruits).map((fruit) => (
                      <MenuItem key={fruit} value={fruit}>
                        {fruit}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <TextField
                  id="comment"
                  name="comment"
                  type="text"
                  label="Comment"
                  value={comment}
                  onChange={handleCommentChange}
                  className={classes.margin}
                  variant="outlined"
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handlePick}
                  disabled={fruitPick === "" || comment === ""}
                  className={classes.margin10}
                >
                  {!uploading ? "Make pick!" : "Uploading..."}
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={closeModal}
                  className={classes.margin10}
                >
                  Cancel
                </Button>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}

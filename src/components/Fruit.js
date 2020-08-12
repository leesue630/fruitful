import React from "react";
import { Link } from "react-router-dom";

// MUI
import Typography from "@material-ui/core/Typography";

export default function Fruit(props) {
  /*
  props = {
    name: 'Apple',
    ranking: 1,
    pickCount: 3,
    fruitId: 'apple', (lowercase)
  }
  */

  return (
    <div className="fruit">
      <Link to={`/fruits/${props.fruitId}`}>
        <img
          src={`/fruit-images/${props.fruitId}.png`}
          alt={props.name + " Image"}
        />
      </Link>
      <br />
      {!!props.ranking && (
        <Typography variant="h5">#{props.ranking}</Typography>
      )}
      Active Picks: {props.pickCount}
    </div>
  );
}

import React from "react";
import { Link } from "react-router-dom";

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
      {!!props.ranking && `Ranking: ${props.ranking}, `}Pick Count:{" "}
      {props.pickCount}
    </div>
  );
}

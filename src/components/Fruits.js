import React from "react";

// components
import Fruit from "./Fruit";

export default function Fruits(props) {
  /*
  props = {
    fruits: [
        {
            "name": "Apple",
            "id": "apple",
            "pickCount": 2,
            "ranking": 1,
        },
        {
            "name": "Banana",
            "id": "banana",
            "pickCount": 1,
            "ranking": 2,
        },
    ]
  }
  */

  const menuItems = props.fruits.map((fruit, i) => (
    <Fruit
      key={i}
      index={i}
      fruitId={fruit.id}
      name={fruit.name}
      ranking={fruit.ranking}
      pickCount={fruit.pickCount}
    />
  ));

  return <div id="panels">{menuItems}</div>;
}

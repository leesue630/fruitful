import React from "react";
import Grid from "@material-ui/core/Grid";
import Pick from "./Pick";

export default function PickView(props) {
  var recentPicksMarkup;
  if (props.picks) {
    if (props.picks.length === 0) {
      recentPicksMarkup = "No picks.";
    } else {
      recentPicksMarkup = props.picks.map((pick) => (
        <Grid item key={pick.pickId} xs={12}>
          <Pick
            key={pick.pickId}
            userHandle={pick.userHandle}
            fruit={pick.fruit}
            createdAt={pick.createdAt}
            comment={pick.comment}
            showFruitName={props.showFruitName}
          />
        </Grid>
      ));
    }
  } else {
    recentPicksMarkup = <p>Loading picks...</p>;
  }
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
    >
      {recentPicksMarkup}
    </Grid>
  );
}

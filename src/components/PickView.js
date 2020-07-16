import React from "react";
import Grid from "@material-ui/core/Grid";
import Pick from "./Pick";

export default function PickView(props) {
  const recentPicksMarkup = props.picks ? (
    props.picks.map((pick) => (
      <Grid item key={pick.pickId} xs={3}>
        <Pick
          key={pick.pickId}
          userHandle={pick.userHandle}
          fruit={pick.fruit}
          createdAt={pick.createdAt}
          comment={pick.comment}
        />
      </Grid>
    ))
  ) : (
    <p>Loading...</p>
  );
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

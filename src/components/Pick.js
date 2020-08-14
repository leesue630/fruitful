import React from "react";
import { Link } from "react-router-dom";
import DayJs from "dayjs";
import RelativeTime from "dayjs/plugin/relativeTime";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth: 350,
    margin: 5,
  },
  title: {
    fontSize: 14,
  },
});

export default function Pick(props) {
  DayJs.extend(RelativeTime);
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
          component={Link}
          to={`/users/${props.userHandle}`}
        >
          @{props.userHandle}
        </Typography>
        <br />
        {props.showFruitName && (
          <Typography
            variant="h4"
            component={Link}
            to={`/fruits/${props.fruit}`}
          >
            {props.fruit}
          </Typography>
        )}
        <Typography variant="h5" component="h2">
          "{props.comment}"
        </Typography>
        <Typography color="textSecondary">
          {DayJs(props.createdAt).fromNow()}
        </Typography>
      </CardContent>
    </Card>
  );
}

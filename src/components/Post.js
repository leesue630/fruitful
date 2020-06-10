import React from "react";
import { Link } from "react-router-dom";
import DayJs from 'dayjs';
import RelativeTime from 'dayjs/plugin/relativeTime';

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginBottom: 20,
  },
  title: {
    fontSize: 14,
  },
});

export default function Post(props) {
  DayJs.extend(RelativeTime);
  const classes = useStyles();

  return (
    <Card className={classes.root} maxWidth="400">
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
          component={Link}
          to={`/users/${props.userHandle}`}
        >
          @{props.userHandle}
        </Typography>{" "}
        <Typography variant="h5" component="h2">
          {props.fruit}
        </Typography>
        <Typography color="textSecondary">
          {DayJs(props.createdAt).fromNow()}
        </Typography>
      </CardContent>
    </Card>
  );
}

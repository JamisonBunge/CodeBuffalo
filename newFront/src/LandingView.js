import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Explore from "@material-ui/icons/Explore";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
//import Paper from "@material-ui/core/Paper";
//import Image from "./images/trova.png"; // Import using relative path

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper
  },
  img: {
    width: 10,
    height: 10
  }
}));

export default function Landing() {
  const classes = useStyles();
  return (
    <Grid
      container
      direction="column"
      justify="space-between"
      alignItems="center"
      spacing={3}
    >
      <Grid item>
        <img src={require("./images/newTrova.png")} classes={useStyles.img} />
      </Grid>
      <Grid item>
        <h1>welcome back</h1>
        <Typography>take the quiz, and let's get exploring</Typography>
      </Grid>
      <Grid item>
        <IconButton component={Link} to="/quiz">
          <Explore />
        </IconButton>
      </Grid>
    </Grid>
  );
}

import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { getQuizQuery } from "../query/query";
import { graphql } from "react-apollo";
import Card from "./QuizCard.js";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import CheckIcon from "@material-ui/icons/Check";
import FeedComponent from "../feed/FeedComponent";
import CloseIcon from "@material-ui/icons/Close";
import Grid from "@material-ui/core/Grid";

class QuizView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: {}
    };
  }

  displayCard(x) {
    var data = this.props.data;
    if (data.loading) {
      return <div>Loading...</div>;
    } else {
      //data is ready, map to html and return it
      return (
        <div>
          <Card elem={data.getQuiz[x]} />
        </div>
      );
    }
  }

  likeType(x) {
    console.log(this.props);
  }

  render() {
    return (
      <div>
        <Grid
          container
          direction="row-reverse"
          justify="flex-end"
          alignItems="center"
          spacing={1}
        >
          <ul id="This is an activity">{this.displayCard(0)}</ul>
          <ul id="This is an activity">{this.displayCard(1)}</ul>
          <ul id="This is an activity">{this.displayCard(2)}</ul>
          <ul id="This is an activity">{this.displayCard(3)}</ul>
        </Grid>
      </div>
    );
  }
}

//the query result is stored in props
export default graphql(getQuizQuery)(QuizView);

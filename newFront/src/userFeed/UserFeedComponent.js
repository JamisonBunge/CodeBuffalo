import React, { Component } from "react";
import { graphql } from "react-apollo";
import {
  getQuizQuery,
  getEventsQuery,
  getEventsByCat,
  getUserFeedQuery
} from "../query/query";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

//components
import UserFeedCardList from "./UserFeedCard";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
}));

class FeedComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: { cat: "social" }
    };
  }

  displayFeed() {
    var data = this.props.data;
    if (data.loading || data.events == undefined) {
      return <div>Loading event...</div>;
    } else {
      // console.log(data);
      //data is ready, map to html and return it
      return <AutoGrid eventList={data.events} />;
    }
  }

  render() {
    console.log(this.props);
    return <div id="event-list">{this.displayFeed()}</div>;
  }
}

function AutoGrid(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        {props.eventList.map((value, index) => {
          return (
            <Grid item xs={6}>
              <UserFeedCardList feedEvent={value} />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}

//bind booklist to getbooksquery
//the query result is stored in props
export default graphql(getUserFeedQuery)(UserFeedComponent);

//how to make a query

//construct one, ( the getbooksQuery const)

//bind it to the component

//remeber graphQL is NOT js

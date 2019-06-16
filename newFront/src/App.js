import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import Quiz from "./quiz/testquiz.js";
import FeedComponent from "./feed/FeedComponent";
import Drawer from "@material-ui/core/Drawer";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";

const client = new ApolloClient({
  uri: "http://localhost:5004/" //endpoint were making request to queries to
});

const drawerWidth = 125;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3)
  },
  bigAvatar: {
    margin: 15,
    width: 90,
    height: 90
  }
}));

function App() {
  const classes = useStyles();
  return (
    <Router>
      <ApolloProvider client={client}>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper
          }}
          anchor="left"
        >
          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="flex-start"
          >
            <Grid item>
              <Avatar
                alt="Nick Miller"
                src="https://media.licdn.com/dms/image/C5603AQEVkBpfsTLUEQ/profile-displayphoto-shrink_800_800/0?e=1566432000&v=beta&t=hfmF_-wDSI89MRsDWztYgCCEchWvZB-mKWvrvWSgy9w"
                className={classes.avatar}
              />
            </Grid>
            <Grid item>
              <ul>
                <li>
                  <Link to="/">Quiz</Link>
                </li>
                <li>
                  <Link to="/about">Feed</Link>
                </li>
              </ul>
            </Grid>
          </Grid>
        </Drawer>
        <div>
          <Box p={20}>
            <Route exact path="/" component={Quiz} />
            <Route path="/about" component={FeedComponent} />
          </Box>
        </div>
      </ApolloProvider>
    </Router>
  );
}

export default App;

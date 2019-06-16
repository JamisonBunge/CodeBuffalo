import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import Quiz from "./quiz/testquiz.js";
import FeedComponent from "./feed/FeedComponent";
import UserFeed from "./userFeed/UserFeedComponent";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Drawer from "@material-ui/core/Drawer";
import { state, reset } from "./quiz/State.js";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import PersonIcon from "@material-ui/icons/Person";
import DNSIcon from "@material-ui/icons/Dns";
import GroupIcon from "@material-ui/icons/Group";
import DashIcon from "@material-ui/icons/Dashboard";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import FlameIcon from "@material-ui/icons/Whatshot";
import Avatar from "@material-ui/core/Avatar";
import Landing from "./LandingView";

const client = new ApolloClient({
  uri: "http://localhost:5004/" //endpoint were making request to queries to
});

const drawerWidth = 200;

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: theme.palette.background.paper
  },
  paper: {
    background: "blue"
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
  nested: {
    paddingLeft: theme.spacing(4)
  },
  bigAvatar: {
    margin: 20,
    width: 100,
    height: 100
  },
  List: {
    backgroundColor: "#fcc400"
  }
}));

function App() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  function handleClick() {
    setOpen(!open);
  }

  function handleReset() {
    reset();
  }

  return (
    <div>
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
            <List
              component="nav"
              aria-labelledby="nested-list-subheader"
              className={classes.root}
            >
              <ListItem>
                <Avatar
                  alt="Remy Sharp"
                  src="https://cdn.ndtv.com/tech/images/gadgets/zuckerberg_fb_live_scrsht.jpg?output-quality=80&output-format=webp"
                  className={classes.bigAvatar}
                />
              </ListItem>
              <ListItem button onClick={handleClick}>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary="My Profile" />
                {open ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem className={classes.nested}>
                    <ListItemIcon>
                      <FlameIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="20 day event streak!" />
                  </ListItem>
                </List>
              </Collapse>
              <ListItem button component={Link} to="/feed">
                <ListItemIcon>
                  <DashIcon />
                </ListItemIcon>
                <ListItemText primary="Feed" />
              </ListItem>
              <ListItem button component={Link} to="/userFeed">
                <ListItemIcon>
                  <GroupIcon />
                </ListItemIcon>
                <ListItemText primary="User Events" />
              </ListItem>
              <ListItem
                button
                onClick={handleReset}
                component={Link}
                to="/quiz"
              >
                <ListItemIcon>
                  <DNSIcon />
                </ListItemIcon>
                <ListItemText primary="Take Quiz" />
              </ListItem>
            </List>
          </Drawer>
          <div>
            <Box p={30}>
              <Route exact path="/" component={Landing} />
              <Route path="/quiz" component={Quiz} />
              <Route path="/feed" component={FeedComponent} />
              <Route path="/userfeed" component={UserFeed} />
            </Box>
          </div>
        </ApolloProvider>
      </Router>
    </div>
  );
}

export default App;

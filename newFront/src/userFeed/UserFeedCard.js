import React, { Component } from 'react';
import { graphql } from 'react-apollo'
import { withStyles } from "@material-ui/core/styles";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Favorite from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";

import Typography from '@material-ui/core/Typography';

const faces = [
  "http://i.pravatar.cc/300?img=1",
  "http://i.pravatar.cc/300?img=2",
  "http://i.pravatar.cc/300?img=3",
  "http://i.pravatar.cc/300?img=4"
];

const useStyles = muiBaseTheme => ({
  card: {
    maxWidth: 300,
    margin: "auto",
    transition: "0.3s",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
    }
  },
  media: {
    paddingTop: "56.25%"
  },
  heading: {
    fontWeight: "bold"
  },
  subheading: {
    lineHeight: 1.8
  },
  avatar: {
    display: "inline-block",
    border: "2px solid white",
    "&:not(:first-of-type)": {
      marginLeft: 1
    }
  },
  // this group of buttons will be aligned to the right side
  toolbarButtons: {
    marginLeft: 'auto',
  },

});
//import { getAuthorsQuery, addBookMutation, getBooksQuery} from '../queries/queries';
// import { getBookQuery } from '../queries/queries'


class UserFeedCardList extends Component {

  feedDetails() {
    console.log(this.props.feedEvent);
    const feed = this.props.feedEvent;
    console.log(feed);

    if (feed) {
      return (
        <ImgMediaCard eventItem={feed} callBack={this.update} />
      );
    } else {
      return (
        <div>No feed selected</div>
      );
    }

  }

  update() {
    this.setState({ somethingToUpdate: "newValue" });
    console.log("updated!");
  }

  render() {
    return (
      <div id="event-details">
        {this.feedDetails()}
      </div>
    );
  }

}


function ImgMediaCard(props) {
  const classes = useStyles();
  console.log(props)
  console.log("ddd")
  // let x = props.eventItem.score
  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"
          title="Contemplative Reptile"
          action={
            <IconButton aria-label="Settings">
              <Favorite />
            </IconButton>
          }
        />
        <CardContent>
          <Typography
            className={"MuiTypography--heading"}
            variant={"h6"}
            gutterBottom
          >
            {props.eventItem.name}
          </Typography>
          <Typography
            className={"MuiTypography--subheading"}
            variant={"caption"}
          >
            {props.eventItem.description}<br/>User: {props.eventItem.user}
          </Typography>
        </CardContent>
      </CardActionArea>
      <Divider className={classes.divider} light />
      <div className={classes.toolbarButtons}>
        <CardActions>
          <IconButton aria-label="Share" onClick={() => console.log("hello")}>
            <Favorite />
            {props.eventItem.score}
          </IconButton>
        </CardActions>
      </div>
    </Card >
  );
}

const WrappedApp = withStyles(useStyles)(UserFeedCardList);
export default WrappedApp;
//binding this to a component means that whenever this compondent renders this query qill be made

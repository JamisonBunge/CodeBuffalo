import React, { Component } from 'react';
import { graphql } from 'react-apollo'

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


import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
  },
});
//import { getAuthorsQuery, addBookMutation, getBooksQuery} from '../queries/queries';
// import { getBookQuery } from '../queries/queries'


class FeedCardList extends Component {

    feedDetails() {
        console.log(this.props.feedEvent);
        const feed = this.props.feedEvent;
        console.log(feed);

        if(feed) {
            return(
              <ImgMediaCard eventItem= {feed}/>
            );
        } else {
            return (
                <div>No feed selected</div>
            );
        }
    }

    render() {
        return(
            <div id="event-details">
                {this.feedDetails()  }
            </div>
        );
    }

}


function ImgMediaCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.eventItem.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.eventItem.address}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      <IconButton aria-label="Share">
         <Favorite />
       </IconButton>
      </CardActions>
    </Card>
  );
}
export default FeedCardList;
//binding this to a component means that whenever this compondent renders this query qill be made

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { graphql } from "react-apollo";

var state = [];
function likeType(str) {
  state.push(str);
  console.log(state.length);
}

const useStyles = makeStyles(theme => ({
  card: {
    width: 500,
    height: 400
  },
  media: {
    height: 300,
    paddingTop: "0%" // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  }
}));

function QuizFun(props) {
  const classes = useStyles();
  const [count, setCount] = React.useState(0);
  if (!props) {
    return "loading";
  }
  let image;
  switch (props.value.elem.type) {
    case "social":
      image = "http://thebunkhouse.us/images/Grad-Party-Gathering.jpg";
      break;
    case "charity":
      image = "http://thebunkhouse.us/images/Grad-Party-Gathering.jpg";
      break;
    case "recreational":
      image = "http://thebunkhouse.us/images/Grad-Party-Gathering.jpg";
      break;
    case "cooking":
      image = "http://thebunkhouse.us/images/Grad-Party-Gathering.jpg";
      break;
    default:
      image = "http://thebunkhouse.us/images/Grad-Party-Gathering.jpg";
      break;
  }
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center"
      }}
    >
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={image}
          title="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.value.elem.activity}
          </Typography>
          <IconButton
            variant="contained"
            color="primary"
            onClick={likeType(props.value.elem.type)}
          >
            <CheckIcon />
          </IconButton>
        </CardContent>
        <div
          style={{
            display: "flex",
            justifyContent: "center"
          }}
        />
      </Card>
    </div>
  );
}

export default class QuizCard extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <QuizFun value={this.props} />;
  }
}

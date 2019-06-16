import React, { Component } from "react";
import Favorite from "@material-ui/icons/Favorite";
import Trending from "../images/baseline-trending_up-24px.svg";
import IconButton from "@material-ui/core/IconButton";
import FlameIcon from "@material-ui/icons/Whatshot";
import Grid from "@material-ui/core/Grid";

class LikeButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalClicks: Math.floor(Math.random() * 25),
      userClicks: 0,
      show: true
    };
  }

  IncrementItem = () => {
    if (this.state.userClicks < 1) {
      this.setState({
        totalClicks: this.state.totalClicks + 1,
        userClicks: this.state.userClicks + 1
      });
    }
  };

  trending() {
    if (this.state.totalClicks > 15) {
      return <Favorite />;
    }
  }

  render() {
    return (
      <Grid container direction="row" justify="baseline" alignItems="baseline">
        <IconButton onClick={this.IncrementItem}>
          <Favorite color="primary" />
        </IconButton>
        {this.state.show ? <h2>{this.state.totalClicks}</h2> : ""}
      </Grid>
    );
  }
}

export default LikeButton;

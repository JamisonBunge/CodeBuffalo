import React, { Component } from "react";
import { getQuizQuery } from "../query/query";
import { graphql } from "react-apollo";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

//STATE HOLDS QUIZ ANSWERS AND WHAT QUIZ QURSTION YOURE ON
//PROPS HOLDS THE QUERY RESULT, THE GETQUIZ OBJECT
//NEED TO CHANGE ALL CLASS BASED COMPONENT TO FUNCTION BASED COMPONENTS
//THIS MEANS WE NEED TO LEARN CONTEXT & HOOKS

class QuizDash extends Component {
    constructor(props) {
        super(props)
        this.state = {
            index: 0,
        }
    }


    handleChange = () => {
        //console.log(`this is the context ${this} and this is the state ${this.state}`)
        //console.log(this)
        // console.log(this.props.data)
        this.setState({ index: this.state.index + 1 })
    }

    render() {
        let data = this.props.data
        let quizQuestionArray = data.getQuiz
        console.log(quizQuestionArray)

        if (quizQuestionArray == undefined) {
            return <div>Loading event...</div>
        } else {
            return (
                <div>
                    <h3>Question #{this.state.index + 1}</h3>
                    <QCard index={this.state.index}
                        callbackFromParent={this.handleChange}
                        question={quizQuestionArray[this.state.index]}
                    />
                </div>
            );
        }
    }
}





class QCard extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <Card>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        alt="Contemplative Reptile"
                        height="140"
                        image="/static/images/cards/contemplative-reptile.jpg"
                        title="Contemplative Reptile"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">Question #{this.props.index + 1}</Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {this.props.question.activity}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary" onClick={this.props.callbackFromParent}>Yes</Button>
                    <Button size="small" color="primary">No</Button>
                </CardActions>
            </Card>
        );
    }
}



export default graphql(getQuizQuery)(QuizDash);
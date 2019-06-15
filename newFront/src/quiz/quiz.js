import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepButton from "@material-ui/core/StepButton";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Card from "./QuizCard.js";
import IconButton from "@material-ui/core/IconButton";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { getQuizQuery } from "../query/query";
import { graphql } from "react-apollo";

const useStyles = makeStyles(theme => ({
  root: {
    width: "90%"
  },
  button: {
    marginRight: theme.spacing(1)
  },
  completed: {
    display: "inline-block"
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
}));

function getSteps() {
  return ["", "", "", ""];
}

function HorizontalNonLinearStepper({ data: { getQuiz }, loading }) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const steps = getSteps();
  if (loading) {
    return (
      <div>
        {" "}
        <h1>loading...</h1>
      </div>
    );
  }
  const quizArr = getQuiz;

  console.log(getQuiz);

  function totalSteps() {
    return steps.length;
  }

  function completedSteps() {
    return Object.keys(completed).length;
  }

  function isLastStep() {
    return activeStep === totalSteps() - 1;
  }

  function allStepsCompleted() {
    return completedSteps() === totalSteps();
  }

  function handleNext() {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  }

  function handleBack() {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  }

  const handleStep = step => () => {
    setActiveStep(step);
  };

  function handleComplete() {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  }

  function handleReset() {
    setActiveStep(0);
    setCompleted({});
  }

  return (
    <div className={classes.root}>
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepButton
              onClick={handleStep(index)}
              completed={completed[index]}
            >
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <div style={{ marginBottom: 30 }}>
        <Card value={quizArr[0]} />
      </div>
      <div>
        {allStepsCompleted() ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div>
              {/* <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.button}
              >
                Back
              </Button> --!> */}
              <IconButton
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
              >
                <CheckIcon />
              </IconButton>
              {activeStep !== steps.length &&
                (completed[activeStep] ? (
                  <Typography variant="caption" className={classes.completed}>
                    Step {activeStep + 1} already completed
                  </Typography>
                ) : (
                  <IconButton
                    variant="contained"
                    color="primary"
                    onClick={handleComplete}
                  >
                    {/* {completedSteps() === totalSteps() - 1
                      ? "Finish"
                   : "Complete Step"} */}
                    <CloseIcon />
                  </IconButton>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default graphql(getQuizQuery)(HorizontalNonLinearStepper);

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Quiz from "./quiz/quiz.js";
import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import TestQuiz from "./quiz/testquiz.js";

const client = new ApolloClient({
  uri: "http://localhost:5003/" //endpoint were making request to queries to
});

function App() {
  return (
    <Router>
      <ApolloProvider client={client}>
        <div>
          <ul>
            <li>
              <Link to="/">Quiz</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/topics">Topics</Link>
            </li>
          </ul>

          <hr />

          <Route exact path="/" component={TestQuiz} />
          <Route path="/about" component={About} />
          <Route path="/topics" component={Topics} />
        </div>
      </ApolloProvider>
    </Router>
  );
}

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}

function Topics({ match }) {
  return (
    <div>
      <h2>Topics</h2>
      <ul>
        <li>
          <Link to={`${match.url}/rendering`}>Rendering with React</Link>
        </li>
        <li>
          <Link to={`${match.url}/components`}>Components</Link>
        </li>
        <li>
          <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
        </li>
      </ul>

      <Route path={`${match.path}/:topicId`} component={Topic} />
      <Route
        exact
        path={match.path}
        render={() => <h3>Please select a topic.</h3>}
      />
    </div>
  );
}

function Topic({ match }) {
  return (
    <div>
      <h3>{match.params.topicId}</h3>
    </div>
  );
}

export default App;

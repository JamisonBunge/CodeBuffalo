import {
  gql
} from "apollo-boost";

const getQuizQuery = gql `
  {
    getQuiz {
      activity
      type
      accessibility
      participants
      price
      key
    }
  }
`
const getEventsQuery = gql`
query($cat: String!) {
      getEvents(cat: $cat) {
        name
        address
        id
      }
    }
`


export {
  getQuizQuery,
  getEventsQuery
};

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
        score
      }
    }
`

const getEventsByCat = gql`
query($cat: [String]!) {
      events(cat: $cat) {
        name
        address
        id
        score
      }
    }
`


export {
  getQuizQuery,
  getEventsQuery,
  getEventsByCat
};

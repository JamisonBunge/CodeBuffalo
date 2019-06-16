import {
  gql
} from "apollo-boost";

const getQuizQuery = gql`
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
        type
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


const getUserFeedQuery = gql`
{
  userEvents{
    name
    description
    score
    user
  }
}
`
const addEventsMutation = gql`
mutation($name: String!,$description: String!) {
  post(name: $name,description: $description) {
    name
    description
    score
    user
      }
}
`




export {
  getQuizQuery,
  getEventsQuery,
  getEventsByCat,
  getUserFeedQuery,
  addEventsMutation

};

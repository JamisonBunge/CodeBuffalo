import { gql } from "apollo-boost";

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
`;
export { getQuizQuery };

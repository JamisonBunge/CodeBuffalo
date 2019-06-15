import { gql } from "apollo-boost";

const getQuizQuery = gql`
  {
    getQuiz {
      activity
      type
    }
  }
`;
export { getQuizQuery };

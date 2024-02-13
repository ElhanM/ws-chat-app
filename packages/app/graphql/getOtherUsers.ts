import { gql } from "@apollo/client";

export const GET_OTHER_USERS = gql`
  query {
    otherUsers {
      id
      username
    }
  }
`;

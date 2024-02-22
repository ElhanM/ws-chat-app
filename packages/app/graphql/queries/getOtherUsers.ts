import { gql } from "@apollo/client";

export const GET_OTHER_USERS = gql`
  query GetOtherUsers($skip: Int, $take: Int) {
    otherUsers(skip: $skip, take: $take) {
      id
      username
    }
  }
`;

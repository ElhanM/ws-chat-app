import { gql } from "@apollo/client";

export const GET_OTHER_USERS = gql`
  query GetOtherUsers($skip: Int, $take: Int, $searchTerm: String) {
    otherUsers(skip: $skip, take: $take, searchTerm: $searchTerm) {
      id
      username
    }
  }
`;

import { gql } from "@apollo/client";

export const GET_CHATS_BETWEEN_USERS = gql`
  query GetChatsBetweenUsers(
    $senderId: String!
    $receiverId: String!
    $skip: Int
    $take: Int
  ) {
    chatsBetweenUsers(
      senderId: $senderId
      receiverId: $receiverId
      skip: $skip
      take: $take
    ) {
      id
      content
      senderId
      receiverId
      createdAt
      updatedAt
    }
  }
`;

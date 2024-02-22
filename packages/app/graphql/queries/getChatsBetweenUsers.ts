import { gql } from "@apollo/client";

export const GET_CHATS_BETWEEN_USERS = gql`
  query GetChatsBetweenUsers($senderId: String!, $receiverId: String!) {
    chatsBetweenUsers(senderId: $senderId, receiverId: $receiverId) {
      id
      content
      senderId
      receiverId
      createdAt
      updatedAt
    }
  }
`;

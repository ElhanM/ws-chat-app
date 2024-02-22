import { gql } from "@apollo/client";
import { USER_DETAILS } from "../fragments/userDetailsFragment";

export const GET_CHATS_WITH_LATEST_MESSAGE = gql`
  ${USER_DETAILS}
  query GetChatsWithLatestMessage($skip: Int, $take: Int) {
    chatsWithLatestMessage(skip: $skip, take: $take) {
      id
      createdAt
      updatedAt
      content
      senderId
      receiverId
      sender {
        ...UserDetails
      }
      receiver {
        ...UserDetails
      }
    }
  }
`;

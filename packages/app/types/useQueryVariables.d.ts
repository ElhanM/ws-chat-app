export interface UseQueryVariables {
  skip: number;
  take: number;
}

export interface ChatsBetweenUsersQueryVariables extends UseQueryVariables {
  senderId: string;
  receiverId: string;
}

export type User = {
  id: string;
  username: string;
};

export type UserWithTimestamps = User & {
  createdAt: Date;
  updatedAt: Date;
};

export type AuthUser = User & {
  accessToken: string;
};

export type NewMessage = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  content: string;
  senderId: string;
  receiverId: string;
};

export type LatestChat = NewMessage & {
  sender: UserWithTimestamps;
  receiver: UserWithTimestamps;
};

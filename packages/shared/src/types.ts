export type User = {
  id: string;
  username: string;
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

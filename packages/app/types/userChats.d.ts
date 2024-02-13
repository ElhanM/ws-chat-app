import { User } from "@ws-chat-app/shared";

export type UserChats = User & {
  message: string;
  avatar: string;
};

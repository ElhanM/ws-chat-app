import { User } from "@ws-chat-app/shared";

export type UserChat = User & {
  message: string;
  avatar: string;
};

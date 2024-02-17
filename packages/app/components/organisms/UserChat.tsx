// File: components/UserChat.tsx
import React from "react";
import Image from "next/image";
import { UserChats } from "@/types/userChats";

interface UserChatProps {
  userChat: UserChats;
  index: number;
}

const UserChat: React.FC<UserChatProps> = ({ userChat, index }) => (
  <div
    key={index}
    className={`flex items-center mb-4 cursor-pointer hover:bg-chat-hover p-2 rounded-md
    ${index === 0 && "bg-selected-chat hover:bg-selected-chat"}
    `}
  >
    <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
      <Image
        src={userChat.avatar}
        alt="User Avatar"
        className="w-12 h-12 rounded-full"
        width={48}
        height={48}
      />
    </div>
    <div className="flex-1">
      <h2 className="text-lg font-semibold">{userChat.username}</h2>
      <p className="text-pale-text">{userChat.message}</p>
    </div>
  </div>
);

export default UserChat;

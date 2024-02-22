import React from "react";
import Image from "next/image";
import { UserChat } from "@/types/userChat";
import { useAppSelector } from "@/lib/hooks";
import { useDispatch } from "react-redux";
import { setSelectedUser } from "@/lib/features/users/selectedUserSlice";
interface UserChatProps {
  userId: string;
  modal?: boolean;
}

const UserChat: React.FC<UserChatProps> = ({ userId, modal = false }) => {
  const dispatch = useDispatch();
  const selectedUserId = useAppSelector((state) => state.selectedUser.userId);
  const user = useAppSelector((state) => state.users.entities[userId]);

  const userChat: UserChat = {
    ...user,
    message: "Hey there!",
    avatar: "https://placehold.co/200x/8eafff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato",
  };

  return (
    <div
      key={userId}
      className={`flex items-center mb-4 cursor-pointer hover:bg-chat-hover p-2 rounded-md
    ${userId === selectedUserId && !modal && "bg-selected-chat hover:bg-selected-chat"}
    `}
      onClick={() => dispatch(setSelectedUser(userId))}
    >
      <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
        <Image
          src={userChat.avatar}
          alt={userChat.username}
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
};

export default UserChat;

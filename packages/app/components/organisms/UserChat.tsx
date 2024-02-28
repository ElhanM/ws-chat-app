import { selectChatUserById } from "@/lib/features/users/chatUsersSlice";
import { setSelectedUser } from "@/lib/features/users/selectedUserSlice";
import { useAppSelector } from "@/lib/hooks";
import { UserChat as UserChatType } from "@/types/userChat";
import Image from "next/image";
import React from "react";
import { useDispatch } from "react-redux";

interface UserChatProps {
  userId?: string;
  chatUserId?: string;
  modal?: boolean;
}

const UserChat: React.FC<UserChatProps> = ({
  userId,
  chatUserId,
  modal = false,
}) => {
  const dispatch = useDispatch();
  const selectedUserId = useAppSelector((state) => state.selectedUser.userId);
  const user = useAppSelector((state) => state.users.entities[userId ?? ""]);
  const chatUser = useAppSelector((state) =>
    selectChatUserById(state, chatUserId ?? "")
  );
  const { currentUser } = useAppSelector((state) => state.currentUser);

  let userChat: UserChatType;

  let conditionalUserId: string;

  if (userId) {
    conditionalUserId = userId;
    userChat = {
      ...user,
      message: "Hey there!",
      avatar:
        "https://placehold.co/200x/8eafff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato",
    };
  } else if (chatUserId) {
    const isSenderOrReceiver =
      currentUser?.id === chatUser.senderId ? "receiver" : "sender";

    conditionalUserId = chatUser[isSenderOrReceiver].id;

    userChat = {
      ...chatUser[isSenderOrReceiver],
      message: chatUser.content,
      avatar:
        "https://placehold.co/200x/8eafff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato",
    };
  } else {
    throw new Error("You must provide either userId or chatUserId");
  }

  return (
    <div
      key={userId}
      className={`flex items-center mb-4 cursor-pointer 
      ${modal ? "hover:bg-lighter-black" : "hover:bg-chat-hover"}
      r p-2 rounded-md
    ${conditionalUserId === selectedUserId && (!modal ? "bg-selected-chat hover:bg-selected-chat" : "bg-black hover:bg-black")}
    `}
      onClick={() => dispatch(setSelectedUser(conditionalUserId))}
    >
      <div className="w-12 h-12 bg-gray-300 rounded-full mr-3 flex-shrink-0">
        <Image
          src={userChat.avatar}
          alt={userChat.username}
          className="w-12 h-12 rounded-full"
          width={48}
          height={48}
        />
      </div>
      <div className="flex-1 max-w-[80%]">
        <h2 className="text-lg font-semibold overflow-hidden whitespace-nowrap lg:w-[90%] md:w-[80%] w-[100%]">
          {userChat.username}
        </h2>
        {!userId ? (
          <p className="text-pale-text overflow-hidden whitespace-nowrap lg:w-[90%] md:w-[80%] w-[100%]">
            {userChat.message}
          </p>
        ) : null}
      </div>
    </div>
  );
};

export default UserChat;

"use client";
import Image from "next/image";
import React from "react";
import NewChatIcon from "../atoms/NewChatIcon";
import { useAppSelector } from "@/lib/hooks";
import useQuery from "@/hooks/useCustomQuery";
import { GET_OTHER_USERS } from "@/graphql/getOtherUsers";
import { User } from "@ws-chat-app/shared";
import { UserChats } from "@/types/userChats";

type Props = {};

const Sidebar = ({}: Props) => {
  const { loading, error, data, refetch } = useQuery(GET_OTHER_USERS);

  const { currentUser } = useAppSelector((state) => state.currentUser);

  if (loading)
    return <div className="w-1/4 border border-pale">Loading...</div>;
  if (error) return <p>Error: {error.message}</p>;

  const userChats: UserChats[] = data?.otherUsers.map((user: User) => ({
    ...user,
    message: "Hey there!",
    avatar: "https://placehold.co/200x/8eafff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato",
  }));

  console.log({ userChats });

  console.log({ currentUser });

  return (
    <>
      {/* Sidebar */}
      <div className="w-1/4 border border-pale">
        {/* Sidebar Header */}
        <header className="p-4  flex justify-between items-center bg-black text-white">
          <h1 className="text-2xl font-semibold">
            {currentUser?.username ?? "Loading..."}
          </h1>
          <NewChatIcon />
        </header>

        {/* UserChats List */}
        <div className="overflow-y-auto h-screen p-3 mb-9 pb-20 bg-black">
          <h1 className="text-xl font-semibold mb-2">Messages</h1>
          {userChats.map((userChats, index) => (
            <div
              key={index}
              className={`flex items-center mb-4 cursor-pointer hover:bg-chat-hover p-2 rounded-md
              ${index === 0 && "bg-selected-chat hover:bg-selected-chat"}
              `}
            >
              <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
                <Image
                  src={userChats.avatar}
                  alt="User Avatar"
                  className="w-12 h-12 rounded-full"
                  width={48}
                  height={48}
                />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold">{userChats.username}</h2>
                <p className="text-pale-text">{userChats.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;

"use client";
import { User } from "@ws-chat-app/shared";
import Loader from "../atoms/Loader";
import Logout from "../atoms/Logout";
import SidebarIcon from "../atoms/SidebarIcon";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectShowSidebar,
  toggleSidebar,
} from "@/lib/features/layout/sidebarSlice";

type Props = {
  isGetChatsWithLatestMessageLoading: boolean;
  user: User | null;
};

export const ChatHeader = ({
  isGetChatsWithLatestMessageLoading,
  user,
}: Props) => {
  const dispatch = useDispatch();

  return (
    <header className="p-4 bg-black text-gray-200 border border-pale border-l-0 flex-center justify-between">
      <div className="flex-center">
        <button
          onClick={() => dispatch(toggleSidebar(true))}
          className="md:hidden md:mr-0 block mr-2
        "
        >
          <SidebarIcon />
        </button>
        <h1 className="text-2xl font-semibold bg-black">
          {isGetChatsWithLatestMessageLoading ? (
            <Loader flexStart small />
          ) : (
            user?.username ?? "No Chat Selected"
          )}
        </h1>
      </div>
      <Logout />
    </header>
  );
};

"use client";
import { useAppSelector } from "@/lib/hooks";
import { NewMessage } from "@ws-chat-app/shared";
import Image from "next/image";
import React from "react";

type Props = {
  message: NewMessage;
};

const ChatMessage = ({ message }: Props) => {
  const { currentUser } = useAppSelector((state) => state.currentUser);
  const isIncoming = message.senderId !== currentUser?.id;

  return (
    <div
      className={`flex mb-4 cursor-pointer ${isIncoming ? "" : "flex-row-reverse"}`}
    >
      <div className="w-9 h-9 rounded-full flex items-center justify-center mx-2">
        <Image
          src={
            "https://placehold.co/200x/8eafff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
          }
          alt="User Avatar"
          className="w-8 h-8 rounded-full"
          width={36}
          height={36}
        />
      </div>
      <div
        className={`flex max-w-96 rounded-lg p-3 gap-3 ${isIncoming ? "bg-incoming-message" : "bg-sent-message"}`}
      >
        <p className="text-white">{message.content}</p>{" "}
      </div>
    </div>
  );
};

export default ChatMessage;

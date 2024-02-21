import React from "react";
import ChatMessage from "./ChatMessage";
import { Message } from "@/types/message";
import Image from "next/image";
import { NewMessage } from "@ws-chat-app/shared";

type Props = {
  messages: NewMessage[];
};

const ChatMessages = ({ messages }: Props) => {
  return (
    <div className="h-screen overflow-y-auto p-4 pb-36">
      {messages.map((message, index) => (
        <ChatMessage key={index} message={message} />
      ))}
    </div>
  );
};

export default ChatMessages;

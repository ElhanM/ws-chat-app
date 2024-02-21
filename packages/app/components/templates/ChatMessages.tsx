import React from "react";
import ChatMessage from "./ChatMessage";
import { Message } from "@/types/message";
import Image from "next/image";

type Props = {
  tempMessages: Message[];
  messages: string[];
};

const ChatMessages = ({ tempMessages, messages }: Props) => {
  return (
    <div className="h-screen overflow-y-auto p-4 pb-36">
      {tempMessages.map((message, index) => (
        <ChatMessage
          key={index}
          message={message}
          isIncoming={message.incoming}
        />
      ))}
      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex mb-4 cursor-pointer flex-row-reverse`}
        >
          <div className="w-9 h-9 rounded-full flex items-center justify-center mx-2">
            <Image
              src={
                "https://placehold.co/200x/ad922e/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
              }
              alt="User Avatar"
              className="w-8 h-8 rounded-full"
              width={36}
              height={36}
            />
          </div>
          <div className={`flex max-w-96 rounded-lg p-3 gap-3 bg-sent-message`}>
            <p className="text-white">{message}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatMessages;

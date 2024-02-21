"use client";
import React, { useEffect, useRef } from "react";
import { NewMessage } from "@ws-chat-app/shared";
import ChatMessage from "./ChatMessage";

type Props = {
  messages: NewMessage[];
};

const ChatMessages = ({ messages }: Props) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scroll({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <div className="h-full overflow-y-auto p-4" ref={containerRef}>
      {messages.map((message, index) => (
        <ChatMessage key={index} message={message} />
      ))}
    </div>
  );
};

export default ChatMessages;

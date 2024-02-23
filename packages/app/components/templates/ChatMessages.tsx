"use client";
import React, { useEffect, useRef } from "react";
import { NewMessage } from "@ws-chat-app/shared";
import ChatMessage from "./ChatMessage";
import Loader from "../atoms/Loader";

type Props = {
  messages: NewMessage[];
  loading: boolean;
};

const ChatMessages = ({ messages, loading }: Props) => {
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
    <div
      className={`h-full overflow-y-auto p-4 scrollbar
    ${loading && "flex items-center justify-center"}
    `}
      ref={containerRef}
    >
      {loading && <Loader />}
      {messages.map((message, index) => (
        <ChatMessage key={index} message={message} />
      ))}
    </div>
  );
};

export default ChatMessages;

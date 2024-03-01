"use client";
import React, { MutableRefObject, useEffect, useRef } from "react";
import { NewMessage } from "@ws-chat-app/shared";
import ChatMessage from "./ChatMessage";
import Loader from "../atoms/Loader";

type Props = {
  messages: NewMessage[];
  wsMessages: NewMessage[];
  loading: boolean;
  scrollableDivRef: MutableRefObject<HTMLDivElement | null>;
  isFetching: boolean;
};

const ChatMessages = ({
  messages,
  loading,
  scrollableDivRef,
  wsMessages,
  isFetching,
}: Props) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const setRefs = (node: HTMLDivElement) => {
    // Refs are 'nullable' so we check that they're not null before assigning the value.
    if (scrollableDivRef) {
      scrollableDivRef.current = node;
    }
    containerRef.current = node;
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scroll({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [wsMessages, loading]);

  return (
    <div
      className={`h-full overflow-y-auto p-4 scrollbar ${loading && "flex items-center justify-center"}
      flex flex-col-reverse`}
      ref={setRefs}
    >
      {messages.map((message) => (
        <ChatMessage key={message.id} message={message} />
      ))}
      {(loading || isFetching) && <Loader />}
    </div>
  );
};

export default ChatMessages;

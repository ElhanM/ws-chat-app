"use client";
import { useAppSelector } from "@/lib/hooks";
import { Message } from "@/types/message";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Loader from "../atoms/Loader";
import io, { Socket } from "socket.io-client";
import { getTokenFromLocalStorage } from "@/utils/localStorage";
import ChatInput from "../molecules/ChatInput";
import { ChatHeader } from "../organisms/ChatHeader";
import ChatMessages from "./ChatMessages";
import { NewMessage } from "@ws-chat-app/shared";

type Props = {};

const MainChatArea = ({}: Props) => {
  const [messages, setMessages] = useState<NewMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const socketRef = useRef<Socket | null>(null);

  const { currentUser } = useAppSelector((state) => state.currentUser);
  const selectedUserId = useAppSelector((state) => state.selectedUser.userId)!;
  const user = useAppSelector((state) => state.users.entities[selectedUserId]);
  const isGetOtherUsersLoading = useAppSelector(
    (state) => state.loading.GET_OTHER_USERS
  );

  useEffect(() => {
    setMessages([]);
  }, [selectedUserId]);

  useEffect(() => {
    const token = getTokenFromLocalStorage();

    const socket = io(process.env.NEXT_PUBLIC_WS_URL ?? "", {
      auth: {
        token,
      },
      // https://stackoverflow.com/questions/72765760/why-do-i-get-a-this-cors-error-from-using-socket-io
      transports: ["websocket"],
    });

    socket.on("new_message", (message: NewMessage) => {
      if (
        message.senderId === currentUser?.id ||
        message.receiverId === currentUser?.id ||
        message.senderId === selectedUserId ||
        message.receiverId === selectedUserId
      ) {
        setMessages((messages) => [...messages, message]);
      }
    });

    socketRef.current = socket;

    // something probably rerenders this component
    // which causes this return function to be called unexpectedly
    // because we want this function to only be called when the component is unmounted
    // we will use this JavaScript approach to disconnect the socket
    return () => {
      socket.disconnect();
    };
  }, [currentUser, selectedUserId]);

  const sendMessage = () => {
    if (socketRef.current) {
      socketRef.current.emit("send_message", {
        message: newMessage,
        senderId: currentUser?.id,
        receiverId: selectedUserId,
      });
      setNewMessage("");
    }
  };

  return (
    <>
      <div className="flex-1 bg-black">
        <ChatHeader
          isGetOtherUsersLoading={isGetOtherUsersLoading}
          user={user}
        />
        <ChatMessages messages={messages} />
        <ChatInput
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          sendMessage={sendMessage}
        />
      </div>
    </>
  );
};

export default MainChatArea;

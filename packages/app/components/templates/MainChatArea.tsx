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

type Props = {};

const MainChatArea = ({}: Props) => {
  const [messages, setMessages] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const socketRef = useRef<Socket | null>(null);

  const selectedUserId = useAppSelector((state) => state.selectedUser.userId)!;
  const user = useAppSelector((state) => state.users.entities[selectedUserId]);
  const isGetOtherUsersLoading = useAppSelector(
    (state) => state.loading.GET_OTHER_USERS
  );

  useEffect(() => {
    const token = getTokenFromLocalStorage();

    const socket = io(process.env.NEXT_PUBLIC_WS_URL ?? "", {
      auth: {
        token,
      },
      // https://stackoverflow.com/questions/72765760/why-do-i-get-a-this-cors-error-from-using-socket-io
      transports: ["websocket"],
    });

    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });

    socketRef.current = socket;

    // something probably rerenders this component
    // which causes this return function to be called unexpectedly
    // because we want this function to only be called when the component is unmounted
    // we will use this JavaScript approach to disconnect the socket
    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (socketRef.current) {
      socketRef.current.emit("message", newMessage);
      setNewMessage("");
    }
  };

  const tempMessages: Message[] = [
    {
      text: "Hey Bob, how's it going?",
      sender: "Alice",
      avatar:
        "https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato",
      incoming: true,
    },
    {
      text: "Hey Alice, I'm doing great! How about you?",
      sender: "Bob",
      avatar:
        "https://placehold.co/200x/ad922e/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato",
      incoming: false,
    },
    {
      text: "I'm doing good too. Thanks for asking!",
      sender: "Alice",
      avatar:
        "https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato",
      incoming: true,
    },
  ];

  useEffect(() => {
    console.log({ messages });
  }, [messages]);

  return (
    <>
      <div className="flex-1 bg-black">
        <ChatHeader
          isGetOtherUsersLoading={isGetOtherUsersLoading}
          user={user}
        />
        <ChatMessages messages={messages} tempMessages={tempMessages} />
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

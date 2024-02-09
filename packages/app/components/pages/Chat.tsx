"use client";
import { getTokenFromLocalStorage } from "@/utils/localStorage";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const Chats = () => {
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const token = getTokenFromLocalStorage();
    console.log({ token });

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

    const executeOnClose = () => {
      socket.disconnect();
    };

    window.addEventListener("beforeunload", executeOnClose);

    return () => {
      window.removeEventListener("beforeunload", executeOnClose);
    };
  }, []);

  return (
    <div className="flex flex-col space-y-4 p-4">
      {messages.map((message, index) => (
        <div
          key={index}
          className="flex items-center justify-start bg-blue-500 text-white p-2 rounded-md"
        >
          <p>{message}</p>
        </div>
      ))}
    </div>
  );
};

export default Chats;

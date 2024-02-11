"use client";
import { getTokenFromLocalStorage } from "@/utils/localStorage";
import React, { useEffect, useState, useRef } from "react";
import io, { Socket } from "socket.io-client";

const ChatDemo = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const socketRef = useRef<Socket | null>(null);

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

    socketRef.current = socket;

    // something probably rerenders this component
    // which causes this return function to be called unexpectedly
    // because we want this function to only be called when the component is unmounted
    // we will use this JavaScript approach to disconnect the socket
    return () => {
      window.removeEventListener("beforeunload", executeOnClose);
    };
  }, []);

  const sendMessage = () => {
    if (socketRef.current) {
      socketRef.current.emit("message", newMessage);
      setNewMessage("");
    }
  };

  return (
    <div className="flex flex-col space-y-4 p-4">
      <h1 className="text-2xl font-bold mb-4">ChatDemo</h1>
      {messages.map((message, index) => (
        <div
          key={index}
          className="flex items-center justify-start bg-blue-500 text-white p-2 rounded-md"
        >
          <p>{message}</p>
        </div>
      ))}
      <div className="mt-4">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="peer w-full bg-transparent text-white font-sans font-normal outline-none focus:outline-none disabled:bg-gray-800 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-600 placeholder-shown:border-t-gray-600 border text-sm px-3 py-2.5 rounded-md border-gray-700 focus:border-gray-400"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white p-2 rounded mt-2"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatDemo;

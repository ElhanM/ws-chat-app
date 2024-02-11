import { Message } from "@/types/message";
import Image from "next/image";
import React from "react";

type Props = {
  messages: Message[];
};

const MainChatArea = ({ messages }: Props) => {
  return (
    <>
      {/* Main Chat Area */}
      <div className="flex-1 dark:bg-gray-900">
        {/* Chat Header */}
        <header className="bg-white p-4 text-gray-700 dark:bg-gray-800 dark:text-gray-200">
          <h1 className="text-2xl font-semibold">Alice</h1>
        </header>

        {/* Chat Messages */}
        <div className="h-screen overflow-y-auto p-4 pb-36">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex mb-4 cursor-pointer ${message.incoming ? "" : "justify-end"}
      `}
            >
              {message.incoming && (
                <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
                  <Image
                    src={message.avatar}
                    alt="User Avatar"
                    className="w-8 h-8 rounded-full"
                    width={36}
                    height={36}
                  />
                </div>
              )}
              <div className="flex max-w-96 bg-white rounded-lg p-3 gap-3">
                <p className="text-gray-700">{message.text}</p>
              </div>
              {!message.incoming && (
                <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
                  <Image
                    src={message.avatar}
                    alt="User Avatar"
                    className="w-8 h-8 rounded-full"
                    width={36}
                    height={36}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Chat Input */}
        <footer className="bg-white border-t border-gray-300 p-4 absolute bottom-0 w-3/4 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Type a message..."
              className="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:focus:border-blue-500"
            />
            <button className="bg-indigo-500 text-white px-4 py-2 rounded-md ml-2 dark:bg-indigo-400">
              Send
            </button>
          </div>
        </footer>
      </div>
    </>
  );
};

export default MainChatArea;

import { Message } from "@/types/message";
import Image from "next/image";
import React from "react";

type Props = {};

const MainChatArea = ({}: Props) => {
  const messages: Message[] = [
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

  return (
    <>
      {/* Main Chat Area */}
      <div className="flex-1 bg-black">
        {/* Chat Header */}
        <header className="p-4 bg-black text-gray-200 border border-pale border-l-0">
          <h1 className="text-2xl font-semibold bg-black">Alice</h1>
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
              <div
                className={`flex max-w-96 rounded-lg p-3 gap-3 ${message.incoming ? "bg-incoming-message" : "bg-sent-message"}`}
              >
                <p className="text-white">{message.text}</p>
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
        <footer className="p-4 absolute bottom-0 w-3/4 border border-pale bg-black border-l-0">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Type a message..."
              className="w-full p-2 border focus:outline-none text-gray-200 border-gray-600 bg-black rounded-2xl"
            />
            <button className="px-4 py-2 rounded-md ml-2 text-send-button bg-black font-semibold hover:text-white">
              Send
            </button>
          </div>
        </footer>
      </div>
    </>
  );
};

export default MainChatArea;

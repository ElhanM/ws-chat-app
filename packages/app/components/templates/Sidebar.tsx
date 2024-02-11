import { Contact } from "@/types/contact";
import Image from "next/image";
import React from "react";
import NewChatIcon from "../atoms/NewChatIcon";

type Props = {
  contacts: Contact[];
  setIsMenuOpen: (value: boolean) => void;
  isMenuOpen: boolean;
};

const Sidebar = ({ contacts, setIsMenuOpen, isMenuOpen }: Props) => {
  // Function to toggle the menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* Sidebar */}
      <div className="w-1/4 border border-pale">
        {/* Sidebar Header */}
        <header className="p-4  flex justify-between items-center bg-black text-white">
          <h1 className="text-2xl font-semibold">username</h1>
          <NewChatIcon />
        </header>

        {/* Contact List */}
        <div className="overflow-y-auto h-screen p-3 mb-9 pb-20 bg-black">
          <h1 className="text-xl font-semibold mb-2">Messages</h1>
          {contacts.map((contact, index) => (
            <div
              key={index}
              className={`flex items-center mb-4 cursor-pointer hover:bg-chat-hover p-2 rounded-md
              ${index === 0 && "bg-selected-chat"}
              `}
            >
              <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
                <Image
                  src={contact.avatar}
                  alt="User Avatar"
                  className="w-12 h-12 rounded-full"
                  width={48}
                  height={48}
                />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold">{contact.name}</h2>
                <p className="text-pale-text">{contact.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;

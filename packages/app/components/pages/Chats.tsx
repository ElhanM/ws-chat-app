"use client";
import Image from "next/image";
import React, { useState } from "react";

const Chats = () => {
  // State for showing/hiding the menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // State for contacts
  const [contacts, setContacts] = useState([
    {
      name: "Alice",
      message: "Hoorayy!!",
      avatar:
        "https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato",
    },
    {
      name: "Martin",
      message: "That pizza place was amazing! We should go again sometime. 🍕",
      avatar:
        "https://placehold.co/200x/ad922e/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato",
    },
  ]);

  const messages = [
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

  // Function to toggle the menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Function to close the menu if clicked outside
  const handleClickOutsideMenu = (e: MouseEvent) => {
    const target = e.target as Element;
    if (
      target &&
      !target.closest("#menuDropdown") &&
      !target.closest("#menuButton")
    ) {
      setIsMenuOpen(false);
    }
  };

  // Adding event listener for click outside menu
  React.useEffect(() => {
    document.addEventListener("click", handleClickOutsideMenu);
    return () => {
      document.removeEventListener("click", handleClickOutsideMenu);
    };
  }, []);

  return (
    <div className="flex h-screen overflow-hidden dark:bg-gray-800">
      {/* Sidebar */}
      <div className="w-1/4 bg-white border-r border-gray-300 dark:bg-gray-900 dark:border-gray-600">
        {/* Sidebar Header */}
        <header className="p-4 border-b border-gray-300 flex justify-between items-center bg-indigo-600 text-white dark:border-gray-700">
          <h1 className="text-2xl font-semibold">Chat Web</h1>
          <div className="relative">
            <button
              id="menuButton"
              className="focus:outline-none"
              onClick={toggleMenu}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-100"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path d="M2 10a2 2 0 012-2h12a2 2 0 012 2 2 2 0 01-2 2H4a2 2 0 01-2-2z" />
              </svg>
            </button>
            {/* Menu Dropdown */}
            <div
              id="menuDropdown"
              className={`absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg ${isMenuOpen ? "" : "hidden"} dark:bg-gray-900 dark:border-gray-600`}
            >
              <ul className="py-2 px-3">
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-800 hover:text-gray-400 dark:text-gray-200 dark:hover:text-gray-500"
                  >
                    Option 1
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-800 hover:text-gray-400 dark:text-gray-200 dark:hover:text-gray-500"
                  >
                    Option 2
                  </a>
                </li>
                {/* Add more menu options here */}
              </ul>
            </div>
          </div>
        </header>

        {/* Contact List */}
        <div className="overflow-y-auto h-screen p-3 mb-9 pb-20">
          {contacts.map((contact, index) => (
            <div
              key={index}
              className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md"
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
                <p className="text-gray-600">{contact.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

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
    </div>
  );
};

export default Chats;

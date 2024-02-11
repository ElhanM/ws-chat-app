"use client";
import React, { useState } from "react";
import MainChatArea from "../templates/MainChatArea";
import Sidebar from "../templates/Sidebar";

const Chats = () => {
  // State for showing/hiding the menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // State for contacts
  const contacts = [
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
  ];

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
      <Sidebar
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        contacts={contacts}
      />

      <MainChatArea messages={messages} />
    </div>
  );
};

export default Chats;

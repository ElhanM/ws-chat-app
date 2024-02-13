import React from "react";
import MainChatArea from "../templates/MainChatArea";
import Sidebar from "../templates/Sidebar";

const Chats = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-black">
      <Sidebar />
      <MainChatArea />
    </div>
  );
};

export default Chats;

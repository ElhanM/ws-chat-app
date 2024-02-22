import { triggerRefetch } from "@/lib/features/queries/refetchSlice";
import React from "react";
import { useDispatch } from "react-redux";

type Props = {
  newMessage: string;
  setNewMessage: (newMessage: string) => void;
  sendMessage: () => void;
};

const ChatInput = ({ newMessage, setNewMessage, sendMessage }: Props) => {
  const dispatch = useDispatch();

  const handleRefetch = () => {
    dispatch(triggerRefetch({ queryName: "GET_CHATS_WITH_LATEST_MESSAGE" }));
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        sendMessage();
        handleRefetch();
      }}
    >
      <footer className="p-4 bottom-0 border border-pale bg-black border-l-0 w-full">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Type a message..."
            className="w-full p-2 border focus:outline-none text-gray-200 border-gray-600 bg-black rounded-2xl"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button
            className="px-4 py-2 rounded-md ml-2 text-send-button bg-black font-semibold hover:text-white"
            type="submit"
          >
            Send
          </button>
        </div>
      </footer>
    </form>
  );
};

export default ChatInput;

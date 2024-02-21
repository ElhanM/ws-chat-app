import React from "react";

type Props = {
  newMessage: string;
  setNewMessage: (newMessage: string) => void;
  sendMessage: () => void;
};

const ChatInput = ({ newMessage, setNewMessage, sendMessage }: Props) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        sendMessage();
      }}
    >
      <footer className="p-4 absolute bottom-0 w-3/4 border border-pale bg-black border-l-0">
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

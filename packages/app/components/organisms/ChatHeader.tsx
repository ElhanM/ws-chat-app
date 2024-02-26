import { User } from "@ws-chat-app/shared";
import Loader from "../atoms/Loader";
import Logout from "../atoms/Logout";

type Props = {
  isGetChatsWithLatestMessageLoading: boolean;
  user: User | null;
};

export const ChatHeader = ({
  isGetChatsWithLatestMessageLoading,
  user,
}: Props) => (
  <header className="p-4 bg-black text-gray-200 border border-pale border-l-0 flex-center justify-between">
    <h1 className="text-2xl font-semibold bg-black">
      {isGetChatsWithLatestMessageLoading ? (
        <Loader flexStart small />
      ) : (
        user?.username ?? "No Chat Selected"
      )}
    </h1>
    <Logout />
  </header>
);

import { User } from "@ws-chat-app/shared";
import Loader from "../atoms/Loader";

type Props = {
  isGetOtherUsersLoading: boolean;
  user: User | null;
};

export const ChatHeader = ({ isGetOtherUsersLoading, user }: Props) => (
  <header className="p-4 bg-black text-gray-200 border border-pale border-l-0">
    <h1 className="text-2xl font-semibold bg-black">
      {isGetOtherUsersLoading ? (
        <Loader flexStart small />
      ) : (
        user?.username ?? "No Chat Selected"
      )}
    </h1>
  </header>
);

"use client";
import { GET_OTHER_USERS } from "@/graphql/getOtherUsers";
import useQuery from "@/hooks/useCustomQuery";
import useScrollFetch from "@/hooks/useScrollFetch";
import { useAppSelector } from "@/lib/hooks";
import { UserChats } from "@/types/userChats";
import { User } from "@ws-chat-app/shared";
import Error from "../atoms/Error";
import Loader from "../atoms/Loader";
import NewChatIcon from "../atoms/NewChatIcon";
import SidebarComponentWrapper from "../molecules/SidebarComponentWrapper";
import UserChat from "../organisms/UserChat";

const Sidebar = () => {
  const { loading, error, data, fetchMore } = useQuery(GET_OTHER_USERS, {
    variables: { skip: 0, take: 15 },
  });

  const { currentUser } = useAppSelector((state) => state.currentUser);

  const { isFetching, setIsFetching, scrollableDivRef } = useScrollFetch(
    fetchMore,
    data?.otherUsers.length
  );

  const userChats: UserChats[] = data?.otherUsers.map((user: User) => ({
    ...user,
    message: "Hey there!",
    avatar: "https://placehold.co/200x/8eafff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato",
  }));

  if (loading)
    return (
      <SidebarComponentWrapper>
        <Loader />
      </SidebarComponentWrapper>
    );
  if (error)
    return (
      <SidebarComponentWrapper>
        <Error message={error.message} />
      </SidebarComponentWrapper>
    );

  return (
    <div className="w-1/4 border border-pale">
      {/* Sidebar Header */}
      <header className="p-4  flex justify-between items-center bg-black text-white">
        <h1 className="text-2xl font-semibold">
          {currentUser?.username ?? <Loader />}
        </h1>
        <NewChatIcon />
      </header>

      {/* UserChats List */}
      <div
        ref={scrollableDivRef}
        className="overflow-y-auto h-screen p-3 mb-9 pb-20 bg-black"
      >
        <h1 className="text-xl font-semibold mb-2">Messages</h1>
        {userChats.map((userChat, index) => (
          <UserChat userChat={userChat} index={index} key={index} /> // use separate component for rendering each user chat
        ))}
        {isFetching && <Loader />}
      </div>
    </div>
  );
};

export default Sidebar;

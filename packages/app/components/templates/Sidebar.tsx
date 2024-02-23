"use client";
import { GET_CHATS_WITH_LATEST_MESSAGE } from "@/graphql/queries/getChatsWithLatestMessage";
import useQuery from "@/hooks/useCustomQuery";
import useScrollFetch from "@/hooks/useScrollFetch";
import { setLoading } from "@/lib/features/queries/loadingSlice";
import {
  selectChatUserIds,
  setChatUsers,
} from "@/lib/features/users/chatUsersSlice";
import { setSelectedUser } from "@/lib/features/users/selectedUserSlice";
import { useAppSelector } from "@/lib/hooks";
import { UseQueryVariables } from "@/types/useQueryVariables";
import { LatestChat } from "@ws-chat-app/shared";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Error from "../atoms/Error";
import Loader from "../atoms/Loader";
import NewChatIcon from "../atoms/NewChatIcon";
import SidebarComponentWrapper from "../molecules/SidebarComponentWrapper";
import NewChatModal from "../organisms/NewChatModal";
import UserChat from "../organisms/UserChat";
import { RootState } from "@/lib/store";
import { triggerRefetch } from "@/lib/features/queries/refetchSlice";

interface LatestChatData {
  chatsWithLatestMessage: LatestChat[];
}

const Sidebar = () => {
  const dispatch = useDispatch();
  const selectedUserId = useAppSelector((state) => state.selectedUser.userId);
  const { currentUser } = useAppSelector((state) => state.currentUser);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const shouldRefetch = useSelector(
    (state: RootState) => state.refetch["GET_CHATS_WITH_LATEST_MESSAGE"]
  );

  const { loading, error, data, fetchMore, refetch } = useQuery<LatestChatData>(
    GET_CHATS_WITH_LATEST_MESSAGE,
    {
      variables: { skip: 0, take: 15 },
    }
  );

  useEffect(() => {
    if (shouldRefetch) {
      // refetch does not trigger the loading state
      refetch().then(() => {
        // Scroll to the top after refetching
        if (scrollableDivRef.current) {
          scrollableDivRef.current.scrollTo(0, 0);
        }
      });
      // Reset the refetch state for the query after fetching
      dispatch(triggerRefetch({ queryName: "GET_CHATS_WITH_LATEST_MESSAGE" }));
    }
  }, [shouldRefetch]);

  useEffect(() => {
    dispatch(
      setLoading({
        queryName: "GET_CHATS_WITH_LATEST_MESSAGE",
        isLoading: loading,
      })
    );
  }, [loading, dispatch]);

  useEffect(() => {
    if (data?.chatsWithLatestMessage) {
      dispatch(setChatUsers(data.chatsWithLatestMessage));
    }

    if (!selectedUserId && data?.chatsWithLatestMessage.length) {
      const chat = data.chatsWithLatestMessage[0];
      const userId =
        chat.receiverId === currentUser?.id ? chat.senderId : chat.receiverId;
      dispatch(setSelectedUser(userId));
    }
  }, [data, dispatch]);

  const chatUserIds = useAppSelector(selectChatUserIds);

  const { isFetching, scrollableDivRef } = useScrollFetch<
    LatestChatData,
    UseQueryVariables
  >(
    fetchMore,
    data?.chatsWithLatestMessage.length ?? 0,
    "chatsWithLatestMessage",
    (dataLength) => ({
      skip: dataLength,
      take: 15,
    })
  );

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
    <SidebarComponentWrapper noFlex>
      <NewChatModal isModalOpen={isModalOpen} toggleModal={toggleModal} />
      {/* Sidebar Header */}
      <header className="p-4  flex justify-between items-center bg-black text-white">
        <h1 className="text-2xl font-semibold">
          {currentUser?.username ?? <Loader />}
        </h1>
        <button onClick={() => toggleModal()}>
          <NewChatIcon />
        </button>
      </header>

      {/* UserChat List */}
      <div
        ref={scrollableDivRef}
        className="overflow-y-auto h-screen p-3 mb-9 pb-20 bg-black scrollbar"
      >
        <h1 className="text-xl font-semibold mb-2">Messages</h1>
        {chatUserIds.map((chatUserId) => (
          <UserChat chatUserId={chatUserId} key={chatUserId} />
        ))}
        {isFetching && <Loader />}
      </div>
    </SidebarComponentWrapper>
  );
};

export default Sidebar;

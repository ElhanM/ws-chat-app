"use client";
import { GET_CHATS_BETWEEN_USERS } from "@/graphql/queries/getChatsBetweenUsers";
import useQuery from "@/hooks/useCustomQuery";
import { useAppSelector } from "@/lib/hooks";
import { getTokenFromLocalStorage } from "@/utils/localStorage";
import { NewMessage, User } from "@ws-chat-app/shared";
import { useEffect, useRef, useState } from "react";
import io, { Socket } from "socket.io-client";
import ChatInput from "../molecules/ChatInput";
import { ChatHeader } from "../organisms/ChatHeader";
import ChatMessages from "./ChatMessages";
import { selectAllChatUsers } from "@/lib/features/users/chatUsersSlice";
import { useDispatch } from "react-redux";
import { triggerRefetch } from "@/lib/features/queries/refetchSlice";
import {
  ChatsBetweenUsersQueryVariables,
  UseQueryVariables,
} from "@/types/useQueryVariables";
import useScrollFetch from "@/hooks/useScrollFetch";

type Props = {};

interface ChatsData {
  chatsBetweenUsers: NewMessage[];
}

const MainChatArea = ({}: Props) => {
  const [messages, setMessages] = useState<NewMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const socketRef = useRef<Socket | null>(null);

  const dispatch = useDispatch();

  const handleRefetch = () => {
    dispatch(triggerRefetch({ queryName: "GET_CHATS_WITH_LATEST_MESSAGE" }));
  };

  const { currentUser } = useAppSelector((state) => state.currentUser);
  const selectedUserId = useAppSelector((state) => state.selectedUser.userId)!;
  const getUserBySelectedUserId = useAppSelector(
    (state) => state.users.entities[selectedUserId]
  );
  const chats = useAppSelector(selectAllChatUsers);
  const chat = chats.find(
    (chat) =>
      chat.receiverId === selectedUserId || chat.senderId === selectedUserId
  );
  const isUserReceiverOrSender =
    chat?.receiverId === selectedUserId ? "receiver" : "sender";
  const user: User = chat?.[isUserReceiverOrSender].id
    ? chat[isUserReceiverOrSender]
    : getUserBySelectedUserId;

  const isGetChatsWithLatestMessageLoading = useAppSelector(
    (state) => state.loading.GET_CHATS_WITH_LATEST_MESSAGE
  );

  const { loading, error, data, fetchMore, refetch } = useQuery<ChatsData>(
    GET_CHATS_BETWEEN_USERS,
    {
      variables: {
        senderId: currentUser?.id ?? "",
        receiverId: selectedUserId ?? "",
        skip: 0,
        take: 15,
      },
    }
  );

  const { isFetching, setIsFetching, scrollableDivRef } = useScrollFetch<
    ChatsData,
    ChatsBetweenUsersQueryVariables
  >(
    fetchMore,
    data?.chatsBetweenUsers.length ?? 0,
    "chatsBetweenUsers",
    (dataLength) => ({
      senderId: currentUser?.id ?? "",
      receiverId: selectedUserId ?? "",
      skip: dataLength + messages.length,
      take: 15,
    }),
    false,
    "up",
    loading
  );

  useEffect(() => {
    if (!loading) {
      setIsFetching(false);
      refetch();
    }
  }, [selectedUserId]);

  useEffect(() => {
    setIsFetching(false);
    setMessages([]);
  }, [selectedUserId]);

  useEffect(() => {
    const token = getTokenFromLocalStorage();

    const socket = io(process.env.NEXT_PUBLIC_WS_URL ?? "", {
      auth: {
        token,
      },
      // https://stackoverflow.com/questions/72765760/why-do-i-get-a-this-cors-error-from-using-socket-io
      transports: ["websocket"],
    });

    socket.on("new_message", (message: NewMessage) => {
      if (
        message.senderId === currentUser?.id ||
        message.receiverId === currentUser?.id ||
        message.senderId === selectedUserId ||
        message.receiverId === selectedUserId
      ) {
        setMessages((messages) => [message, ...messages]);
        handleRefetch();
      }
    });

    socketRef.current = socket;

    // something probably rerenders this component
    // which causes this return function to be called unexpectedly
    // because we want this function to only be called when the component is unmounted
    // we will use this JavaScript approach to disconnect the socket
    return () => {
      socket.disconnect();
    };
  }, [currentUser, selectedUserId]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    if (socketRef.current) {
      socketRef.current.emit("send_message", {
        message: newMessage,
        senderId: currentUser?.id,
        receiverId: selectedUserId,
      });
      setNewMessage("");
    }
  };

  return (
    <>
      <div className="flex-1 flex flex-col bg-black">
        <ChatHeader
          isGetChatsWithLatestMessageLoading={
            isGetChatsWithLatestMessageLoading
          }
          user={user}
        />
        <ChatMessages
          messages={[...messages, ...(data?.chatsBetweenUsers ?? [])]}
          wsMessages={messages}
          loading={loading}
          scrollableDivRef={scrollableDivRef}
          isFetching={isFetching}
        />
        <ChatInput
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          sendMessage={sendMessage}
        />
      </div>
    </>
  );
};

export default MainChatArea;

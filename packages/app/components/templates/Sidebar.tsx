"use client";
import React, { useEffect, useRef, useState } from "react";
import { useAppSelector } from "@/lib/hooks";
import useQuery from "@/hooks/useCustomQuery";
import { GET_OTHER_USERS } from "@/graphql/getOtherUsers";
import { User } from "@ws-chat-app/shared";
import { UserChats } from "@/types/userChats";
import NewChatIcon from "../atoms/NewChatIcon";
import Image from "next/image";

const Sidebar = () => {
  const [isFetching, setIsFetching] = useState(false);
  const { loading, error, data, fetchMore } = useQuery(GET_OTHER_USERS, {
    // The variables skip and take are not necessarily hard-coded incorrectly. They are set to initial values for the first query.
    variables: { skip: 0, take: 15 },
  });

  const { currentUser } = useAppSelector((state) => state.currentUser);

  // Create a ref for the scrollable div
  const scrollableDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log({ data });
  }, [data]);

  // Fetch more data when scrolled to the bottom
  useEffect(() => {
    if (!isFetching) return;
    fetchMoreData();
  }, [isFetching]);

  // Listen for scroll events on the scrollable div
  useEffect(() => {
    const scrollableDiv = scrollableDivRef.current;
    console.log({ scrollableDivRef, scrollableDiv });
    if (scrollableDiv) {
      scrollableDiv.addEventListener("scroll", handleScroll);
      return () => scrollableDiv.removeEventListener("scroll", handleScroll);
    }
    // scrollableDiv is undefined if the dependency array is empty
  }, [loading, isFetching]);

  // Handle scroll event
  function handleScroll() {
    console.log("Handling scroll event");

    const scrollableDiv = scrollableDivRef.current;
    if (!scrollableDiv) return;

    const { scrollHeight, scrollTop, clientHeight } = scrollableDiv;
    const isNearBottom = scrollTop + clientHeight >= scrollHeight - 50;

    if (isNearBottom && !isFetching) {
      setIsFetching(true);
    }
  }

  // Fetch more data
  async function fetchMoreData() {
    console.log("Fetching more data");
    try {
      await fetchMore({
        variables: {
          skip: data.otherUsers.length,
          take: 15,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          return {
            ...prev,
            otherUsers: [...prev.otherUsers, ...fetchMoreResult.otherUsers],
          };
        },
      });
      setIsFetching(false);
    } catch (error) {
      console.error("Error fetching more data:", error);
    }
  }

  if (loading)
    return <div className="w-1/4 border border-pale">Loading...</div>;
  if (error) return <p>Error: {error.message}</p>;

  const userChats: UserChats[] = data?.otherUsers.map((user: User) => ({
    ...user,
    message: "Hey there!",
    avatar: "https://placehold.co/200x/8eafff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato",
  }));

  return (
    <div className="w-1/4 border border-pale">
      {/* Sidebar Header */}
      <header className="p-4  flex justify-between items-center bg-black text-white">
        <h1 className="text-2xl font-semibold">
          {currentUser?.username ?? "Loading..."}
        </h1>
        <NewChatIcon />
      </header>

      {/* UserChats List */}
      <div
        ref={scrollableDivRef}
        className="overflow-y-auto h-screen p-3 mb-9 pb-20 bg-black"
      >
        <h1 className="text-xl font-semibold mb-2">Messages</h1>
        {userChats.map((userChats, index) => (
          <div
            key={index}
            className={`flex items-center mb-4 cursor-pointer hover:bg-chat-hover p-2 rounded-md
            ${index === 0 && "bg-selected-chat hover:bg-selected-chat"}
            `}
          >
            <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
              <Image
                src={userChats.avatar}
                alt="User Avatar"
                className="w-12 h-12 rounded-full"
                width={48}
                height={48}
              />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold">{userChats.username}</h2>
              <p className="text-pale-text">{userChats.message}</p>
            </div>
          </div>
        ))}
        {isFetching && (
          <div className="text-center text-2xl font-semibold text-white">
            Loading...
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;

"use client";
import { GET_OTHER_USERS } from "@/graphql/getOtherUsers";
import useQuery from "@/hooks/useCustomQuery";
import useScrollFetch from "@/hooks/useScrollFetch";
import { selectUserIds, setUsers } from "@/lib/features/users/usersSlice";
import { useAppSelector } from "@/lib/hooks";
import { UseQueryVariables } from "@/types/useQueryVariables";
import { User } from "@ws-chat-app/shared";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Error from "../atoms/Error";
import Loader from "../atoms/Loader";
import NewChatIcon from "../atoms/NewChatIcon";
import SidebarComponentWrapper from "../molecules/SidebarComponentWrapper";
import UserChat from "../organisms/UserChat";
import { setSelectedUser } from "@/lib/features/users/selectedUserSlice";
import { setLoading } from "@/lib/features/queries/loadingSlice";

interface OtherUsers {
  otherUsers: Array<User>;
}

const Sidebar = () => {
  const dispatch = useDispatch();
  const selectedUserId = useAppSelector((state) => state.selectedUser.userId);

  const { loading, error, data, fetchMore } = useQuery(GET_OTHER_USERS, {
    variables: { skip: 0, take: 15 },
  });

  useEffect(() => {
    dispatch(setLoading({ queryName: "GET_OTHER_USERS", isLoading: loading }));
  }, [loading, dispatch]);

  useEffect(() => {
    if (data?.otherUsers) {
      dispatch(setUsers(data.otherUsers));
    }

    if (!selectedUserId && data?.otherUsers.length) {
      dispatch(setSelectedUser(data.otherUsers[0].id));
    }
  }, [data, dispatch]);

  const userIds = useAppSelector(selectUserIds);

  const { currentUser } = useAppSelector((state) => state.currentUser);

  const { isFetching, setIsFetching, scrollableDivRef } = useScrollFetch<
    OtherUsers,
    UseQueryVariables
  >(fetchMore, data?.otherUsers.length, "otherUsers", (dataLength) => ({
    skip: dataLength,
    take: 15,
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
    <SidebarComponentWrapper noFlex>
      {/* Sidebar Header */}
      <header className="p-4  flex justify-between items-center bg-black text-white">
        <h1 className="text-2xl font-semibold">
          {currentUser?.username ?? <Loader />}
        </h1>
        <NewChatIcon />
      </header>

      {/* UserChat List */}
      <div
        ref={scrollableDivRef}
        className="overflow-y-auto h-screen p-3 mb-9 pb-20 bg-black scrollbar-thin scrollbar-thumb-gray-600 hover:scrollbar-thumb-gray-500"
      >
        <h1 className="text-xl font-semibold mb-2">Messages</h1>
        {userIds.map((userId) => (
          <UserChat userId={userId} key={userId} />
        ))}
        {isFetching && <Loader />}
      </div>
    </SidebarComponentWrapper>
  );
};

export default Sidebar;

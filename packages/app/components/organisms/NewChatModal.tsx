import React, { useEffect, useState } from "react";
import CloseIcon from "../atoms/CloseIcon";
import { useDispatch } from "react-redux";
import { GET_OTHER_USERS } from "@/graphql/queries/getOtherUsers";
import useQuery from "@/hooks/useCustomQuery";
import useScrollFetch from "@/hooks/useScrollFetch";
import { setUsers } from "@/lib/features/users/usersSlice";
import { useAppSelector } from "@/lib/hooks";
import { UseQueryVariables } from "@/types/useQueryVariables";
import { User } from "@ws-chat-app/shared";
import Loader from "../atoms/Loader";
import UserChat from "../organisms/UserChat";

interface OtherUsers {
  otherUsers: Array<User>;
}

type Props = {
  isModalOpen: boolean;
  toggleModal: () => void;
};

const NewChatModal = ({ isModalOpen, toggleModal }: Props) => {
  const dispatch = useDispatch();

  const { loading, error, data, fetchMore } = useQuery(GET_OTHER_USERS, {
    variables: { skip: 0, take: 15 },
  });

  useEffect(() => {
    if (data?.otherUsers) {
      dispatch(setUsers(data.otherUsers));
    }
  }, [data, dispatch]);

  const userIds = useAppSelector((state) => state.users.ids);

  const { isFetching, scrollableDivRef } = useScrollFetch<
    OtherUsers,
    UseQueryVariables
  >(
    fetchMore,
    data?.otherUsers.length,
    "otherUsers",
    (dataLength) => ({
      skip: dataLength,
      take: 15,
    }),
    isModalOpen
  );

  if (!isModalOpen) {
    return null;
  }

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-modal-bg text-white p-5 rounded-lg shadow-xl border border-pale w-[30vw]">
        <div className="flex-center justify-between mb-1">
          <h6 className="text-xl font-bold mb-4">New message</h6>
          <CloseIcon onClick={toggleModal} />
        </div>
        <div className="h-10 w-100 -mx-5 border-y border-modal-border flex-center">
          <p className="font-bold mx-3">To:</p>
          <input
            className="w-full h-full bg-modal-bg focus:outline-none"
            placeholder="Search..."
          />
        </div>
        <div ref={scrollableDivRef} className="mt-2 h-[30vh] overflow-y-auto">
          {loading && <Loader />}
          {error && <div>Error: {error.message}</div>}
          {userIds.map((userId) => (
            <UserChat userId={userId} key={userId} modal />
          ))}
          {isFetching && <Loader />}
        </div>
        <div>
          <button className="px-4 py-2 text-white bg-blue-500 rounded mt-5 w-full">
            Chat
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewChatModal;

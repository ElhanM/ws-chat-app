import { RootState } from "@/lib/store";
import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { LatestChat } from "@ws-chat-app/shared";

const chatUsersAdapter = createEntityAdapter({
  selectId: (chat: LatestChat) => chat.id,
});

const initialState = chatUsersAdapter.getInitialState();

export const chatUsersSlice = createSlice({
  name: "chatUsers",
  initialState,
  reducers: {
    setChatUsers: chatUsersAdapter.setAll,
  },
});

export const { setChatUsers } = chatUsersSlice.actions;

export const {
  selectAll: selectAllChatUsers,
  selectById: selectChatUserById,
  selectIds: selectChatUserIds,
  selectEntities: selectChatUserEntities,
  selectTotal: selectTotalChatUsers,
} = chatUsersAdapter.getSelectors((state: RootState) => state.chatUsers);

export default chatUsersSlice.reducer;

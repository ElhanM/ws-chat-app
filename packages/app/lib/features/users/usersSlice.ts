import { RootState } from "@/lib/store";
import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { User } from "@ws-chat-app/shared";

const usersAdapter = createEntityAdapter({
  selectId: (user: User) => user.id,
});

const initialState = usersAdapter.getInitialState();

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: usersAdapter.setAll,
  },
});

export const { setUsers } = usersSlice.actions;

// Export the customized selectors for this adapter
export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUserIds,
  selectEntities: selectUserEntities,
  selectTotal: selectTotalUsers,
} = usersAdapter.getSelectors((state: RootState) => state.users);

export default usersSlice.reducer;

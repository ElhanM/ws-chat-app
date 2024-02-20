import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SelectedUserState {
  userId: string | null;
}

const initialState: SelectedUserState = {
  userId: null,
};

export const selectedUserSlice = createSlice({
  name: "selectedUser",
  initialState,
  reducers: {
    setSelectedUser: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
    },
  },
});

export const { setSelectedUser } = selectedUserSlice.actions;

export default selectedUserSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@ws-chat-app/shared";

interface UserState {
  currentUser?: User;
}

const initialState: UserState = {
  currentUser: undefined,
};

const currentUserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
    },
    addTokenToLocalStorage: (state, action: PayloadAction<string>) => {
      const tokenKey = process.env.NEXT_PUBLIC_TOKEN_KEY || "token";
      localStorage.setItem(tokenKey, action.payload);
    },
  },
});

export const { setCurrentUser, addTokenToLocalStorage } =
  currentUserSlice.actions;

export default currentUserSlice.reducer;

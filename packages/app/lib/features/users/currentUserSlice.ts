import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthUser } from "@ws-chat-app/shared";

interface UserState {
  currentUser?: AuthUser;
}

const initialState: UserState = {
  currentUser: undefined,
};

// TODO: On load of app, use token from storage to set current user
// TODO: If token is not present, redirect to login page
// TODO: If token is present, but is expired, redirect to login page
// TODO: On every api request, check if token is expired, if so, redirect to login page
const addTokenToLocalStorage = (user: AuthUser) => {
  const tokenKey = process.env.NEXT_PUBLIC_TOKEN_KEY || "token";
  if (user?.accessToken) {
    localStorage.setItem(tokenKey, user.accessToken);
  }
};

const currentUserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<AuthUser>) => {
      state.currentUser = action.payload;
      addTokenToLocalStorage(action.payload);
    },
  },
});

export const { setCurrentUser } = currentUserSlice.actions;

export default currentUserSlice.reducer;

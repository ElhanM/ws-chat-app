import { configureStore } from "@reduxjs/toolkit";
import currentUserReducer from "./features/users/currentUserSlice";
import usersReducer from "./features/users/usersSlice";
import selectedUserReducer from "./features/users/selectedUserSlice";
import loadingReducer from "./features/queries/loadingSlice";
import chatUsersReducer from "./features/users/chatUsersSlice";
import refetchReducer from "./features/queries/refetchSlice";
import sidebarReducer from "./features/layout/sidebarSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      currentUser: currentUserReducer,
      users: usersReducer,
      selectedUser: selectedUserReducer,
      loading: loadingReducer,
      chatUsers: chatUsersReducer,
      refetch: refetchReducer,
      sidebar: sidebarReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

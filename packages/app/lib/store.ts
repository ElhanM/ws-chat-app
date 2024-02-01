import { configureStore } from "@reduxjs/toolkit";
import currentUserReducer from "./features/users/currentUserSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      currentUser: currentUserReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

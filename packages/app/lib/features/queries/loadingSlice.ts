import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LoadingState {
  [queryName: string]: boolean;
}

const initialState: LoadingState = {
  GET_CHATS_WITH_LATEST_MESSAGE: true,
};

export const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setLoading: (
      state,
      action: PayloadAction<{ queryName: string; isLoading: boolean }>
    ) => {
      const { queryName, isLoading } = action.payload;
      state[queryName] = isLoading;
    },
  },
});

export const { setLoading } = loadingSlice.actions;

export default loadingSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LoadingState {
  [queryName: string]: boolean;
}

const initialState: LoadingState = {
  GET_OTHER_USERS: true,
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

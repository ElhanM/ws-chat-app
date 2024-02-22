import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RefetchState {
  [queryName: string]: boolean;
}

const initialState: RefetchState = {};

export const refetchSlice = createSlice({
  name: "refetch",
  initialState,
  reducers: {
    triggerRefetch: (state, action: PayloadAction<{ queryName: string }>) => {
      const { queryName } = action.payload;
      // Toggle the refetch state for the given query
      state[queryName] = !state[queryName];
    },
  },
});

export const { triggerRefetch } = refetchSlice.actions;

export default refetchSlice.reducer;

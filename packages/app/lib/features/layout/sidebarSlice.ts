// sidebarSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

interface SidebarState {
  showSidebar: boolean;
}

const initialState: SidebarState = {
  showSidebar: false,
};

export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleSidebar: (state, action: { payload: boolean }) => {
      state.showSidebar = action.payload;
    },
  },
});

export const { toggleSidebar } = sidebarSlice.actions;

export const selectShowSidebar = (state: RootState) =>
  state.sidebar.showSidebar;

export default sidebarSlice.reducer;

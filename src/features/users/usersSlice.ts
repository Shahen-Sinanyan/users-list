import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { TUsersList } from "../../types";
import { fetchUsers } from "./usersApi";

export interface InitialSlice {
  usersData: TUsersList | [];
  sortedUsers: TUsersList | [];
  status: string;
}

const initialState: InitialSlice = {
  usersData: [],
  sortedUsers: [],
  status: "loading",
};
export const localStorageUsers = createAsyncThunk(
  "users/fetchUsers",
  async () => {
    const response = await fetchUsers();
    return response;
  }
);
export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setSortedUsers: (state, action) => {
      state.sortedUsers = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(localStorageUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(localStorageUsers.fulfilled, (state, action) => {
        let resolved = action.payload;
        state.status = "done";
        state.usersData = resolved;
        state.sortedUsers = resolved;
      })
      .addCase(localStorageUsers.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { setSortedUsers } = usersSlice.actions;

export default usersSlice.reducer;

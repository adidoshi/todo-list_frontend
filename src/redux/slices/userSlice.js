import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import {
  errorOptions,
  successOptions,
} from "../../components/utils/toastStyle";
import {
  loginUserAsync,
  registerUserAsync,
  updateUserAsync,
} from "../api/userApi";

const userDetails = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : undefined;

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: userDetails,
  },
  reducers: {
    logout: () => {
      localStorage.removeItem("userInfo");
    },
  },
  extraReducers: (builder) => {
    // Login user reducers
    builder.addCase(loginUserAsync.pending, (state) => {
      state.pending = true;
      state.error = undefined;
    });
    builder.addCase(loginUserAsync.fulfilled, (state, action) => {
      state.userInfo = action.payload;
      state.pending = false;
      state.error = undefined;
      toast.success("Logged in successfully!", { style: successOptions });
    });
    builder.addCase(loginUserAsync.rejected, (state, action) => {
      state.error = action?.payload?.content;
      toast.error(state.error, { style: errorOptions });
      state.pending = false;
    });

    // register user reducers
    builder.addCase(registerUserAsync.pending, (state) => {
      state.pending = true;
      state.error = undefined;
    });
    builder.addCase(registerUserAsync.fulfilled, (state, action) => {
      state.userInfo = action.payload;
      state.pending = false;
      state.error = undefined;
      toast.success("Registered successfully!", { style: successOptions });
    });
    builder.addCase(registerUserAsync.rejected, (state, action) => {
      state.error = action?.payload?.error;
      toast.error(state.error, { style: errorOptions });
      state.pending = false;
    });

    // update user profile reducers
    builder.addCase(updateUserAsync.pending, (state) => {
      state.profilePending = true;
      state.error = undefined;
    });
    builder.addCase(updateUserAsync.fulfilled, (state, action) => {
      state.profilePending = false;
      state.error = undefined;
      state.updatedInfo = action.payload;
      toast.success("Profile updated successfully!", { style: successOptions });
    });
    builder.addCase(updateUserAsync.rejected, (state, action) => {
      state.error = action?.payload?.message;
      toast.error(state.error, { style: errorOptions });
      state.profilePending = false;
    });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;

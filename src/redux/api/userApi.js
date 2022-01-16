import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "./apiCall";

// login post req
export const loginUserAsync = createAsyncThunk(
  "user/loginUserAsync",
  async (payload, { rejectWithValue }) => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    try {
      let url = `${BASE_URL}/api/users/login`;
      const { data } = await axios.post(url, payload, config);
      localStorage.setItem("userInfo", JSON.stringify(data));
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

// register post req
export const registerUserAsync = createAsyncThunk(
  "user/registerUserAsync",
  async (payload, { rejectWithValue }) => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    try {
      let url = `${BASE_URL}/api/users/register`;
      const { data } = await axios.post(url, payload, config);
      localStorage.setItem("userInfo", JSON.stringify(data));
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

// update profile
export const updateUserAsync = createAsyncThunk(
  "user/updateUserAsync",
  async (payload, { rejectWithValue, getState }) => {
    const user = getState()?.user?.userInfo;
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${user?.token}`,
      },
    };

    try {
      let url = `${BASE_URL}/api/users/profile`;
      const { data } = await axios.put(
        url,
        {
          name: payload?.name,
          email: payload?.email,
          pic: payload?.pic,
        },
        config
      );
      localStorage.setItem("userInfo", JSON.stringify(data));
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

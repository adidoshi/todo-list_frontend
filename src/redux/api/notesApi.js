import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "./apiCall";

// Create a note
export const createNoteAsync = createAsyncThunk(
  "notes/createNoteAsync",
  async (payload, { rejectWithValue, getState }) => {
    const user = getState().user.userInfo;
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    };

    try {
      let url = `${BASE_URL}/api/notes/create`;
      const { data } = await axios.post(url, payload, config);
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

// Fetch all notes of user
export const fetchNotesAsync = createAsyncThunk(
  "notes/fetchNotesAsync",
  async (payload, { rejectWithValue, getState }) => {
    const user = getState().user.userInfo;
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    try {
      let url = `${BASE_URL}/api/notes`;
      const { data } = await axios.get(url, config);
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

// Edit a note
export const editNotesAsync = createAsyncThunk(
  "notes/editNoteAsync",
  async (payload, { rejectWithValue, getState }) => {
    const user = getState()?.user?.userInfo;
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${user?.token}`,
      },
    };

    try {
      let url = `${BASE_URL}/api/notes/${payload.id}`;
      const res = await axios.put(url, payload, config);
      return res.data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

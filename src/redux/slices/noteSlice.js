import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import {
  successOptions,
  warningOptions,
} from "../../components/utils/toastStyle";
import {
  createNoteAsync,
  editNotesAsync,
  fetchNotesAsync,
} from "../api/notesApi";

export const noteSlice = createSlice({
  name: "user",
  initialState: {},

  // fetch notes reducer
  extraReducers: (builder) => {
    builder.addCase(fetchNotesAsync.pending, (state) => {
      state.notesLoading = true;
    });
    builder.addCase(fetchNotesAsync.fulfilled, (state, action) => {
      state.notesLoading = false;
      state.notesData = action?.payload;
      state.error = undefined;
    });
    builder.addCase(fetchNotesAsync.rejected, (state, action) => {
      state.notesLoading = false;
      state.error = action?.payload?.message;
      toast.error(state.error);
    });

    // create note reducer
    builder.addCase(createNoteAsync.pending, (state) => {
      state.pending = true;
      state.success = false;
    });
    builder.addCase(createNoteAsync.fulfilled, (state, action) => {
      state.success = true;
      state.pending = false;
      state.error = undefined;
      toast.success("Note created successfully!", { style: successOptions });
    });
    builder.addCase(createNoteAsync.rejected, (state, action) => {
      state.error = action?.payload?.message;
      state.pending = false;
      state.success = false;
      toast(state.error, { style: warningOptions, icon: "⚠️" });
    });

    // edit note reducer
    builder.addCase(editNotesAsync.pending, (state) => {
      state.editNotePending = true;
    });
    builder.addCase(editNotesAsync.fulfilled, (state, action) => {
      state.updatedNote = action?.payload;
      state.editNotePending = false;
      state.error = undefined;
      toast.success("Note updated successfully!");
    });
    builder.addCase(editNotesAsync.rejected, (state, action) => {
      state.error = action?.payload?.message;
      state.editNotePending = false;
      toast.error(state.error);
    });
  },
});

export default noteSlice.reducer;

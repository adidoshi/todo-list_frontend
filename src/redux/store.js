import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import noteReducer from "./slices/noteSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    notes: noteReducer,
  },
});

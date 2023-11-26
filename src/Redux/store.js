import { configureStore } from "@reduxjs/toolkit";
import { translateSlice } from "./Slices/translateSlice";
export default configureStore({
  reducer: {
    translateState: translateSlice.reducer,
  },
});

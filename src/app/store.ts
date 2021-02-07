import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import UserReducer from "../features/userSlice";

export const store = configureStore({
  reducer: {
    user: UserReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

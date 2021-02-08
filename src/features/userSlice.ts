import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
interface User {
  displayName: string;
  photoUrl: string;
}

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {
      uid: "",
      photoUrl: "",
      displayName: "",
    },
  },
  reducers: {
    login: (state, action) => {
      // firebaseからactionのpayload経由で取得した情報でstateを更新する
      state.user = action.payload;
    },
    logout: state => {
      // stateをリセットさせる
      state.user = {
        uid: "",
        photoUrl: "",
        displayName: "",
      };
    },
    updateUserProfile: (state, action: PayloadAction<User>) => {
      state.user.displayName = action.payload.displayName;
      state.user.photoUrl = action.payload.photoUrl;
    },
  },
});

export const { login, logout, updateUserProfile } = userSlice.actions;

// useSelectorで参照する際、userのstateを返してくれる関数
export const selectUser = (state: RootState) => state.user.user;

export default userSlice.reducer;

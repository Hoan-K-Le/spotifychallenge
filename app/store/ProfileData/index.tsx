import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getUserData = createAsyncThunk("user/getUser", async () => {
  try {
    const url = `https://api.spotify.com/v1/me`;
    const { data } = await axios({
      method: "GET",
      url: url,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
});

export interface UserProps {
  user: { display_name: string };
}

const initialState: UserProps = {
  user: { display_name: "" },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getUserData.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export default userSlice.reducer;

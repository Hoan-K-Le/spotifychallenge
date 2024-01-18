import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Using the spotify api to grab the singe playlist information
export const getSinglePlaylist = createAsyncThunk(
  "singlePlaylist/getSinglePlaylist",
  async (id: string) => {
    try {
      const url = `https://api.spotify.com/v1/playlists/${id}`;
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
  }
);

// interface
// what do I need in a single playlist prop
export interface SinglePlaylistProps {
  item: any;
}
// initial state
const initialState: SinglePlaylistProps = {
  item: [],
};

// create the slice
export const singlePlaylistSlice = createSlice({
  name: "singlePlaylist",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getSinglePlaylist.fulfilled, (state, action) => {
      state.item = action.payload;
    });
  },
});

export default singlePlaylistSlice.reducer;

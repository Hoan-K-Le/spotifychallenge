"use client";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getPlaylistData = createAsyncThunk(
  "playlist/getPlaylist",
  async () => {
    try {
      const url = `https://api.spotify.com/v1/me/playlists`;
      const { data } = await axios({
        method: "GET",
        url: url,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      return data;
    } catch (error) {
      console.log(error, "error from playlist redux");
    }
  }
);

export interface PlaylistProps {
  playlists: { items: { name: string }[]; images: { url: string }[] };
}

const initialState: PlaylistProps = {
  playlists: { items: [], images: [] },
};

const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getPlaylistData.fulfilled, (state, action) => {
      state.playlists = action.payload;
    });
  },
});

export default playlistSlice.reducer;

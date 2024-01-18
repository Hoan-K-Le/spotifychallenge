import { configureStore } from "@reduxjs/toolkit";
import { useSelector, TypedUseSelectorHook } from "react-redux";
import playlistReducer from "./PlaylistData";
import userReducer from "./ProfileData";
import singlePlaylistReducer from "./SinglePlaylist";

export const store = configureStore({
  reducer: {
    playlists: playlistReducer,
    user: userReducer,
    singlePlaylist: singlePlaylistReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

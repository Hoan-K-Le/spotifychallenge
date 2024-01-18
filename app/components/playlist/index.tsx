"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { ProfileProp } from "../profile/profile-interface";
import { useAppSelector } from "@/app/store/store";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store/store";
import { getPlaylistData, PlaylistProps } from "@/app/store/PlaylistData";

export default function Playlist() {
  const playlist = useAppSelector(state => state.playlists.playlists);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getPlaylistData());
  }, [dispatch]);

  return (
    <div className="flex flex-col items-center flex-wrap">
      <h1 className="text-4xl">Playlist</h1>
      <div className="flex gap-4 flex-wrap justify-center">
        {playlist &&
          playlist?.items?.map(
            (playlistItem: { name: string; images: { url: string }[] }) => (
              <div className="flex flex-col items-center w-[300px] gap-2 border bg-[#111111]">
                <p className="text-white overflow-hidden">
                  {playlistItem?.name}
                </p>
                <img
                  src={playlistItem?.images[0].url}
                  alt="playlist-image"
                  className="h-[200px] w-[200px]"
                />
              </div>
            )
          )}
      </div>
    </div>
  );
}

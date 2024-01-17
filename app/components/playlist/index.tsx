"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { ProfileProp } from "../profile/profile-interface";
import { useAppSelector } from "@/app/store/store";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store/store";
import { getPlaylistData } from "@/app/store/PlaylistData";

export default function Playlist({ user }: ProfileProp) {
  const playlist = useAppSelector(state => state.playlists.playlists);
  const dispatch = useDispatch<AppDispatch>();
  console.log(playlist, "13 playlist component");
  useEffect(() => {
    dispatch(getPlaylistData());
  }, [dispatch]);

  return (
    <div className="flex flex-col items-center">
      <h1>Playlist</h1>
      <div className="flex gap-4">
        {playlist &&
          playlist?.items?.map((playlist: any) => (
            <div className="flex flex-col items-center">
              <p>{playlist?.name}</p>
              <img
                src={playlist?.images[0].url}
                alt="playlist-image"
                className="h-[200px] w-[300px]"
              />
            </div>
          ))}
      </div>
    </div>
  );
}

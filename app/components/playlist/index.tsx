"use client";
import { useEffect } from "react";
import {} from "../profile/profile-interface";
import { useAppSelector } from "@/app/store/store";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store/store";
import { getPlaylistData } from "@/app/store/PlaylistData";

export default function Playlists() {
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
            (playlistItem: {
              name: string;
              images: { url: string }[];
              id: string;
            }) => (
              <div className=" w-[300px]  border bg-[#111111]">
                <a
                  className="flex flex-col items-center"
                  href={`/playlists/${playlistItem.id}`}
                >
                  <p className="text-white overflow-hidden">
                    {playlistItem?.name}
                  </p>
                  <img
                    src={playlistItem?.images[0].url}
                    alt="playlist-image"
                    className="h-[200px] w-[200px]"
                  />
                </a>
              </div>
            )
          )}
      </div>
    </div>
  );
}

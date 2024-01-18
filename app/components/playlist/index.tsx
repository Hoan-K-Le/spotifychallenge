"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { ProfileProp } from "../profile/profile-interface";
import { useAppSelector } from "@/app/store/store";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store/store";
import { getPlaylistData, PlaylistProps } from "@/app/store/PlaylistData";
declare global {
  interface Window {
    onSpotifyWebPlaybackSDKReady: () => void;
    Spotify: any; // Assuming Spotify types are not defined, use 'any' or a more specific type if available
  }
}
export default function Playlist() {
  const [player, setPlayer] = useState();
  const [paused, setPause] = useState(false);
  const [play, setPlay] = useState(false);
  const [currentTrack, setCurrentTrack] = useState();

  const playlist = useAppSelector(state => state.playlists.playlists);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getPlaylistData());
  }, [dispatch]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: "Web Playback SDK",
        getOAuthToken: (cb: any) => {
          cb(localStorage.getItem("access_token"));
        },
        volume: 0.5,
      });
      setPlayer(player);

      player.addListener("ready", ({ device_id }: any) => {
        console.log("ready with device id", device_id);
      });
      player.addListener("not_ready", ({ device_id }: any) => {
        console.log("device gone offline", device_id);
      });

      player.connect();
    };
  }, []);
  console.log(player, "44");

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

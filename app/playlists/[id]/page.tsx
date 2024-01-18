"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getSinglePlaylist } from "@/app/store/SinglePlaylist";
import { useAppSelector, AppDispatch } from "@/app/store/store";
import { useDispatch } from "react-redux";
import { current } from "@reduxjs/toolkit";

declare global {
  interface Window {
    onSpotifyWebPlaybackSDKReady: () => void;
    Spotify: any; // Assuming Spotify types are not defined, use 'any' or a more specific type if available
  }
}
const track = {
  name: "",
  album: {
    images: [{ url: "" }],
  },
  artists: [{ name: "" }],
};

interface SpotifyPlayer {
  previousTrack: () => Promise<void>;
  togglePlay: () => Promise<void>;
  nextTrack: () => Promise<void>;
}
function SinglePlaylist() {
  const [player, setPlayer] = useState<SpotifyPlayer | null>(null);
  const [paused, setPause] = useState(false);
  const [play, setPlay] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(track);
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const singlePlaylistData = useAppSelector(state => state.singlePlaylist.item);
  console.log(id);

  useEffect(() => {
    dispatch(getSinglePlaylist(id.toString()));
  }, [id]);

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

      player.addListener("player_state_changed", (state: any) => {
        if (!state) return;
        console.log(state, "state 62");
        setCurrentTrack(state.track_window.current_track);
        setPause(state.paused);
        player.getCurrentState().then((state: any) => {
          !state ? setPlay(false) : setPlay(true);
        });
      });

      player.connect();
    };
  }, []);

  console.log(player, "72");
  const playlistImgUrl =
    singlePlaylistData?.images?.[0].url || "https://placeholder.com/200/300";

  return (
    <div className="flex justify-center mt-4">
      <div className="bg-[#111111] flex flex-col items-center p-2 rounded">
        <img
          src={currentTrack?.album?.images?.[0]?.url}
          alt="playlist-logo"
          className="h-[200px] w-[200px]"
        />
        <p>{currentTrack.name}</p>
        <p>{currentTrack.artists?.[0].name}</p>
        <div className="flex gap-4">
          <button
            onClick={() => {
              player?.previousTrack();
            }}
          >
            &lt;&lt;
          </button>
          <button
            onClick={() => {
              player?.togglePlay();
            }}
          >
            {paused ? "Play" : "Pause"}
          </button>
          <button
            onClick={() => {
              player?.nextTrack();
            }}
          >
            &gt;&gt;
          </button>
        </div>
      </div>
    </div>
  );
}

export default SinglePlaylist;

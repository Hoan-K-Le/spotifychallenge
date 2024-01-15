"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { ProfileProp } from "../profile/profile-interface";

export default function Playlist({ user }: ProfileProp) {
  const [playlists, setPlaylists] = useState([]);
  const getUsersPlaylist = async () => {
    if (!user.id) {
      console.log("Can't find user id");
      return;
    }
    try {
      const { data } = await axios({
        method: "GET",
        url: `https://api.spotify.com/v1/me/playlists`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      console.log(data, "hello");
      setPlaylists(data.items);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getUsersPlaylist();
  }, [user]);

  return (
    <div>
      <h2>Playlist</h2>
      {playlists &&
        playlists?.map((playlist: any) => (
          <div>
            <p>{playlist?.name}</p>
          </div>
        ))}
    </div>
  );
}

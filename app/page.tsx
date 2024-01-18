"use client";
import { useEffect, useState } from "react";
import Profile from "./components/profile";
import Playlists from "./components/playlist";
import axios from "axios";
import { useRouter } from "next/navigation";
import { spotifyIcon } from "./components/svg";

export default function Home() {
  const [token, setToken] = useState("");
  const [user, setUser] = useState<any>({});
  const router = useRouter();
  const getUsersInfo = async () => {
    const getToken = localStorage.getItem("access_token") || "";
    try {
      const { data } = await axios("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: "Bearer " + getToken,
        },
      });
      setUser(data);
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
    getUsersInfo();
  }, []);

  useEffect(() => {
    // Extract token from URL fragment
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const accessToken = params.get("access_token");
    if (accessToken) {
      localStorage.setItem("access_token", accessToken);
      setToken(accessToken);
    }
  }, []);

  const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || "";
  const REDIRECT_URL = "http://localhost:3000";

  function generateRandomString(length: number): string {
    let text = "";
    const possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  const requestAuthorization = () => {
    const state = generateRandomString(16);
    localStorage.setItem("stateKey", state);
    let scope =
      "streaming \
               user-read-email \
               user-read-private";

    let url = "https://accounts.spotify.com/authorize";
    url += "?response_type=token";
    url += "&client_id=" + encodeURIComponent(CLIENT_ID);
    url += "&scope=" + encodeURIComponent(scope);
    url += "&redirect_uri=" + encodeURIComponent(REDIRECT_URL);
    url += "&show_dialog=true";
    url += "&state=" + encodeURIComponent(state);
    window.location.href = url;
  };

  return (
    <main className="h-[100vh] flex flex-col items-center mt-10">
      {!token ? (
        <div className="flex flex-col items-center bg-[#111111] p-8 rounded">
          <p>{spotifyIcon()}</p>
          <button className="text-white" onClick={requestAuthorization}>
            Log in to Spotify
          </button>
        </div>
      ) : (
        <div>
          <Profile />
          <Playlists />
        </div>
      )}
    </main>
  );
}

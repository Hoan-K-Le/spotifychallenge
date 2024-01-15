"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [token, setToken] = useState("");

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

  const CLIENT_ID = "1cc19347d25c418abd5bb6a2da50b437";
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
    let scope = "user-read-private user-read-email";

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
    <main>
      <button onClick={requestAuthorization}>Authorize</button>
      <button>
        <a href="/profile">Profile</a>
      </button>
      <h1>Hello</h1>
    </main>
  );
}

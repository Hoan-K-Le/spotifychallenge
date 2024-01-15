"use client";
import { useEffect, useState } from "react";
export default function Profile() {
  const getProfileInfo = async () => {
    const getToken = localStorage.getItem("access_token") || "";
    try {
      const response = await fetch("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: "Bearer " + getToken,
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  useEffect(() => {
    getProfileInfo();
  }, []);

  return (
    <div>
      <h1>Hello</h1>
    </div>
  );
}

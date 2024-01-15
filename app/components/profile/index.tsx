"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { ProfileProp } from "./profile-interface";

export default function Profile({ user }: ProfileProp) {
  return (
    <div>
      <h1>Welcome {user?.display_name}</h1>
    </div>
  );
}

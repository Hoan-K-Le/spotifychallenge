"use client";
import { useEffect } from "react";
import { useAppSelector, AppDispatch } from "@/app/store/store";
import { getUserData } from "@/app/store/ProfileData";
import { useDispatch } from "react-redux";

export default function Profile() {
  const dispatch = useDispatch<AppDispatch>();
  const user = useAppSelector(state => state.user.user);

  useEffect(() => {
    dispatch(getUserData());
  }, []);
  return (
    <div>
      <h1 className="text-white">Welcome {user?.display_name}</h1>
    </div>
  );
}

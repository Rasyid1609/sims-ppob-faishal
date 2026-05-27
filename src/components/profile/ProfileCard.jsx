import React from 'react'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../features/profile/profileSlice";
import defaultProfile from "../../assets/profile.png";

export default function ProfileCard() {
    const dispatch = useDispatch();

    const { data, loading } = useSelector(
        (state) => state.profile
    );

    useEffect(() => {
        dispatch(getProfile());
    }, [dispatch]);

    if (loading) {
        return <div>Loading...</div>;
    }
  return (
    <div>
      <img
        src={
            data?.profile_image &&
            data.profile_image !== "null"
                ? data.profile_image
                : defaultProfile
        }
        alt="profile"
        className="w-20 h-20 rounded-full mb-4"
      />

      <p className="text-black-500">
        Selamat datang,
      </p>

      <h1 className="text-3xl font-bold">
        {data?.first_name} {data?.last_name}
      </h1>
    </div>
  );
}

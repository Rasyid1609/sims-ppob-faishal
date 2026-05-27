import {
  useEffect,
  useState,
} from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import Navbar from "../components/layout/Navbar";

import {
  getProfile,
  updateProfile,
  uploadProfileImage,
} from "../features/profile/profileSlice";

import { logout } from "../features/auth/authSlice";

import defaultProfile from "../assets/profile.png";

export default function AccountPage() {
  const dispatch = useDispatch();

  const { data, loading } =
    useSelector(
      (state) => state.profile
    );

  const [isEdit, setIsEdit] =
    useState(false);

  const [firstName, setFirstName] =
    useState("");

  const [lastName, setLastName] =
    useState("");

  // GET PROFILE
  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  // SET FORM VALUE
  useEffect(() => {
    if (data) {
      setFirstName(
        data.first_name
      );

      setLastName(
        data.last_name
      );
    }
  }, [data]);

  // UPLOAD PROFILE IMAGE
  const handleImageChange =
    async (e) => {
      const file =
        e.target.files[0];

      if (!file) return;

      // MAX 100 KB
      if (file.size > 100000) {
        alert(
          "Ukuran image maksimal 100 KB"
        );

        return;
      }

      const result = await dispatch(
        uploadProfileImage(file)
      );

      if (
        result.meta.requestStatus ===
        "fulfilled"
      ) {
        alert(
          "Foto profile berhasil diupdate"
        );
      }
    };

  // UPDATE PROFILE
  const handleUpdate =
    async () => {
      const result = await dispatch(
        updateProfile({
          first_name: firstName,
          last_name: lastName,
        })
      );

      if (
        result.meta.requestStatus ===
        "fulfilled"
      ) {
        alert(
          "Profile berhasil diupdate"
        );

        setIsEdit(false);
      }
    };

  // CANCEL EDIT
  const handleCancel = () => {
    setFirstName(
      data?.first_name || ""
    );

    setLastName(
      data?.last_name || ""
    );

    setIsEdit(false);
  };

  // LOGOUT
  const handleLogout = () => {
    dispatch(logout());

    localStorage.removeItem(
      "token"
    );

    window.location.href =
      "/";
  };

  return (
    <>
    
      <Navbar />

    <div className="min-h-screen bg-white">
        <div className="max-w-xl mx-auto px-6 py-10">
        {/* PROFILE */}
        <div className="flex flex-col items-center">
          <div className="relative">
            <img
              src={
                data?.profile_image ||
                defaultProfile
              }
              alt="profile"
              className="
                w-32
                h-32
                rounded-full
                object-cover
                border
              "
            />

            {/* EDIT IMAGE */}
            <label
              className="
                absolute
                bottom-0
                right-0
                bg-white
                border
                rounded-full
                p-2
                cursor-pointer
                shadow
              "
            >
              ✏️

              <input
                type="file"
                accept="image/*"
                hidden
                onChange={
                  handleImageChange
                }
              />
            </label>
          </div>

          <h1 className="text-3xl font-bold mt-4 text-center">
            {data?.first_name}{" "}
            {data?.last_name}
          </h1>
        </div>

        {/* FORM */}
        <div className="mt-10">
          {/* EMAIL */}
          <div className="mb-4">
            <label className="text-sm">
              Email
            </label>

            <input
              disabled
              value={data?.email || ""}
              className="
                w-full
                border
                rounded-md
                p-3
                mt-1
                bg-gray-100
              "
            />
          </div>

          {/* FIRST NAME */}
          <div className="mb-4">
            <label className="text-sm">
              Nama Depan
            </label>

            <input
              disabled={!isEdit}
              value={firstName}
              onChange={(e) =>
                setFirstName(
                  e.target.value
                )
              }
              className={`
                w-full
                border
                rounded-md
                p-3
                mt-1

                ${
                  !isEdit
                    ? "bg-gray-100"
                    : "bg-white"
                }
              `}
            />
          </div>

          {/* LAST NAME */}
          <div className="mb-6">
            <label className="text-sm">
              Nama Belakang
            </label>

            <input
              disabled={!isEdit}
              value={lastName}
              onChange={(e) =>
                setLastName(
                  e.target.value
                )
              }
              className={`
                w-full
                border
                rounded-md
                p-3
                mt-1

                ${
                  !isEdit
                    ? "bg-gray-100"
                    : "bg-white"
                }
              `}
            />
          </div>

          {/* BUTTONS */}
          {!isEdit ? (
            <>
              {/* EDIT PROFILE */}
              <button
                onClick={() =>
                  setIsEdit(true)
                }
                className="
                  w-full
                  bg-red-500
                  hover:bg-red-600
                  text-white
                  py-3
                  rounded-md
                "
              >
                Edit Profile
              </button>

              {/* LOGOUT */}
              <button
                onClick={handleLogout}
                className="
                  w-full
                  border
                  border-red-500
                  text-red-500
                  py-3
                  rounded-md
                  mt-4
                "
              >
                Logout
              </button>
            </>
          ) : (
            <>
              {/* SAVE */}
              <button
                onClick={handleUpdate}
                disabled={loading}
                className="
                  w-full
                  bg-red-500
                  hover:bg-red-600
                  text-white
                  py-3
                  rounded-md
                "
              >
                {loading
                  ? "Loading..."
                  : "Simpan"}
              </button>

              {/* CANCEL */}
              <button
                onClick={handleCancel}
                className="
                  w-full
                  border
                  border-gray-300
                  text-gray-600
                  py-3
                  rounded-md
                  mt-4
                "
              >
                Batalkan
              </button>
            </>
          )}
        </div>
        </div>   
    </div>

      
    </>
  );
}
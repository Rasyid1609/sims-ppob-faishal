import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import { useForm } from "react-hook-form";

import {
  HiOutlineMail,
  HiOutlineLockClosed,
  HiOutlineEye,
  HiOutlineEyeOff,
} from "react-icons/hi";

import logo from "../assets/logo.png";
import loginImage from "../assets/illustrasi-login.png";

import { loginUser } from "../features/auth/authSlice";

export default function LoginPage() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [showPassword, setShowPassword] =
    useState(false);

  const loading = useSelector(
    (state) => state.auth?.loading
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const result = await dispatch(
      loginUser(data)
    );

    if (
      result.meta.requestStatus ===
      "fulfilled"
    ) {
      navigate("/home");
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* LEFT SIDE */}
      <div
        className="
          w-full
          lg:w-1/2
          flex
          items-center
          justify-center
          px-6
          py-10
          bg-white
        "
      >
        <div className="w-full max-w-md">
          {/* Logo */}
          <div
            className="
              flex
              items-center
              justify-center
              gap-2
              mb-8
            "
          >
            <img
              src={logo}
              alt="logo"
              className="w-8 h-8"
            />

            <h1
              className="
                font-semibold
                text-lg
              "
            >
              SIMS PPOB
            </h1>
          </div>

          {/* Title */}
          <h2
            className="
              text-center
              text-3xl
              font-bold
              mb-10
            "
          >
            Masuk atau buat akun
            <br />
            untuk memulai
          </h2>

          {/* Form */}
          <form
            onSubmit={handleSubmit(
              onSubmit
            )}
          >
            {/* Email */}
            <div className="relative mb-2">
              <HiOutlineMail
                className="
                  absolute
                  left-3
                  top-1/2
                  -translate-y-1/2
                  text-gray-400
                  text-xl
                "
              />

              <input
                type="email"
                placeholder="masukkan email anda"
                className="
                  w-full
                  border
                  border-gray-300
                  rounded-md
                  py-3
                  pl-10
                  pr-4
                  outline-none
                  focus:border-red-500
                "
                {...register("email", {
                  required:
                    "Email wajib diisi",

                  pattern: {
                    value:
                      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

                    message:
                      "Format email tidak valid",
                  },
                })}
              />
            </div>

            {errors.email && (
              <p
                className="
                  text-red-500
                  text-sm
                  mb-4
                "
              >
                {errors.email.message}
              </p>
            )}

            {/* Password */}
            <div className="relative mb-2">
              <HiOutlineLockClosed
                className="
                  absolute
                  left-3
                  top-1/2
                  -translate-y-1/2
                  text-gray-400
                  text-xl
                "
              />

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="masukkan password anda"
                className="
                  w-full
                  border
                  border-gray-300
                  rounded-md
                  py-3
                  pl-10
                  pr-12
                  outline-none
                  focus:border-red-500
                "
                {...register(
                  "password",
                  {
                    required:
                      "Password wajib diisi",

                    minLength: {
                      value: 8,

                      message:
                        "Password minimal 8 karakter",
                    },
                  }
                )}
              />

              {/* SHOW / HIDE PASSWORD */}
              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
                className="
                  absolute
                  right-3
                  top-1/2
                  -translate-y-1/2
                  text-gray-400
                  hover:text-gray-600
                  transition
                "
              >
                {showPassword ? (
                  <HiOutlineEyeOff
                    className="text-xl"
                  />
                ) : (
                  <HiOutlineEye
                    className="text-xl"
                  />
                )}
              </button>
            </div>

            {errors.password && (
              <p
                className="
                  text-red-500
                  text-sm
                  mb-6
                "
              >
                {
                  errors.password
                    .message
                }
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                bg-red-500
                hover:bg-red-600
                text-white
                py-3
                rounded-md
                font-medium
                transition
              "
            >
              {loading
                ? "Loading..."
                : "Masuk"}
            </button>
          </form>

          {/* Register */}
          <p
            className="
              text-center
              text-sm
              text-gray-500
              mt-6
            "
          >
            belum punya akun?{" "}

            <Link
              to="/register"
              className="
                text-red-500
                font-semibold
              "
            >
              registrasi di sini
            </Link>
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="hidden lg:block lg:w-1/2">
        <img
          src={loginImage}
          alt="login"
          className="
            w-full
            h-screen
            object-cover
          "
        />
      </div>
    </div>
  );
}
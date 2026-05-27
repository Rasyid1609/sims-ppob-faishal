import React, {useState} from 'react'
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  HiOutlineMail,
  HiOutlineLockClosed,
  HiOutlineUser,
   HiOutlineEye,
  HiOutlineEyeOff,
} from "react-icons/hi";

import logo from "../assets/Logo.png";
import registerImage from "../assets/illustrasi-login.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../features/auth/authSlice";

export default function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    const payload = {
      email: data.email,
      first_name: data.first_name,
      last_name: data.last_name,
      password: data.password,
    };

    const result = await dispatch(
      registerUser(payload)
    );

    if (result.meta.requestStatus === "fulfilled") {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* LEFT SIDE */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-10 bg-white">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <img
              src={logo}
              alt="logo"
              className="w-8 h-8"
            />
            <h1 className="font-semibold text-lg">
              SIMS PPOB
            </h1>
          </div>

          {/* Title */}
          <h2 className="text-center text-3xl font-bold mb-10">
            Lengkapi data untuk
            <br />
            membuat akun
          </h2>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Email */}
            <div className="relative mb-4">
              <HiOutlineMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />

              <input
                type="email"
                placeholder="masukkan email anda"
                className="w-full border border-gray-300 rounded-md py-3 pl-10 pr-4 focus:outline-none focus:border-red-500"
                {...register("email", {
                  required: "Email wajib diisi",
                  pattern: {
                    value:
                      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Format email tidak valid",
                  },
                })}
              />
            </div>

            {errors.email && (
              <p className="text-red-500 text-sm mb-3">
                {errors.email.message}
              </p>
            )}

            {/* Nama Depan */}
            <div className="relative mb-4">
              <HiOutlineUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />

              <input
                type="text"
                placeholder="nama depan"
                className="w-full border border-gray-300 rounded-md py-3 pl-10 pr-4 focus:outline-none focus:border-red-500"
                {...register("first_name", {
                  required: "Nama depan wajib diisi",
                })}
              />
            </div>

            {errors.first_name && (
              <p className="text-red-500 text-sm mb-3">
                {errors.first_name.message}
              </p>
            )}

            {/* Nama Belakang */}
            <div className="relative mb-4">
              <HiOutlineUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />

              <input
                type="text"
                placeholder="nama belakang"
                className="w-full border border-gray-300 rounded-md py-3 pl-10 pr-4 focus:outline-none focus:border-red-500"
                {...register("last_name", {
                  required: "Nama belakang wajib diisi",
                })}
              />
            </div>

            {errors.last_name && (
              <p className="text-red-500 text-sm mb-3">
                {errors.last_name.message}
              </p>
            )}

            {/* Password */}
            <div className="relative mb-4">
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
              type={showPassword ? "text" : "password"}
              placeholder="buat password"
              className="
                w-full
                border
                border-gray-300
                rounded-md
                py-3
                pl-10
                pr-12
                focus:outline-none
                focus:border-red-500
              "
              {...register("password", {
                required: "Password wajib diisi",
                minLength: {
                  value: 8,
                  message: "Password minimal 8 karakter",
                },
              })}
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              className="
                absolute
                right-3
                top-1/2
                -translate-y-1/2
                text-gray-400
              "
            >
              {showPassword ? (
                <HiOutlineEyeOff size={20} />
              ) : (
                <HiOutlineEye size={20} />
              )}
            </button>
          </div>
            {/* Konfirmasi Password */}
            <div className="relative mb-4">
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
                showConfirmPassword
                  ? "text"
                  : "password"
              }
              placeholder="konfirmasi password"
              className="
                w-full
                border
                border-gray-300
                rounded-md
                py-3
                pl-10
                pr-12
                focus:outline-none
                focus:border-red-500
              "
              {...register("confirmPassword", {
                required: "Konfirmasi password wajib diisi",
                validate: (value) =>
                  value === password ||
                  "Password tidak sama",
              })}
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(
                  !showConfirmPassword
                )
              }
              className="
                absolute
                right-3
                top-1/2
                -translate-y-1/2
                text-gray-400
              "
            >
              {showConfirmPassword ? (
                <HiOutlineEyeOff size={20} />
              ) : (
                <HiOutlineEye size={20} />
              )}
            </button>
          </div>

            <button
              type="submit"
              className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-md font-medium transition"
            >
              Registrasi
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            sudah punya akun?{" "}
            <Link
              to="/"
              className="text-red-500 font-semibold"
            >
              login di sini
            </Link>
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="hidden lg:block lg:w-1/2">
        <img
          src={registerImage}
          alt="register"
          className="w-full h-screen object-cover"
        />
      </div>
    </div>
  );
}

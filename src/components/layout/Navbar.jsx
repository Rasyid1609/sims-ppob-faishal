import React from 'react'
import { Link, NavLink } from "react-router-dom";
import logo from "../../../public/logo.png";

export default function Navbar() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/home" className="flex items-center gap-2">
            <img
                src={logo}
                alt="SIMS PPOB"
                className="w-7 h-7"
            />

            <span className="font-bold text-sm">
                SIMS PPOB
            </span>
        </Link>

        {/* Menu */}
        <nav className="flex items-center gap-8 text-sm font-medium">
          <NavLink
            to="/topup"
            className={({ isActive }) =>
              isActive
                ? "text-red-500"
                : "text-gray-800 hover:text-red-500"
            }
          >
            Top Up
          </NavLink>

          <NavLink
            to="/transaction"
            className={({ isActive }) =>
              isActive
                ? "text-red-500"
                : "text-gray-800 hover:text-red-500"
            }
          >
            Transaction
          </NavLink>

          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive
                ? "text-red-500"
                : "text-gray-800 hover:text-red-500"
            }
          >
            Akun
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

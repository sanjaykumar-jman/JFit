import React from "react";
import "./Topbar.scss"
import { FaBars } from "react-icons/fa"; // Importing a hamburger icon

export default function Topbar() {
  return (
    <header className="flex justify-between items-center p-3 md:p-5 bg-white rounded-xl md:rounded-2xl shadow-md">
      
      {/* Hamburger Icon */}
      <div className="text-lg md:text-xl text-gray-800 cursor-pointer transition-transform duration-200 hover:scale-110">
        <FaBars />
      </div>

      {/* User Info */}
      <div className="flex items-center gap-3">
        <img
          src="/user-logo.png"
          alt="User"
          className="w-9 h-9 md:w-12 md:h-12 rounded-full border-2 border-blue-500"
        />
        <span className="text-sm md:text-lg font-bold text-gray-800">John Doe</span>
      </div>
      
    </header>
  );
}

import React, {useState, useEffect} from "react";
import { FaBars } from "react-icons/fa"; // Importing a hamburger icon
import { useNavigate } from "react-router-dom";
import { supabase } from "../config/supabaseClient";

export default function Topbar() {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <header className="flex justify-between items-center p-3 md:p-5 bg-white rounded-xl md:rounded-2xl shadow-md">
      
      {/* Hamburger Icon */}
      <div className="text-lg md:text-xl text-gray-800 cursor-pointer transition-transform duration-200 hover:scale-110"
      >
        <FaBars />
      </div>

      {/* User Info */}
      <div className="flex items-center gap-3">
        <img
          src="/user-logo.png"
          alt="User"
          className="w-9 h-9 md:w-12 md:h-12 rounded-full border-2 border-blue-500"
          onClick={handleLogout}
        />
        <span className="text-sm md:text-lg font-bold text-gray-800">{user?.email}</span>
      </div>
      
    </header>
  );
}

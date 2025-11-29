import { Home, Menu, X } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

function Topbar({ isSidebarOpen, setIsSidebarOpen }) {
  return (
    <div
      className="h-16 flex items-center justify-between px-5 border-b border-gray-200 min-w-full"
      style={{ backgroundColor: "#3a5b22" }}
    >
      <div className=" flex items-center">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className={` z-50 p-1.5 mr-5 rounded-lg shadow-lg bg-white text-[#3a5b22] transition-all duration-300`}
        >
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <h1 className="text-white text-xl font-bold">Admin Panel</h1>
      </div>
      <div className="bg-white px-2 py-1.5 rounded-2xl text-[#3a5b22]">
        <Link to={"/"}>
          {" "}
          <span className="flex items-center justify-center gap-1">
            <Home /> Home
          </span>
        </Link>
      </div>
    </div>
  );
}

export default Topbar;

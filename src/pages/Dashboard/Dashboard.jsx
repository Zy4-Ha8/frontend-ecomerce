import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import Topbar from "./Topbar";
import { useSelector } from "react-redux";

function Dashboard() {
  const pageWidth = useSelector((state) => state.pageWidth);
  const [isSidebarOpen, setIsSidebarOpen] = useState(!pageWidth.isMoblie);
  console.log(pageWidth);
  return (
    <div>
      <Topbar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <div className="flex ">
        <Sidebar isSidebarOpen={isSidebarOpen} />
        <div className={`relative w-full`}>
          <Outlet />
          <div
            className={` transition-all duration-300 ${
              pageWidth.isTablet && isSidebarOpen ? "static" : "hidden"
            }`}
          >
            <div
              className={`absolute top-0 left-0 w-full h-full bg-black/80 z-100 `}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import Topbar from "./Topbar";

function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div>
      <Topbar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <div className="flex ">
        <Sidebar isSidebarOpen={isSidebarOpen} />
        <div className={`relative`}>
          <Outlet />
         {/* {isSidebarOpen && <div className="absolute top-0 left-0 w-full h-full bg-black/80 z-100" ></div>} */}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

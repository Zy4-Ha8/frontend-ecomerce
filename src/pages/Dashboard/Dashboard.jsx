import React from "react";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

function Dashboard() {
  return (
    <div>
      <Topbar />
      <div>
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;

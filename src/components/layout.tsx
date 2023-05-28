import React from "react";
import Navbar from "./navbar";
import Sidebar from "./sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen flex flex-row">
      <Sidebar />
      <div className="flex flex-col w-full">
        <div className="flex-1 bg-gray-50">{children}</div>
      </div>
    </div>
  );
};

export default Layout;

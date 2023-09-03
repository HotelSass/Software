import React from "react";
import Sidebar from "./sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen flex flex-row">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-y-scroll">
        <div className="flex-1 bg-white">{children}</div>
      </div>
    </div>
  );
};

export default Layout;

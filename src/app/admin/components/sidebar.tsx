"use client";
import { SidebarInfo } from "@/app/admin/data/SidebarInfo";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Sidebar = () => {
  const routeUrl = "/admin/" + usePathname()?.split("/")[2];
  return (
    <div
      className="bg-[#F7F7FF] py-4 w-56 border-r px-4"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <div className="flex flex-row w-full px-4 text-[28px] font-extrabold text-purple-600">
        nyano
      </div>
      <div className="flex flex-col mt-10">
        <p className="text-[12px] font-bold ml-2">Setup</p>
        {Object.entries(SidebarInfo).map(([key, item]) => (
          <Link
            href={item.location}
            key={key}
            className={
              "flex flex-row w-11/12 mx-auto py-3 rounded-lg space-x-5 "
            }
          >
            <div className="mr-auto">
              {React.cloneElement(item.icon, {
                size: item.size,
                color: "#9957cf",
              })}
            </div>

            <div className={"text-[12px] my-auto font-normal text-left  flex-1 text-gray-700"}>
              {item.title}
            </div>

          </Link>
        ))}

      </div>
    </div>
  );
};

export default Sidebar;

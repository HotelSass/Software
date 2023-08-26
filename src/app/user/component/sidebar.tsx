"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { UserSidebarInfo } from "../data/SidebarInfo";

const Sidebar = () => {
  const routeUrl = "/user/" + usePathname()?.split("/")[2];
  return (
    <div
      className="bg-blue-900 py-10 w-40"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <div className="flex flex-row w-full space-x-4 p-4">
        <Image
          src="/images/profile.jpg"
          width={55}
          height={55}
          className="rounded-2xl mx-auto"
          alt="Profile Picture"
        />
        <div className=" flex-col hidden">
          <div className="text-[18px] font-normal">Sid</div>
          <div className="text-[13px] font-light text-gray-400">
            Hotel Manager
          </div>
        </div>
      </div>
      <div className="flex flex-col mt-10">
        {Object.entries(UserSidebarInfo).map(([key, item]) => (
          <Link
            href={item.location}
            key={key}
            className={
              routeUrl == item.location
                ? "flex flex-row bg-[#F1F6FE] w-11/12 mx-auto p-3 py-3 rounded-lg space-x-5 border border-blue-100 ring-blue-600"
                : "flex flex-row w-11/12 mx-auto p-3 py-3 rounded-lg space-x-5 border border-blue-900 "
            }
          >
            <div className="mr-auto">
              {React.cloneElement(item.icon, {
                size: item.size,
                color: routeUrl == item.location ? item.color : "#cfcfcf",
              })}
            </div>
            {routeUrl == item.location ?
              <div className={"text-[12px] my-auto font-normal text-left  flex-1"}>
                {item.title}
              </div>
              :
              <div className={"text-[12px] my-auto font-normal text-left  flex-1 text-white"}>
                {item.title}
              </div>
            }
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;

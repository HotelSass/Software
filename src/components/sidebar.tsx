"use client";
import { SidebarInfo } from "@/data/SidebarInfo";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Sidebar = () => {
  const routeUrl = "/"+usePathname().split("/")[1];
  return (
    <div
      className="bg-blue-900 py-10 w-70"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <div className="flex flex-row w-full space-x-4 p-4">
        <Image
          src="/images/profile.jpg"
          width={55}
          height={55}
          className="rounded-2xl"
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
        {Object.entries(SidebarInfo).map(([key, item]) => (
          <Link
            href={item.location}
            key={key}
            className={
              routeUrl == item.location
                ? "flex flex-row bg-[#F1F6FE] w-10/12 mx-auto p-4 rounded-lg space-x-5 border border-blue-100 ring-blue-600"
                : "flex flex-row w-11/12 mx-auto p-4 rounded-lg space-x-5"
            }
          >
            <div className="mx-auto">
            {React.cloneElement(item.icon, {
              size: item.size,
              color: routeUrl == item.location ? item.color : "#5f5f5f",
            })}
            </div>
            <div className={"text-[13px] my-auto font-medium hidden"}>
              {item.title}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;

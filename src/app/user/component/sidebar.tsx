"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { BiHotel } from "react-icons/bi";
import { UserClientInfo, UserFinanceInfo, UserPastInfo, UserRestaurantInfo, UserSidebarInfo } from "../data/SidebarInfo";

const Sidebar = () => {
  const routeUrl = "/admin/" + usePathname()?.split("/")[2];
  return (
    <div
      className="bg-[#F7F7FF] py-4 w-56 border-r"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <div className="flex flex-row w-full px-8 mt-8 mb-5">
        <BiHotel className="my-auto" size={30} color="#6b02c9" />
        <p className="my-auto ml-2 text-[28px] font-extrabold text-[#504499]">
          nyano
        </p>
      </div>
      <p className="text-[12px] font-bold ml-2 text-gray-600 mt-3 mb-1 px-4">Hotel</p>

      <div className="flex flex-col border-b pb-4">
        {Object.entries(UserSidebarInfo).map(([key, item]) => (
          <Link
            href={item.location}
            key={key}
            className={
              "flex flex-row w-full mx-auto py-3 px-4 space-x-3 hover:bg-purple-100 "
            }
          >
            <div className="mr-auto">
              {React.cloneElement(item.icon, {
                size: 22,
                color: "#770ccc",
              })}
            </div>

            <div className={"text-[12px] my-auto font-normal text-left  flex-1 text-gray-700"}>
              {item.title}
            </div>

          </Link>
        ))}

      </div>
      <p className="text-[12px] font-bold ml-2 text-gray-600 mt-5 mb-1 px-4">Restaurant</p>

      <div className="flex flex-col border-b pb-4">
        {Object.entries(UserRestaurantInfo).map(([key, item]) => (
          <Link
            href={item.location}
            key={key}
            className={
              "flex flex-row w-full mx-auto py-3 px-4 space-x-3 hover:bg-purple-100 "
            }
          >
            <div className="mr-auto">
              {React.cloneElement(item.icon, {
                size: 22,
                color: "#770ccc",
              })}
            </div>

            <div className={"text-[12px] my-auto font-normal text-left  flex-1 text-gray-700"}>
              {item.title}
            </div>

          </Link>
        ))}

      </div>
      <p className="text-[12px] font-bold ml-2 text-gray-600 mt-5 mb-1 px-4">Client</p>

      <div className="flex flex-col border-b pb-4">
        {Object.entries(UserClientInfo).map(([key, item]) => (
          <Link
            href={item.location}
            key={key}
            className={
              "flex flex-row w-full mx-auto py-3 px-4 space-x-3 hover:bg-purple-100 "
            }
          >
            <div className="mr-auto">
              {React.cloneElement(item.icon, {
                size: 22,
                color: "#770ccc",
              })}
            </div>

            <div className={"text-[12px] my-auto font-normal text-left  flex-1 text-gray-700"}>
              {item.title}
            </div>

          </Link>
        ))}

      </div>
      <p className="text-[12px] font-bold ml-2 text-gray-600 mt-5 mb-1 px-4">Finance</p>

      <div className="flex flex-col border-b pb-4">
        {Object.entries(UserFinanceInfo).map(([key, item]) => (
          <Link
            href={item.location}
            key={key}
            className={
              "flex flex-row w-full mx-auto py-3 px-4 space-x-3 hover:bg-purple-100 "
            }
          >
            <div className="mr-auto">
              {React.cloneElement(item.icon, {
                size: 22,
                color: "#770ccc",
              })}
            </div>

            <div className={"text-[12px] my-auto font-normal text-left  flex-1 text-gray-700"}>
              {item.title}
            </div>

          </Link>
        ))}

      </div>
      <p className="text-[12px] font-bold ml-2 text-gray-600 mt-5 mb-1 px-4">History</p>

      <div className="flex flex-col border-b pb-4">
        {Object.entries(UserPastInfo).map(([key, item]) => (
          <Link
            href={item.location}
            key={key}
            className={
              "flex flex-row w-full mx-auto py-3 px-4 space-x-3 hover:bg-purple-100 "
            }
          >
            <div className="mr-auto">
              {React.cloneElement(item.icon, {
                size: 22,
                color: "#770ccc",
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

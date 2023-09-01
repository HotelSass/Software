import Layout from "@/app/admin/components/layout";
import React from "react";
import FutureUpdate from "@/components/futureUpdate";
import { Server } from "./server/server";

const page = () => {
  return (
    <Layout>
      <div className="flex flex-col">
        <div className="flex">
          <div className=" pt-6 pl-6 text-[44px] font-bold text-gray-700 my-auto">
            Settings
          </div>
          <div className="ml-auto my-auto mr-5 flex flex-col mt-8">

            <div className="relative flex items-center w-full h-14 rounded-lg focus-within:shadow-lg border border-purple-700 bg-purple-50 overflow-hidden px-3">
              <div className="grid place-items-center h-full w-12 text-purple-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              <input
                className="peer h-full w-full outline-none text-sm text-purple-800 pr-2 bg-purple-50 placeholder:text-purple-300"
                type="text"
                id="search"
                placeholder="Search settings..." />
            </div>
            <div className=" py-2">
              <FutureUpdate />
            </div>
          </div>
        </div>
        {/* @ts-expect-error Async Server Component */}
        <Server />

      </div>
    </Layout>
  );
};

export default page;

import Layout from "@/app/admin/components/layout";
import React from "react";
import RoomCard from "./server/RoomCard";
import RoomTableServer from "./server/RoomTable";

export default async function Page() {
  return (
    <Layout>
      <div className="flex flex-col p-6">
        <div className="text-[44px] font-bold text-gray-700 my-auto">
          Restaurant
        </div>
        {/* @ts-expect-error Async Server Component */}
        <RoomCard />
        <div className="pl-2 py-6 text-[20px] font-bold text-gray-600">Table List</div>
        {/* @ts-expect-error Async Server Component */}
        <RoomTableServer />
      </div>
    </Layout>
  );
};

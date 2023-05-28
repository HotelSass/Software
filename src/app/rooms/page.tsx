import Card from "@/components/card";
import Layout from "@/components/layout";
import React from "react";
import RoomTable from "./roomTable";
const page = () => {
  return (
    <Layout>
      <div className="flex flex-col">
        <div className=" pt-8 pl-12 text-[30px] font-bold text-gray-600">Rooms</div>
        <div className="flex flex-row p-8 flex-wrap">
          <Card title={"Rooms"} number={16} />
        </div>
        <div className="px-8 ">
        <div className="pl-2 pb-4 text-[20px] font-bold text-gray-600">Room List</div>

          <RoomTable />
        </div>
      </div>
    </Layout>
  );
};

export default page;

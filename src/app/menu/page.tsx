'use client'
import Card from "@/components/card";
import Layout from "@/components/layout";
import React from "react";
import MenuTable from "./menuTable";
import CardSmall from "@/components/cardSmall";
const page = () => {
  return (
    <Layout>
      
      <div className="flex flex-col">
        <div className=" pt-8 pl-12 text-[30px] font-bold text-gray-600">Menu</div>
        <div className="flex flex-row p-8 flex-wrap">
          <Card title={"Items"} number={5} />
          <Card title={"Category"} number={5} />
        </div>
        <div className="pl-12 text-[20px] font-bold text-gray-600"> Category</div>
        <div className="flex flex-row p-8 flex-wrap">
          <CardSmall color="#008011" title={"Veg"} number={5} />
          <CardSmall color="#590405" title={"Non-Veg"} number={5} />
          <CardSmall color="#440080" title={"Vegan"} number={5} />
        </div>
        <div className="px-8 ">
        <div className="pl-2 pb-4 text-[20px] font-bold text-gray-600">Menu List</div>
          <MenuTable />
        </div>
      </div>
    </Layout>
  );
};

export default page;

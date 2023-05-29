'use client'
import Card from "@/components/card";
import Layout from "@/components/layout";
import React from "react";
import RestaurantTable from "./restaurantTable";
const page = () => {
  return (
    <Layout>
      
      <div className="flex flex-col">
        <div className=" pt-8 pl-12 text-[30px] font-bold text-gray-600">Restaurant</div>
        <div className="flex flex-row p-8 flex-wrap">
          <Card title={"Table"} number={5} />
        </div>
        <div className="px-8 ">
        <div className="pl-2 pb-4 text-[20px] font-bold text-gray-600">Table List</div>
          <RestaurantTable />
        </div>
      </div>
    </Layout>
  );
};

export default page;

import Card from "@/components/card";
import Layout from "@/app/admin/components/layout";
import React from "react";
import InventoryTableServer from "./server/inventoryTableServer";
import CardServer from "./server/CardServer";
const page = () => {
  return (
    <Layout>

      <div className="flex flex-col p-6">
        <div className="text-[44px] font-bold text-gray-700 my-auto">
          Inventory
        </div>
        <div className="flex flex-row  flex-wrap">
          {/* @ts-expect-error Async Server Component */}
          <CardServer />
        </div>

        <div className="mt-7">
          <div className=" pb-4 text-[20px] font-bold text-gray-600">
            Inventory List
          </div>
          {/* @ts-expect-error Async Server Component */}
          <InventoryTableServer />
        </div>
      </div>
    </Layout>
  );
};

export default page;

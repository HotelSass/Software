import Card from "@/components/card";
import Layout from "@/app/admin/components/layout";
import React from "react";
import InventoryTableServer from "./server/inventoryTableServer";
import CardServer from "./server/CardServer";
const page = () => {
  return (
    <Layout>

      <div className="flex flex-col">
        <div className=" pt-8 pl-12 text-[30px] font-bold text-gray-600">
          Inventory
        </div>
        <div className="flex flex-row p-8 flex-wrap">
          {/* @ts-expect-error Async Server Component */}
          <CardServer />
        </div>

        <div className="px-8 ">
          <div className="pl-2 pb-4 text-[20px] font-bold text-gray-600">
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

import Layout from "@/app/admin/components/layout";
import { Modal } from "@nextui-org/react";
import React from "react";
import Server from "./server/server";

const page = () => {
  return (
    <Layout>
      <div className="flex flex-col">
        <div className=" pt-8 pl-8 text-[24px] font-bold text-gray-600">
          Settings
        </div>
        <Server/>
        
      </div>
    </Layout>
  );
};

export default page;

import React from "react";
import Layout from "../component/layout";
import POSServer from "./server/POSServer";

const Restaurant = () => {

  return (
    <Layout>
      <div className="p-8 w-ful h-full flex flex-col">
        <div className="text-[32px] font-thin tracking-tight">Bar </div>
        {/* @ts-expect-error Async Server Component */}
        <POSServer />
      </div>
    </Layout>
  );
};

export default Restaurant;

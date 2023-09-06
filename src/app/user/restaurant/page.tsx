import React from "react";
import Layout from "../component/layout";
import POSServer from "./server/POSServer";

const Restaurant = () => {

  return (
    <Layout>
      <div className="p-8 w-ful h-full flex flex-col">
        <div className="flex flex-col">
          <p className='text-[30px] font-semibold mb-2'>KOT</p>
          <p className='text-[12px] text-gray-500 '>Take all restaurant/room orders here</p>
        </div>
        {/* @ts-expect-error Async Server Component */}
        <POSServer />
      </div>
    </Layout>
  );
};

export default Restaurant;

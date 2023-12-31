import React from "react";
import Layout from "../component/layout";
import NewBookingServer from "./server/NewBookingServer";
import InfoServer from "./server/InfoServer";

const Rooms = () => {
  const currentDate = new Date();
  const c_date = currentDate.getDate();
  const c_month = currentDate.getMonth();
  const c_year = currentDate.getFullYear();

  const c_month_name = currentDate.toLocaleDateString("en-US", {
    month: "short",
  });

  return (
    <Layout>
      <div className="w-full flex flex-col px-6">
        <div className=" pt-6 text-[44px] font-bold text-gray-700 my-auto">
          Bookings
        </div>
        <div className="flex flex-row">
          <div className="flex flex-row space-x-2 flex-1">
            <div className="text-[28px] font-thin">{c_date}</div>
            <div className="text-[28px] font-thin">{c_month_name}</div>
            <div className="text-[28px] font-thin">{c_year}</div>
          </div>

          {/* @ts-expect-error Async Server Component */}
          <NewBookingServer />
        </div>
        <div className="flex-1 mt-10">
          {/* @ts-expect-error Async Server Component */}

          <InfoServer />

        </div>
      </div>
    </Layout>
  );
};

export default Rooms;

/*
 <InfoServer />

 */
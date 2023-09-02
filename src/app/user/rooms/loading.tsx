import React from "react";
import Layout from "../component/layout";
import NewBookingServer from "./server/NewBookingServer";
import InfoServer from "./server/InfoServer";
import CalenderServer from "./server/CalenderServer";

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
            <div className="w-full p-8 flex flex-col">
                <div className="text-[20px] font-thin tracking-tight">Booking</div>
                <div className="flex flex-row">
                    <div className="flex flex-row space-x-4 flex-1">
                        <div className="text-[36px] font-thin">{c_date}</div>
                        <div className="text-[36px] font-thin">{c_month_name}</div>
                        <div className="text-[36px] font-thin">{c_year}</div>
                    </div>
                    <div role="status" className="space-y-2.5 animate-pulse max-w-lg">
                        <div className="flex items-center w-full space-x-2">
                            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32"></div>
                            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
                            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                        </div>
                        <div className="flex items-center w-full space-x-2 max-w-[480px]">
                            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
                        </div>

                        <span className="sr-only">Loading...</span>
                    </div>


                </div>
                <div className="flex-1 mt-10">



                </div>
                <div className=" flex flex-row">

                    <div role="status" className="max-w-sm p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700">

                        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                        <div className="flex items-center mt-4 space-x-3">

                            <div>
                                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
                                <div className="w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                            </div>
                        </div>
                        <span className="sr-only">Loading...</span>
                    </div>
                    <div role="status" className="max-w-sm p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700">

                        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                        <div className="flex items-center mt-4 space-x-3">

                            <div>
                                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
                                <div className="w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                            </div>
                        </div>
                        <span className="sr-only">Loading...</span>
                    </div>



                </div>

            </div>
        </Layout>
    );
};

export default Rooms;

/*
 <InfoServer />

 */
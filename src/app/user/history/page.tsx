import React from "react";
import Layout from "../component/layout";
import BillServer from "./server/billServer";


const History = () => {

    const currentDate = new Date();
    const c_date = currentDate.getDate();
    const c_month = currentDate.getMonth();
    const c_year = currentDate.getFullYear();

    const c_month_name = currentDate.toLocaleDateString("en-US", {
        month: "short",
    });

    return (
        <Layout>
            <div className="w-full px-6 flex flex-col">
                <div className=" pt-6 text-[44px] font-bold text-gray-700 my-auto">
                    Billings History
                </div>
                <div className="flex flex-row">
                    <div className="flex flex-row space-x-2 flex-1">
                        <div className="text-[36px] font-thin">{c_date}</div>
                        <div className="text-[36px] font-thin">{c_month_name}</div>
                        <div className="text-[36px] font-thin">{c_year}</div>
                    </div>
                </div>
                <div className="flex-1 mt-5">
                    {/* @ts-expect-error Async Server Component */}

                    <BillServer />
                </div>
            </div>
        </Layout>
    );
};

export default History;

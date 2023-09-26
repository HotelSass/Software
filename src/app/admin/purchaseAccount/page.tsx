import React from "react";
import Layout from "../components/layout";
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
            <div className="w-full p-8 flex flex-col">
                <div className="text-[20px] font-thin tracking-tight">Purchase Account</div>
                
                <div className="flex-1 mt-5">
                    {/* @ts-expect-error Async Server Component */}
                    <BillServer />
                </div>
            </div>
        </Layout>
    );
};

export default History;

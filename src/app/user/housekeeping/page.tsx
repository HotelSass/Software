import React from "react";
import Layout from "../component/layout";
import Server from "./server/Server";
import LaundryServer from "./server/LaundryServer";


const History = () => {

    return (
        <Layout>
            <div className="w-full p-8 flex flex-col">
                <div className="px-4 flex flex-row">
                    <div className="flex flex-col">
                        <p className='text-[30px] font-semibold mb-2'>Laundry</p>
                        <p className='text-[12px] text-gray-500 '>Manage the laundry sent for cleaning</p>
                    </div>
                    {/* @ts-expect-error Async Server Component */}
                    <Server />
                </div>
                <div className="mt-6">
                    {/* @ts-expect-error Async Server Component */}
                    <LaundryServer />
                </div>

            </div>
        </Layout>
    );
};

export default History;

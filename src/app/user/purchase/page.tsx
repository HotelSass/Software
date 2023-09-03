import React from "react";
import Layout from "../component/layout";
import Client from "./client/client";


const History = () => {

    return (
        <Layout>
            <div className="w-full p-8 flex flex-col">
                <div className="text-[24px] font-semibold text-gray-700 tracking-tight border-b border-b-gray-200 pb-4">Billings</div>
                <Client />

            </div>
        </Layout>
    );
};

export default History;

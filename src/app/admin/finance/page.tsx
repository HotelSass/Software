import React from "react";
import Layout from "../components/layout";
import BillServer from "./server/billServer";


const Finance = () => {
    return (
        <Layout>
            <div className="w-full px-6 flex flex-col">
                <div className="flex-1 mt-5">
                    {/* @ts-expect-error Async Server Component */}
                    <BillServer />
                </div>
            </div>
        </Layout>
    );
};

export default Finance;

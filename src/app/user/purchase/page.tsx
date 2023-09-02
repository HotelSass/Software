'use client'
import React, { useState } from "react";
import Layout from "../component/layout";
import serverUrl from "@/config/config";
import { useRouter } from "next/navigation";
import Server from "./server/server";


const History = () => {
    const router = useRouter()

    return (
        <Layout>
            <div className="w-full p-8 flex flex-col">
                <div className="text-[24px] font-semibold text-gray-700 tracking-tight border-b border-b-gray-200 pb-4">Billings</div>
                <Server />

            </div>
        </Layout>
    );
};

export default History;

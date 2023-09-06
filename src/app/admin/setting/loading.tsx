import Layout from "@/app/admin/components/layout";
import React from "react";
import FutureUpdate from "@/components/futureUpdate";

const page = () => {
    return (
        <Layout>
            <div className="flex flex-col">
                <div className="flex">
                    <div className=" pt-6 pl-6 text-[44px] font-bold text-gray-700 my-auto">
                        Settings
                    </div>
                    <div className="ml-auto my-auto mr-5 flex flex-col mt-8">

                        <div className="relative flex items-center w-full h-14 rounded-lg focus-within:shadow-lg border border-purple-700 bg-purple-50 overflow-hidden px-3">
                            <div className="grid place-items-center h-full w-12 text-purple-700">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>

                            <input
                                className="peer h-full w-full outline-none text-sm text-purple-800 pr-2 bg-purple-50 placeholder:text-purple-300"
                                type="text"
                                id="search"
                                placeholder="Search settings..." />
                        </div>
                        <div className=" py-2">
                            <FutureUpdate />
                        </div>
                    </div>
                </div>
                <div className='p-6 px-8 flex flex-row h-full'>
                    <div className="w-48 border-r border-gray-300 h-3/4 flex flex-col">

                        <div className="w-48 border-r border-gray-300 h-3/4 flex flex-col">
                            <button type='button' className='text-[14px] font-thin text-gray-700 hover:bg-gray-100 p-2 py-3 cursor-pointer border-b border-b-gray-100 mr-2 text-left'>
                                Measurement Metrics
                            </button>
                            <button type='button' className='text-[14px] font-thin text-gray-700 hover:bg-gray-100 p-2 py-3 cursor-pointer border-b border-b-gray-100 mr-2 text-left'>
                                Vendors
                            </button>
                            <button type='button' className='text-[14px] font-thin text-gray-700 hover:bg-gray-100 p-2 py-3 cursor-pointer border-b border-b-gray-100 mr-2 text-left'>
                                Storage Location
                            </button>
                            <button type='button' className='text-[14px] font-thin text-gray-700 hover:bg-gray-100 p-2 py-3 cursor-pointer border-b border-b-gray-100 mr-2 text-left'>
                                Bank Detail
                            </button>
                        </div>

                    </div>
                    <div className="flex-1 px-4 flex flex-col pl-16">

                        <div role="status" className="max-w-full p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700 w-full">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                                    <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                                </div>
                                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                            </div>
                            <div className="flex items-center justify-between pt-4">
                                <div>
                                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                                    <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                                </div>
                                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                            </div>
                            <div className="flex items-center justify-between pt-4">
                                <div>
                                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                                    <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                                </div>
                                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                            </div>
                            <div className="flex items-center justify-between pt-4">
                                <div>
                                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                                    <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                                </div>
                                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                            </div>
                            <div className="flex items-center justify-between pt-4">
                                <div>
                                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                                    <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                                </div>
                                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                            </div>
                            <span className="sr-only">Loading...</span>
                        </div>

                    </div>

                </div>

            </div>
        </Layout>
    );
};

export default page;

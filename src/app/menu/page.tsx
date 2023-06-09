"use client";
import Card from "@/components/card";
import Layout from "@/components/layout";
import React, { useState } from "react";
import MenuTable from "./menuTable";
import CardSmall from "@/components/cardSmall";
import { BiPlus } from "react-icons/bi";
import Modal from "@/components/modal";
const page = () => {
  const [open,setOpen]=useState(false)
  return (
    <Layout>
      <Modal width={450} open={open} setOpen={setOpen}>
        <div className="p-2 flex flex-col space-y-4 pb-8">
          <div className="pl-2 text-[26px] font-bold text-gray-600">
            Add New Category
          </div>
          <div className="flex flex-col">
            <label className="font-medium text-ssm ml-2" htmlFor="roomNumber">
              Room Name
            </label>
            <input
              placeholder="Room Description"
              type="text"
              id="roomNumber"
              className=" placeholder:text-ssm  placeholder:text-gray-500 align-middle block flex-1 p-3  border border-gray-300 rounded-lg bg-gray-50 text-sm text-gray-700 w-full"
            />
          </div>
          
          <div className="border-red-500 border bg-red-50 text-center p-3 text-ssm rounded-lg text-red-700">
            Category Already Exists
          </div>
          <button
            type="button"
            className="w-full mt-4 p-4 font-bold text-white bg-blue-800 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2  dark:border-gray-900"
          >
            Add New Category
          </button>
        </div>
      </Modal>
      <div className="flex flex-col">
        <div className=" pt-8 pl-12 text-[30px] font-bold text-gray-600">
          Menu
        </div>
        <div className="flex flex-row p-8 flex-wrap">
          <Card title={"Items"} number={5} />
          <Card title={"Category"} number={5} />
        </div>
        <div className="flex">
          <div className="pl-12 text-[20px] my-auto font-bold text-gray-600">
            Category
          </div>
          <button
            onClick={() => setOpen(true)}
            className=" bg-green-600 p-3 ml-auto my-auto mx-8 rounded-md flex flex-row text-ssm text-white space-x-2"
          >
            <BiPlus color="white" size={24} className="my-auto" />
            <div className="my-auto">Add New Category</div>
          </button>
        </div>
        <div className="flex flex-row p-8 flex-wrap">
          <CardSmall color="#008011" title={"Veg"} number={5} />
          <CardSmall color="#590405" title={"Non-Veg"} number={5} />
          <CardSmall color="#440080" title={"Vegan"} number={5} />
          <CardSmall color="#440080" title={"Vegan"} number={5} />
          <CardSmall color="#440080" title={"Vegan"} number={5} />
          <CardSmall color="#440080" title={"Vegan"} number={5} />
        </div>
        <div className="px-8 ">
          <div className="pl-2 pb-4 text-[20px] font-bold text-gray-600">
            Menu List
          </div>
          <MenuTable />
        </div>
      </div>
    </Layout>
  );
};

export default page;

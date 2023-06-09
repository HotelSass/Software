import Modal from "@/components/modal";
import {
  InventoryInfo,
  InventoryLabel,
  MenuInfo,
  MenuLabel,
  RoomInfo,
  RoomLabel,
  TableInfo,
  TableLabel,
} from "@/data/RoomTableInfo";
import React, { useState } from "react";
import { BiFilterAlt, BiPencil, BiPlus, BiTrashAlt } from "react-icons/bi";

const InventoryTable = () => {
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  return (
    <div className=" flex flex-col">
      <Modal width={450} open={openEdit} setOpen={setOpenEdit}>
        <div className="p-2 flex flex-col space-y-4 pb-8">
          <div className="pl-2 text-[26px] font-bold text-gray-600">
            Edit Item
          </div>

          <div className="flex flex-col">
            <label className="font-medium text-ssm ml-2" htmlFor="roomNumber">
              Item Name
            </label>
            <input
              placeholder="Table Number"
              type="text"
              id="tableNumber"
              className=" placeholder:text-ssm  placeholder:text-gray-500 align-middle block flex-1 p-3  border border-gray-300 rounded-lg bg-gray-50 text-sm text-gray-700 w-full"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-medium text-ssm ml-2" htmlFor="tableNumber">
              Item Description
            </label>
            <input
              placeholder="Table Description"
              type="text"
              id="tableNumber"
              className=" placeholder:text-ssm  placeholder:text-gray-500 align-middle block flex-1 p-3  border border-gray-300 rounded-lg bg-gray-50 text-sm text-gray-700 w-full"
            />
          </div>
          <div className="flex flex-col">
            <label
              className="font-medium text-ssm ml-2"
              htmlFor="tableCapacity"
            >
              Category
            </label>
            <div className="flex flex-col">
              <select
                placeholder="Capacity"
                id="roomCapacity"
                className=" placeholder:text-ssm  placeholder:text-gray-500 align-middle block flex-1 p-3  border border-gray-300 rounded-lg bg-gray-50 text-ssm text-gray-700 w-full"
              >
                <option value="">Select...</option>
                <option value="premium">Veg</option>
                <option value="normal">Non Veg</option>
                <option value="couple">Vegan</option>
              </select>
            </div>
          </div>

          <div className="border-red-500 border bg-red-50 text-center p-3 text-ssm rounded-lg text-red-700">
            Item Already Exists
          </div>
          <button
            type="button"
            className="w-full mt-4 p-4 font-bold text-white bg-blue-800 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2  dark:border-gray-900"
          >
            Update Menu
          </button>
        </div>
      </Modal>
      <Modal width={450} open={open} setOpen={setOpen}>
        <div className="p-2 flex flex-col space-y-4 pb-8">
          <div className="pl-2 text-[26px] font-bold text-gray-600">
            Add Item
          </div>

          <div className="flex flex-col">
            <label className="font-medium text-ssm ml-2" htmlFor="roomNumber">
              Item Name
            </label>
            <input
              placeholder="Table Number"
              type="text"
              id="tableNumber"
              className=" placeholder:text-ssm  placeholder:text-gray-500 align-middle block flex-1 p-3  border border-gray-300 rounded-lg bg-gray-50 text-sm text-gray-700 w-full"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-medium text-ssm ml-2" htmlFor="tableNumber">
              Item Description
            </label>
            <input
              placeholder="Table Description"
              type="text"
              id="tableNumber"
              className=" placeholder:text-ssm  placeholder:text-gray-500 align-middle block flex-1 p-3  border border-gray-300 rounded-lg bg-gray-50 text-sm text-gray-700 w-full"
            />
          </div>
          <div className="flex flex-col">
            <label
              className="font-medium text-ssm ml-2"
              htmlFor="tableCapacity"
            >
              Category
            </label>
            <div className="flex flex-col">
              <select
                placeholder="Capacity"
                id="roomCapacity"
                className=" placeholder:text-ssm  placeholder:text-gray-500 align-middle block flex-1 p-3  border border-gray-300 rounded-lg bg-gray-50 text-ssm text-gray-700 w-full"
              >
                <option value="">Select...</option>
                <option value="premium">Veg</option>
                <option value="normal">Non Veg</option>
                <option value="couple">Vegan</option>
              </select>
            </div>
          </div>

          <div className="border-red-500 border bg-red-50 text-center p-3 text-ssm rounded-lg text-red-700">
            Item Already Exists
          </div>
          <button
            type="button"
            className="w-full mt-4 p-4 font-bold text-white bg-blue-800 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2  dark:border-gray-900"
          >
            Add Item
          </button>
        </div>
      </Modal>
      <Modal width={350} open={openDelete} setOpen={setOpenDelete}>
        <div className="p-2 flex flex-col space-y-16 pb-8">
          <div className="pl-2 text-[20px] font-bold text-gray-900">
            Confirm Delete Menu?
          </div>

          <button
            type="button"
            className="w-full mt-4 p-4 font-bold text-white bg-red-600 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2  dark:border-gray-900"
          >
            Delete Table
          </button>
        </div>
      </Modal>
      <div className=" flex flex-row pb-2 space-x-3">
        <input
          placeholder="Search"
          type="text"
          id="large-input"
          className=" placeholder:text-ssm h-12 placeholder:text-gray-500 align-middle block flex-1 p-2  border border-gray-300 rounded-lg bg-gray-50 text-sm text-gray-700"
        />
        <button className=" bg-gray-600 p-4 h-12 my-auto rounded-md">
          <BiFilterAlt color="white" />
        </button>
        <button
          onClick={() => setOpenDelete(true)}
          className=" bg-gray-600 p-4 h-12 my-auto rounded-md"
        >
          <BiTrashAlt color="white" />
        </button>
        <button
          onClick={() => setOpen(true)}
          className=" bg-green-600 p-3 h-12 my-auto rounded-md flex flex-row text-ssm text-white space-x-2"
        >
          <BiPlus color="white" size={24} className="my-auto" />
          <div className="my-auto">Add New Item</div>
        </button>
      </div>
      <table className="w-full">
        <thead>
          <tr className="bg-gray-300 ">
            <th className="py-3 px-3 font-light text-ssm text-left">
              <input
                id="checked-checkbox"
                type="checkbox"
                value=""
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
            </th>
            {Object.entries(InventoryLabel).map(([key, item]) => (
              <th className="py-3 px-3 font-light text-ssm text-left">
                {item}
              </th>
            ))}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(InventoryInfo).map(([key, item]) => (
            <tr className="bg-gray-100 border-b h-12">
              <td className="py-3 px-3 font-light text-ssm text-left">
                <input
                  id="checked-checkbox"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
              </td>
              <td className="p-2 text-ssm pl-3">{item.itemName}</td>
              <td className="p-2 text-ssm pl-3">{item.location}</td>
              <td className="p-2 pl-3 w-40 text-[10px] text-ellipsis">
                {item.quantity}
              </td>
              <td className="p-2 text-ssm pl-3">{item.date}2023/10/05</td>
              <td>
                <button
                  onClick={() => setOpenEdit(true)}
                  className=" p-2 rounded-lg"
                >
                  <BiPencil color="#8f8f8f" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryTable;

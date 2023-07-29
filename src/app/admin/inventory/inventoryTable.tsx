'use client'
import {
  InventoryLabel,
} from "@/app/admin/data/RoomTableInfo";
import React, { useState } from "react";
import { BiFilterAlt, BiMinus, BiPencil, BiPlus, BiPlusCircle, BiTrashAlt } from "react-icons/bi";
import AddItemModal from "./client/AddItemModal";
import EditItem from "./client/EditItem";
import serverUrl from "@/config/config";
import { useRouter } from "next/navigation";
import Add from "./client/Add";
import Deduct from "./client/Deduct";

const InventoryTable = ({ data }: any) => {
  const router = useRouter()
  const [openAdd, setOpenAdd] = useState(false)
  const [openDeduct, setOpenDeduct] = useState(false)
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState({})
  const deleteItem = async (item: any) => {
    try {

      const response = await fetch(serverUrl + "/inventory/deleteItem/" + item.toLowerCase(), {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      if (response.ok) {
        setOpenEdit(false)

      } else {
      }

    } catch (err) {
      console.log(err)
    }
    router.refresh()
  }

  //      <Deduct openAdd={openDeduct} setOpenAdd={setOpenDeduct} />

  return (
    <div className=" flex flex-col">
      <EditItem openEdit={openEdit} setOpenEdit={setOpenEdit} data={editData} />
      <Add openAdd={openAdd} setOpenAdd={setOpenAdd} data={editData} />
      <Deduct openDeduct={openDeduct} setOpenDeduct={setOpenDeduct} data={editData} />

      <AddItemModal />
      <table className="w-full">
        <thead>
          <tr className="bg-gray-300 ">
            <th className="py-3 px-3 font-light text-ssm text-left">

            </th>
            {Object.entries(InventoryLabel).map(([key, item]) => (
              <th key={key} className="py-3 px-3 font-light text-ssm text-left">
                {item}
              </th>
            ))}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((item: any, index: number) => (
            <tr key={index} className="bg-gray-100 border-b h-12">
              <td className="py-3 px-3 font-light text-ssm text-left">
                <button
                  onClick={() => {setOpenAdd(true);setEditData(item)}}
                  className=" rounded-lg"
                >
                  <BiPlus size={20} color="#3f3f3f" />
                </button>
                <button
                  onClick={() => {setOpenDeduct(true);setEditData(item)}}
                  className=" rounded-lg ml-3"
                >
                  <BiMinus size={20} color="#3f3f3f" />
                </button>
              </td>
              <td className="p-2 text-ssm pl-3">{item.itemName}</td>
              <td className="p-2 text-ssm pl-3">{item.location}</td>
              <td className="p-2 pl-3 w-40 text-[10px] text-ellipsis">
                {item.quantity}
              </td>
              <td className="p-2 text-ssm pl-3">{(new Date(item.date)).toISOString().split('T')[0]}</td>
              <td className="flex flex-row">

                <button
                  onClick={() => { setOpenEdit(true); setEditData(item) }}
                  className=" p-2 rounded-lg mx-auto"
                >
                  <BiPencil color="#8f8f8f" />
                </button>
                <button
                  onClick={() => deleteItem(item.itemName)}
                  className=" p-2 rounded-lg ml-auto"
                >
                  <BiTrashAlt color="#8f8f8f" />
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

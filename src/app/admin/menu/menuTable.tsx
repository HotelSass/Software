'use client'
import Modal from "@/components/modal";
import {
  MenuInfo,
  MenuLabel,
  RoomInfo,
  RoomLabel,
  TableInfo,
  TableLabel,
} from "@/app/admin/data/RoomTableInfo";
import React, { useState } from "react";
import { BiPencil, BiTrashAlt } from "react-icons/bi";
import UpdateItem from "./client/UpdateItem";
import serverUrl from "@/config/config";
import { useRouter } from "next/navigation";


const MenuTable = ({ data, category }: any) => {
  const router=useRouter()
  const [open, setOpen] = useState(false);
  async function deleteCategory(title: string) {
    try {
      const response = await fetch(serverUrl + "/menu/deleteMenu/"+title.toLowerCase(), {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        
      });
      if (response.ok) {
        setOpen(false)

      } else {
      }

    } catch (err) {
      console.log(err)
    }
    router.refresh()


  }
  const [selectedData, setSelectedData] = useState({})
  return (
    <div className=" flex flex-col">
      <UpdateItem open={open} setOpen={setOpen} data={selectedData} category={category} />
      <table className="w-full">
        <thead>
          <tr className="bg-gray-300 ">
            <th className="py-3 px-3 font-light text-ssm text-left">

            </th>
            {Object.entries(MenuLabel).map(([key, item]) => (
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

              </td>
              <td className="p-2 text-ssm pl-3">{item.itemName}</td>
              <td className="p-2 text-ssm pl-3">{item.category}</td>
              <td className="p-2 pl-3 w-40 text-[10px] text-ellipsis">
                {item.price}
              </td>
              <td className="p-2 text-ssm pl-3">{(new Date(item.date)).toISOString().split('T')[0]}</td>
              <td>
                <button
                  onClick={() => { setSelectedData(item); setOpen(true) }}
                  className=" p-2 rounded-lg"
                >
                 <BiPencil color="#8f8f8f" />
                </button>
                <button
                  onClick={() => { deleteCategory(item.itemName)}}
                  className=" p-2 rounded-lg"
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

export default MenuTable;

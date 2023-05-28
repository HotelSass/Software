import { RoomInfo, RoomLabel } from "@/data/RoomTableInfo";
import React from "react";

const RoomTable = () => {
  return (
    <table className="w-full">
      <thead>
        <tr className="bg-gray-300 ">
        {Object.entries(RoomLabel).map(([key, item]) => (
          <th className="py-3 pl-6 font-light text-ssm text-left">{item}</th>
        ))}
        </tr>
      </thead>
      <tbody>
        {Object.entries(RoomInfo).map(([key,item])=>(
            <tr className="bg-gray-100 border-b h-12">
                <td className="p-2 text-ssm pl-6">{item.roomNumber}</td>
                <td className="p-2 text-ssm pl-6">{item.roomRate}</td>
                <td className="p-2 text-ssm pl-6">{item.capacity}</td>
                <td className="p-2 pl-6 w-40 text-[10px] text-ellipsis">{item.description}</td>
                <td className="p-2 text-ssm pl-6">{item.type.toUpperCase()}</td>
                <td className="p-2 text-ssm pl-6">{item.date}</td>
            </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RoomTable;

'use client'
import React, { useState } from 'react'
import { RoomLabel } from '../../data/RoomTableInfo';
import { BiPencil, BiTrashAlt } from 'react-icons/bi';
import CreateRoomModal from './CreateRoom';
import UpdateRoomModal from './UpdateRoomModal';
import serverUrl from '@/config/config';
import { useRouter } from 'next/navigation';

interface RoomTableProps {
  tableData: any
}

export default function RoomTable({ tableData }: RoomTableProps) {
  const router =useRouter()
  const [openUpdate, setOpenUpdate] = useState(false)
  const [modalData, setModalData] = useState({})


async function deleteRoom(roomNumber: number) {
  try {
    const response = await fetch(serverUrl + "/room/deleteRoom/"+roomNumber, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
    

    } else {
    }

  } catch (err) {
    console.log(err)
  }
  router.refresh()
}


  return (
    <div>
      <CreateRoomModal />
      <UpdateRoomModal data={modalData} open={openUpdate} setOpen={setOpenUpdate} />
      <table className="w-full">
        <thead>
          <tr className="bg-gray-300 ">
            <th className="py-3 px-3 font-light text-ssm text-left">

            </th>
            {Object.entries(RoomLabel).map(([key, item], index) => (
              <th key={index} className="py-3 px-3 font-light text-ssm text-left">
                {item}
              </th>
            ))}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((item: any, index: number) => (
            <tr className="bg-gray-100 border-b h-12" key={index}>
              <td className="py-3 px-3 font-light text-ssm text-left">

              </td>
              <td className="p-2 text-ssm pl-3">{item.roomNumber}</td>
              <td className="p-2 text-ssm pl-3">{item.roomRate}</td>
              <td className="p-2 text-ssm pl-3">{item.capacity}</td>
              <td className="p-2 pl-3 w-40 text-[10px] text-ellipsis">
                {item.description}
              </td>
              <td className="p-2 text-ssm pl-3">{item.type.toUpperCase()}</td>
              <td className="p-2 text-ssm pl-3"> {(new Date(item.date)).toISOString().split('T')[0]}</td>
              <td>
                <button onClick={() => { setModalData(item); setOpenUpdate(true) }} className=" p-2 rounded-lg">
                  <BiPencil color="#8f8f8f" />
                </button>
                <button onClick={() => deleteRoom(item.roomNumber)} className=" p-2 rounded-lg">
                  <BiTrashAlt color="#8f8f8f" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}


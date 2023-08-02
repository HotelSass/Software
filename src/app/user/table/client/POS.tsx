'use client'
import React, { useState } from 'react'
import TableModal from './TableModal'
import RoomModal from './RoomModal'


const POS = ({ data,bookingList }: any) => {
    const [selectedTable, setSelectedTable] = useState({})
    const [selectedRoom,setSelectedRoom]=useState({})
    const [openTable, setOpenTable] = useState(false)
    const [openRoom,setOpenRoom]=useState(false)
    const occupiedTable = data.occupiedTableList
    const occupiedRoom = data.allOccupiedRoom

    return (
        <>            
        <TableModal open={openTable} setOpen={setOpenTable} data={selectedTable} bookingList={bookingList} />
        <RoomModal open={openRoom} setOpen={setOpenRoom} data={selectedRoom} />
            <div className='flex-1 flex flex-row h-full w-full space-x-4'>
                <div className="flex-1 py-10 flex flex-col ">

                    <div className="flex-1 p-3 py-6 rounded-xl bg-gray-200 overflow-y-scroll flex flex-col">
                        <div className="">
                            <div className="text-[24px] font-thin tracking-tight mb-6">Occupied Table</div>
                        </div>
                        <div className="flex flex-row flex-wrap">
                            {occupiedTable.map((item: any, index: number) => (
                                <button key={index} type='button' onClick={() => { setSelectedTable(item); setOpenTable(true) }} className="p-3 w-24 h-24 rounded bg-slate-700 capitalize flex flex-col items-center justify-center m-2">
                                    <div className="text-white font-thin">
                                        {item.tableNumber}
                                    </div>

                                </button>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="flex-1 py-10 flex flex-col ">

                    <div className="flex-1 p-3 py-6 rounded-xl bg-gray-200 overflow-y-scroll flex flex-col ">
                        <div className="">
                            <div className="text-[24px] font-thin tracking-tight mb-6">Occupied Rooms</div>
                        </div>
                        <div className="flex flex-row flex-wrap ">
                            {occupiedRoom.map((item: any, index: number) => (
                                <>
                                    {item.roomNumber.map((item1: any, index2: number) => (
                                        <button key={index+index2} type='button' onClick={() => { setSelectedRoom({item,item1}); setOpenRoom(true) }} className="p-3 w-24 h-24 rounded bg-slate-700 capitalize flex flex-col items-center justify-center m-2">
                                            <div className="text-white font-thin">
                                                {item1}
                                            </div>

                                        </button>
                                    ))}

                                </>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default POS
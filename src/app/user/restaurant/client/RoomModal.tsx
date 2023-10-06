import Modal from '@/components/modal'
import serverUrl from '@/config/config'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const RoomModal = ({ bookingList, selectedItems, reload }: any) => {
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const [openSecond, setOpenSecond] = useState(false)
    const [selectedRoom, setSelectedRoom] = useState({ id: null, roomNumber: null })


    async function orderToRoom() {
        router.refresh()
        setOpen(false)
        setOpenSecond(false)
        reload()

        try {
            const response = await fetch(serverUrl + "/user/menu/addOrderToRoom", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: selectedRoom.id,
                    roomNumber: selectedRoom.roomNumber,
                    order: selectedItems

                })

            });


            setSelectedRoom({ id: null, roomNumber: null })

        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <button type='button' onClick={() => { if (selectedItems.length > 0) { setOpen(true) } }} className='bg-blue-700 w-full text-center text-white p-4 rounded-xl'>Bill To Room</button>

            <Modal open={open} setOpen={setOpen} width={700} height={500}>
                <div className=" flex flex-row flex-wrap ">
                    {bookingList.val.length == 0 &&
                        <div className="w-full">
                            <div className="text-[16px] font-thin tracking-tight text-center pb-8">No Rooms Checked In</div>
                        </div>

                    }
                    {bookingList.val.map((item: any, index: any) => (
                        <>
                            {item.rooms.map((item1: any, index2: number) => {
                                if (item1.status == 'inhouse') {
                                    return (
                                        <button key={index + index2} type='button' onClick={() => { setSelectedRoom({ id: item._id, roomNumber: item1.room }); setOpenSecond(true) }} className="p-5 rounded-xl m-2 bg-gray-300 flex flex-col w-1/6 hover:bg-gray-500">
                                            <div className="font-light text-[24px] text-left text-gray-800">
                                                {item1.room}
                                            </div>
                                            <div className="font-thin text-[12px] capitalize text-gray-600 text-left">
                                                {item.name}
                                            </div>
                                        </button>
                                    )
                                }
                            })}
                        </>
                    ))}
                    <Modal open={openSecond} setOpen={setOpenSecond} width={350} height={400}>
                        <div className=" flex flex-col p-4">
                            <div className="text-thin text-[20px]">
                                Add Bill to {selectedRoom.roomNumber}
                            </div>
                            <button type='button' onClick={() => orderToRoom()} className=' mt-10 p-4 px-8 text-[13px] bg-red-700 text-white'>Confirm</button>
                        </div>
                    </Modal>
                </div>
            </Modal>
        </>
    )
}

export default RoomModal
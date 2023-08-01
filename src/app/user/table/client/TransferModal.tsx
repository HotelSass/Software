import Modal from '@/components/modal'
import serverUrl from '@/config/config'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const TransferModal = ({ bookingList, selectedItems, reload, data }: any) => {
    const [open, setOpen] = useState(false)
    const [openSecond, setOpenSecond] = useState(false)
    const [selectedRoom, setSelectedRoom] = useState({id:null,roomNumber:null})


    async function orderToRoom() {

        try {
            const response = await fetch(serverUrl + "/user/menu/transferToRoom", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: selectedRoom.id,
                    roomNumber: selectedRoom.roomNumber,
                    order: data

                })

            });
            if (response.ok) {
                setOpen(false)
                setOpenSecond(false)
                setSelectedRoom({id:null,roomNumber:null})
                reload()
            } else {
            }

        } catch (err) {
            console.log(err)
        }
    }
    console.log(data)

    return (
        <>
            <button type='button' onClick={() => { if (data.order.length > 0) { setOpen(true) } }} className='bg-blue-700 w-full text-center text-white p-4 rounded-xl'>Transfer To Room</button>

            <Modal open={open} setOpen={setOpen} width={700} height={900}>
                <div className=" flex flex-row flex-wrap">

                    {bookingList.val.map((item: any, index: any) => (
                        <>
                            {item.roomNumber.map((item1: any,index1:number) => {
                                return (
                                    <button key={index+index1} type='button' onClick={() => { setSelectedRoom({ id: item._id, roomNumber: item1 }); setOpenSecond(true) }} className="p-5 rounded-xl m-2 bg-gray-300 flex flex-col w-1/6 hover:bg-gray-500">
                                        <div className="font-light text-[24px] text-left text-gray-800">
                                            {item1}
                                        </div>
                                        <div className="font-thin text-[12px] capitalize text-gray-600 text-left">
                                            {item.name}
                                        </div>

                                    </button>
                                )
                            })}
                        </>
                    ))}
                    <Modal open={openSecond} setOpen={setOpenSecond} width={350} height={400}>
                        <div className=" flex flex-col p-4">
                            <div className="text-thin text-[20px]">
                                Transfer Bill to {selectedRoom.roomNumber}
                            </div>
                            <button type='button' onClick={() => orderToRoom()} className=' mt-10 p-4 px-8 text-[13px] bg-red-700 text-white'>Confirm</button>
                        </div>
                    </Modal>
                </div>
            </Modal>
        </>
    )
}

export default TransferModal
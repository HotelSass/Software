import Modal from '@/components/modal'
import serverUrl from '@/config/config';
import { useRouter } from 'next/navigation';
import React from 'react'

const CheckInModal = ({ open, setOpen, data, closeModal }: any) => {
    const router = useRouter()

    async function onSubmit(event: any) {
        event.preventDefault()
        if (data.rooms.length != 0) {
            const formData = new FormData(event.target);
            const name = formData.get('name');
            const address = formData.get('address');
            const phone = formData.get('phone');
            const nationality = formData.get('nationality');
            const governmentId = formData.get('governmentId');
            const from = formData.get('from');
            const to = formData.get('to');
            const roomRate = formData.get('roomRate');
            const roomArray = data.rooms
            roomArray.map((item: any, index: number) => {
                roomArray[index].status = 'inhouse'
            })

            try {
                setOpen(false)
                closeModal()
                const response = await fetch(serverUrl + "/user/room/checkInRoom", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name,
                        address,
                        phone,
                        nationality,
                        governmentId,
                        from,
                        to,
                        rooms: roomArray,
                        reservationId: data._id,
                        reservationDate: data.date,
                        status: 'reserved'
                    })

                });

                if (response.ok) {
                   
                    router.refresh()
                    event.target.reset();

                } else {
                }

            } catch (err) {
                console.log(err)
            }

        }
    }
    return (
        <Modal open={open} setOpen={setOpen} width={800} height={900}>
            <form onSubmit={(e) => onSubmit(e)} className='flex flex-col space-y-4'>
                <div className="text-[28px] font-thin tracking-tight">Check in</div>


                <div className="flex flex-row space-x-5">
                    <div className="flex flex-col flex-1">
                        <label className="font-medium text-ssm ml-2" htmlFor="roomNumber">
                            Client Name
                        </label>
                        <input
                            defaultValue={data.name}
                            name="name"
                            placeholder="Client Name"
                            type="text"
                            id="clientName"
                            required
                            className=" placeholder:text-ssm capitalize placeholder:text-gray-500 align-middle block flex-1 p-3  border border-gray-300 rounded-sm bg-gray-50 text-sm text-gray-700 w-full"
                        />
                    </div>
                    <div className="flex flex-col flex-1">
                        <label className="font-medium text-ssm ml-2" htmlFor="roomNumber">
                            Client Address
                        </label>
                        <input
                            defaultValue={data.address}
                            name="address"
                            placeholder="Client Address"
                            type="text"
                            id="clientAddress"
                            required
                            className=" placeholder:text-ssm capitalize placeholder:text-gray-500 align-middle block flex-1 p-3  border border-gray-300 rounded-sm bg-gray-50 text-sm text-gray-700 w-full"
                        />
                    </div>
                </div>
                <div className="flex flex-row space-x-5">
                    <div className="flex flex-col flex-1">
                        <label className="font-medium text-ssm ml-2" htmlFor="roomNumber">
                            Client Phone
                        </label>
                        <input
                            defaultValue={data.phone}
                            name="phone"
                            placeholder="Client Phone"
                            type="text"
                            id="clientPhone"
                            required
                            className=" placeholder:text-ssm  placeholder:text-gray-500 align-middle block flex-1 p-3  border border-gray-300 rounded-sm bg-gray-50 text-sm text-gray-700 w-full"
                        />
                    </div>
                    <div className="flex flex-col flex-1">
                        <label className="font-medium text-ssm ml-2" htmlFor="roomNumber">
                            Check In - Check Out
                        </label>
                        <input
                            defaultValue={data.rooms ? data.rooms[0]['checkIn'] + " to " + data.rooms[0]['checkOut'] : ""}
                            name="phone"
                            placeholder="Client Phone"
                            type="text"
                            id="clientPhone"
                            disabled
                            className=" placeholder:text-ssm  placeholder:text-gray-500 align-middle block flex-1 p-3  border border-gray-300 rounded-sm bg-gray-50 text-sm text-gray-700 w-full"
                        />
                    </div>
                </div>
                <div className="flex flex-row space-x-5">
                    <div className="flex flex-col flex-1">
                        <label className="font-medium text-ssm ml-2" htmlFor="roomNumber">
                            Nationality
                        </label>
                        <input
                            defaultValue={"Nepali"}
                            name="nationality"
                            placeholder="Nationality"
                            type="text"
                            id="nationality"
                            required
                            className=" placeholder:text-ssm capitalize placeholder:text-gray-500 align-middle block flex-1 p-3  border border-gray-300 rounded-sm bg-gray-50 text-sm text-gray-700 w-full"
                        />
                    </div>
                    <div className="flex flex-col flex-1">
                        <label className="font-medium text-ssm ml-2" htmlFor="roomNumber">
                            Government Id
                        </label>
                        <input
                            name="governmentId"
                            placeholder="Gov. Id"
                            type="text"
                            id="clientEmail"
                            defaultValue={data.email}
                            className=" placeholder:text-ssm placeholder:text-gray-500 align-middle block flex-1 p-3  border border-gray-300 rounded-sm bg-gray-50 text-sm text-gray-700 w-full"
                        />
                    </div>
                </div>

                <div className="flex flex-row space-x-5">
                    <div className="flex flex-col flex-1">
                        <label className="font-medium text-ssm ml-2" htmlFor="roomNumber">
                            Visiting From
                        </label>
                        <input
                            name="from"
                            placeholder="Visting From"
                            type="text"
                            id="nationality"
                            defaultValue={data.from}

                            className=" placeholder:text-ssm capitalize placeholder:text-gray-500 align-middle block flex-1 p-3  border border-gray-300 rounded-sm bg-gray-50 text-sm text-gray-700 w-full"
                        />
                    </div>
                    <div className="flex flex-col flex-1">
                        <label className="font-medium text-ssm ml-2" htmlFor="roomNumber">
                            Visiting To
                        </label>
                        <input
                            name="to"
                            placeholder="Visiting To"
                            type="text"
                            id="clientEmail"
                            defaultValue={data.to}

                            className=" placeholder:text-ssm capitalize placeholder:text-gray-500 align-middle block flex-1 p-3  border border-gray-300 rounded-sm bg-gray-50 text-sm text-gray-700 w-full"
                        />
                    </div>
                </div>
                <div className="flex flex-row space-x-5">

                    <div className="flex flex-col flex-1">
                        <label className="font-medium text-ssm ml-2" htmlFor="roomNumber">
                            Advance Payment
                        </label>
                        <input
                            defaultValue={data.advance}
                            name="advances"
                            placeholder="Rs."
                            type="text"
                            id="nationality"
                            disabled
                            className=" placeholder:text-ssm  placeholder:text-gray-500 align-middle block flex-1 p-3  border border-gray-300 rounded-sm bg-gray-50 text-sm text-gray-700 w-full"
                        />
                    </div>
                    <div className="flex flex-col flex-1">
                        <button type='submit' className="bg-orange-700 p-3 rounded space-x-3 ml-auto w-full mt-5 text-center text-white ">
                            Check In
                        </button>
                    </div>
                </div>
                <div className="flex flex-row space-x-5">

                    <div className="flex flex-col flex-1">

                        <button disabled type='button' className='bg-gray-600 text-white p-4 rounded-sm text-[12px] items-center'>

                            <div className='flex flex-row flex-wrap overflow-x-scroll'>
                                Selected Rooms:

                                {data.hasOwnProperty('rooms') &&
                                    <>
                                        {(data.rooms).map((item: any, index: any) => (
                                            <>
                                                {item.status == 'reserved' &&
                                                    <div key={index} className="text-white text-center mx-2 ">{item.room}</div>
                                                }
                                            </>
                                        ))}
                                    </>
                                }

                            </div>

                        </button>
                        {data.hasOwnProperty('rooms') &&
                            <>
                                {data.rooms.length != 0 &&
                                    <div className=" h-[150px] overflow-y-scroll mt-8">

                                        <div className="relative overflow-x-auto shadow-md sm:rounded-sm ">
                                            <table className="text-sm text-left text-gray-500 dark:text-gray-400 w-full rounded-sm ">

                                                <thead className="text-[12px] uppercase bg-gray-800 text-gray-400">
                                                    <tr>


                                                        <th className="px-6 py-3 font-light text-center">
                                                            Room
                                                        </th>

                                                        <th className="px-6 py-3 font-light text-center">
                                                            Price
                                                        </th>


                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {data.rooms.map((item: any, index: number) => {
                                                        if (item.status == 'reserved') {
                                                            return (
                                                                <tr key={index} className=" border-b bg-gray-700 border-gray-700 pb-4 border-b-slate-900">
                                                                    <td className="px-2 py-2 text-center text-white">
                                                                        {item.room}
                                                                    </td>

                                                                    <td className="px-2 py-2 text-center text-white">
                                                                        Rs. {item.roomRate}
                                                                    </td>
                                                                </tr>
                                                            )
                                                        }
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                }
                            </>
                        }
                    </div>

                </div>


            </form>
        </Modal>
    )
}

export default CheckInModal
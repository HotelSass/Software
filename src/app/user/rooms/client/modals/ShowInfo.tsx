import Modal from '@/components/modal'
import serverUrl from '@/config/config';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const ShowInfo = ({ open, setOpen, data }: any) => {
    const router = useRouter()

    async function onSubmit(event: any) {
        event.preventDefault()
        if (data.roomNumber.length != 0) {
            const formData = new FormData(event.target);
            const name = formData.get('name');
            const address = formData.get('address');
            const phone = formData.get('phone');
            const nationality = formData.get('nationality');
            const email = formData.get('email');
            const from = formData.get('from');
            const to = formData.get('to');
            const roomRate = formData.get('roomRate');
            const advance = formData.get('advance');

            try {
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
                        email,
                        from,
                        to,
                        roomRate,
                        advance,
                        roomNumber: data.roomNumber,
                        duration: data.duration,
                        checkIn: data.checkIn,
                        checkOut: data.checkOut,
                        status: 'inhouse',
                        reservationId: data._id,
                        reservationDate: data.date
                    })

                });

                if (response.ok) {
                    setOpen(false)
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
        <Modal open={open} setOpen={setOpen} width={800}>
            <form onSubmit={(e) => onSubmit(e)} className='flex flex-col space-y-4'>
                <div className="text-[28px] font-thin tracking-tight ml-4">Info</div>


                <div className="flex flex-row space-x-5">
                    <div className="flex flex-col flex-1">
                        <label className="font-medium text-ssm ml-2" htmlFor="roomNumber">
                            Client Name
                        </label>
                        <input
                            disabled
                            defaultValue={data.name}
                            name="name"
                            placeholder="Client Name"
                            type="text"
                            id="clientName"
                            required
                            className=" placeholder:text-ssm  placeholder:text-gray-500 align-middle block flex-1 p-3  border border-gray-300 rounded-lg bg-gray-50 text-sm text-gray-700 w-full"
                        />
                    </div>
                    <div className="flex flex-col flex-1">
                        <label className="font-medium text-ssm ml-2" htmlFor="roomNumber">
                            Client Address
                        </label>
                        <input
                            disabled
                            defaultValue={data.address}
                            name="address"
                            placeholder="Client Address"
                            type="text"
                            id="clientAddress"
                            required
                            className=" placeholder:text-ssm  placeholder:text-gray-500 align-middle block flex-1 p-3  border border-gray-300 rounded-lg bg-gray-50 text-sm text-gray-700 w-full"
                        />
                    </div>
                </div>
                <div className="flex flex-row space-x-5">
                    <div className="flex flex-col flex-1">
                        <label className="font-medium text-ssm ml-2" htmlFor="roomNumber">
                            Client Phone
                        </label>
                        <input
                            disabled
                            defaultValue={data.phone}
                            name="phone"
                            placeholder="Client Phone"
                            type="text"
                            id="clientPhone"
                            required
                            className=" placeholder:text-ssm  placeholder:text-gray-500 align-middle block flex-1 p-3  border border-gray-300 rounded-lg bg-gray-50 text-sm text-gray-700 w-full"
                        />
                    </div>
                    <div className="flex flex-col flex-1">
                        <label className="font-medium text-ssm ml-2" htmlFor="roomNumber">
                            Check In - Check Out
                        </label>
                        <input

                            defaultValue={data.checkIn + " to " + data.checkOut}
                            name="phone"
                            placeholder="Client Phone"
                            type="text"
                            id="clientPhone"
                            disabled
                            className=" placeholder:text-ssm  placeholder:text-gray-500 align-middle block flex-1 p-3  border border-gray-300 rounded-lg bg-gray-50 text-sm text-gray-700 w-full"
                        />
                    </div>
                </div>
                <div className="flex flex-row space-x-5">
                    <div className="flex flex-col flex-1">
                        <label className="font-medium text-ssm ml-2" htmlFor="roomNumber">
                            Nationality
                        </label>
                        <input
                            disabled
                            defaultValue={data.nationality}
                            name="nationality"
                            placeholder="Nationality"
                            type="text"
                            id="nationality"
                            required
                            className=" placeholder:text-ssm  placeholder:text-gray-500 align-middle block flex-1 p-3  border border-gray-300 rounded-lg bg-gray-50 text-sm text-gray-700 w-full"
                        />
                    </div>
                    <div className="flex flex-col flex-1">
                        <label className="font-medium text-ssm ml-2" htmlFor="roomNumber">
                            Client Email
                        </label>
                        <input
                            disabled
                            defaultValue={data.email}
                            name="email"
                            placeholder="Client Email"
                            type="text"
                            id="clientEmail"
                            required
                            className=" placeholder:text-ssm  placeholder:text-gray-500 align-middle block flex-1 p-3  border border-gray-300 rounded-lg bg-gray-50 text-sm text-gray-700 w-full"
                        />
                    </div>
                </div>

                <div className="flex flex-row space-x-5">
                    <div className="flex flex-col flex-1">
                        <label className="font-medium text-ssm ml-2" htmlFor="roomNumber">
                            Visiting From
                        </label>
                        <input
                            disabled
                            defaultValue={data.from}
                            name="from"
                            placeholder="Visting From"
                            type="text"
                            id="nationality"
                            className=" placeholder:text-ssm  placeholder:text-gray-500 align-middle block flex-1 p-3  border border-gray-300 rounded-lg bg-gray-50 text-sm text-gray-700 w-full"
                        />
                    </div>
                    <div className="flex flex-col flex-1">
                        <label className="font-medium text-ssm ml-2" htmlFor="roomNumber">
                            Visiting To
                        </label>
                        <input
                            disabled
                            defaultValue={data.to}
                            name="to"
                            placeholder="Visiting To"
                            type="text"
                            id="clientEmail"
                            className=" placeholder:text-ssm  placeholder:text-gray-500 align-middle block flex-1 p-3  border border-gray-300 rounded-lg bg-gray-50 text-sm text-gray-700 w-full"
                        />
                    </div>
                </div>
                <div className="flex flex-row space-x-5">
                    <div className="flex flex-col flex-1">
                        <label className="font-medium text-ssm ml-2" htmlFor="roomNumber">
                            Room Rate
                        </label>
                        <input
                            disabled
                            defaultValue={data.roomRate}
                            name="roomRate"
                            placeholder="Rs."
                            type="text"
                            id="nationality"
                            required
                            className=" placeholder:text-ssm  placeholder:text-gray-500 align-middle block flex-1 p-3  border border-gray-300 rounded-lg bg-gray-50 text-sm text-gray-700 w-full"
                        />
                    </div>
                    <div className="flex flex-col flex-1">
                        <label className="font-medium text-ssm ml-2" htmlFor="roomNumber">
                            Advance Payment
                        </label>
                        <input
                            disabled
                            defaultValue={data.advance}
                            name="advance"
                            placeholder="Rs."
                            type="text"
                            id="nationality"
                            className=" placeholder:text-ssm  placeholder:text-gray-500 align-middle block flex-1 p-3  border border-gray-300 rounded-lg bg-gray-50 text-sm text-gray-700 w-full"
                        />
                    </div>
                </div>
                <div className="flex flex-row space-x-5">

                    <div className="flex flex-col flex-1">

                        <button disabled type='button' className='bg-gray-600 text-white p-4 rounded-xl text-[12px] items-center'>

                            <div className='flex flex-row flex-wrap overflow-x-scroll'>
                                Selected Rooms:

                                {data.hasOwnProperty('roomNumber') &&
                                    <>
                                        {(data.roomNumber).map((item: any,index:number) => (
                                            <div key={index} className="text-white text-center mx-2 ">{item}</div>
                                        ))}
                                    </>
                                }

                            </div>

                        </button>

                    </div>

                </div>
                <div className="flex flex-row">
                    <div className="text-[16px] font-thin tracking-tight p-3 bg-gray-700 text-white rounded-lg w-44 text-center">{data.duration} day</div>
                </div>

            </form>
        </Modal>
    )
}

export default ShowInfo
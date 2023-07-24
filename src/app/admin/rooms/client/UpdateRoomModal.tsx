'use client'
import Modal from '@/components/modal'
import serverUrl from '@/config/config'
import React, { useState } from 'react'

import { useRouter } from 'next/navigation'

const UpdateRoomModal = ({ data, open, setOpen }: any) => {
    const router = useRouter()
    const [duplicateEntry, setDuplicateEntry] = useState(false)
    const [showMessage, setShowMessage] = useState(false);

    const submitForm = async (event: any) => {
        setDuplicateEntry(false)
        event.preventDefault();
        const formData = new FormData(event.target);
        const roomNumber = formData.get('roomNumber');
        const roomRate = formData.get('roomRate');
        const roomDescription = formData.get('roomDescription');
        const roomCapacity = formData.get('roomCapacity');
        const roomCategory = formData.get('roomCategory');
        console.log(JSON.stringify({
            roomNumber: roomNumber,
            roomRate: roomRate,
            description: roomDescription,
            capacity: roomCapacity,
            type: roomCategory
        }))
        try {
            const response = await fetch(serverUrl + "/room/updateRoom", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    roomNumber: roomNumber,
                    roomRate: roomRate,
                    description: roomDescription,
                    capacity: roomCapacity,
                    type: roomCategory
                })

            });
            if (response.ok) {
                setOpen(false)
                setShowMessage(true)

            } else {
                setDuplicateEntry(true)
            }

        } catch (err) {
            console.log(err)
        }
        router.refresh()

        event.target.reset();
    };
    return (
        <>
            <Modal width={450} open={open} setOpen={setOpen}>
                <form onSubmit={submitForm} className="p-2 flex flex-col space-y-4 pb-8">
                    <div className="pl-2 text-[26px] font-bold text-gray-600">
                        Update Room
                    </div>

                    <div className="flex flex-col">
                        <label className="font-medium text-ssm ml-2" htmlFor="roomNumber">
                            Room Number
                        </label>
                        <input
                            defaultValue={data.roomNumber}
                            name="roomNumber"
                            placeholder="Room Number"
                            readOnly
                            type="text"
                            id="roomNumber"
                            className=" placeholder:text-ssm  placeholder:text-gray-500 align-middle block flex-1 p-3  border border-gray-300 rounded-lg bg-gray-50 text-sm text-gray-700 w-full"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="font-medium text-ssm ml-2" htmlFor="roomRate">
                            Room Rate
                        </label>
                        <input
                            defaultValue={data.roomRate}
                            name="roomRate"
                            placeholder="Room Rate"
                            type="number"
                            id="roomRate"
                            className=" placeholder:text-ssm  placeholder:text-gray-500 align-middle block flex-1 p-3  border border-gray-300 rounded-lg bg-gray-50 text-sm text-gray-700 w-full"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="font-medium text-ssm ml-2" htmlFor="roomNumber">
                            Room Description
                        </label>
                        <input
                            defaultValue={data.description}
                            name="roomDescription"
                            placeholder="Room Description"
                            type="text"
                            id="roomNumber"
                            className=" placeholder:text-ssm  placeholder:text-gray-500 align-middle block flex-1 p-3  border border-gray-300 rounded-lg bg-gray-50 text-sm text-gray-700 w-full"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="font-medium text-ssm ml-2" htmlFor="roomCapacity">
                            Room Capacity
                        </label>
                        <input
                            defaultValue={data.capacity}
                            name="roomCapacity"
                            placeholder="Capacity"
                            type="number"
                            id="roomCapacity"
                            className=" placeholder:text-ssm  placeholder:text-gray-500 align-middle block flex-1 p-3  border border-gray-300 rounded-lg bg-gray-50 text-sm text-gray-700 w-full"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="font-medium text-ssm ml-2" htmlFor="roomCapacity">
                            Room Type
                        </label>
                        <select
                            defaultValue={data.type}
                            name="roomCategory"
                            placeholder="Capacity"
                            id="roomCategory"
                            className=" placeholder:text-ssm  placeholder:text-gray-500 align-middle block flex-1 p-3  border border-gray-300 rounded-lg bg-gray-50 text-ssm text-gray-700 w-full"
                        >
                            <option value="">Select...</option>
                            <option value="premium">Premium</option>
                            <option value="normal">Normal</option>
                            <option value="couple">Couple</option>
                        </select>
                    </div>
                    {duplicateEntry &&
                        <div className="border-red-500 border bg-red-50 text-center p-3 text-ssm rounded-lg text-red-700">
                            Room Already Exists
                        </div>
                    }
                    <button
                        type="submit"
                        className="w-full mt-4 p-4 font-bold text-white bg-blue-800 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2  dark:border-gray-900"
                    >
                        Update Room
                    </button>
                </form>
            </Modal>
        </>
    )
}

export default UpdateRoomModal
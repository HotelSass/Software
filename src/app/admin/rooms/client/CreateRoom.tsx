'use client'
import Modal from '@/components/modal'
import serverUrl from '@/config/config'
import React, { useState } from 'react'
import { BiPlus, BiTrashAlt } from 'react-icons/bi'
import Message from '../components/Message'
import { useRouter } from 'next/navigation'

const CreateRoomModal = () => {
    const router = useRouter()
    const [duplicateEntry, setDuplicateEntry] = useState(false)
    const [open, setOpen] = useState(false);
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

        try {
            const response = await fetch(serverUrl + "/room/createRoom", {
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
            {showMessage && (
                <Message />
            )}
            <div className=" flex flex-row pb-2 space-x-3">

                <button
                    onClick={() => { setOpen(true) }}
                    className=" bg-green-600 p-3 h-12 my-auto rounded-md flex flex-row text-ssm text-white space-x-2 ml-auto"
                >
                    <BiPlus color="white" size={24} className="my-auto" />
                    <div className="my-auto">Add New Room</div>
                </button>
            </div>
            <Modal width={450} open={open} setOpen={setOpen} height={500}>
                <form onSubmit={submitForm} className="p-2 flex flex-col space-y-4 pb-8">
                    <div className="pl-2 text-[26px] font-bold text-gray-600">
                        Add Room
                    </div>

                    <div className="flex flex-col">
                        <label className="font-medium text-ssm ml-2" htmlFor="roomNumber">
                            Room Number
                        </label>
                        <input
                            name="roomNumber"
                            placeholder="Room Number"
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
                        Add New Room
                    </button>
                </form>
            </Modal>
        </>
    )
}

export default CreateRoomModal
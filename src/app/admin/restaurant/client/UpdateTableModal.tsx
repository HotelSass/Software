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
        const tableNumber = formData.get('tableNumber');
        const tableCapacity = formData.get('tableCapacity');
        const tableDescription = formData.get('tableDescription');
        try {
            const response = await fetch(serverUrl + "/table/updateTable", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    tableNumber: tableNumber,
                    tableCapacity:tableCapacity,
                    tableDescription:tableDescription
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
            <Modal width={450} open={open} setOpen={setOpen} height={400}>
                <form onSubmit={submitForm} className="p-2 flex flex-col space-y-4 pb-8">
                    <div className="pl-2 text-[26px] font-bold text-gray-600">
                        Update Table
                    </div>

                    <div className="flex flex-col">
                        <label className="font-medium text-ssm ml-2" htmlFor="roomNumber">
                            Room Number
                        </label>
                        <input
                            defaultValue={data.tableNumber}
                            name="tableNumber"
                            placeholder="Room Number"
                            readOnly
                            type="text"
                            id="tableNumber"
                            className=" placeholder:text-ssm  placeholder:text-gray-500 align-middle block flex-1 p-3  border border-gray-300 rounded-lg bg-gray-50 text-sm text-gray-700 w-full"
                        />
                    </div>
                   
                    <div className="flex flex-col">
                        <label className="font-medium text-ssm ml-2" htmlFor="roomNumber">
                            Table Description
                        </label>
                        <input
                            defaultValue={data.description}
                            name="tableDescription"
                            placeholder="Table Description"
                            type="text"
                            id="tableDescription"
                            className=" placeholder:text-ssm  placeholder:text-gray-500 align-middle block flex-1 p-3  border border-gray-300 rounded-lg bg-gray-50 text-sm text-gray-700 w-full"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="font-medium text-ssm ml-2" htmlFor="roomCapacity">
                            Table Capacity
                        </label>
                        <input
                            defaultValue={data.capacity}
                            name="tableCapacity"
                            placeholder="Capacity"
                            type="number"
                            id="tableCapacity"
                            className=" placeholder:text-ssm  placeholder:text-gray-500 align-middle block flex-1 p-3  border border-gray-300 rounded-lg bg-gray-50 text-sm text-gray-700 w-full"
                        />
                    </div>
                    
                    {duplicateEntry &&
                        <div className="border-red-500 border bg-red-50 text-center p-3 text-ssm rounded-lg text-red-700">
                            Table Already Exists
                        </div>
                    }
                    <button
                        type="submit"
                        className="w-full mt-4 p-4 font-bold text-white bg-blue-800 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2  dark:border-gray-900"
                    >
                        Update Table
                    </button>
                </form>
            </Modal>
        </>
    )
}

export default UpdateRoomModal
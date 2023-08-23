'use client'
import Modal from '@/components/modal'
import serverUrl from '@/config/config'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { BiPlus } from 'react-icons/bi'
import Message from '../components/Message'

const NewCategory = () => {
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const [showMessage, setShowMessage] = useState(false)
    const [exists, setExists] = useState(false)
    const submitForm = async (event: any) => {

        event.preventDefault();
        const formData = new FormData(event.target);
        const name = formData.get('name')
        const description = formData.get('description')

        try {
            const response = await fetch(serverUrl + "/bar/createBarCategory", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    category: name,
                    description: description
                })

            });
            if (response.ok) {
                setOpen(false)
                setShowMessage(true)

            } else {
                setExists(true)
            }

        } catch (err) {
            console.log(err)
        }
        router.refresh()
    }
    return (
        <>
            <Message messageOn={showMessage} setMessageOn={setShowMessage} message='Category Added Sucessfully' />
            <button
                onClick={() => setOpen(true)}
                className=" bg-green-600 p-3 ml-auto my-auto mx-8 rounded-md flex flex-row text-ssm text-white space-x-2">
                <BiPlus color="white" size={24} className="my-auto" />
                <div className="my-auto">Add New Category</div>
            </button>
            <Modal width={450} open={open} setOpen={setOpen} height={400}>
                <form onSubmit={submitForm} className="p-2 flex flex-col space-y-4 pb-8">
                    <div className="pl-2 text-[26px] font-bold text-gray-600">
                        Add Category
                    </div>

                    <div className="flex flex-col">
                        <label className="font-medium text-ssm ml-2" htmlFor="itemName">
                            Category Name
                        </label>
                        <input
                            placeholder="Item Name"
                            type="text"
                            id="name"
                            name='name'
                            className=" placeholder:text-ssm  placeholder:text-gray-500 align-middle block flex-1 p-3  border border-gray-300 rounded-lg bg-gray-50 text-sm text-gray-700 w-full"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="font-medium text-ssm ml-2" htmlFor="tableNumber">
                            Category Description
                        </label>
                        <input
                            placeholder="Category Description"
                            type="text"
                            id="description"
                            name='description'
                            className=" placeholder:text-ssm  placeholder:text-gray-500 align-middle block flex-1 p-3  border border-gray-300 rounded-lg bg-gray-50 text-sm text-gray-700 w-full"
                        />
                    </div>
                    {exists &&
                        <div className="border-red-500 border bg-red-50 text-center p-3 text-ssm rounded-lg text-red-700">
                            Category Already Exists
                        </div>}
                    <button
                        type="submit"
                        className="w-full mt-4 p-4 font-bold text-white bg-blue-800 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2  dark:border-gray-900"
                    >
                        Add Category
                    </button>
                </form>
            </Modal>
        </>
    )
}

export default NewCategory
'use client'
import Modal from '@/components/modal'
import serverUrl from '@/config/config'
import React, { useState } from 'react'
import { BiPlus } from 'react-icons/bi'
import Message from '../components/Message'
import { useRouter } from 'next/navigation'

const NewMenuModal = ({ categoryData }: any) => {
    const router=useRouter()
    const [open, setOpen] = useState(false)
    const [exists, setExists] = useState(false)
    const [messageOn, setMessageOn] = useState(false)
    const submitForm = async (event: any) => {
        event.preventDefault()
        const formData = new FormData(event.target);
        const name = formData.get('name');
        const price = formData.get('price');
        const category = formData.get('category');
        try {
           
            const response = await fetch(serverUrl + "/menu/createMenu", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    itemName: name,
                    price,
                    category
                })

            });
            if (response.ok) {
                setOpen(false)
                setMessageOn(true)

            } else {
                setExists(true)
            }

        } catch (err) {
            console.log(err)
        }
        router.refresh()

        event.target.reset();
    }
    return (
        <>
            <Message message='New Item Added' messageOn={messageOn} setMessageOn={setMessageOn} />
            <div className=" flex flex-row pb-2 space-x-3">
                <button
                    onClick={() => setOpen(true)}
                    className=" bg-green-600 p-3 h-12 my-auto rounded-md flex flex-row text-ssm text-white space-x-2 ml-auto"
                >
                    <BiPlus color="white" size={24} className="my-auto" />
                    <div className="my-auto">Add New Menus</div>
                </button>
            </div>
            <Modal width={450} open={open} setOpen={setOpen} height={400}>
                <form onSubmit={submitForm} className="p-2 flex flex-col space-y-4 pb-8">
                    <div className="pl-2 text-[26px] font-bold text-gray-600">
                        Add Item
                    </div>

                    <div className="flex flex-col">
                        <label className="font-medium text-ssm ml-2" htmlFor="name">
                            Item Name
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
                        <label className="font-medium text-ssm ml-2" htmlFor="description">
                            Item Price
                        </label>
                        <input
                            placeholder="Rs."
                            type="text"
                            id="price"
                            name='price'
                            className=" placeholder:text-ssm  placeholder:text-gray-500 align-middle block flex-1 p-3  border border-gray-300 rounded-lg bg-gray-50 text-sm text-gray-700 w-full"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label
                            className="font-medium text-ssm ml-2"
                            htmlFor="category"
                        >
                            Category
                        </label>
                        <div className="flex flex-col">
                            <select
                                placeholder="category"
                                id="category"
                                name='category'
                                className=" placeholder:text-ssm  placeholder:text-gray-500 align-middle block flex-1 p-3  border border-gray-300 rounded-lg bg-gray-50 text-ssm text-gray-700 w-full"
                            >
                                <option value="">Select...</option>
                                {categoryData.map((item: any, index: number) =>
                                    <option key={index} value={item.category}>{(item.category).toUpperCase()}</option>
                                )}

                            </select>
                        </div>
                    </div>
                    {exists &&
                        <div className="border-red-500 border bg-red-50 text-center p-3 text-ssm rounded-lg text-red-700">
                            Item Already Exists
                        </div>
                    }
                    <button
                        type="submit"
                        className="w-full mt-4 p-4 font-bold text-white bg-blue-800 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2  dark:border-gray-900"
                    >
                        Add Item
                    </button>
                </form>
            </Modal>
        </>
    )
}

export default NewMenuModal
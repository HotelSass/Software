'use client'
import Modal from '@/components/modal'
import serverUrl from '@/config/config'
import React, { useState } from 'react'
import Message from '../components/Message'
import { useRouter } from 'next/navigation'

const UpdateMenuModal = ({ data, open, setOpen }: any) => {
    const router = useRouter()
    const [exists, setExists] = useState(false)
    const [messageOn, setMessageOn] = useState(false)
    const submitForm = async (event: any) => {
        event.preventDefault()
        const formData = new FormData(event.target);
        const name = formData.get('name');
        const description = formData.get('description');

        try {
            const response = await fetch(serverUrl + "/menu/updateCategory", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    category:data.title,
                    newCategory: name,
                    description,
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
            <Message message='Item Updated Sucessfully' messageOn={messageOn} setMessageOn={setMessageOn} />

            <Modal width={450} open={open} setOpen={setOpen} height={400}>
                <form onSubmit={submitForm} className="p-2 flex flex-col space-y-4 pb-8">
                    <div className="pl-2 text-[26px] font-bold text-gray-600">
                        Update Category
                    </div>

                    <div className="flex flex-col">
                        <label className="font-medium text-ssm ml-2" htmlFor="name">
                            Category Name
                        </label>
                        <input
                            defaultValue={data.title}
                            placeholder="Category Name"
                            type="text"
                            id="name"
                            name='name'
                            className=" placeholder:text-ssm  placeholder:text-gray-500 align-middle block flex-1 p-3  border border-gray-300 rounded-lg bg-gray-50 text-sm text-gray-700 w-full"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="font-medium text-ssm ml-2" htmlFor="description">
                            Category Description
                        </label>
                        <input
                            defaultValue={data.description}
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
                        </div>
                    }
                    <button
                        type="submit"
                        className="w-full mt-4 p-4 font-bold text-white bg-blue-800 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2  dark:border-gray-900"
                    >
                        Update Category
                    </button>
                </form>
            </Modal>
        </>
    )
}

export default UpdateMenuModal
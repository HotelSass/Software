'use client'
import Modal from '@/components/modal'
import serverUrl from '@/config/config'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import Message from '../components/Message'
import { BiPlus } from 'react-icons/bi'

const UpdateItem = ({ open, setOpen, data, category }: any) => {
    console.log(data)
    const router = useRouter()
    const [exists, setExists] = useState(false)
    const [messageOn, setMessageOn] = useState(false)
    const submitForm = async (event: any) => {
        event.preventDefault()
        const formData = new FormData(event.target);
        const name = formData.get('name');

        const category = formData.get('category');
        const ml30 = formData.get('30ml')
        const ml60 = formData.get('60ml')
        const ml90 = formData.get('90ml')
        const ml180 = formData.get('180ml')
        const half = formData.get('half')
        const full = formData.get('full')
        if (data.fullBottle) {
            const price = formData.get('price');
            try {

                const response = await fetch(serverUrl + "/bar/updateBarItem", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        itemName: name,
                        price,
                        category,
                        fullBottle: data.fullBottle
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
        } else {
            try {
                const response = await fetch(serverUrl + "/bar/updateBarItem", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        itemName: name,
                        ml30,
                        ml60,
                        ml90,
                        ml180,
                        half,
                        full,
                        category,
                        fullBottle: data.fullBottle
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
        }


        router.refresh()

        event.target.reset();
    }
    return (
        <>
            <Message message='New Item Added' messageOn={messageOn} setMessageOn={setMessageOn} />
           
            <Modal width={850} open={open} setOpen={setOpen} height={400}>
                <form onSubmit={submitForm} className="p-2 flex flex-col space-y-4 pb-8">
                    <div className="pl-2 text-[26px] font-bold text-gray-600">
                        Add Bar Item
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
                            defaultValue={data.itemName}
                            className="capitalize placeholder:text-ssm  placeholder:text-gray-500 align-middle block flex-1 p-3  border border-gray-300 rounded-lg bg-gray-50 text-sm text-gray-700 w-full"
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

                                className="capitalize placeholder:text-ssm  placeholder:text-gray-500 align-middle block flex-1 p-3  border border-gray-300 rounded-lg bg-gray-50 text-ssm text-gray-700 w-full"
                            >
                                <option selected value={data.category}>{data.category}</option>
                                {category.map((item: any, index: number) =>
                                    <option key={index} value={item.category}>{(item.category).toUpperCase()}</option>
                                )}

                            </select>
                        </div>
                    </div>

                    {data.fullBottle &&
                        <div className="flex flex-col">
                            <label className="font-medium text-ssm ml-2" htmlFor="name">
                                Price
                            </label>
                            <input
                                defaultValue={data.price}
                                placeholder="Item Price"
                                type="text"
                                id="name"
                                name='price'
                                className=" placeholder:text-ssm  placeholder:text-gray-500 align-middle block flex-1 p-3  border border-gray-300 rounded-lg bg-gray-50 text-sm text-gray-700 w-full"
                            />
                        </div>
                    }
                    {!data.fullBottle &&
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                            <table className="text-sm text-left text-gray-500 dark:text-gray-400 w-full">

                                <thead className="text-[12px] uppercase bg-gray-800 text-gray-400">
                                    <tr>
                                        <th className="px-6 py-3 font-light">
                                            30ml
                                        </th>
                                        <th className="px-6 py-3 font-light">
                                            60ml
                                        </th>
                                        <th className="px-6 py-3 font-light">
                                            90ml
                                        </th>
                                        <th className="px-6 py-3 font-light">
                                            180ml
                                        </th>
                                        <th className="px-6 py-3 font-light">
                                            1/2
                                        </th>
                                        <th className="px-6 py-3 font-light">
                                            Full
                                        </th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {data.distribution &&
                                        <tr className=" border-b bg-gray-700 border-gray-700">
                                            <td className="px-2 py-2">
                                                <input defaultValue={data.distribution.ml30} type="number" required name='30ml' inputMode='numeric' placeholder='Rs.' className=' py-2 bg-gray-500 rounded px-3 text-[12px] text-gray-100 font-thin w-full' />
                                            </td>
                                            <td className="px-2 py-2">
                                                <input defaultValue={data.distribution.ml60} type="number" required name='60ml' inputMode='numeric' placeholder='Rs.' className=' py-2 bg-gray-500 rounded px-3 w-full text-[12px] text-gray-100 font-thin' />
                                            </td>
                                            <td className="px-2 py-2">
                                                <input defaultValue={data.distribution.ml90} type="number" required name='90ml' inputMode='numeric' placeholder='Rs.' className=' py-2 bg-gray-500 rounded px-3 w-full text-[12px] text-gray-100 font-thin' />
                                            </td>
                                            <td className="px-2 py-2">
                                                <input defaultValue={data.distribution.ml180} type="number" required name='180ml' inputMode='numeric' placeholder='Rs.' className=' py-2 bg-gray-500 rounded px-3 w-full text-[12px] text-gray-100 font-thin' />
                                            </td>
                                            <td className="px-2 py-2">
                                                <input defaultValue={data.distribution.half} type="number" required name='half' inputMode='numeric' placeholder='Rs.' className=' py-2 bg-gray-500 rounded px-3 w-full text-[12px] text-gray-100 font-thin' />
                                            </td>
                                            <td className="px-2 py-2">
                                                <input defaultValue={data.distribution.full} type="number" required name='full' inputMode='numeric' placeholder='Rs.' className=' py-2 bg-gray-500 rounded px-3 w-full text-[12px] text-gray-100 font-thin' />
                                            </td>
                                        </tr>
                                    }
                                </tbody>
                            </table>
                        </div>
                    }
                    {exists &&
                        <div className="border-red-500 border bg-red-50 text-center p-3 text-ssm rounded-lg text-red-700">
                            Item Already Exists
                        </div>
                    }
                    <button
                        type="submit"
                        className="w-full mt-4 p-4 font-bold text-white bg-blue-800 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2  dark:border-gray-900"
                    >
                        Update Item
                    </button>
                </form>
            </Modal>
        </>
    )
}

export default UpdateItem
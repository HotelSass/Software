'use client'
import Modal from '@/components/modal'
import serverUrl from '@/config/config'
import React, { useState } from 'react'
import { BiPlus } from 'react-icons/bi'
import Message from '../components/Message'
import { useRouter } from 'next/navigation'

const NewMenuModal = ({ categoryData }: any) => {
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const [exists, setExists] = useState(false)
    const [messageOn, setMessageOn] = useState(false)
    const [fullBottle, setFullBottle] = useState(true)
    const [ml750, setMl750] = useState(false)
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
        if (fullBottle) {
            const price = formData.get('price');
            try {

                const response = await fetch(serverUrl + "/bar/createBarItem", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        itemName: name,
                        price,
                        category,
                        fullBottle
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
            const fullBottleSize = !ml750 ? 750 : 1000
            try {
                const response = await fetch(serverUrl + "/bar/createBarItem", {
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
                        fullBottle,
                        fullBottleSize
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
            <div className=" flex flex-row pb-2 space-x-3">
                <button
                    onClick={() => setOpen(true)}
                    className=" bg-green-600 p-3 h-12 my-auto rounded-md flex flex-row text-ssm text-white space-x-2 ml-auto"
                >
                    <BiPlus color="white" size={24} className="my-auto" />
                    <div className="my-auto">Add New Item</div>
                </button>
            </div>
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
                    <div className="flex flex-row ml-2">
                        <div className="flex">
                            <label className='text-[12px]'>Full Bottle</label>
                            <input
                                className="ml-4 mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-700 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-400 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
                                type="checkbox"
                                role="switch"
                                checked={fullBottle}
                                onChange={() => setFullBottle(!fullBottle)}
                                id="flexSwitchCheckDefault" />
                        </div>
                        {!fullBottle &&
                            <div className="flex ml-auto">
                                <label className='text-[12px]'>750 ml</label>
                                <input
                                    className="ml-4 mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-700 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-400 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
                                    type="checkbox"
                                    role="switch"
                                    checked={ml750}
                                    onChange={() => setMl750(!ml750)}
                                    id="flexSwitchCheckDefault" />
                                <label className='text-[12px]'>1000 ml</label>
                            </div>
                        }
                    </div>
                    {fullBottle &&
                        <div className="flex flex-col">
                            <label className="font-medium text-ssm ml-2" htmlFor="name">
                                Price
                            </label>
                            <input
                                placeholder="Item Price"
                                type="text"
                                id="name"
                                name='price'
                                className=" placeholder:text-ssm  placeholder:text-gray-500 align-middle block flex-1 p-3  border border-gray-300 rounded-lg bg-gray-50 text-sm text-gray-700 w-full"
                            />
                        </div>
                    }
                    {!fullBottle &&
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
                                    <tr className=" border-b bg-gray-700 border-gray-700">
                                        <td className="px-2 py-2">
                                            <input type="number" required name='30ml' inputMode='numeric' placeholder='Rs.' className=' py-2 bg-gray-500 rounded px-3 text-[12px] text-gray-100 font-thin w-full' />
                                        </td>
                                        <td className="px-2 py-2">
                                            <input type="number" required name='60ml' inputMode='numeric' placeholder='Rs.' className=' py-2 bg-gray-500 rounded px-3 w-full text-[12px] text-gray-100 font-thin' />
                                        </td>
                                        <td className="px-2 py-2">
                                            <input type="number" required name='90ml' inputMode='numeric' placeholder='Rs.' className=' py-2 bg-gray-500 rounded px-3 w-full text-[12px] text-gray-100 font-thin' />
                                        </td>
                                        <td className="px-2 py-2">
                                            <input type="number" required name='180ml' inputMode='numeric' placeholder='Rs.' className=' py-2 bg-gray-500 rounded px-3 w-full text-[12px] text-gray-100 font-thin' />
                                        </td>
                                        <td className="px-2 py-2">
                                            <input type="number" required name='half' inputMode='numeric' placeholder='Rs.' className=' py-2 bg-gray-500 rounded px-3 w-full text-[12px] text-gray-100 font-thin' />
                                        </td>
                                        <td className="px-2 py-2">
                                            <input type="number" required name='full' inputMode='numeric' placeholder='Rs.' className=' py-2 bg-gray-500 rounded px-3 w-full text-[12px] text-gray-100 font-thin' />
                                        </td>


                                    </tr>
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
                        Add Item
                    </button>
                </form>
            </Modal>
        </>
    )
}

export default NewMenuModal
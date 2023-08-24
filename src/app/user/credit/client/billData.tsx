'use client'
import React, { useState } from 'react'
import { Button } from "@nextui-org/react";
import { BsFillCheckSquareFill, BsFillEjectFill } from 'react-icons/bs'
import Modal from '@/components/modal';


const BillData = ({ data }: any) => {
    const [openDetail, setOpenDetail] = useState(false)
    const [selectedData, setSelectedData] = useState([])

    const [res, setRes] = useState(data)
    const [value, setValue] = useState('')
    function search(value: string) {
        const matchingData: { [key: string]: any } = {}; // Replace 'any' with the appropriate type if possible

        for (const key in data) {
            if (key.includes(value)) {
                matchingData[key] = data[key];
            }
        }
        setRes(matchingData)
    }


    return (
        <div className='w-full'>
            <Modal open={openDetail} setOpen={setOpenDetail} width={800} height={500} >
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-ssm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b py-4">
                        <tr className='bg-slate-800'>


                            <th scope="col" className="px-6 py-3 tracking-widest font-thin text-white">
                                Date
                            </th>

                            <th scope="col" className="px-6 py-3 tracking-widest font-thin text-white text-right">
                                Total
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {selectedData != null &&
                            <>
                                {selectedData.map((item: any, index: number) => {
                                    const time = new Date(item.date)
                                    return (
                                        <tr className='bg-slate-300 border-b' key={index}>

                                            <td className='p-4 text-gray-800 font-light text-[12px]'>
                                                {time.toDateString()}
                                            </td>
                                            <td className=' text-right pr-5 p-4 text-gray-800 font-light text-[12px]'>
                                                Rs. {item.total}
                                            </td>
                                        </tr>

                                    )
                                })}
                            </>
                        }


                    </tbody>

                </table>

            </Modal>

            <div className='w-1/3'>
                <input
                    value={value}
                    onChange={(e) => { setValue(e.target.value); search(e.target.value) }}
                    className=' border border-gray-300 rounded-lg bg-gray-50 text-gray-700 p-4 text-[12px] w-full'
                    placeholder='Phone Number' />
            </div>
            <div className="flex flex-col">

                <div className="relative overflow-x-auto py-4">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-ssm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b py-4">
                            <tr className='bg-slate-800'>


                                <th scope="col" className="px-6 py-3 tracking-widest font-thin text-white">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-6 tracking-widest font-thin text-white">
                                    Phone Number
                                </th>
                                <th>

                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(res).map((phone: any, index: number) => {
                                return (
                                    <tr className='bg-slate-300 border-b' key={index}>

                                        <td className='p-4 text-gray-800 font-light text-[12px]'>
                                            {res[phone][0].name}
                                        </td>
                                        <td className='p-4 text-gray-800 font-light text-[12px]'>
                                            {phone}</td>
                                        <td className=''>
                                            <button type='button' onClick={() => { setOpenDetail(true); setSelectedData(res[phone]) }} className='underline font-light text-[14px] text-white bg-green-600 py-2 px-4 text-center rounded-lg mx-auto'>See More</button>
                                        </td>
                                    </tr>
                                )
                            })}

                        </tbody>

                    </table>
                </div>

            </div>
        </div>
    )
}

export default BillData
'use client'
import serverUrl from '@/config/config'
import React, { useState } from 'react'
import Datepicker from 'react-tailwindcss-datepicker'

const BillData = ({ data }: any) => {
    const [res, setRes] = useState(data)
    const [value, setValue] = useState('')
    function search(value: string) {
        const lowerCaseValue = value.toLowerCase();

        const filteredData = data.filter((item: any) => {
            const nameLower = item.name.toLowerCase();
            const phoneLower = item.phone.toLowerCase();

            // Check if the search value is present in name or phone fields
            const nameMatch = nameLower.includes(lowerCaseValue);
            const phoneMatch = phoneLower.includes(lowerCaseValue);

            return nameMatch || phoneMatch;
        });

        setRes(filteredData)
    }

    return (
        <div className='w-full'>
            <div className='w-1/3'>
                <input
                    value={value}
                    onChange={(e) => { setValue(e.target.value); search(e.target.value) }}
                    className=' border border-gray-300 rounded-lg bg-gray-50 text-gray-700 p-4 text-[12px] w-full'
                    placeholder='Name or Phone Number' />
            </div>
            <div className="flex flex-col">

                <div className="relative overflow-x-auto py-4">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-ssm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b py-4">
                            <tr>
                                <th scope="col" className="px-6 py-6 tracking-widest font-thin text-white">
                                    Name
                                </th>
                                <th scope="col" className="pl-10 py-3 tracking-widest font-thin text-white">
                                    Room
                                </th>
                                <th scope="col" className="px-6 py-3 tracking-widest font-thin text-white">
                                    Phone Number
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {res.map((item: any, index: number) => (
                                <tr className="border-b bg-gray-500 font-thin text-ssm">
                                    <th scope="row" className="px-6 py-4 text-gray-100 whitespace-nowrap font-light text-ssm flex flex-row">
                                        {item.name}

                                    </th>
                                    <td className="px-6 py-4 text-white">
                                        <div className=' flex flex-row mx-auto'>
                                            {item.roomNumber &&
                                                <p className='px-3'>Room: </p>
                                            }

                                            {item.roomNumber &&
                                                <>
                                                    {item.roomNumber.map((room: any) =>
                                                        <p className='mx-1'>
                                                            {room}
                                                        </p>
                                                    )}

                                                </>
                                            }

                                        </div>
                                    </td>

                                    <td className="px-6 py-4 text-white">
                                        {item.phone}
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    )
}

export default BillData
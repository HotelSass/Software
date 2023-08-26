'use client'
import serverUrl from '@/config/config'
import React, { useState } from 'react'
import Datepicker from 'react-tailwindcss-datepicker'


const BillData = ({ data }: any) => {
    const [res, setRes] = useState(data)


    const [value, setValue] = useState({
        startDate: null,
        endDate: null
    });
    const handleValueChange = async (newValue: any) => {
        setValue(newValue);
    }

    return (
        <div className='w-full'>
            <div className='w-1/3'>
                <Datepicker
                    inputClassName=' border border-gray-300 rounded-lg bg-gray-50 text-gray-700 p-4 rounded-xl text-[12px] w-full'
                    separator='   to   '
                    placeholder='From - To'
                    primaryColor={"indigo"}
                    value={value}
                    onChange={handleValueChange}
                />
            </div>
            <div className="flex flex-col">

                <div className="relative overflow-x-auto py-10">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-ssm text-gray-700 capitalize bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b py-4">
                            <tr className='bg-slate-800'>
                                <th scope="col" className="px-6 py-6 tracking-widest font-thin text-white">
                                    Log Message
                                </th>
                                <th scope="col" className="px-6 py-3 tracking-widest font-thin">

                                </th>
                                <th scope="col" className="px-6 py-3 tracking-widest font-thin text-white text-right">
                                    Date
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {res.data.map((item: any,index:number) => (
                                <tr key={index} className="border-b bg-gray-500 font-thin text-ssm">
                                    <th scope="row" className="px-6 py-4 text-gray-100 whitespace-nowrap font-light text-[14px] flex flex-row">
                                        <div className=''>
                                            {item.message}
                                        </div>
                                    </th>
                                    <td className="px-6 py-4 text-white">
                                        <div className=' ml-4 flex flex-row'>

                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-white text-right">
                                        {item.formattedDate}
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
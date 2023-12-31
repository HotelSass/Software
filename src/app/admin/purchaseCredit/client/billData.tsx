'use client'
import React, { useState } from 'react'
import Modal from '@/components/modal';

const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZoneName: 'short'
};

function getTotal(item: any) {
    let total = 0
    item.map((list: any) => {
        total = total + parseFloat(list.quantity) * parseFloat(list.price)
    })
    return total
}

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
                                        <tr className='bg-slate-600 border-b' key={index}>

                                            <td className='p-4 text-white font-light text-[12px]'>
                                                {time.toDateString()}
                                            </td>
                                            <td className=' text-right pr-5 p-4 text-white font-light text-[12px]'>
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


            <div className="flex flex-col">

                <div className="relative overflow-x-auto py-4">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-ssm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b py-4">
                            <tr className='bg-slate-800'>


                                <th scope="col" className="px-6 py-3 tracking-widest font-thin text-white">
                                    Detail
                                </th>
                                <th scope="col" className="px-6 py-3 tracking-widest font-thin text-white">
                                    Vendor Name
                                </th>
                                <th scope="col" className="px-6 py-3 tracking-widest font-thin text-white">
                                    Bill No.
                                </th>
                                <th scope="col" className="px-6 py-3 tracking-widest font-thin text-white">
                                    Category
                                </th>
                                <th scope="col" className="px-6 py-6 tracking-widest font-thin text-white">
                                    Amount
                                </th>
                                <th scope="col" className="px-6 py-6 tracking-widest font-thin text-white">
                                    Bill Date
                                </th>
                                <th>

                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {res.map((item: any, index: number) => {
                                const date = new Date(item.billDate);
                                const formattedDate = date.toLocaleString('en-US', { timeZoneName: 'short' });
                                return (
                                    <>
                                        {item.type == 'purchase' &&
                                            <tr className='bg-slate-600 border-b' key={index}>
                                                <td className='p-3 text-white font-light text-[12px] items-center'>
                                                    <div className="flex ">
                                                        <p className='font-bold text-[14px]'> Items Purchase  </p>
                                                    </div>
                                                </td>
                                                <td className='p-3 text-white font-light text-[12px] items-center'>
                                                    <p className=' text-[12px] capitalize'>{item.vendorName} </p>
                                                </td>
                                                <td className='p-3 text-white font-light text-[12px] items-center'>
                                                    <p className=' text-[12px]'>{item.billNo} </p>
                                                </td>
                                                <td className='p-3 text-white font-light text-[12px]'>
                                                    <div className='bg-gray-100 text-black rounded-[8px] p-2 max-w-xl w-20 text-center capitalize'>{item.type}</div>
                                                </td>
                                                <td className='p-3 text-white font-light text-[12px] items-center'>
                                                    <p>Rs. {getTotal(item.itemArray)} </p>
                                                </td>
                                                <td className='p-3 text-white font-light text-[12px] items-center'>
                                                    <p> {formattedDate} </p>
                                                </td>
                                                <td className='flex flex-row'>
                                                    <div className="flex-1"></div>
                                                    <button type='button' onClick={() => { setOpenDetail(true); }} className='font-light text-[14px] text-white bg-green-600 py-2 px-8 text-center rounded-lg mx-auto my-3 mr-4 hover:bg-green-700'>See More</button>
                                                </td>
                                            </tr>
                                        }


                                    </>
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
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
function getFormattedDate(date: any) {
    const date1 = new Date(date);
    const formattedDate = date1.toLocaleString('en-US', { timeZoneName: 'short' });
    return formattedDate
}
const BillData = ({ data }: any) => {
    const [openDetail, setOpenDetail] = useState(false)
    const [selectedData, setSelectedData] = useState([])

    const [res, setRes] = useState(data)
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
                <div className="">
                    {selectedData != null &&
                        <>


                            <div className='flex flex-col mb-5 px-4'>
                                <div className="flex">
                                    <div className="flex justify-center">
                                        <p className='text-[16px] mr-3 font-bold my-auto'>Name: </p>
                                        <p className='text-[14px] my-auto font-light capitalize'>{(selectedData as any).vendorName}</p>
                                    </div>
                                    <div className="flex justify-center bg-gray-700 ml-auto my-auto p-3 px-6 rounded-md">
                                        <p className='text-[12px] my-auto capitalize text-white font-extralight'>{(selectedData as any).paymentType} Payment</p>
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className="flex justify-center">
                                        <p className='text-[14px] mr-3 font-light my-auto'>Date: </p>
                                        <p className='text-[12px] my-auto font-extralight capitalize'>{getFormattedDate((selectedData as any).date)}</p>
                                    </div>

                                </div>
                            </div>
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-ssm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b py-4">
                                    <tr className='bg-slate-800'>
                                        <th scope="col" className="px-6 py-3 tracking-widest font-thin text-white">
                                            Bill
                                        </th>
                                        <th scope="col" className="px-6 py-3 tracking-widest font-thin text-white">
                                        </th>
                                        <th scope="col" className="px-6 py-3 tracking-widest font-thin text-white">
                                        </th>

                                        <th scope="col" className="px-6 py-3 tracking-widest font-thin text-white text-right">
                                            Total
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {(selectedData as any).itemArray && <>
                                        {((selectedData as any).itemArray).map((item: any,key:number) => (
                                            <tr key={key} className='bg-slate-700 border-b border-gray-600'>
                                                <th scope="col" className="px-6 py-3 tracking-widest font-thin text-white text-[12px]">
                                                    {item.itemName}
                                                </th>
                                                <th scope="col" className="px-6 py-3 tracking-widest font-thin text-white text-[12px]">
                                                    {item.quantity} {item.unit}
                                                </th>
                                                <th scope="col" className="px-6 py-3 tracking-widest font-thin text-white text-[12px]">
                                                </th>

                                                <th scope="col" className="px-6 py-3 tracking-widest font-thin text-white text-right text-[12px] ">
                                                    Rs. {item.price}

                                                </th>
                                            </tr>
                                        ))}
                                    </>}
                                    <tr className='bg-slate-800'>
                                        <th scope="col" className="px-6 py-3 tracking-widest font-thin text-white text-[12px]">
                                            Total
                                        </th>
                                        <th scope="col" className="px-6 py-3 tracking-widest font-thin text-white text-[12px]">
                                        </th>
                                        <th scope="col" className="px-6 py-3 tracking-widest font-thin text-white text-[12px]">
                                        </th>

                                        <th scope="col" className="px-6 py-3 tracking-widest font-thin text-white text-right text-[12px] ">
                                            Rs. {(selectedData as any).total}
                                        </th>
                                    </tr>
                                </tbody>
                            </table>


                        </>
                    }

                </div>
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
                                                    <button type='button' onClick={() => { setSelectedData({ ...item }); setOpenDetail(true); }} className="flex underline">
                                                        <p className='font-bold text-[14px]'> Items Purchase  </p>
                                                    </button>
                                                </td>
                                                <td className='p-3 text-white font-light text-[12px] items-center'>
                                                    <p className=' text-[12px] capitalize'>{item.vendorName} </p>
                                                </td>
                                                <td className='p-3 text-white font-light text-[12px] items-center'>
                                                    <p className=' text-[12px]'>{item.billNo} </p>
                                                </td>
                                                <td className='p-3 text-white font-light text-[12px]'>
                                                    <div className='bg-gray-100 text-black rounded-[8px] p-2 max-w-xl w-20 text-center capitalize'>{item.paymentType}</div>
                                                </td>
                                                <td className='p-3 text-white font-light text-[12px] items-center'>
                                                    <p>Rs. {getTotal(item.itemArray)} </p>
                                                </td>
                                                <td className='p-3 text-white font-light text-[12px] items-center'>
                                                    <p> {formattedDate} </p>
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
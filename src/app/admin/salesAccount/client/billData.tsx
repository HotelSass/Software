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

function getOrderCost(fullOrder: [Object]) {
    let total = 0
    fullOrder.map((order: any) => {
        order.map((item: any) => {
            total = total + parseFloat(item.quantity) * parseFloat(item.price)
        })
    })
    return total
}

function getRoomCost(rooms: [Object]) {
    let total = 0;

    rooms.map((item: any) => {
        const checkInDate = new Date(item.checkIn);
        const checkOutDate = new Date(item.checkOut);

        // Make sure that both dates are valid before proceeding
        if (!isNaN(checkInDate.getTime()) && !isNaN(checkOutDate.getTime())) {
            // Calculate the difference in days
            const timeDifference = checkOutDate.getTime() - checkInDate.getTime();
            const dayDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

            // Ensure the day difference is greater than 0
            if (dayDifference > 0) {
                const roomRate = parseFloat(item.roomRate);
                total = total + dayDifference * roomRate;
            } else {
                const roomRate = parseFloat(item.roomRate);
                total = total + 1 * roomRate;
            }
        }
    });

    return total;

}
function getFormattedDate(date: any) {
    const date1 = new Date(date);
    const formattedDate = date1.toLocaleString('en-US', { timeZoneName: 'short' });
    return formattedDate
}

const BillData = ({ data }: any) => {
    const [openDetail, setOpenDetail] = useState(false)
    const [selectedData, setSelectedData] = useState<Object>({})

    const [res, setRes] = useState(data)

    return (
        <div className='w-full'>
            <Modal open={openDetail} setOpen={setOpenDetail} width={800} height={500} >
                <div className="">
                    {selectedData != null &&
                        <>
                            {(selectedData as any).type == 'room' &&
                                <>
                                    {console.log(selectedData)}

                                    <div className='flex flex-col mb-5 px-4'>
                                        <div className="flex">
                                            <div className="flex justify-center">
                                                <p className='text-[16px] mr-3 font-bold my-auto'>Name: </p>
                                                <p className='text-[14px] my-auto font-light capitalize'>{(selectedData as any).name}</p>
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

                                                <th scope="col" className="px-6 py-3 tracking-widest font-thin text-white text-right">
                                                    Total
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className='bg-slate-600 border-b border-b-gray-500'>
                                                <th scope="col" className="px-6 py-3 tracking-widest font-thin text-white text-[12px]">
                                                    Room Bill
                                                </th>

                                                <th scope="col" className="px-6 py-3 tracking-widest font-thin text-white text-right text-[12px] ">
                                                    Rs. {getRoomCost((selectedData as any).rooms)}
                                                </th>
                                            </tr>
                                            <tr className='bg-slate-600'>
                                                <th scope="col" className="px-6 py-3 tracking-widest font-thin text-white text-[12px]">
                                                    Restaurant Bill
                                                </th>

                                                <th scope="col" className="px-6 py-3 tracking-widest font-thin text-white text-right text-[12px] ">
                                                    Rs. {getOrderCost((selectedData as any).orders)}
                                                </th>
                                            </tr>
                                            <tr className='bg-slate-700'>
                                                <th scope="col" className="px-6 py-3 tracking-widest font-thin text-white text-[12px]">
                                                    Advance
                                                </th>

                                                <th scope="col" className="px-6 py-3 tracking-widest font-thin text-white text-right text-[12px] ">
                                                    Rs. {(selectedData as any).advance}
                                                </th>
                                            </tr>
                                            <tr className='bg-slate-800'>
                                                <th scope="col" className="px-6 py-3 tracking-widest font-thin text-white text-[12px]">
                                                    Total
                                                </th>

                                                <th scope="col" className="px-6 py-3 tracking-widest font-thin text-white text-right text-[12px] ">
                                                    Rs. {(selectedData as any).total}
                                                </th>
                                            </tr>
                                        </tbody>
                                    </table>
                                </>
                            }

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
                                    Room/ Table
                                </th>
                                <th scope="col" className="px-6 py-3 tracking-widest font-thin text-white">
                                    Contact
                                </th>
                                <th scope="col" className="px-6 py-3 tracking-widest font-thin text-white">
                                    Category
                                </th>
                                <th scope="col" className="px-6 py-6 tracking-widest font-thin text-white">
                                    Amount
                                </th>
                                <th scope="col" className="px-6 py-6 tracking-widest font-thin text-white">
                                    Date
                                </th>
                                <th>

                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {res.map((item: any, index: number) => {
                                const date = new Date(item.date);
                                const formattedDate = date.toLocaleString('en-US', { timeZoneName: 'short' });
                                return (

                                    <tr className='bg-slate-600 border-b' key={index}>
                                        <td className='p-3 text-white font-light text-[12px] items-center'>
                                            {item.type == 'advance' &&
                                                <div className="flex ">
                                                    <p className='font-bold text-[14px]'> Advance from:  </p>
                                                    <p className=' ml-2 text-[12px] my-auto'>{item.name} </p>
                                                </div>
                                            }
                                            {item.type == 'room' &&
                                                <div className="flex ">
                                                    <p className='font-bold text-[14px]'> Room Payment  </p>
                                                </div>
                                            }
                                            {item.type == 'restaurant' &&

                                                <div className="flex ">
                                                    <p className='font-bold text-[14px]'> Restaurant Payment </p>
                                                </div>
                                            }
                                        </td>
                                        <td className='p-3 text-white font-light text-[12px] items-center'>
                                            <div className="flex flex-wrap max-w-[80px] ">
                                                {item.type == 'advance' &&
                                                    <div className="flex ">
                                                        {item.rooms.map((rooms: any, index: number) => (
                                                            <div key={index} className=' text-[12px] ml-2'>{rooms.room} </div>
                                                        ))}
                                                    </div>
                                                }
                                                {item.type == 'room' &&
                                                    <div className="flex flex-wrap max-w-[80px] ">
                                                        {item.rooms.map((rooms: any, index: number) => (
                                                            <div key={index} className=' text-[12px] ml-2'>{rooms.room} </div>
                                                        ))}

                                                    </div>
                                                }
                                                {item.type == 'restaurant' &&
                                                    <p className=' ml-2 text-[12px] my-auto'>{item.tableNumber} </p>

                                                }


                                            </div>
                                        </td>
                                        <td className='p-3 text-white font-light text-[12px] items-center'>
                                            {item.type == 'advance' &&
                                                <p className=''>{item.advance} </p>
                                            }
                                            {item.type == 'room' &&
                                                <p className=' text-[12px]'>{item.phone} </p>
                                            }
                                            {item.type == 'restaurant' &&
                                                <p className=' ml-2 text-[12px] my-auto'></p>
                                            }
                                        </td>

                                        <td className='p-3 text-white font-light text-[12px]'>
                                            <div className='bg-gray-100 text-black rounded-[8px] p-2 max-w-xl w-20 text-center capitalize'>{item.type}</div>
                                        </td>
                                        <td className='p-3 text-white font-light text-[12px] items-center'>
                                            {item.type == 'advance' &&
                                                <p className=' text-[12px]'>{item.phone} </p>
                                            }
                                            {item.type == 'room' &&
                                                <p className=' text-[12px]'>{item.total} </p>
                                            }
                                            {item.type == 'restaurant' &&
                                                <p className=' text-[12px]'>{item.total} </p>
                                            }
                                        </td>
                                        <td className='p-3 text-white font-light text-[12px] items-center'>
                                            <p> {formattedDate} </p>
                                        </td>
                                        <td className='flex flex-row'>
                                            <div className="flex-1"></div>
                                            <button type='button' onClick={() => { setSelectedData({ ...item }); setOpenDetail(true); }} className='font-light text-[14px] text-white bg-green-600 py-2 px-8 text-center rounded-lg mx-auto my-3 mr-4 hover:bg-green-700'>See More</button>
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
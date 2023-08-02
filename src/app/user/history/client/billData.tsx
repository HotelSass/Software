'use client'
import serverUrl from '@/config/config'
import React, { useState } from 'react'
import Datepicker from 'react-tailwindcss-datepicker'
import RoomBill from './bill'
import TableBill from './tableBill'

const BillData = ({ data }: any) => {
    const [res, setRes] = useState(data)
    const [roomBillOpen, setRoomBillOpen] = useState(false)
    const [roomBillData, setRoomBillData] = useState({})
    const [tableBillData, setTableBillData] = useState({})
    const [tableBillOpen, setTableBillOpen] = useState(false)

    const [value, setValue] = useState({
        startDate: null,
        endDate: null
    });
    const handleValueChange = async (newValue: any) => {
        setValue(newValue);
        getAllRoomList(newValue)
    }
    async function getAllRoomList(dateValue: any) {
        if (!dateValue.startDate && !dateValue.endDate) {
            const currentDate = new Date();
            const year = currentDate.getFullYear();
            const month = String(currentDate.getMonth() + 1).padStart(2, '0');
            const day = String(currentDate.getDate()).padStart(2, '0');
            const formattedDate = `${year}-${month}-${day}`;
            const res = await fetch(serverUrl + "/user/finance/getFinanceData/" + formattedDate + "/date/" + formattedDate, { cache: 'no-store' });
            const resdata = await res.json();

            setRes(resdata)
        } else {
            const res = await fetch(serverUrl + "/user/finance/getFinanceData/" + dateValue.startDate + "/date/" + dateValue.endDate, { cache: 'no-store' });
            const resdata = await res.json();
            setRes(resdata)
        }
    }

    function getTotal() {
        let temp = 0
        for (let i = 0; i < res.length; i++) {
            temp = temp + parseInt(res[i]['total'])
        }
        return temp
    }
    return (
        <div className='w-full'>
            <RoomBill open={roomBillOpen} setOpen={setRoomBillOpen} data={roomBillData} />
            <TableBill open={tableBillOpen} setOpen={setTableBillOpen} data={tableBillData} />
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
                        <thead className="text-ssm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b py-4">
                            <tr className='bg-slate-800'>
                                <th scope="col" className="px-6 py-6 tracking-widest font-thin text-white">
                                    Description
                                </th>
                                <th scope="col" className="px-6 py-3 tracking-widest font-thin">

                                </th>
                                <th scope="col" className="px-6 py-3 tracking-widest font-thin text-white">
                                    Price
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {res.map((item: any, index: number) => (
                                <tr key={index} className="border-b bg-gray-500 font-thin text-ssm">
                                    <th scope="row" className="px-6 py-4 text-gray-100 whitespace-nowrap font-light text-ssm flex flex-row">
                                        <button type='button' className='underline' onClick={() => {
                                            if (item.name) {
                                                setRoomBillOpen(true); setRoomBillData(item)
                                            } else {
                                                setTableBillOpen(true); setTableBillData(item)
                                            }
                                        }
                                        }>
                                            Payment from {item.name || "Restaurant"}
                                        </button>
                                    </th>
                                    <td className="px-6 py-4 text-white">
                                        <div className=' ml-4 flex flex-row'>
                                            {item.roomNumber &&
                                                <p className='px-3'>Room: </p>
                                            }
                                            {item.tableNumber &&
                                                <p className='px-3'>Table: </p>
                                            }
                                            {item.roomNumber &&
                                                <>
                                                    {item.roomNumber.map((room: any, index: number) =>
                                                        <p key={index} className='mx-1'>
                                                            {room}
                                                        </p>
                                                    )}

                                                </>
                                            }
                                            {item.tableNumber &&
                                                <>
                                                    <p className='px-2'>
                                                        {item.tableNumber}
                                                    </p>

                                                </>
                                            }
                                        </div>
                                    </td>

                                    <td className="px-6 py-4 text-white">
                                        Rs. {item.total}
                                    </td>
                                </tr>
                            ))}
                            <tr className="border-b bg-gray-700 font-thin text-ssm">
                                <th scope="row" className="px-6 py-6 text-gray-100 whitespace-nowrap font-light text-ssm flex flex-row">
                                    Total
                                </th>
                                <td className="px-6 py-4 text-white">

                                </td>

                                <td className="px-6 py-6 text-white">
                                    Rs. {getTotal()}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    )
}

export default BillData
'use client'
import serverUrl from '@/config/config'
import React, { useState } from 'react'
import Datepicker from 'react-tailwindcss-datepicker'

const BillData = ({ data, outgoing }: any) => {
    const [res, setRes] = useState(data)
    const [res2, setRes2] = useState(outgoing)
    const [value, setValue] = useState({
        startDate: null,
        endDate: null
    });
    const handleValueChange = async (newValue: any) => {
        setValue(newValue);
        getAllRoomList(newValue)
        getAllPurchaseList(newValue)
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
    async function getAllPurchaseList(dateValue: any) {
        if (!dateValue.startDate && !dateValue.endDate) {
            const currentDate = new Date();
            const year = currentDate.getFullYear();
            const month = String(currentDate.getMonth() + 1).padStart(2, '0');
            const day = String(currentDate.getDate()).padStart(2, '0');
            const formattedDate = `${year}-${month}-${day}`;
            const res2 = await fetch(serverUrl + "/user/finance/getOutgoingdata/" + formattedDate + "/date/" + formattedDate, { cache: 'no-store' });
            const data2 = await res2.json();

            setRes2(data2)
        } else {
            const res = await fetch(serverUrl + "/user/finance/getOutgoingdata/" + dateValue.startDate + "/date/" + dateValue.endDate, { cache: 'no-store' });
            const resdata = await res.json();
            setRes2(resdata)
        }
    }

    function getTotal() {
        let temp = 0
        for (let i = 0; i < res.length; i++) {
            if (res[i].status != 'advance') {
                temp = temp + parseInt(res[i]['total'])
            } else {
                temp = temp + parseInt(res[i]['advance'])

            }
        }
        return temp
    }
    function getArrayAmountSum(item: any) {
        let total = 0
        for (let i = 0; i < item.length; i++) {
            total = total + Math.abs(item[i].quantity * item[i].price)
        }
        return total
    }

    function getFullPurchaseTotal() {
        let total = 0
        for (let i = 0; i < res2.length; i++) {
            if (res2[i].itemArray) {
                for (let j = 0; j < res2[i].itemArray.length; j++) {
                    total = total + Math.abs(res2[i].itemArray[j].quantity * res2[i].itemArray[j].price)
                }
            }
            if (res2[i].bankData) {
                total = total + Math.abs(parseInt(res2[i].bankData[0].amount))
            }
        }
        return total
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
            <div className="flex flex-row space-x-5">

                <div className="relative overflow-x-auto py-10 flex-1 flex flex-col">
                    <div className="text-[20px] font-thin tracking-tight my-4">Income</div>

                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-ssm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b py-4">
                            <tr>
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
                                <tr className="border-b bg-gray-500 font-thin text-ssm">
                                    <th scope="row" className="px-6 py-4 text-gray-100 whitespace-nowrap font-light text-ssm flex flex-row">
                                        {item.status == 'advance' ? (
                                            <>
                                                Advance from {item.name || "Restaurant"}
                                            </>
                                        ) :
                                            <>
                                                Checkout Payment from {item.name || "Restaurant"}
                                            </>
                                        }
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
                                                    {item.roomNumber.map((room: any) =>
                                                        <p className='mx-1'>
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
                                        {item.status == 'advance' ? (
                                            <>
                                                Rs. {item.advance}
                                            </>
                                        ) :
                                            <>
                                                Rs. {item.total}
                                            </>
                                        }
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
                <div className="relative overflow-x-auto py-10 flex-1 flex flex-col">
                    <div className="text-[20px] font-thin tracking-tight my-4">Expense</div>

                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-ssm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b py-4">
                            <tr>
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
                            {res2.map((item: any, index: number) => (
                                <tr className="border-b bg-gray-500 font-thin text-ssm">
                                    <th scope="row" className="px-6 py-4 text-gray-100 whitespace-nowrap font-light text-ssm ">
                                        {item.bankData && (
                                            <div className="flex flex-col">
                                                <div className="font-light text-sm">Bank Transfer to {item.bankData[0].bankName}</div>
                                                <div className=" ">A/C: {item.bankData[0].accountNumber} / ( {item.bankData[0].accountName} )</div>
                                            </div>
                                        )}
                                        {item.itemArray && (
                                            <div className="flex flex-col">
                                                <div className="font-light text-sm">Purchase from {item.vendorName}</div>
                                            </div>
                                        )}

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
                                                    {item.roomNumber.map((room: any) =>
                                                        <p className='mx-1'>
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
                                        {item.bankData && (
                                            <div className="font-light text-sm">Rs. {item.bankData[0].amount}</div>
                                        )}
                                        {item.itemArray && (
                                            <div className="font-light text-sm">Rs. {getArrayAmountSum(item.itemArray)}</div>
                                        )}
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
                                    Rs. {getFullPurchaseTotal()}
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
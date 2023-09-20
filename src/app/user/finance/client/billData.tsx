'use client'
import serverUrl from '@/config/config'
import React, { useState } from 'react'
import Datepicker from 'react-tailwindcss-datepicker'

const BillData = ({ data, outgoing, daily }: any) => {
    const [res, setRes] = useState(data)
    const [res2, setRes2] = useState(outgoing)
    const [value, setValue] = useState({
        startDate: null,
        endDate: null
    });
    const currentDate = new Date();
    const c_date = currentDate.getDate();
    const c_month = currentDate.getMonth();
    const c_year = currentDate.getFullYear();

    const c_month_name = currentDate.toLocaleDateString("en-US", {
        month: "short",
    });
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    const [searchDate, setSearchDate] = useState(formattedDate)
    const handleValueChange = async (newValue: any) => {
        setValue(newValue);
        setSearchDate(newValue.startDate)
        const val1 = await getAllRoomList(newValue)
        setRes(val1)
        const val2 = await getAllPurchaseList(newValue)
        setRes2(val2)
    }
    function getDataWithDate(date: string) {
        if (daily[date]) {
            return daily[date]
        } else {
            return { closing: 0, opening: 0 }
        }
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

            return resdata
        } else {
            const res = await fetch(serverUrl + "/user/finance/getFinanceData/" + dateValue.startDate + "/date/" + dateValue.endDate, { cache: 'no-store' });
            const resdata = await res.json();
            return resdata
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

            return data2
        } else {
            const res = await fetch(serverUrl + "/user/finance/getOutgoingdata/" + dateValue.startDate + "/date/" + dateValue.endDate, { cache: 'no-store' });
            const resdata = await res.json();
            return resdata
        }
    }

    function getTotal() {
        let temp = 0
        for (let i = 0; i < res.length; i++) {
            if (res[i].type != 'advance') {
                if (res[i].paymentType == 'cash') {
                    temp = temp + parseInt(res[i]['total'])
                }
            } else {
                temp = temp + parseInt(res[i]['advance'])

            }
        }
        return temp
    }
    function getTotalOnline() {
        let temp = 0
        for (let i = 0; i < res.length; i++) {
            if (res[i].type != 'advance') {
                if (res[i].paymentType == 'online') {
                    temp = temp + parseInt(res[i]['total'])
                }
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
                if (res2[i].paymentType == "cash") {
                    for (let j = 0; j < res2[i].itemArray.length; j++) {
                        total = total + Math.abs(res2[i].itemArray[j].quantity * res2[i].itemArray[j].price)
                    }
                }
            }
            if (res2[i].transferDate) {
                total = total + Math.abs(parseInt(res2[i].amount))
            }
        }
        return total
    }
    function getFullOnlinePurchaseTotal() {
        let total = 0
        for (let i = 0; i < res2.length; i++) {

            if (res2[i].itemArray) {
                if (res2[i].paymentType != "cash") {
                    for (let j = 0; j < res2[i].itemArray.length; j++) {
                        total = total + Math.abs(res2[i].itemArray[j].quantity * res2[i].itemArray[j].price)
                    }
                }
            }
            if (res2[i].rooms) {
                total = total + Math.abs(res2[i].total)
            }
            if (res2[i].type == 'restaurant') {
                total = total + Math.abs(res2[i].total)
            }

        }
        return total
    }

    return (
        <div className='w-full'>
            <div className='flex flex-row'>
                <div className='flex flex-col'>
                    <div className="text-[44px] font-bold text-gray-700 my-auto">
                        Accounts
                    </div>
                    <div className="flex flex-row">
                        <div className="flex flex-row space-x-2 flex-1">
                            <div className="text-[36px] font-thin">{c_date}</div>
                            <div className="text-[36px] font-thin">{c_month_name}</div>
                            <div className="text-[36px] font-thin">{c_year}</div>
                        </div>

                    </div>
                </div>
                <div className="ml-auto pt-5">
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <tbody>
                                <tr className=" bg-gray-800">
                                    <th scope="row" className="px-6 py-4 font-medium text-white">
                                        Opening Balance
                                    </th>
                                    <td className="px-6 py-4">
                                    </td>
                                    <td className="px-6 py-4">
                                    </td>
                                    <td className="px-6 py-4 text-gray-100">
                                        Rs. {getDataWithDate(searchDate).opening || 0}
                                    </td>
                                </tr>
                                <tr className=" bg-gray-800 border-t border-t-gray-600">
                                    <th scope="row" className="px-6 py-4 font-medium text-white">
                                        Closing Balance
                                    </th>
                                    <td className="px-6 py-4">
                                    </td>
                                    <td className="px-6 py-4">
                                    </td>
                                    <td className="px-6 py-4 text-gray-100">
                                        Rs. {getDataWithDate(searchDate).closing || 0}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className='w-full flex flex-row'>
                <div className='w-1/3'>
                    <Datepicker
                        asSingle={true}
                        inputClassName=' border border-gray-300 rounded-lg bg-gray-50 text-gray-700 p-4 rounded-xl text-[12px] w-full'
                        placeholder='Date'
                        primaryColor={"indigo"}
                        value={value}
                        onChange={handleValueChange}
                    />
                </div>


            </div>

            <div className="flex flex-row space-x-5">

                <div className="relative overflow-x-auto py-1 flex-1 flex flex-col">
                    <div className="text-[20px] font-thin tracking-tight my-4">Income</div>

                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-ssm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b py-4">
                            <tr className='bg-slate-800'>
                                <th scope="col" className="px-6 py-6 tracking-widest font-thin text-white">
                                    Description
                                </th>
                                <th scope="col" className="px-6 py-3 tracking-widest font-thin">

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
                                    <th scope="row" className="px-6 py-4 text-gray-100 whitespace-nowrap font-light text-ssm flex flex-row capitalize">
                                        {item.type == 'room' && (
                                            <div>
                                                <p>Payment From Room</p>
                                                <p>{item.name}</p>
                                            </div>
                                        )}
                                        {item.type == 'restaurant' && (
                                            <>
                                                Payment from Restaurant
                                            </>
                                        )}
                                        {item.type == 'advance' && (
                                            <div>
                                                <p>Advance From Room</p>
                                                <p>{item.name}</p>
                                            </div>
                                        )}
                                    </th>
                                    <th>
                                        {item.paymentType == 'cash' && (
                                            <p className='bg-green-600 p-1 rounded-full text-white w-16 text-center font-thin'>Cash</p>
                                        )}

                                    </th>
                                    <td className="px-6 py-4 text-white">
                                        <div className=' ml-4 flex flex-row'>
                                            {item.type == 'room' &&
                                                <>
                                                    <p className='px-3'>Room: </p>
                                                    {item.rooms.map((room: any, index: number) =>
                                                        <p key={index} className='mx-1'>
                                                            {room.room}
                                                        </p>
                                                    )}
                                                </>
                                            }
                                            {item.type == 'advance' &&
                                                <>
                                                    <p className='px-3'>Room: </p>
                                                    {item.rooms.map((room: any, index: number) =>
                                                        <p key={index} className='mx-1'>
                                                            {room.room}
                                                        </p>
                                                    )}
                                                </>
                                            }
                                            {item.type == 'restaurant' &&
                                                <>
                                                    <p className='px-3'>Table: </p>
                                                    <p className='px-2'>
                                                        {item.tableNumber}
                                                    </p>
                                                </>
                                            }

                                        </div>
                                    </td>


                                    <td className="px-6 py-4 text-white gap-x">
                                        {item.type == 'advance' && (
                                            <>
                                                Rs. {item.advance}
                                            </>
                                        )}

                                        {item.type == 'restaurant' && (
                                            <>
                                                Rs. {item.total}
                                            </>
                                        )}

                                        {item.type == 'room' && (
                                            <>
                                                Rs. {item.total}
                                            </>
                                        )}

                                    </td>
                                </tr>
                            ))}
                            <tr className="border-b bg-gray-700 font-thin text-ssm">
                                <th scope="row" className="px-6 py-6 text-gray-100 whitespace-nowrap font-light text-ssm flex flex-row">
                                    Total Cash Transaction
                                </th>
                                <td className="px-6 py-4 text-white">

                                </td>
                                <td className="px-6 py-4 text-white">

                                </td>

                                <td className="px-6 py-6 text-white">
                                    Rs. {getTotal()}
                                </td>
                            </tr>
                            <tr className="border-b bg-gray-700 font-thin text-ssm">
                                <th scope="row" className="px-6 py-6 text-gray-100 whitespace-nowrap font-light text-ssm flex flex-row">
                                    Total Online Transaction
                                </th>
                                <td className="px-6 py-4 text-white">

                                </td>
                                <td className="px-6 py-4 text-white">

                                </td>

                                <td className="px-6 py-6 text-white">
                                    Rs. {getTotalOnline()}
                                </td>
                            </tr>
                            <tr className="border-b bg-gray-900 font-thin text-ssm">
                                <th scope="row" className="px-6 py-6 text-gray-100 whitespace-nowrap font-light text-ssm flex flex-row">
                                    Total
                                </th>
                                <td className="px-6 py-4 text-white">

                                </td>
                                <td className="px-6 py-4 text-white">

                                </td>

                                <td className="px-6 py-6 text-white">
                                    Rs. {getTotalOnline() + getTotal()}
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>
                <div className="relative overflow-x-auto py-1 flex-1 flex flex-col">
                    <div className="text-[20px] font-thin tracking-tight my-4">Expense</div>

                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-ssm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b py-4">
                            <tr className='bg-slate-800'>
                                <th scope="col" className="px-6 py-6 tracking-widest font-thin text-white">
                                    Description
                                </th>
                                <th scope="col" className="px-6 py-3 tracking-widest font-thin">

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
                                <tr key={index} className="border-b bg-gray-500 font-thin text-ssm">
                                    <th scope="row" className="px-6 py-4 text-gray-100 whitespace-nowrap font-light text-ssm ">
                                        {item.transferDate && (
                                            <div className="flex flex-col">
                                                <div className="font-light text-sm">Bank Transfer to </div>
                                                <div className=" ">A/C: {item.bankAccount} / ( {item.bankAccount} )</div>
                                            </div>
                                        )}
                                        {item.itemArray && (
                                            <div className="flex flex-col">
                                                <div className="font-light text-sm">Purchase from {item.vendorName}</div>
                                            </div>
                                        )}
                                        {item.type == 'room' && (
                                            <div>
                                                <p>Payment From Room</p>
                                                <p>{item.name}</p>
                                            </div>
                                        )}
                                        {item.type == 'restaurant' && (
                                            <>
                                                Payment from Restaurant
                                            </>
                                        )}

                                    </th>
                                    <th>
                                        {item.paymentType == 'cash' && (
                                            <p className='bg-green-600 p-1 rounded-full text-white w-16 text-center font-thin'>Cash</p>
                                        )}
                                        {item.paymentType == 'online' && (
                                            <p className='bg-orange-600 p-1 rounded-full text-white w-16 text-center font-thin'>Online</p>
                                        )}
                                        {item.transferDate && (
                                            <p className='bg-gray-800 p-1 rounded-full text-white w-24 text-center font-thin'>Bank Transfer</p>
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
                                        {item.transferDate && (
                                            <div className="font-light text-sm">Rs. {item.amount}</div>
                                        )}
                                        {item.itemArray && (
                                            <div className="font-light text-sm">Rs. {getArrayAmountSum(item.itemArray)}</div>
                                        )}

                                        {item.type == 'restaurant' && (
                                            <>
                                                Rs. {item.total}
                                            </>
                                        )}

                                        {item.type == 'room' && (
                                            <>
                                                Rs. {item.total}
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            <tr className="border-b bg-gray-700 font-thin text-ssm">
                                <th scope="row" className="px-6 py-6 text-gray-100 whitespace-nowrap font-light text-ssm flex flex-row">
                                    Total Cash Transaction:
                                </th>
                                <td className="px-6 py-4 text-white">

                                </td>
                                <td className="px-6 py-4 text-white">

                                </td>

                                <td className="px-6 py-6 text-white">
                                    Rs. {getFullPurchaseTotal()}
                                </td>
                            </tr>
                            <tr className="border-b bg-gray-700 font-thin text-ssm">
                                <th scope="row" className="px-6 py-6 text-gray-100 whitespace-nowrap font-light text-ssm flex flex-row">
                                    Total Online Transaction:
                                </th>
                                <td className="px-6 py-4 text-white">

                                </td>
                                <td className="px-6 py-4 text-white">

                                </td>

                                <td className="px-6 py-6 text-white">
                                    Rs. {getFullOnlinePurchaseTotal()}
                                </td>
                            </tr>
                            <tr className="border-b bg-gray-900 font-thin text-ssm">
                                <th scope="row" className="px-6 py-6 text-gray-100 whitespace-nowrap font-light text-ssm flex flex-row">
                                    Total:
                                </th>
                                <td className="px-6 py-4 text-white">

                                </td>
                                <td className="px-6 py-4 text-white">

                                </td>

                                <td className="px-6 py-6 text-white">
                                    Rs. {getFullOnlinePurchaseTotal() + getFullPurchaseTotal()}
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
'use client'
import React, { useState } from 'react'
import { AiOutlineCloseCircle } from "react-icons/ai";
import RoomModal from './RoomModal';
import TableModal from './TableModal';
import { Tabs, Tab, Card, CardBody, CardHeader, Divider, Button, Input } from "@nextui-org/react";

const POS = ({ data, bookingList, unOccupiedTableList }: any) => {
    const [selectedItems, setSelectedItems] = useState<any[]>([])
    const [selectedId, setSelectedId] = useState<string[]>([])
    const [selectedTab, setSelectedTab] = useState("all")
    const [search, setSearch] = useState<string>("")
    const category = data.categories
    const menu = data.menu

    let tabs = [
        {
            id: "photos",
            label: "Photos",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        },
        {
            id: "music",
            label: "Music",
            content: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
        },
        {
            id: "videos",
            label: "Videos",
            content: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        }
    ];
    function addItem(item: any) {
        let tempIndex = [...selectedId]
        tempIndex.push(item['_id'])
        setSelectedId([...tempIndex])
        let selected = {
            itemName: item.itemName,
            price: item.price,
            quantity: 1,
            id: item._id
        }
        const temp = selectedItems
        temp.push(selected)
        setSelectedItems([...temp])
    }

    function changeValue(id: any, val: number) {
        const temp = selectedItems
        for (let i = 0; i < temp.length; i++) {
            if (temp[i].id == id) {
                const edit = temp[i]
                edit.quantity = val
                temp[i] = edit
                setSelectedItems([...temp])
                return
            }
        }
    }
    function removeItem(id: any) {
        const temp = selectedItems
        const temp1 = selectedId
        for (let i = 0; i < temp.length; i++) {
            if (temp[i].id == id) {
                temp.splice(i, 1)
                const index = temp1.indexOf(id);
                if (index > -1) {
                    temp1.splice(index, 1);
                }
                setSelectedId([...temp1])
                setSelectedItems([...temp])
            }
        }
    }

    function getTotalAmount() {
        let num = 0
        const temp = selectedItems
        for (let i = 0; i < temp.length; i++) {
            num = num + temp[i].quantity * temp[i].price
        }
        if (temp.length == 0) {
            return ""
        }
        return num
    }
    function getTotalQuantity() {
        let num = 0
        const temp = selectedItems
        for (let i = 0; i < temp.length; i++) {
            num = num + temp[i].quantity
        }
        if (temp.length == 0) {
            return ""
        }
        return num
    }
    function reload() {
        setSelectedId([])
        setSelectedItems([])
        setSelectedTab(data.categories[0].category)

    }

    return (
        <div className='flex-1 flex flex-row h-full w-full '>
            <div className="w-7/12 py-10 flex flex-col h-full ">
                <div className="w-full">
                    <div className=" p-3 rounded-xl bg-gray-200 mb-5 flex flex-row overflow-x-scroll no-scrollbar">
                        <div key={999} className='w-56 my-auto pr-4'>

                            {('all' != selectedTab.toLowerCase()) ? (
                                <Button onClick={() => setSelectedTab('all')} className='p-2 px-4 text-[12px] capitalize text-gray-700 mx-2 font-medium w-full '>
                                    All
                                </Button>
                            ) : (
                                <Button className='p-2 px-5 border border-orange-500 bg-white rounded-md text-[12px] capitalize text-orange-500 mx-2 font-medium w-full'>
                                    All
                                </Button>
                            )}
                        </div>
                        {category.map((item: any, index: any) => (
                            <div key={index} className='w-56 my-auto pr-4'>

                                {((item.category).toLowerCase() !== selectedTab.toLowerCase()) ? (
                                    <Button onClick={() => setSelectedTab((item.category).toLowerCase())} className='p-2 px-4 text-[12px] capitalize text-gray-700 mx-2 font-medium w-full '>
                                        {item.category}
                                    </Button>
                                ) : (
                                    <Button className='p-2 px-5 border border-orange-500 bg-white rounded-md text-[12px] capitalize text-orange-500 mx-2 font-medium w-full'>
                                        {item.category}
                                    </Button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="w-full h-full p-3 py-6 rounded-xl bg-gray-200 overflow-y-scroll flex flex-col ">
                    <div className="px-3">
                        <Input value={search} onValueChange={(val) => setSearch(val ? val.toString() : "")} label="Search" className='border border-gray-400 rounded-xl' />
                    </div>
                    <div className="flex w-full flex-wrap mt-5">
                        {menu.map((item: any, index: number) => (
                            <>
                                {(item.category == selectedTab.toLowerCase() && (item.itemName).toLowerCase().includes(search.toLowerCase())) && (
                                    <div key={index} className="px-2 w-1/5 py-3">
                                        <div className="p-3 w-full h-36 rounded-lg bg-slate-700 capitalize flex flex-col">
                                            <div className="text-white font-thin truncate w-full">
                                                {item.itemName}
                                            </div>
                                            <div className="text-white font-thin text-[12px]">
                                                Rs.{item.price}
                                            </div>
                                            <Divider className='mt-auto mb-2' />
                                            {selectedId.includes(item['_id']) ?
                                                <button type='button' disabled={true} className='p-2 rounded-md text-center w-full bg-gray-400 text-slate-700 text-[12px]'>Select</button>
                                                :
                                                <button type='button' onClick={() => addItem(item)} className='p-2 rounded-md text-center w-full bg-white text-slate-700 text-[12px]'>Select</button>
                                            }
                                        </div>
                                    </div>


                                )}
                            </>
                        ))}

                        {menu.map((item: any, index: number) => (
                            <>
                                {('all' == selectedTab.toLowerCase() && (item.itemName).toLowerCase().includes(search.toLowerCase())) && (
                                    <div key={index} className="px-2 w-1/5 py-3">
                                        <div className="p-3 w-full h-36 rounded-lg bg-slate-700 capitalize flex flex-col">
                                            <div className="text-white font-thin truncate w-full">
                                                {item.itemName}
                                            </div>
                                            <div className="text-white font-thin text-[12px]">
                                                Rs.{item.price}
                                            </div>
                                            <Divider className='mt-auto mb-2' />
                                            {selectedId.includes(item['_id']) ?
                                                <button type='button' disabled={true} className='p-2 rounded-md text-center w-full bg-gray-400 text-slate-700 text-[12px]'>Select</button>
                                                :
                                                <button type='button' onClick={() => addItem(item)} className='p-2 rounded-md text-center w-full bg-white text-slate-700 text-[12px]'>Select</button>
                                            }
                                        </div>
                                    </div>


                                )}
                            </>
                        ))}
                    </div>
                </div>
            </div>
            <div className="w-5/12 py-10 px-3">
                <div className="bg-gray-200 rounded-xl h-full p-8 flex flex-col">
                    <div className="text-[24px] font-thin tracking-tight">Order</div>

                    <div className="relative overflow-x-auto mt-8 flex-1 flex flex-col">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 rounded">
                            <thead className=" text-[14px] = uppercase bg-gray-100 dark:bg-gray-700 text-gray-200">
                                <tr className='bg-slate-900'>
                                    <th scope="col" className="px-6 py-5 rounded-l-lg">
                                        Name
                                    </th>
                                    <th scope="col" className="px-6 py-5">
                                        Qty
                                    </th>
                                    <th scope="col" className="px-6 py-5 rounded-r-lg">
                                        Price
                                    </th>
                                    <th scope="col" className="px-6 py-5 rounded-r-lg">
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {selectedItems.map((item, index) => (
                                    <tr key={index} className=" bg-gray-300 border-b ">
                                        <th scope="row" className="px-6 py-4 text-gray-900 whitespace-nowrap font-light text-[14px] capitalize">
                                            {item.itemName}
                                        </th>
                                        <td className="px-6 py-4 text-gray-900 whitespace-nowrap font-light text-[14px]">
                                            <input type='number' onChange={(e) => changeValue(item.id, parseInt(e.target.value))} defaultValue={item.quantity} min={1} className='bg-gray-300 w-12' />
                                        </td>
                                        <td className="px-6 py-4 text-gray-900 whitespace-nowrap font-light text-[14px]">
                                            {item.price}
                                        </td>
                                        <td className="px-6 py-4 text-gray-900 whitespace-nowrap font-light text-[14px] justify-center">
                                            <button onClick={() => removeItem(item.id)} type='button' className='my-auto'>
                                                <AiOutlineCloseCircle size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr className="font-semibold text-gray-100 bg-slate-800">
                                    <th scope="row" className="px-6 py-3 text-base">Total</th>
                                    <td className="px-6 py-3">{getTotalQuantity()}</td>

                                    <td className="px-6 py-3">{getTotalAmount()}</td>
                                    <td className="px-6 py-3"></td>
                                </tr>
                            </tfoot>
                        </table>
                        <div className="mt-20 flex flex-row ">
                            <div className="flex-1 px-2">
                                <TableModal reload={() => reload()} tableList={unOccupiedTableList} selectedItems={selectedItems} />
                            </div>
                            <div className="flex-1 px-2">
                                <RoomModal reload={() => reload()} bookingList={bookingList} selectedItems={selectedItems} />
                            </div>

                        </div>
                    </div>


                </div>

            </div>
        </div>
    )
}

export default POS
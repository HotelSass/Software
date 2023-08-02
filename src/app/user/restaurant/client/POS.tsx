'use client'
import React, { useEffect, useState } from 'react'
import { AiOutlineCloseCircle } from "react-icons/ai";
import RoomModal from './RoomModal';
import TableModal from './TableModal';
import { Switch, Button, Input } from "@nextui-org/react";

const POS = ({ data, bookingList, unOccupiedTableList }: any) => {
    const [manualMenu, setManualMenu] = useState(false)
    const [freeMenu, setFreeMenu] = useState(false)
    const [selectedItems, setSelectedItems] = useState<any[]>([])
    const [selectedId, setSelectedId] = useState<string[]>([])
    const [selectedTab, setSelectedTab] = useState("all")
    const [search, setSearch] = useState<string>("")
    const [menu, setMenu] = useState(data.menu)
    const category = data.categories
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
    function changePriceValue(id: any, val: number) {
        const temp = selectedItems
        for (let i = 0; i < temp.length; i++) {
            if (temp[i].id == id) {
                const edit = temp[i]
                edit.price = val
                temp[i] = edit
                setSelectedItems([...temp])
                return
            }
        }
    }
    function changeValueName(id: any, val: string) {
        console.log(val)
        const temp = selectedItems
        for (let i = 0; i < temp.length; i++) {
            if (temp[i].id == id) {
                const edit = temp[i]
                edit.itemName = val
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

    useEffect(() => {
        const selectedItemsIds = new Set(selectedItems.map((item) => item.id));
        const selectedItemsArray = menu.filter((item: { _id: string }) => selectedItemsIds.has(item._id.toString()));
        const restItemsArray = menu.filter((item: { _id: string }) => !selectedItemsIds.has(item._id.toString()));
        const arrangedItemsArray = [...selectedItemsArray, ...restItemsArray];
        setMenu(arrangedItemsArray);

    }, [selectedItems])


    function getTotalAmount() {
        let num = 0
        const temp = selectedItems
        for (let i = 0; i < temp.length; i++) {
            num = num + temp[i].quantity * (temp[i].price || 0)
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
            <div className="w-1/2 py-10 flex flex-col h-full ">
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
                                        <button onClick={() => addItem(item)} type='button' disabled={selectedId.includes(item['_id'])} className={!selectedId.includes(item['_id']) ? "p-3 w-full rounded-lg bg-slate-700 capitalize flex flex-col" : "p-3 w-full rounded-lg bg-green-700 capitalize flex flex-col"}>
                                            <div className="text-white font-thin truncate w-full">
                                                {item.itemName}
                                            </div>
                                            <div className="text-white font-thin text-[12px]">
                                                Rs.{item.price}
                                            </div>
                                        </button>
                                    </div>
                                )}
                            </>
                        ))}

                        {menu.map((item: any, index: number) => (
                            <>
                                {('all' == selectedTab.toLowerCase() && (item.itemName).toLowerCase().includes(search.toLowerCase())) && (
                                    <div key={index} className="px-2 w-1/5 py-3">
                                        <button onClick={() => addItem(item)} type='button' disabled={selectedId.includes(item['_id'])} className={!selectedId.includes(item['_id']) ? "p-3 w-full rounded-lg bg-slate-700 capitalize flex flex-col" : "p-3 w-full rounded-lg bg-green-700 capitalize flex flex-col"}>
                                            <div className="text-white font-thin truncate w-full">
                                                {item.itemName}
                                            </div>
                                            <div className="text-white font-thin text-[12px]">
                                                Rs.{item.price}
                                            </div>
                                        </button>
                                    </div>
                                )}
                            </>
                        ))}
                    </div>
                </div>
            </div>
            <div className="w-1/2 py-10 px-3">
                <div className="bg-gray-200 rounded-xl h-full p-8 flex flex-col">
                    <div className="text-[24px] font-thin tracking-tight flex ">
                        <p> Order</p>
                        <div className="ml-auto bg-gray-600 flex px-3 py-2 rounded-xl">
                            <Switch isSelected={manualMenu} color='danger' onChange={() => setManualMenu(!manualMenu)} className='ml-auto mr-5' />
                            <p className='text-[14px] my-auto text-white'> Manual Menu</p>
                        </div>
                        <div className="ml-2 bg-gray-600 flex px-3 py-2 rounded-xl">
                            <Switch isDisabled isSelected={freeMenu} color='danger' onChange={() => setFreeMenu(!freeMenu)} className='ml-auto mr-5' />
                            <p className='text-[14px] my-auto text-white'> Free Menu</p>
                        </div>
                    </div>

                    <div className="relative overflow-x-auto mt-8 flex-1 flex flex-col">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 rounded">
                            <thead className=" text-[14px] = uppercase bg-gray-100 dark:bg-gray-700 text-gray-200">
                                <tr className='bg-slate-900'>
                                    <th scope="col" className="px-6 py-5 rounded-l-lg">
                                        Names
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
                                    <tr key={index} className=" bg-gray-300 border-b flex-1 ">
                                        <th scope="row" className="px-6 py-4 text-gray-900 whitespace-nowrap font-light text-[14px] capitalize">
                                            {(item.manual) ?
                                                <input type='text' onChange={(e) => changeValueName(item.id, e.target.value)} placeholder='Item Name' defaultValue={item.itemName} min={1} className='bg-slate-600 w-full py-3 rounded-lg text-left px-2 text-white text-[12px]' />
                                                :
                                                <>
                                                    {item.itemName}
                                                </>
                                            }
                                        </th>
                                        <td className="px-6 text-gray-900 whitespace-nowrap font-light text-[14px]">
                                            <input type='number' onChange={(e) => changeValue(item.id, parseInt(e.target.value))} defaultValue={item.quantity} min={1} className='bg-gray-300 w-full text-center py-3' />
                                        </td>
                                        <td className="px-6 text-gray-900 whitespace-nowrap font-light text-[14px]">
                                            {item.manual ?
                                                <input type='number' onChange={(e) => changePriceValue(item.id, parseInt(e.target.value))} defaultValue={item.price} min={1} className='bg-gray-300 text-center py-3 ' />
                                                :
                                                <p className='w-full text-center '>
                                                    {item.price}
                                                </p>
                                            }
                                            {/*freeMenu ?
                                                <input type='number' onChange={(e) => changePriceValue(item.id, parseInt(e.target.value))} defaultValue={item.price} min={1} className='bg-gray-300 w-12 text-center py-3' />
                                                :
                                                <p className=''>
                                                    {item.price}
                                                </p>
                                        */}
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
                                    <td className="px-6 py-3 text-center">
                                        <p className='w-full'>
                                            {getTotalQuantity()}
                                        </p>
                                    </td>
                                    <td className="px-6 py-3 text-center  ">
                                        <p className='w-full'>
                                            {getTotalAmount()}
                                        </p>
                                    </td>
                                    <td className="px-6 py-3"></td>
                                </tr>
                            </tfoot>

                        </table>
                        {manualMenu &&
                            <button onClick={() => {
                                const temp = [
                                    {
                                        id: (Math.random() * 10000).toString(),
                                        itemName: '',
                                        price: 1,
                                        quantity: 1,
                                        manual: true
                                    }
                                ]
                                setSelectedItems([...selectedItems, ...temp])
                            }} className='text-left ml-2 w-1/5 font-light text-[12px] text-blue-600 underline mt-4'>
                                Add More...
                            </button>
                        }
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
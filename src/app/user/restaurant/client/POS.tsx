'use client'
import React, { useState } from 'react'
import { AiOutlineCloseCircle } from "react-icons/ai";
import RoomModal from './RoomModal';
import TableModal from './TableModal';


const POS = ({ data, bookingList, unOccupiedTableList }: any) => {
    const [selectedItems, setSelectedItems] = useState<any[]>([])
    const [selectedId, setSelectedId] = useState<string[]>([])
    const [selectedTab, setSelectedTab] = useState(data.categories[0].category)
    const category = data.categories
    const menu = data.menu

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
            <div className="flex-1 py-10 flex flex-col h-full ">
                <div className="w-full p-3 rounded-xl bg-gray-200 overflow-x-scroll mb-5">
                    {category.map((item: any, index: any) => (
                        <div key={index} >
                            {((item.category).toLowerCase() != selectedTab.toLowerCase()) ?
                                <button type='button' onClick={() => setSelectedTab((item.category).toLowerCase())} className='p-2 px-5 text-[12px] capitalize text-gray-700 mx-2 font-medium'>{item.category}</button>
                                :
                                <button className='p-2 px-5 border border-orange-500 bg-white rounded-md text-[12px] capitalize text-orange-500 mx-2 font-medium'>{item.category}</button>
                            }
                        </div>
                    ))}
                </div>
                <div className="w-full h-full p-3 py-6 rounded-xl bg-gray-200 overflow-y-scroll flex flex-row flex-wrap">
                    {menu.map((item: any, index: number) => (
                        <div key={index} >
                            {item.category == selectedTab.toLowerCase() && (
                                <div className="px-4 w-1/4">
                                    <div className="p-3 w-full h-36 rounded bg-slate-700 capitalize flex flex-col overflow-hidden">
                                        <div className="text-white font-thin">
                                            {item.itemName}
                                        </div>
                                        <div className="text-white font-thin text-[12px]">
                                            Rs.{item.price}
                                        </div>
                                        {selectedId.includes(item['_id']) ?
                                            <button type='button' disabled={true} className='mt-auto p-2 rounded-md text-center w-full bg-gray-400 text-slate-700 text-[12px]'>Select</button>

                                            :
                                            <button type='button' onClick={() => addItem(item)} className='mt-auto p-2 rounded-md text-center w-full bg-white text-slate-700 text-[12px]'>Select</button>
                                        }
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <div className="w-5/12 py-10 px-3">
                <div className="bg-gray-200 rounded-xl h-full p-8 flex flex-col">
                    <div className="text-[24px] font-thin tracking-tight">Order</div>

                    <div className="relative overflow-x-auto mt-8 flex-1 flex flex-col">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 rounded">
                            <thead className=" text-[14px] = uppercase bg-gray-100 dark:bg-gray-700 text-gray-200">
                                <tr >
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
                                            <input type='number' onChange={(e) => changeValue(item.id,parseInt( e.target.value))} defaultValue={item.quantity} min={1} className='bg-gray-300 w-12' />
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
                        <div className="mt-auto flex flex-row ">
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
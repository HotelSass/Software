'use client'
import FutureUpdate from "@/components/futureUpdate";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import React, { useState } from 'react'

const Laundry = ({ records }: any) => {
    const [selected, setSelected] = useState([])
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    return (
        <div className='bg-gray-200 rounded-lg p-6 w-full shadow'>
            <Modal size="2xl" isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 py-8">Clothes List</ModalHeader>
                            <ModalBody>
                                <div className='bg-gray-100 rounded-lg p-4 w-full shadow'>
                                    <table className='w-full'>
                                        <thead>
                                            <tr className='m-3 p-4 bg-white rounded-lg'>
                                                <th className='p-3 text-left text-gray-500 font-semibold text-[12px] uppercase'>Name</th>
                                                <th className='p-3 text-gray-500 font-semibold text-[12px] uppercase text-center'>Quantity</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {selected.map((item1: any, index: number) => {
                                                return (
                                                    <tr key={index} className='m-3 p-4 border-b'>

                                                        <td className='p-3 capitalize text-[12px] '>
                                                            {item1.itemName}
                                                        </td>
                                                        <td className='p-3 text-center'>
                                                            {item1.quantity}
                                                        </td>

                                                    </tr>
                                                )
                                            })}
                                            
                                        </tbody>

                                    </table>
                                    <button className="bg-green-700 p-3 text-[12px] text-white rounded-sm mt-8">Create Payment Bill</button>
                                    <FutureUpdate/>
                                </div>
                            </ModalBody>
                            <ModalFooter>

                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
            <table className='w-full'>
                <thead>
                    <tr className='m-3 p-4 bg-gray-700 rounded-lg'>
                        <th className='p-4 text-left text-gray-100 font-semibold text-[12px] uppercase'>Bill No.</th>
                        <th className='p-4 text-left text-gray-100 font-semibold text-[12px] uppercase'>Vendor</th>
                        <th className='p-4 text-left text-gray-100 font-semibold text-[12px] uppercase'>BillDate</th>
                    </tr>
                </thead>
                <tbody className='bg-gray-300'>
                    {records &&
                        <>
                            {records.map((item: any, index: number) => (
                                <tr key={index} className='m-3 p-4 border-b'>
                                    <td className='p-4 text-[12px]'>
                                        {item.billNo}
                                    </td>
                                    <td className='p-4 text-[12px]'>
                                        {item.vendorName}
                                    </td>
                                    <td className='p-4 text-[12px] flex flex-row'>
                                        <p className="flex-1 my-auto">{item.billDate}</p>
                                        <button type="button" onClick={() => { setSelected(item.itemList); onOpen() }} className='ml-auto  bg-blue-700 px-3 py-2 rounded-md text-white text-[12px]'>Details</button>
                                    </td>

                                </tr>
                            ))}
                        </>
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Laundry
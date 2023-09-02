'use client'
import React, { useState } from 'react'
import { BiPlus, BiTrash } from 'react-icons/bi'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { addNewMeasurement, addNewVendor, deleteMeasurement, deleteVendor } from '../function/functions';
import { useRouter } from 'next/navigation';

async function submitVendor(e: any, onOpenChange: any, router: any) {
    e.preventDefault()
    onOpenChange()

    const formData = new FormData(e.target);
    const name = formData.get('name');
    const address = formData.get('address');
    const phone = formData.get('phone');
    const account = formData.get('account');
    const response = await addNewVendor({ name, address, phone, account })
    if (response) {
        router.refresh()
    }
}
async function deleteRecord(value: string, onClose: any, router: any) {
    onClose()
    const res = await deleteVendor(value)

    if (res) {
        router.refresh()

    }
}

const Vendor = ({ vendors }: any) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { isOpen: isOpenDelete, onOpen: onOpenDelete, onOpenChange: onOpenChangeDelete } = useDisclosure();
    const [deleteValue, setDeleteValue] = useState('')
    const router = useRouter()
    return (
        <div className="flex-1 px-4 flex flex-col pl-16">
            <p className='text-[20px] font-semibold mb-2'>Vendors</p>
            <p className='text-[12px] text-gray-500 '>Vendors are external partners that businesses rely on for goods and services.</p>
            {vendors.length != 0 &&
                <>

                    <div className="rounded border border-gray-300 bg-gray-100 w-full mt-5 flex flex-col">
                        {vendors.map((item: any, index: number) => (
                            <div key={index} className="flex">
                                <div key={index} className="flex-1 capitalize text-[14px] p-4 font-normal border-b">
                                    {item.name}
                                </div>
                                <div key={index} className="flex-1 capitalize text-[14px] p-4 font-thin border-b">
                                    {item.phone}
                                </div>
                                <div key={index} className="flex-1 capitalize text-[14px] p-4 font-thin border-b flex flex-row">
                                    <p className='flex-1'>
                                        {item.address}
                                    </p>
                                    <button onClick={() => { onOpenChangeDelete(); setDeleteValue(item["_id"]) }} className="my-auto ml-auto">
                                        <BiTrash className='my-auto' size={18} color='#6f6f6f' />
                                    </button>
                                </div>


                            </div>
                        ))}

                    </div>
                </>
            }
            <Button onPress={onOpen} className="p-2 border border-gray-200 rounded items-center w-[10px] bg-gray-50 mt-2">
                <BiPlus size={16} className='mx-auto' />
            </Button>
            <Modal backdrop='blur' isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
                <ModalContent >
                    {(onClose) => (
                        <form onSubmit={(e) => submitVendor(e, onOpenChange, router)}>
                            <ModalHeader className="flex flex-col gap-1 text-[24px] text-gray-700 pt-8 pb-3">Add New Vendor</ModalHeader>
                            <ModalBody >

                                <div className="flex flex-col space-y-2">
                                    <div>
                                        <label className="font-normal text-ssm ml-1 text-gray-500" htmlFor="roomRate">
                                            Vendor Name
                                        </label>
                                        <input required name='name' className="capitalize border border-gray-400 w-full py-4 rounded px-3 text-gray-700 placeholder:text-[12px]" id="username" type="text" placeholder="Vendor Name" />
                                    </div>
                                    <div>
                                        <label className="font-normal text-ssm ml-1 text-gray-500" htmlFor="roomRate">
                                            Vendor Address
                                        </label>
                                        <input required name='address' className="capitalize border border-gray-400 w-full py-4 rounded px-3 text-gray-700 placeholder:text-[12px]" id="username" type="text" placeholder="Vendor Address" />
                                    </div>
                                    <div>
                                        <label className="font-normal text-ssm ml-1 text-gray-500" htmlFor="roomRate">
                                            Phone
                                        </label>
                                        <input required name='phone' className=" border border-gray-400 w-full py-4 rounded px-3 text-gray-700 placeholder:text-[12px]" id="username" type="text" placeholder="Phone Number" />
                                    </div>
                                    <div>
                                        <label className="font-normal text-ssm ml-1 text-gray-500" htmlFor="roomRate">
                                            Bank Details
                                        </label>
                                        <input name='account' className=" border border-gray-400 w-full py-4 rounded px-3 text-gray-700 placeholder:text-[12px]" id="username" type="text" placeholder="Account Number" />
                                    </div>

                                </div>

                            </ModalBody>
                            <ModalFooter>
                                <Button type='submit' radius='none' color="primary" >
                                    Add
                                </Button>
                            </ModalFooter>
                        </form>
                    )}
                </ModalContent>
            </Modal>
            <Modal backdrop='blur' isOpen={isOpenDelete} onOpenChange={onOpenChangeDelete} isDismissable={false}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-[24px] text-gray-700 py-8">Confirm Delete?</ModalHeader>
                            <ModalBody>

                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" onPress={() => deleteRecord(deleteValue, onClose, router)}>
                                    Delete
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>

        </div>
    )
}

export default Vendor
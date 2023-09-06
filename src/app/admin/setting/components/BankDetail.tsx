'use client'
import React, { useState } from 'react'
import { BiPlus, BiTrash } from 'react-icons/bi'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { addNewBankDetail, addNewMeasurement, addNewVendor, deleteBankDetail, deleteMeasurement, deleteVendor } from '../function/functions';
import { useRouter } from 'next/navigation';

async function submitVendor(e: any, onOpenChange: any, router: any) {
    e.preventDefault()
    onOpenChange()
    const formData = new FormData(e.target);
    const bankName = formData.get('bankName');
    const bankAddress = formData.get('bankAddress');
    const accountNumber = formData.get('accountNumber');
    const accountName = formData.get('accountName');
    const response = await addNewBankDetail({ bankName, bankAddress, accountName, accountNumber })

    if (response) {
        router.refresh()
    }
}
async function deleteRecord(value: string, onClose: any, router: any) {
    
    onClose()
    const res = await deleteBankDetail(value)

    if (res) {
        router.refresh()

    }
    
}

const BankDetail = ({ bankDetail }: any) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { isOpen: isOpenDelete, onOpen: onOpenDelete, onOpenChange: onOpenChangeDelete } = useDisclosure();
    const [deleteValue, setDeleteValue] = useState('')
    const router = useRouter()
    return (
        <div className="flex-1 px-4 flex flex-col pl-16">
            <p className='text-[20px] font-semibold mb-2'>Bank Detail</p>
            <p className='text-[12px] text-gray-500 '>Enter bank detail information, this will appear in several payment location</p>
            {bankDetail.length != 0 &&
                <>

                    <div className="rounded border border-gray-300 bg-gray-100 w-full mt-5 flex flex-col">
                        {bankDetail.map((item: any, index: number) => (
                            <div key={index} className="flex">
                                <div key={index} className="flex-1 capitalize text-[14px] p-4 font-normal border-b">
                                    {item.bankName}
                                </div>
                                <div key={index} className="flex-1 capitalize text-[14px] p-4 font-thin border-b">
                                    {item.accountName}
                                </div>
                                <div key={index} className="flex-1 capitalize text-[14px] p-4 font-thin border-b">
                                    {item.bankAddress}
                                </div>
                                <div key={index} className="flex-1 capitalize text-[14px] p-4 font-thin border-b flex flex-row">
                                    <p className='flex-1'>
                                        {item.accountNumber}
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
                            <ModalHeader className="flex flex-col gap-1 text-[24px] text-gray-700 pt-8 pb-3">Add New Bank Detail</ModalHeader>
                            <ModalBody >

                                <div className="flex flex-col space-y-2">
                                    <div>
                                        <label className="font-normal text-ssm ml-1 text-gray-500" htmlFor="roomRate">
                                            Bank Name
                                        </label>
                                        <input required name='bankName' className="capitalize border border-gray-400 w-full py-4 rounded px-3 text-gray-700 placeholder:text-[12px]" id="username" type="text" placeholder="Bank Name" />
                                    </div>
                                    <div>
                                        <label className="font-normal text-ssm ml-1 text-gray-500" htmlFor="roomRate">
                                            Account Name
                                        </label>
                                        <input required name='accountName' className="capitalize border border-gray-400 w-full py-4 rounded px-3 text-gray-700 placeholder:text-[12px]" id="username" type="text" placeholder="Account Name" />
                                    </div>
                                    <div>
                                        <label className="font-normal text-ssm ml-1 text-gray-500" htmlFor="roomRate">
                                            Bank Address
                                        </label>
                                        <input required name='bankAddress' className="capitalize border border-gray-400 w-full py-4 rounded px-3 text-gray-700 placeholder:text-[12px]" id="username" type="text" placeholder="Bank Address" />
                                    </div>
                                    <div>
                                        <label className="font-normal text-ssm ml-1 text-gray-500" htmlFor="roomRate">
                                            Account Number
                                        </label>
                                        <input required name='accountNumber' className="capitalize border border-gray-400 w-full py-4 rounded px-3 text-gray-700 placeholder:text-[12px]" id="username" type="text" placeholder="Account Number" />
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

export default BankDetail
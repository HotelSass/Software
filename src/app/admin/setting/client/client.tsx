'use client'
import React, { useState } from 'react'
import { BiPlus, BiTrash } from 'react-icons/bi'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { addNewMeasurement, deleteMeasurement } from '../function/functions';
import { useRouter } from 'next/navigation';

async function addNew(value: string, onClose: any, router: any) {
    onClose()
    const res = await addNewMeasurement(value)
    if (res) {
        router.refresh()

    }
}
async function deleteRecord(value: string, onClose: any, router: any) {
    onClose()

    const res = await deleteMeasurement(value)
    if (res) {
        router.refresh()

    }
}


const Client = ({ metrics }: any) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { isOpen: isOpenDelete, onOpen: onOpenDelete, onOpenChange: onOpenChangeDelete } = useDisclosure();
    const [value, setValue] = useState('')
    const [deleteValue, setDeleteValue] = useState('')
    const router = useRouter()

    return (
        <div className='p-6 px-8 flex flex-row h-full'>
            <div className="w-48 border-r border-gray-300 h-3/4 flex flex-col">
                <a href="" className='text-[14px]'>
                    Measurement Metrics
                </a>
            </div>
            <div className="flex-1 px-4 flex flex-col pl-16">
                <p className='text-[20px] font-semibold mb-2'>Measure Unit</p>
                <p className='text-[12px] text-gray-500 '>It typically refer to units like kilograms, pieces, dozens, and bottles. These metrics help track and manage physical inventory and quantities within the hotel.</p>
                <div className="rounded border border-gray-300 bg-gray-100 w-1/2 mt-5 h-max-[300px]">
                    {metrics.map((item: any) => (
                        <div className='capitalize border-b border-b-gray-200 p-3 flex flex-row items-center'>
                            <p className='my-auto text-[14px]'>
                                {item.measurement}
                            </p>
                            <div className="ml-auto">
                                <Button onPress={() => {onOpenChangeDelete();setDeleteValue(item.measurement)}} className="bg-gray-100">
                                    <BiTrash className='my-auto' size={18} color='#6f6f6f' />
                                </Button>
                            </div>
                        </div>

                    ))}
                </div>
                <Button onPress={onOpen} className="p-2 border border-gray-200 rounded items-center w-[10px] bg-gray-50 mt-2">
                    <BiPlus size={16} className='mx-auto' />
                </Button>
                <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1 text-[24px] text-gray-700 py-8">Add Measurement Metrics</ModalHeader>
                                <ModalBody>
                                    <div className="">
                                        <div className="mb-1">

                                            <input onChange={(e) => setValue(e.target.value)} className=" border border-gray-400 w-full py-4 rounded-lg px-3 text-gray-700 " id="username" type="text" placeholder="New Unit" />
                                        </div>
                                    </div>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="light" onPress={onClose}>
                                        Close
                                    </Button>
                                    <Button color="primary" onPress={() => addNew(value, onClose, router)}>
                                        Add
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
                <Modal isOpen={isOpenDelete} onOpenChange={onOpenChangeDelete} isDismissable={false}>
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

        </div>
    )
}

export default Client
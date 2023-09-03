'use client'
import React, { useState } from 'react'
import { BiPlus, BiTrash } from 'react-icons/bi'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { addNewLocation, addNewMeasurement, addNewVendor, deleteLocation, deleteMeasurement, deleteVendor } from '../function/functions';
import { useRouter } from 'next/navigation';

async function submitVendor(e: any, onOpenChange: any, router: any) {
    e.preventDefault()
    onOpenChange()

    const formData = new FormData(e.target);
    const name = formData.get('name');
    const response = await addNewLocation(name)


    if (response) {
        router.refresh()
    }

}
async function deleteRecord(value: string, onClose: any, router: any) {
    onClose()
    const res = await deleteLocation(value)

    if (res) {
        router.refresh()

    }
}

const StorageLocation = ({ location }: any) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { isOpen: isOpenDelete, onOpen: onOpenDelete, onOpenChange: onOpenChangeDelete } = useDisclosure();
    const [deleteValue, setDeleteValue] = useState('')
    const router = useRouter()
    return (
        <div className="flex-1 px-4 flex flex-col pl-16">
            <p className='text-[20px] font-semibold mb-2'>Storage Location</p>
            <p className='text-[12px] text-gray-500 '>Locations in the business that is used for storage purpose</p>
            {location.length != 0 &&
                <>

                    <div className="rounded border border-gray-300 bg-gray-100 w-full mt-5 flex flex-col">
                        {location.map((item: any, index: number) => (
                            <div key={index} className="flex">
                                <div key={index} className="flex-1 capitalize text-[14px] p-4 font-normal border-b">
                                    {item.location}
                                </div>
                                <div key={index} className="flex-1 capitalize text-[14px] p-4 font-thin border-b">
                                </div>
                                <div key={index} className="flex-1 capitalize text-[14px] p-4 font-thin border-b flex flex-row">
                                    <p className='flex-1'>
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
                            <ModalHeader className="flex flex-col gap-1 text-[24px] text-gray-700 pt-8 pb-3">Add New Location</ModalHeader>
                            <ModalBody >

                                <div className="flex flex-col space-y-2">
                                    <div>
                                        <label className="font-normal text-ssm ml-1 text-gray-500" htmlFor="roomRate">
                                            Location Name
                                        </label>
                                        <input required name='name' className="capitalize border border-gray-400 w-full py-4 rounded px-3 text-gray-700 placeholder:text-[12px]" id="username" type="text" placeholder="Location Name" />
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

export default StorageLocation
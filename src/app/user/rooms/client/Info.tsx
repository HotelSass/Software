'use client'
import Modal from '@/components/modal'
import React, { useState } from 'react'
import CheckInModal from './modals/CheckIn'
import ShowInfo from './modals/ShowInfo'
import { useRouter } from 'next/navigation'
import RoomCheckOut from './checkout/room/Page'
import { Card, CardFooter, Image, Button } from "@nextui-org/react";
import PasswordProtected from '../../component/PasswordProtected'
import serverUrl from '@/config/config'


const Info = ({ data }: any) => {
    const [reservationOpen, setReservationOpen] = useState(false)
    const [checkOutModal, setCheckOutModal] = useState(false)
    return (
        <>
            <ReservationModal open={reservationOpen} setOpen={setReservationOpen} reservationData={data.reservations} />
            <CheckOutModal open={checkOutModal} setOpen={setCheckOutModal} reservationData={data.inhouse} />
            <div className="flex flex-row space-x-4">
                <Card
                    isFooterBlurred
                    radius="sm"
                    className="border-none bg-green-800"
                >
                    <div className="z-20 w-48 h-36 ">
                        <p className='font-black text-[44px] text-center text-white mt-7'>
                            {data.inhouse.length}
                        </p>
                    </div>

                    <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_14px)] shadow-small ml-2 mb-2 z-20">
                        <p className="text-tiny text-white/80">Checked in</p>
                        <Button onClick={() => { setCheckOutModal(true) }} className="text-tiny text-white bg-black/20" variant="flat" color="default" radius="lg" size="sm">
                            View
                        </Button>
                    </CardFooter>
                </Card>
                <Card
                    isFooterBlurred
                    radius="md"
                    className="border-none bg-orange-600"
                >
                    <div className="z-20 w-48 h-36 ">
                        <p className='font-black text-[44px] text-center text-white mt-7'>
                            {data.reservations.length}
                        </p>
                    </div>
                    <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_14px)] shadow-small ml-2 mb-2 z-20">
                        <p className="text-tiny text-white/80">Reservation</p>
                        <Button onClick={() => { setReservationOpen(true) }} className="text-tiny text-white bg-black/20" variant="flat" color="default" radius="lg" size="sm">
                            View
                        </Button>
                    </CardFooter>
                </Card>


            </div>
        </>
    )
}

const ReservationModal = ({ reservationData, open, setOpen }: any) => {
    const router = useRouter()
    const [open1, setOpen1] = useState(false)
    const [cancelOpen, setCancelOpen] = useState(false)
    const [secData, setSecData] = useState({})
    const cancelReservation = (item: any) => {
        setCancelOpen(true)
    }
    const deleteRecord = async (reservationData: [Object]) => {
        const data=reservationData[0]
        try {
            const response = await fetch(serverUrl + "/user/room/cancelReservation", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...data
                })

            });

            if (response.ok) {
                setCancelOpen(false)
                setOpen(false)
                router.refresh()

            }

        } catch (err) {
            console.log(err)
        }

    }
    return (
        <>

            <Modal open={open} setOpen={setOpen} width={900} height={400} >
                <PasswordProtected width={700} height={300} open={cancelOpen} setOpen={setCancelOpen}>
                    <div id="alert-additional-content-2" className="p-4 mb-4 text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
                        <div className="flex items-center">
                            <svg className="flex-shrink-0 w-4 h-4 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                            </svg>
                            <span className="sr-only">Info</span>
                            <h3 className="text-lg font-medium">Are you sure you want to cancel Reservation?</h3>
                        </div>
                        <div className="mt-2 mb-4 text-ssm font-thin">
                            You cannot undo this process
                        </div>
                        <div className="flex">
                            <button type="button" onClick={() => deleteRecord(reservationData)} className="text-white bg-red-800 hover:bg-red-900 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-1.5 mr-2 text-center inline-flex items-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                                Cancel reservation
                            </button>

                        </div>
                    </div>
                </PasswordProtected>
                <CheckInModal data={secData} open={open1} setOpen={setOpen1} />

                <div className="p-4 pt-0 overflow-y-scroll">
                    <div className="text-[24px] font-thin tracking-tight mb-6">Check In</div>
                    <div className="relative overflow-x-auto mt-8 flex flex-col p-4 h-[500px] overflow-y-scroll">

                        {reservationData.length == 0 &&
                            <div className="my-10 text-center font-thin text-[18px]">Nothing to show here</div>
                        }
                        {reservationData.map((item: any, index: number) => (
                            <div key={index} className="bg-gray-200 rounded-xl flex flex-row my-2">
                                <div className="flex flex-col bg-gray-500 p-4 rounded-md flex-1">
                                    <div className="text-[18px] text-white font-extralight">{item.name.toUpperCase()}</div>
                                    <div className="text-[10px] text-white font-extralight">{item.address.toUpperCase()}</div>
                                </div>
                                <div className="flex flex-col px-10 py-4 flex-1">
                                    <div className="text-[14px] font-extralight mb-auto">Phone No.</div>
                                    <div className="text-[10px] font-extralight mb-auto">{item.phone.toUpperCase()}</div>

                                </div>
                                <div className="flex flex-col px-5 py-4 flex-1">
                                    <div className="text-[14px] font-extralight mb-auto">Check In.</div>
                                    <div className="text-[10px] font-extralight mb-auto">{item.checkIn.toUpperCase()}</div>
                                </div>
                                <div className="flex flex-col px-5 py-4 flex-1">
                                    <div className="text-[14px] font-extralight mb-auto">Check Out.</div>
                                    <div className="text-[10px] font-extralight mb-auto">{item.checkOut.toUpperCase()}</div>
                                </div>
                                <div className="flex flex-col w-44">
                                    <button type='button' onClick={() => { setSecData(item); setOpen1(true) }} className='bg-red-900 items-center justify-center text-white flex-1 rounded-md text-[14px] font-light'>
                                        Check In
                                    </button>
                                    <button type='button' onClick={() => { setSecData(item); cancelReservation(item) }} className=' items-center justify-center text-red-800 underline flex-1 rounded-md text-[14px] font-light'>
                                        Cancel reservation
                                    </button>
                                </div>

                            </div>

                        ))}
                    </div>
                </div>
            </Modal>
        </>
    )
}

const CheckOutModal = ({ reservationData, open, setOpen }: any) => {
    const router = useRouter()
    const [open1, setOpen1] = useState(false)
    const [openCheckOut, setOpenCheckout] = useState(false)
    const [secData, setSecData] = useState({})
    return (
        <>

            <Modal open={open} setOpen={setOpen} width={900} height={400} >
                <ShowInfo data={secData} open={open1} setOpen={setOpen1} />
                <RoomCheckOut reload={() => { setOpen(false); router.refresh() }} data={secData} open={openCheckOut} setOpen={setOpenCheckout} />

                <div className="p-4 pt-0 overflow-y-scroll">
                    <div className="text-[24px] font-thin tracking-tight mb-6">Checkout</div>
                    <div className="relative overflow-x-auto mt-8 flex flex-col p-4 h-[500px] overflow-y-scroll">

                        {reservationData.length == 0 &&
                            <div className="my-10 text-center font-thin text-[18px]">Nothing to show here</div>
                        }
                        {reservationData.map((item: any, index: number) => (
                            <div key={index} className="bg-gray-200 rounded-xl flex flex-row my-2">
                                <button type='button' onClick={() => { setSecData(item); setOpen1(true) }} className="flex flex-col bg-gray-500 p-4 rounded-md flex-1">
                                    <div className="text-[18px] text-white font-extralight">{item.name.toUpperCase()}</div>
                                    <div className="text-[10px] text-white font-extralight">{item.address.toUpperCase()}</div>
                                </button>
                                <div className="flex flex-col px-10 py-4 flex-1">
                                    <div className="text-[14px] font-extralight mb-auto">Phone No.</div>
                                    <div className="text-[10px] font-extralight mb-auto">{item.phone.toUpperCase()}</div>

                                </div>
                                <div className="flex flex-col px-5 py-4 flex-1">
                                    <div className="text-[14px] font-extralight mb-auto">Check In.</div>
                                    <div className="text-[10px] font-extralight mb-auto">{item.checkIn.toUpperCase()}</div>
                                </div>
                                <div className="flex flex-col px-5 py-4 flex-1">
                                    <div className="text-[14px] font-extralight mb-auto">Check Out.</div>
                                    <div className="text-[10px] font-extralight mb-auto">{item.checkOut.toUpperCase()}</div>
                                </div>
                                <button type='button' onClick={() => { setSecData(item); setOpenCheckout(true) }} className='bg-red-900 items-center justify-center text-white flex-1 rounded-md text-[14px] font-light'>
                                    Check Out
                                </button>


                            </div>

                        ))}
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default Info
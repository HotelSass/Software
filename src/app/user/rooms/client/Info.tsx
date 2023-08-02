'use client'
import Modal from '@/components/modal'
import React, { useState } from 'react'
import CheckInModal from './modals/CheckIn'
import ShowInfo from './modals/ShowInfo'
import { useRouter } from 'next/navigation'
import RoomCheckOut from './checkout/room/Page'
import { Card, CardFooter, Image, Button } from "@nextui-org/react";
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
                    <div className="z-20 w-48 h-48 ">
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
                    <div className="z-20 w-48 h-48 ">
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
    const [open1, setOpen1] = useState(false)
    const [secData, setSecData] = useState({})
    return (
        <>

            <Modal open={open} setOpen={setOpen} width={900} height={400} >
                <CheckInModal data={secData} open={open1} setOpen={setOpen1} />

                <div className="p-4 pt-0 overflow-y-scroll">
                    <div className="text-[24px] font-thin tracking-tight mb-6">Check In</div>
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
                            <button type='button' onClick={() => { setSecData(item); setOpen1(true) }} className='bg-red-900 items-center justify-center text-white flex-1 rounded-md text-[14px] font-light'>
                                Check In
                            </button>


                        </div>

                    ))}
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
            </Modal>
        </>
    )
}

export default Info
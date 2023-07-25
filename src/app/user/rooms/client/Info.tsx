'use client'
import Modal from '@/components/modal'
import React, { useState } from 'react'
import CheckInModal from './modals/CheckIn'
import ShowInfo from './modals/ShowInfo'
import { useRouter } from 'next/navigation'
import RoomCheckOut from '../../checkout/room/page'

const Info = ({ data }: any) => {
    const [reservationOpen, setReservationOpen] = useState(false)
    const [checkOutModal, setCheckOutModal] = useState(false)
    return (
        <>
            <ReservationModal open={reservationOpen} setOpen={setReservationOpen} reservationData={data.reservations} />
            <CheckOutModal open={checkOutModal} setOpen={setCheckOutModal} reservationData={data.inhouse} />
            <div className="flex flex-row">
                <button type='button' onClick={() => setCheckOutModal(true)} className='flex flex-col p-2 text-white bg-green-700 rounded-xl px-8'>
                    <div className=" text-[16px] mt-4">Checked In</div>
                    <div className=" text-[36px] font-thin">{data.inhouse.length}</div>
                </button>
                <button type='button' onClick={() => setReservationOpen(true)} className='flex flex-col p-2 text-white bg-orange-700 rounded-xl px-8 mx-4'>
                    <div className=" text-[16px] mt-4">Reservation</div>
                    <div className=" text-[36px] font-thin">{data.reservations.length}</div>
                </button>
            </div>
        </>
    )
}

const ReservationModal = ({ reservationData, open, setOpen }: any) => {
    const [open1, setOpen1] = useState(false)
    const [secData, setSecData] = useState({})
    return (
        <>

            <Modal open={open} setOpen={setOpen} width={900} >
                <CheckInModal data={secData} open={open1} setOpen={setOpen1} />

                <div className="p-4 pt-0 overflow-y-scroll">
                    <div className="text-[24px] font-thin tracking-tight mb-6">Check In</div>
                    {reservationData.map((item: any, index: number) => (
                        <div className="bg-gray-200 rounded-xl flex flex-row my-2">
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
                                Check Out
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

            <Modal open={open} setOpen={setOpen} width={900} >
                <ShowInfo data={secData} open={open1} setOpen={setOpen1} />
                <RoomCheckOut reload={() => { setOpen(false); router.refresh() }} data={secData} open={openCheckOut} setOpen={setOpenCheckout} />

                <div className="p-4 pt-0 overflow-y-scroll">
                    <div className="text-[24px] font-thin tracking-tight mb-6">Checkout</div>
                    {reservationData.map((item: any, index: number) => (
                        <div className="bg-gray-200 rounded-xl flex flex-row my-2">
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
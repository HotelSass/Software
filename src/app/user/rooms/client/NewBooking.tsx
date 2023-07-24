'use client'
import Modal from '@/components/modal'
import React, { useState } from 'react'
import { BiPlus } from 'react-icons/bi'
import Booking from './modals/Booking'
import NewReservation from './modals/NewReservation'

const onSubmit = (event: any) => {

}

const NewBooking = ({ data }: any) => {
    const [open, setOpen] = useState(false)
    const [openReservation, setOpenReservation] = useState(false)
    return (
        <div>
            <div className="flex flex-row space-x-5">
                <button onClick={() => setOpenReservation(true)} className="flex flex-row bg-orange-600 p-3 rounded space-x-3">
                    <BiPlus className="my-auto" size={20} color="#efefef" />
                    <div className="my-auto text-gray-100 text-[14px]">
                        Reservation
                    </div>
                </button>
                <button onClick={() => setOpen(true)} className="flex flex-row bg-green-600 p-3 rounded space-x-3">
                    <BiPlus className="my-auto" size={20} color="#efefef" />
                    <div className="my-auto text-gray-100 text-[14px]">
                        Walk in 
                    </div>
                </button>
            </div>
            <Booking data={data} open={open} setOpen={setOpen} />
            <NewReservation data={data} openReservation={openReservation} setOpenReservation={setOpenReservation} />
        </div>
    )
}



export default NewBooking
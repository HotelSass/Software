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
import ReservationInfoModal from './modals/ReservationInfoModal'
import { BiTrash } from 'react-icons/bi'


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

                    <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-sm rounded-large bottom-1 w-[calc(100%_-_14px)] shadow-small ml-2 mb-2 z-20">
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
                    <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-sm rounded-large bottom-1 w-[calc(100%_-_14px)] shadow-small ml-2 mb-2 z-20">
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
    const [infoModal, setInfoModal] = useState(false)
    const cancelReservation = (item: any) => {
        setCancelOpen(true)
    }
    const deleteRecord = async (reservationData: [Object]) => {
        const data = reservationData[0]
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
    function closeModal() {
        setOpen(false)
    }
    return (
        <>

            <Modal open={open} setOpen={setOpen} width={900} height={400} >
                <PasswordProtected width={700} height={300} open={cancelOpen} setOpen={setCancelOpen}>
                    <div id="alert-additional-content-2" className="p-4 mb-4 text-red-800 border border-red-300 rounded-sm bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
                        <div className="flex items-center">
                            <svg className="flex-shrink-0 w-4 h-4 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                            </svg>
                            <span className="sr-only">Info</span>
                            <h3 className="text-lg font-medium">Are you sure you want to cancel Reservation?</h3>
                        </div>
                        <div className="mt-2 mb-4 text-[14px] font-thin">
                            You cannot undo this process
                        </div>
                        <div className="flex">
                            <button type="button" onClick={() => deleteRecord(reservationData)} className="text-white bg-red-800 hover:bg-red-900 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-sm text-xs px-3 py-1.5 mr-2 text-center inline-flex items-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                                Cancel reservation
                            </button>

                        </div>
                    </div>
                </PasswordProtected>
                <CheckInModal data={secData} open={open1} setOpen={setOpen1} closeModal={closeModal} />
                <ReservationInfoModal data={secData} open={infoModal} setOpen={setInfoModal} />

                <div className=" overflow-y-scroll">
                    <div className="relative overflow-x-auto mt- flex flex-col p-0 max-h-[500px] overflow-y-scroll">

                        <div className="relative overflow-x-auto shadow-md sm:rounded-sm">
                            <table className="w-full text-sm text-left text-gray-400">
                                <caption className="p-5 text-[28px] font-semibold text-left text-white bg-gray-800">
                                    Reservation
                                    <p className="mt-1 text-sm font-light text-gray-400 text-[14px]">All reservations scheduled for today</p>
                                </caption>
                                <thead className="text-xs bg-gray-700 text-gray-400 font-light">
                                    <tr>
                                        <th scope="col" className="px-6 py-5 text-[14px] font-light">
                                            Client Name
                                        </th>
                                        <th scope="col" className="px-6 py-5 text-[14px] font-light">
                                            Address
                                        </th>
                                        <th scope="col" className="px-6 py-5 text-[14px] font-light">
                                            Phone No.
                                        </th>
                                        <th scope="col" className="px-6 py-5 text-[14px] font-light">
                                            Rooms
                                        </th>
                                        <th scope="col" className="px-6 py-5 text-[14px]">
                                            <span className="sr-only">Check Out</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {reservationData.map((item: any, index: number) => (
                                        <tr key={index} className=" border-b bg-gray-800 border-gray-700 text-[14px]">
                                            <th scope="row" className="px-6 py-4 font-light whitespace-nowrap text-white text-[14px]">
                                                {item.name.toUpperCase()}
                                            </th>
                                            <td className="px-6 py-4">
                                                {item.address.toUpperCase()}
                                            </td>
                                            <td className="px-6 py-4">
                                                {item.phone.toUpperCase()}
                                            </td>
                                            <td className="px-6 py-4 ">
                                                <div className="flex text-ellipsis w-28 flex-wrap">
                                                    {item.rooms &&
                                                        <>
                                                            {(item.rooms).map((item: any, index: number) => {
                                                                return (
                                                                    <>
                                                                        {item.status == 'reserved' &&
                                                                            <p className='mr-2 font-light text-[12px]'>
                                                                                {item.room}
                                                                            </p>
                                                                        }
                                                                    </>
                                                                )
                                                            })}
                                                        </>}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right flex flex-row gap-2">
                                                <a onClick={() => { setSecData(item); cancelReservation(item) }} className="font-medium bg-red-500 hover:bg-red-600 text-white p-3 rounded-sm cursor-pointer ml-auto">
                                                    <BiTrash size={18} color='#fff' />
                                                </a>
                                                <a onClick={() => { setSecData(item); setInfoModal(true) }} className="font-medium bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-sm cursor-pointer">Info</a>

                                                <a onClick={() => { setSecData(item); setOpen1(true) }} className="font-medium bg-green-600 hover:bg-green-700 text-white p-3 rounded-sm cursor-pointer">Check in</a>
                                            </td>
                                        </tr>

                                    ))}

                                </tbody>
                            </table>
                            {reservationData.length == 0 &&
                                <div className="my-10 text-center font-thin text-[18px]">Nothing to show here</div>
                            }

                        </div>
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

                <div className=" overflow-y-scroll">
                    <div className="relative overflow-x-auto mt- flex flex-col p-0 max-h-[500px] overflow-y-scroll">

                        <div className="relative overflow-x-auto shadow-md sm:rounded-sm">
                            <table className="w-full text-sm text-left text-gray-400">
                                <caption className="p-5 text-[28px] font-semibold text-left text-white bg-gray-800">
                                    Checkout
                                    <p className="mt-1 text-sm font-light text-gray-400 text-[14px]">List of all group/ client checked in at the moment</p>
                                </caption>
                                <thead className="text-xs bg-gray-700 text-gray-400 font-light">
                                    <tr>
                                        <th scope="col" className="px-6 py-5 text-[14px] font-light">
                                            Client Name
                                        </th>
                                        <th scope="col" className="px-6 py-5 text-[14px] font-light">
                                            Address
                                        </th>
                                        <th scope="col" className="px-6 py-5 text-[14px] font-light">
                                            Phone No.
                                        </th>
                                        <th scope="col" className="px-6 py-5 text-[14px] font-light">
                                            Rooms
                                        </th>
                                        <th scope="col" className="px-6 py-5 text-[14px]">
                                            <span className="sr-only">Check Out</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {reservationData.map((item: any, index: number) => (
                                        <tr key={index} className=" border-b bg-gray-800 border-gray-700 text-[14px]">
                                            <th scope="row" className="px-6 py-4 font-light whitespace-nowrap text-white text-[14px]">
                                                {item.name.toUpperCase()}
                                            </th>
                                            <td className="px-6 py-4">
                                                {item.address.toUpperCase()}
                                            </td>
                                            <td className="px-6 py-4">
                                                {item.phone.toUpperCase()}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex text-ellipsis w-28 flex-wrap">

                                                    {(item.rooms).map((item: any, index: number) => (
                                                        <>
                                                            {item.status == 'inhouse' &&
                                                                <p className='mr-2'>
                                                                    {item.room}
                                                                </p>
                                                            }
                                                        </>
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right flex flex-row gap-2">
                                                <a onClick={() => { setSecData(item); setOpen1(true) }} className="font-medium bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-sm cursor-pointer ml-auto">Info</a>
                                                <a onClick={() => { setSecData(item); setOpenCheckout(true) }} className="font-medium bg-red-500 hover:bg-red-600 text-white p-3 rounded-sm cursor-pointer">Checkout</a>
                                            </td>
                                        </tr>

                                    ))}

                                </tbody>
                            </table>
                        </div>

                        {reservationData.length == 0 &&
                            <div className="my-10 text-center font-thin text-[18px]">Nothing to show here</div>
                        }

                    </div>
                </div>
            </Modal>
        </>
    )
}

export default Info
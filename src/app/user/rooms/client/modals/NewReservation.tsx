import Modal from '@/components/modal'
import serverUrl from '@/config/config';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import Datepicker from "react-tailwindcss-datepicker";


async function getAllRoomList(newValue: any) {

    try {
        const response = await fetch(serverUrl + "/user/room/findRoomWithDate", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                checkIn: newValue.startDate,
                checkOut: newValue.endDate,

            })

        });
        if (response.ok) {
            return (response.json())

        } else {
        }

    } catch (err) {
        console.log(err)
    }
}
function dateDifference(startDateStr: string, endDateStr: string) {
    // Convert the date strings to Date objects
    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);

    // Calculate the time difference in milliseconds
    const timeDifferenceMs = endDate.getTime() - startDate.getTime();

    // Convert milliseconds to days
    const millisecondsPerDay = 1000 * 60 * 60 * 24;
    const dateDifferenceDays = Math.floor(timeDifferenceMs / millisecondsPerDay);

    return dateDifferenceDays;
}



const NewReservation = ({ openReservation, setOpenReservation, data }: any) => {
    const today = new Date();
    const oneDayBefore = new Date(today);
    oneDayBefore.setDate(today.getDate());
    const prevDate = oneDayBefore.toISOString().slice(0, 10)
    const router = useRouter()
    const [openSelectRoom, setOpenSelectRoom] = useState(false)
    const [availabeData, setAvailableData] = useState([])
    const [selectedRooms, setSelectedRooms] = useState<Object[]>([])
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [value, setValue] = useState({
        startDate: null,
        endDate: null
    });
    const [duration, setDuration] = useState<number>(0)

    const handleValueChange = async (newValue: any) => {
        const differenceInDays = dateDifference(newValue.startDate, newValue.endDate);
        setDuration(differenceInDays)
        setValue(newValue);
        if (newValue.startDate != null && newValue.endDate != null) {
            const rooms = await getAllRoomList(newValue)
            setAvailableData(rooms)
        } else {
            setSelectedRooms([])
        }
    }
    const selectData = (val: any) => {

        let temp = selectedRooms
        if (temp.includes(val)) {
            const index = temp.indexOf(val)
            if (index != -1) {
                temp.splice(index, 1); // Remove one element at the found index
            }
            setSelectedRooms([...temp])

        } else {
            temp.push(val)
            setSelectedRooms([...temp])
        }
    }
    async function onSubmit(event: any) {
        event.preventDefault()
        if (value.startDate == null && value.endDate == null) {
            setError(true)
            setErrorMessage("Select Checkin and Checkout date")
            return
        }
        if (selectedRooms.length != 0) {
            const formData = new FormData(event.target);
            const name = formData.get('name');
            const address = formData.get('address');
            const phone = formData.get('phone');
            const advance = formData.get('advance');
            const roomRate = formData.get('roomRate');
            const price = formData.getAll('price[]')
            const roomArray:Object[] = []
            selectedRooms.map((item: any, index: number) => {
                roomArray.push({
                    room: item.roomNumber,
                    checkIn: value.startDate,
                    checkOut: value.endDate,
                    status: 'reserved',
                    roomRate: price[index]
                })
            })
           
            
            try {

                const response = await fetch(serverUrl + "/user/room/reserveRoom", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name,
                        address,
                        phone,
                        rooms: roomArray,
                        status: 'reserved',
                        advance,
                    })


                });

                if (response.ok) {
                    setOpenReservation(false)
                    setValue({
                        startDate: null,
                        endDate: null
                    })
                    setSelectedRooms([])
                    router.refresh()
                    event.target.reset();

                } else {
                }

            } catch (err) {
                console.log(err)
            }

        } else {
            setError(true)
            setErrorMessage("Select Rooms")
            return
        }
    }
    return (
        <>
            <Modal open={openReservation} setOpen={setOpenReservation} width={800} height={900}>
                {error &&

                    <div role="alert" className=" absolute top-5 right-5">
                        <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2 text-left flex flex-row">
                            <p>Error</p>
                            <button type='button' onClick={() => { setError(false); setErrorMessage('') }} className='ml-auto'>
                                <svg className="fill-current h-6 w-6 text-red-100" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
                            </button>
                        </div>
                        <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                            <p className='capitalize'>{errorMessage}</p>
                        </div>
                    </div>
                }
                <form onSubmit={(e) => onSubmit(e)} className='flex flex-col space-y-4 '>
                    <Modal open={openSelectRoom} setOpen={setOpenSelectRoom} width={600} height={400}>
                        <div className=" flex flex-row flex-wrap">
                            {availabeData.map((item: any, index: number) => (
                                <div key={index} className='my-2' >
                                    {selectedRooms.includes(item) ?
                                        <button type='button' onClick={() => selectData(item)} className="p-4 border bg-green-700 text-[12px] items-center justify-center rounded-xl w-16 h-16 mx-2 text-white">{item.roomNumber}</button>
                                        :
                                        <button type='button' onClick={() => selectData(item)} className="p-4 border border-gray-400 text-[12px] items-center justify-center rounded-xl w-16 h-16 mx-2">{item.roomNumber}</button>
                                    }
                                </div>
                            ))}
                            <button type='button' onClick={() => setOpenSelectRoom(false)} className='bg-green-700 p-3 rounded-lg text-white px-5 ml-auto mr-4 mt-5'>Done</button>

                        </div>

                    </Modal>
                    <div className="text-[28px] font-thin tracking-tight">Reservation</div>


                    <div className="flex flex-row space-x-5">
                        <div className="flex flex-col flex-1">
                            <label className="font-medium text-ssm ml-2" htmlFor="roomNumber">
                                Client Name
                            </label>
                            <input
                                name="name"
                                placeholder="Client Name"
                                type="text"
                                id="clientName"
                                required
                                className=" placeholder:text-ssm  placeholder:text-gray-500 align-middle block flex-1 p-3  border border-gray-300 rounded-lg bg-gray-50 text-sm text-gray-700 w-full"
                            />
                        </div>
                        <div className="flex flex-col flex-1">
                            <label className="font-medium text-ssm ml-2" htmlFor="roomNumber">
                                Client Address
                            </label>
                            <input
                                name="address"
                                placeholder="Client Address"
                                type="text"
                                id="clientAddress"
                                required
                                className=" placeholder:text-ssm  placeholder:text-gray-500 align-middle block flex-1 p-3  border border-gray-300 rounded-lg bg-gray-50 text-sm text-gray-700 w-full"
                            />
                        </div>
                    </div>
                    <div className="flex flex-row space-x-5">
                        <div className="flex flex-col flex-1">
                            <label className="font-medium text-ssm ml-2" htmlFor="roomNumber">
                                Client Phone
                            </label>
                            <input
                                pattern="[0-9+]*"
                                name="phone"
                                placeholder="Client Phone"
                                type="text"
                                id="clientPhone"
                                required
                                className=" placeholder:text-ssm  placeholder:text-gray-500 align-middle block flex-1 p-3  border border-gray-300 rounded-lg bg-gray-50 text-sm text-gray-700 w-full"
                            />
                        </div>
                        <div className="flex flex-col flex-1">
                            <label className="font-medium text-ssm ml-2" htmlFor="roomNumber">
                                Check In - Check Out
                            </label>
                            <Datepicker
                                inputClassName=' border border-gray-300 rounded-lg bg-gray-50 text-gray-700 p-4 rounded-xl text-[12px] w-full'
                                separator='   to   '
                                placeholder='Check In - Check Out'
                                primaryColor={"indigo"}
                                value={value}
                                onChange={handleValueChange}
                                minDate={new Date(prevDate)}

                            />
                        </div>
                    </div>
                    <div className="flex flex-row space-x-5">
                        <div className="flex flex-col flex-1">
                            <label className="font-medium text-ssm ml-2" htmlFor="roomNumber">
                                Advance
                            </label>
                            <input
                                pattern="[0-9]*"
                                name="advance"
                                placeholder="Rs. "
                                type="text"
                                id="clientPhone"
                                className=" placeholder:text-ssm  placeholder:text-gray-500 align-middle block flex-1 p-3  border border-gray-300 rounded-lg bg-gray-50 text-sm text-gray-700 w-full"
                            />
                        </div>
                        <div className="flex-1"></div>

                    </div>
                    <div className="flex">
                        <div className="flex flex-col flex-1">

                            {value.startDate != null && value.endDate != null &&
                                <div className="flex flex-col flex-1">
                                    <label className="font-medium text-ssm ml-2" htmlFor="roomNumber">
                                        Rooms
                                    </label>
                                    <button type='button' onClick={() => setOpenSelectRoom(true)} className='bg-gray-600 text-white p-4 rounded-xl text-[12px] items-center'>
                                        {selectedRooms.length == 0 ?
                                            "Select Room" :
                                            <div className='flex flex-row flex-wrap'>
                                                <div className="mr-4">
                                                    Selected Room:
                                                </div>
                                                <div className='flex flex-row flex-wrap overflow-x-scroll'>

                                                    {selectedRooms.map((item: any, index: number) => (
                                                        <div key={index} className="text-white text-center mx-2 ">{item.roomNumber}</div>
                                                    ))}

                                                </div>
                                            </div>
                                        }
                                    </button>
                                    {selectedRooms.length != 0 &&
                                        <div className=" mt-8 h-[300px] overflow-y-scroll">
                                            <label className="font-medium text-ssm ml-2" htmlFor="roomNumber">
                                                Pricing
                                            </label>
                                            <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
                                                <table className="text-sm text-left text-gray-500 dark:text-gray-400 w-full rounded-lg ">

                                                    <thead className="text-[12px] uppercase bg-gray-800 text-gray-400">
                                                        <tr>


                                                            <th className="px-6 py-3 font-light text-center">
                                                                Room
                                                            </th>

                                                            <th className="px-6 py-3 font-light text-center">
                                                                Price
                                                            </th>


                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {selectedRooms.map((item: any, index: number) => (
                                                            <tr key={index} className=" border-b bg-gray-700 border-gray-700 pb-4">
                                                                <td className="px-2 py-1 text-center text-white">
                                                                    {item.roomNumber}
                                                                </td>

                                                                <td className="px-2 py-1">
                                                                    <input type="number" defaultValue={item.roomRate} required name='price[]' inputMode='numeric' placeholder='Rs.' className=' py-4 bg-gray-500 rounded px-3 w-full text-[12px] text-gray-100 font-thin' />
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>

                                    }
                                </div>
                            }
                        </div>
                    </div>

                    <div className="flex flex-row">

                        <button className="bg-orange-700 p-3 rounded space-x-3 ml-auto w-2/12 text-center text-white ">
                            Reserve
                        </button>

                    </div>

                </form>
            </Modal>
        </>
    )
}

export default NewReservation
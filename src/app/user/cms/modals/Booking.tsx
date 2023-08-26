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


const Booking = ({ open, setOpen, data }: any) => {
    const today = new Date();
    const oneDayBefore = new Date(today);
    oneDayBefore.setDate(today.getDate() - 1);
    const prevDate = oneDayBefore.toISOString().slice(0, 10)

    const router = useRouter()
    const [openSelectRoom, setOpenSelectRoom] = useState(false)
    const [availabeData, setAvailableData] = useState([])
    const [selectedRooms, setSelectedRooms] = useState<number[]>([])
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [value, setValue] = useState({
        startDate: null,
        endDate: null
    });
    const [duration, setDuration] = useState<number>(0)

    const handleValueChange = async (newValue: any) => {
        console.log("newValue:", newValue);
        const differenceInDays = dateDifference(newValue.startDate, newValue.endDate);
        setDuration(differenceInDays)
        setValue(newValue);
        if (newValue.startDate != null && newValue.endDate != null) {
            const rooms = await getAllRoomList(newValue)
            setAvailableData(rooms)
        }
    }
    const selectData = (val: number) => {
        let temp = selectedRooms
        if (selectedRooms.includes(val)) {
            const index = selectedRooms.indexOf(val);
            if (index > -1) { // only splice array when item is found
                temp.splice(index, 1); // 2nd parameter means remove one item only
            }
        } else {
            temp.push(val)
        }
        setSelectedRooms([...temp])
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
            const nationality = formData.get('nationality');
            const email = formData.get('email');
            const from = formData.get('from');
            const to = formData.get('to');
            const roomRate = formData.get('roomRate');
            const advance = formData.get('advance');
            const price = formData.getAll('price[]')
            const roomArray: Object[] = []
            selectedRooms.map((item: any, index: number) => {
                roomArray.push({
                    room: item.roomNumber,
                    checkIn: value.startDate,
                    checkOut: value.endDate,
                    status: 'inhouse',
                    roomRate: price[index]
                })
            })
            console.log({
                name,
                address,
                phone,
                nationality,
                email,
                from,
                to,
                advance,
                rooms: roomArray,
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
                        nationality,
                        email,
                        from,
                        to,
                        advance,
                        rooms: roomArray,
                        status: 'inhouse'
                    })

                });

                if (response.ok) {
                    setOpen(false)
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
            setErrorMessage("Select Rooms To Check in")
            return
        }
    }
    return (
        <Modal open={open} setOpen={setOpen} width={800} height={900}>
            {error &&
                <div role="alert" className=" absolute top-5 right-5">
                    <div className="bg-red-500 text-white font-bold rounded-t px-4 py-4 text-left flex flex-row w-72 ">
                        <p>Enter All Data</p>
                        <button type='button' onClick={() => { setError(false); setErrorMessage('') }} className='ml-auto'>
                            <svg className="fill-current h-6 w-6 text-red-100" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
                        </button>
                    </div>
                    <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-6 text-red-700">
                        <p className='capitalize'>{errorMessage}</p>
                    </div>
                </div>
            }
            <form onSubmit={(e) => onSubmit(e)} className='flex flex-col space-y-4'>
                <Modal open={openSelectRoom} setOpen={setOpenSelectRoom} width={600} height={400}>
                    <div className=" flex flex-row flex-wrap">
                        {availabeData.map((item: any, index: number) => (
                            <div key={index} className='my-2' >
                                {selectedRooms.includes(item) ?
                                    <button type='button' onClick={() => selectData(item)} className="p-4 border bg-green-700 text-[12px] items-center justify-center rounded-sm w-16 h-16 mx-2 text-white">{item.roomNumber}</button>
                                    :
                                    <button type='button' onClick={() => selectData(item)} className="p-4 border border-gray-400 text-[12px] items-center justify-center rounded-sm w-16 h-16 mx-2">{item.roomNumber}</button>
                                }
                            </div>
                        ))}
                        <button type='button' onClick={() => setOpenSelectRoom(false)} className='bg-green-700 p-3 rounded-sm text-white px-5 ml-auto mr-4 mt-5'>Done</button>

                    </div>

                </Modal>
                <div className="text-[28px] font-thin tracking-tight">Walk in</div>


                <div className="flex flex-row space-x-5">
                    <div className="flex flex-col flex-1">
                        <label className="font-medium text-ssm ml-2" htmlFor="roomNumber">
                            Client Name
                        </label>
                        <input
                            defaultValue={data.name}
                            autoComplete='off'
                            name="name"
                            placeholder="Client Name"
                            type="text"
                            id="clientName"
                            required
                            className=" placeholder:text-ssm capitalize placeholder:text-gray-500 align-middle block flex-1 p-3  border border-gray-300 rounded-sm bg-gray-50 text-sm text-gray-700 w-full"
                        />
                    </div>
                    <div className="flex flex-col flex-1">
                        <label className="font-medium text-ssm ml-2" htmlFor="roomNumber">
                            Client Address
                        </label>
                        <input
                            defaultValue={data.address}
                            autoComplete='off'
                            name="address"
                            placeholder="Client Address"
                            type="text"
                            id="clientAddress"
                            required
                            className=" placeholder:text-ssm capitalize placeholder:text-gray-500 align-middle block flex-1 p-3  border border-gray-300 rounded-sm bg-gray-50 text-sm text-gray-700 w-full"
                        />
                    </div>
                </div>
                <div className="flex flex-row space-x-5">
                    <div className="flex flex-col flex-1">
                        <label className="font-medium text-ssm ml-2" htmlFor="roomNumber">
                            Client Phone
                        </label>
                        <input
                            autoComplete='off'
                            defaultValue={data.phone}
                            pattern="[0-9+]*"
                            name="phone"
                            placeholder="Client Phone"
                            type="text"
                            id="clientPhone"
                            required
                            className=" placeholder:text-ssm  placeholder:text-gray-500 align-middle block flex-1 p-3  border border-gray-300 rounded-sm bg-gray-50 text-sm text-gray-700 w-full"
                        />
                    </div>
                    <div className="flex flex-col flex-1">
                        <label className="font-medium text-ssm ml-2" htmlFor="roomNumber">
                            Check In - Check Out
                        </label>
                        <Datepicker
                            inputClassName=' border border-gray-300 rounded-sm bg-gray-50 text-gray-700 p-4 rounded-sm text-[12px] w-full'
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
                            Nationality
                        </label>
                        <input
                            autoComplete='off'
                            defaultValue={data.nationality}
                            name="nationality"
                            placeholder="Nationality"
                            type="text"
                            id="nationality"
                            required
                            className=" placeholder:text-ssm  placeholder:text-gray-500 align-middle block flex-1 p-3  border border-gray-300 rounded-sm bg-gray-50 text-sm text-gray-700 w-full"
                        />
                    </div>
                    <div className="flex flex-col flex-1">
                        <label className="font-medium text-ssm ml-2" htmlFor="roomNumber">
                            Client Email
                        </label>
                        <input
                            defaultValue={data.email}
                            autoComplete='off'
                            name="email"
                            placeholder="Client Email"
                            type="text"
                            id="clientEmail"
                            className=" placeholder:text-ssm  placeholder:text-gray-500 align-middle block flex-1 p-3  border border-gray-300 rounded-sm bg-gray-50 text-sm text-gray-700 w-full"
                        />
                    </div>
                </div>

                <div className="flex flex-row space-x-5">
                    <div className="flex flex-col flex-1">
                        <label className="font-medium text-ssm ml-2" htmlFor="roomNumber">
                            Visiting From
                        </label>
                        <input
                            defaultValue={data.from}
                            autoComplete='off'
                            name="from"
                            placeholder="Visting From"
                            type="text"
                            id="nationality"
                            className=" placeholder:text-ssm capitalize placeholder:text-gray-500 align-middle block flex-1 p-3  border border-gray-300 rounded-sm bg-gray-50 text-sm text-gray-700 w-full"
                        />
                    </div>
                    <div className="flex flex-col flex-1">
                        <label className="font-medium text-ssm ml-2" htmlFor="roomNumber">
                            Visiting To
                        </label>
                        <input
                            defaultValue={data.to}
                            autoComplete='off'
                            name="to"
                            placeholder="Visiting To"
                            type="text"
                            id="clientEmail"
                            className=" placeholder:text-ssm capitalize placeholder:text-gray-500 align-middle block flex-1 p-3  border border-gray-300 rounded-sm bg-gray-50 text-sm text-gray-700 w-full"
                        />
                    </div>
                </div>
                <div className="flex flex-row space-x-5">
                    <div className="flex flex-col flex-1">
                        <label className="font-medium text-ssm ml-2" htmlFor="roomNumber">
                            Advance Payment
                        </label>
                        <input
                            pattern="[0-9]*"
                            defaultValue={""}
                            name="advance"
                            placeholder="Rs."
                            type="text"
                            id="nationality"
                            className=" placeholder:text-ssm  placeholder:text-gray-500 align-middle block flex-1 p-3  border border-gray-300 rounded-sm bg-gray-50 text-sm text-gray-700 w-full"
                        />
                    </div>
                    <div className="flex flex-col flex-1">
                        <label className="font-medium text-ssm ml-2 mt-4" htmlFor="roomNumber">
                        </label>
                        <button className="bg-orange-700 p-3 rounded space-x-3 ml-auto w-full text-center text-white ">
                            Check In
                        </button>
                    </div>
                </div>
                <div className="flex flex-row space-x-5">

                    <div className="flex flex-col flex-1">

                        {value.startDate != null && value.endDate != null &&
                            <button type='button' onClick={() => setOpenSelectRoom(true)} className='bg-gray-600 text-white p-4 rounded-sm text-[12px] items-center'>
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
                        }
                        {selectedRooms.length != 0 &&
                            <div className=" mt-4 max-h-[200px] overflow-y-scroll">
                                <label className="font-medium text-ssm ml-2" htmlFor="roomNumber">
                                    Pricing
                                </label>
                                <div className="relative overflow-x-auto shadow-md sm:rounded-sm ">
                                    <table className="text-sm text-left text-gray-500 dark:text-gray-400 w-full rounded-sm ">

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

                </div>


            </form>
        </Modal>
    )
}

export default Booking
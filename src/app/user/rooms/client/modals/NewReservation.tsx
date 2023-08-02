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
    const router = useRouter()
    const [openSelectRoom, setOpenSelectRoom] = useState(false)
    const [availabeData, setAvailableData] = useState([])
    const [selectedRooms, setSelectedRooms] = useState<number[]>([])

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
    const selectData = (val: any) => {

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
        if (selectedRooms.length != 0) {
            const formData = new FormData(event.target);
            const name = formData.get('name');
            const address = formData.get('address');
            const phone = formData.get('phone');
            const advance = formData.get('advance');
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
                        roomNumber: selectedRooms,
                        duration: duration,
                        checkIn: value.startDate,
                        checkOut: value.endDate,
                        status: 'reserved',
                        advance
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

        }
    }
    return (
        <Modal open={openReservation} setOpen={setOpenReservation} width={800} height={900}>
            <form onSubmit={(e) => onSubmit(e)} className='flex flex-col space-y-4'>
                <Modal open={openSelectRoom} setOpen={setOpenSelectRoom} width={600} height={400}>
                    <div className=" flex flex-row flex-wrap">
                        {availabeData.map((item: any,index:number) => (
                            <div key={index} className='my-2' >
                                {selectedRooms.includes(item) ?
                                    <button type='button' onClick={() => selectData(item)} className="p-4 border bg-green-700 text-[12px] items-center justify-center rounded-xl w-16 h-16 mx-2 text-white">{item}</button>
                                    :
                                    <button type='button' onClick={() => selectData(item)} className="p-4 border border-gray-400 text-[12px] items-center justify-center rounded-xl w-16 h-16 mx-2">{item}</button>
                                }
                            </div>
                        ))}
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
                        />
                    </div>
                </div>
                <div className="flex flex-row space-x-5">
                    <div className="flex flex-col flex-1">
                        <label className="font-medium text-ssm ml-2" htmlFor="roomNumber">
                            Advance
                        </label>
                        <input
                            name="advance"
                            placeholder="Rs. "
                            type="text"
                            id="clientPhone"
                            required
                            className=" placeholder:text-ssm  placeholder:text-gray-500 align-middle block flex-1 p-3  border border-gray-300 rounded-lg bg-gray-50 text-sm text-gray-700 w-full"
                        />
                    </div>
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

                                                {selectedRooms.map((item: any,index:number) => (
                                                    <div key={index} className="text-white text-center mx-2 ">{item}</div>
                                                ))}

                                            </div>
                                        </div>
                                    }
                                </button>
                            </div>
                        }
                    </div>
                </div>


                <div className="flex flex-row">
                    {(value.startDate != null && value.endDate != null) &&
                        <div className="text-[16px] font-thin tracking-tight p-3 bg-gray-700 text-white rounded-lg w-44 text-center">{duration} day</div>
                    }
                    <button className="bg-orange-700 p-3 rounded space-x-3 ml-auto w-2/12 text-center text-white ">
                        Reserve
                    </button>
                </div>

            </form>
        </Modal>
    )
}

export default NewReservation
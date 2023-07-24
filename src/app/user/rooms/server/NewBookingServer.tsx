import serverUrl from '@/config/config';
import React from 'react'
import NewBooking from '../client/NewBooking';


async function getAllRoomList() {
    const res = await fetch(serverUrl + "/user/room/getRoomList", { cache: 'no-store' });
    const data = await res.json();
    return data
}


async function NewBookingServer() {
    const data = await getAllRoomList()
    return (
        <NewBooking data={data} />
    )
}

export default NewBookingServer
import serverUrl from '@/config/config';
import React from 'react'
import POS from '../client/POS';

async function getData() {
    const res = await fetch(serverUrl + "/user/menu/allBookingAndTable", { cache: 'no-store' });
    const data = await res.json();
    const resRoomList=await fetch(serverUrl+"/user/menu/getAvailableRoom",{cache:'no-store'})
    const bookingList=await resRoomList.json()
    return { data ,bookingList}
}
const POSServer = async () => {
    const { data,bookingList } = await getData()
    return (
        <POS data={data} bookingList={bookingList}/>
    )
}

export default POSServer
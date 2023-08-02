import serverUrl from '@/config/config';
import React from 'react'
import BillData from '../client/billData';


async function getAllRoomList() {
    const res = await fetch(serverUrl + "/user/history/clientList", { cache: 'no-store' });
    const data = await res.json();
    const res2 = await fetch(serverUrl + "/user/room/getRoomList", { cache: 'no-store' });
    const data2 = await res2.json();
    return {data,data2}
}


async function BillServer() {
    const {data,data2} = await getAllRoomList()
    return (
        <BillData data={data} roomData={data2} />
    )
}

export default BillServer
import serverUrl from '@/config/config';
import React from 'react'
import BillData from '../client/billData';


async function getAllRoomList() {
    const res2 = await fetch(serverUrl + "/user/logs/getLogs", { cache: 'no-store' });
    const val = await res2.json();
    return val
}


async function BillServer() {
    const data = await getAllRoomList()
    return (
        <BillData data={data} />
    )
}

export default BillServer
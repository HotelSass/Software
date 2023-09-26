import serverUrl from '@/config/config';
import React from 'react'
import BillData from '../client/billData';


async function getAllRoomList() {
    const res = await fetch(serverUrl + "/user/finance/getSalesAccountData", { cache: 'no-store' });
    const data = await res.json();
    return { data }
}


async function BillServer() {
    const { data } = await getAllRoomList()
    return (
        <BillData data={data} />
    )
}

export default BillServer
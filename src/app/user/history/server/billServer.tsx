import serverUrl from '@/config/config';
import React from 'react'
import BillData from '../client/billData';


async function getAllRoomList() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    const res = await fetch(serverUrl + "/user/finance/getFinanceData/" + formattedDate + "/date/" + formattedDate, { cache: 'no-store' });
    const data = await res.json();
    return data
}


async function BillServer() {
    const data = await getAllRoomList()
    return (
        <BillData data={data} />
    )
}

export default BillServer
import serverUrl from '@/config/config';
import React from 'react'
import BillData from '../client/billData';
import server from '@/app/admin/bar/page';


async function getAllRoomList() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    const res = await fetch(serverUrl + "/user/finance/getFinanceData/" + formattedDate + "/date/" + formattedDate, { cache: 'no-store' });
    const data = await res.json();
    const res2 = await fetch(serverUrl + "/user/finance/getOutgoingdata/" + formattedDate + "/date/" + formattedDate, { cache: 'no-store' });
    const data2 = await res2.json();
    const res3 = await fetch(serverUrl + "/user/finance/openingAndClosing/" + formattedDate , { cache: 'no-store' });
    const data3 = await res3.json();
    return { data, data2,data3 }
}


async function BillServer() {
    const { data, data2, data3 } = await getAllRoomList()
    return (
        <BillData data={data} outgoing={data2} daily={data3} />
    )
}

export default BillServer
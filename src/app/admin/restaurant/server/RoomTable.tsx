import serverUrl from '@/config/config';
import React from 'react'
import RoomTable from '../client/RoomTable';
async function getData() {
    const res = await fetch(serverUrl + "/table/getAllTable", { cache: 'no-store' });
    const data = await res.json();
    return data
}

export default async function RoomTableServer(){
    const tableData = await getData()

    return (
        <>
            <RoomTable tableData={tableData} />
        </>
    )
}


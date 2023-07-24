import serverUrl from '@/config/config';
import React from 'react'
import POS from '../client/POS';

async function getData() {
    const res = await fetch(serverUrl + "/user/menu/getCategoryAndMenu", { cache: 'no-store' });
    const data = await res.json();
    const resRoomList=await fetch(serverUrl+"/user/menu/getAvailableRoom",{cache:'no-store'})
    const bookingList=await resRoomList.json()
    const unOccupiedTable=await fetch(serverUrl+"/user/menu/getAvailableTable",{cache:'no-store'})
    const unOccupiedTableList=await unOccupiedTable.json()
    return {data,bookingList,unOccupiedTableList}
}
const POSServer = async () => {
    const {data,bookingList,unOccupiedTableList} = await getData()
    return (
        <POS data={data} bookingList={bookingList} unOccupiedTableList={unOccupiedTableList} />
    )
}

export default POSServer